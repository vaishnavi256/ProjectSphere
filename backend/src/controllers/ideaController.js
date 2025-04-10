const prisma = require("../config/prisma");
require("dotenv").config();
const express = require ("express")
const router = express.Router();

// model Idea {
//     id     Int  @id @default(autoincrement())
//     teamId Int
//     topic String
//     comment String
//     approved Int // 0 -> pending, 1 -> approved, 2 -> rejected
//   }

exports.idea = async (req, res) => {
    const { semester, email } = req.user;
    const { topic, teamId, approved } = req.body; 
    console.log("In idea");
    console.log("Received:", { topic, teamId, approved });

    if (!topic || !teamId) {
        return res.status(400).json({
            message: "failed",
            data: "Topic and teamId are required fields.",
        });
    }

    try {
        const idea = await prisma.idea.create({
            data: {
                teamId,
                topic,
                approved, 
                comment: [],       
            },
        });

        res.status(201).json({
            message: "success",
            data: "Idea created successfully",
        });
    } catch (error) {
        console.error("Error creating idea:", error);

        res.status(500).json({
            message: "failed",
            error: "Error in creating idea. Please try again later.",
        });
    }
};

exports.getIdeas = ( async (req, res) => {
    const {semester, email} = req.user;
    const teamId = req.params.id

    try {
        const data = await prisma.idea.findMany({
            where: {
                teamId: teamId,
            },
        });

        res.status(200).json({
            message: "Success",
            data: data,
        });
    } catch (error) {
        console.error("Error fetching ideas:", error); // useful for debugging

        res.status(500).json({
            message: "Failed to fetch ideas. Please try again later.",
            error: error.message, // optional: helpful during development
        });
    }
})

