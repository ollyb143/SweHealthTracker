import db from '../db/db.js';

export const createGroup = async (req, res) => {
  const userID = req.userID;
  const { groupName } = req.body;
  if (!groupName || !groupName.trim()) {
    return res.status(400).json({ error: 'groupName is required' });
  }
  try {
    const existingGroup = await db('groups')
      .whereRaw('LOWER(TRIM("groupName")) = LOWER(TRIM(?))', [groupName])
      .first();

    if (existingGroup) {
      return res.status(409).json({ error: 'Group name already exists' });
    }
    const [newGroup] = await db('groups')
      .insert({ groupName: groupName.trim(), adminUserID: userID })
      .returning(['groupID', 'groupName']);
    await db('memberships').insert({
      groupID: newGroup.groupID,
      userID,
      joinDate: new Date(),
    });
    return res.status(201).json(newGroup);
  } catch (err) {
    console.error('Create Group Error:', err);
    return res.status(500).json({ error: err.message });
  }
};



export const getGroups = async (req, res) => {
  try {
    const groups = await db('memberships')
      .join('groups', 'memberships.groupID', 'groups.groupID')
      .where({ 'memberships.userID': req.userID })
      .select('groups.groupID', 'groups.groupName', 'groups.adminUserID');
    return res.json(groups);
  } catch (err) {
    console.error('Get Groups Error:', err);
    return res.status(500).json({ error: err.message });
  }
};



export const leaveGroup = async (req, res) => {
  const userID = req.userID;
  const { groupID } = req.body;
  if (!groupID) {
    return res.status(400).json({ error: 'groupID is required' });
  }
  try {
    const deleted = await db('memberships')
      .where({ groupID, userID })
      .del();
    if (!deleted) {
      return res.status(404).json({ error: 'Membership not found' });
    }
    return res.json({ message: 'Left group successfully' });
  } catch (err) {
    console.error('Leave Group Error:', err);
    return res.status(500).json({ error: err.message });
  }
};
