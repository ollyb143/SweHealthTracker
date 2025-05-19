import db from "../db/db.js";

export default async function sessionChecker(req, res, next) {
  const token = req.cookies.sessionToken;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const session = await db("sessions").where({ sessionToken: token }).first();
  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await db("sessions").where({ sessionToken: token }).del();
      res.clearCookie("sessionToken");
    }
    return res.status(401).json({ error: "Session expired or invalid" });
  }

  req.userID = session.userID;
  next();
}
