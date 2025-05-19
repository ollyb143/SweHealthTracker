import express from "express";
import cookieParser from "cookie-parser";
import { v4 as uuid } from "uuid";
import db from "../db/db.js";
import { register, login, forgotPassword, verifyResetCode, resetPassword } from "../controllers/authController.js";

const router = express.Router();
router.use(cookieParser());

router.post("/register", register);

router.post("/login", login,
  async (req, res, next) => {
    try {
      const token = uuid();
      const now = new Date();
      const expires = new Date(now.getTime() + 10 * 60 * 1000);

      await db("sessions").insert({
        sessionToken: token,
        userID: req.userID,
        createdAt: now,
        expiresAt: expires,
      });

      res.cookie("sessionToken", token, {
        httpOnly: true,
        sameSite: "lax",
        expires,
      });

      res.json({ ok: true, token });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/logout", async (req, res) => {
  const token = req.cookies.sessionToken;
  if (token) {
    await db("sessions").where({ sessionToken: token }).del();
    res.clearCookie("sessionToken");
  }
  res.json({ ok: true });
});

// optional endpoint to let client verify login status
router.get("/check", async (req, res) => {
  const token = req.cookies.sessionToken;
  if (!token) return res.status(401).json({ ok: false });
  const session = await db("sessions").where({ sessionToken: token }).first();
  if (!session || session.expiresAt < new Date()) {
    return res.status(401).json({ ok: false });
  }
  res.json({ ok: true });
});

router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);

export default router;
