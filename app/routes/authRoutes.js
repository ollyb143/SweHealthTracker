import express from "express";
import { registerUser, loginUser } from "../controllers/users.js";
import verifyToken from "../middleware/authMiddleware.js"; // import the middleware

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route example
router.get("/dashboard", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Protected route hit!",
    user: req.user, // decoded token data
  });
});

router.get("/exercise", verifyToken, (req, res) => {
    res.status(200).json({
      message: "Protected route hit!",
      user: req.user, // decoded token data
    });
  });

router.get("/fooddrink", verifyToken, (req, res) => {
    res.status(200).json({
    message: "Protected route hit!",
    user: req.user, // decoded token data
    });
});

router.get("/goals", verifyToken, (req, res) => {
    res.status(200).json({
    message: "Protected route hit!",
    user: req.user, // decoded token data
    });
});

router.get("/groups", verifyToken, (req, res) => {
    res.status(200).json({
    message: "Protected route hit!",
    user: req.user, // decoded token data
    });
});

router.get("/profile", verifyToken, (req, res) => {
    res.status(200).json({
    message: "Protected route hit!",
    user: req.user, // decoded token data
    });
});

export default router;




