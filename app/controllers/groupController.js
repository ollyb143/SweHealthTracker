// /app/controllers/groupController.js
import db from '../db/db.js';

export const createGroup = async (req, res) => {
  const { userID } = req.user;
  const { groupName } = req.body;

  try {
    const [newGroup] = await db('groups')
      .insert({ groupName, adminUserID: userID })
      .returning(['groupID']);

    const groupID = newGroup.groupID;

    await db('memberships').insert({
      groupID,
      userID,
      joinDate: new Date()
    });

    res.status(200).json({ message: 'Group created successfully', groupID });
  } catch (err) {
    console.error('Create Group Error:', err);
    res.status(500).json({ error: err.message });
  }
};

  
export const getGroups = async (req, res) => {
  try {
    const groups = await db('memberships').join('groups', 'memberships.groupID', 'groups.groupID').where({userID: req.user.userID}).select('groups.*');
    res.json(groups);
  } catch (err) {
    console.error('Get Groups Error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const joinGroup = async (req, res) => {
    const { userID } = req.user;
    const { groupName } = req.body;

    try {
        const groupExists = await db('groups').where({groupName: groupName}).first();

        if(!groupExists){
            throw new Error(`Group "${groupName}" does not exist.`);
        }
        
        const membershipExists = await db('memberships').join('groups', "memberships.groupName", "groups.groupName").where({ userID: userID}).first();

        if(!membershipExists){

            await db('memberships').insert({ userID: userID})
        }
    } catch (err) {
        console.error('Join Groups Error', err);
        res.status(500).json({ error: err.message });
    }
}

export const leaveGroup = async (req, res) => {
  
}
  