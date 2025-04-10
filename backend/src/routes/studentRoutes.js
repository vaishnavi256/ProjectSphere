const express = require("express");
const { signup, login, profile, createTeam, getAll } = require ('../controllers/studentControllers');
const { authenticateToken } = require("../middleware/authMiddleware");
const { route } = require("./authRoutes");
const {getTeamDetails} = require ("../controllers/studentControllers")
const {getIdeas, idea} = require ("../controllers/ideaController")
const router = express.Router();

router.get("/profile", authenticateToken, profile);
router.get ("/getAll", authenticateToken, getAll);

// team
router.post ("/createTeam", authenticateToken, createTeam);
router.get ("/team/:id", authenticateToken, getTeamDetails);

//idea
router.get("/idea/:id", authenticateToken, getIdeas);
router.post ("/idea", authenticateToken, idea);


router.get ("/weeklyReport", authenticateToken);
router.get ("/notification", authenticateToken);
router.post ('/addIdea', authenticateToken);
router.get ('post', authenticateToken);

module.exports = router;
