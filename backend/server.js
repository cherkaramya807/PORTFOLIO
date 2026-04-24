require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema & Model
const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    techStack: [String],
    link: String
});

const Project = mongoose.model('Project', ProjectSchema);

// API Routes
// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// A temporary route to seed your database with dummy data so it isn't empty!
app.post('/api/seed', async (req, res) => {
    const seedProjects = [
        { 
            title: "MERN Task Manager", 
            description: "A drag-and-drop Kanban board for managing daily tasks.", 
            techStack: ["React", "Node.js", "Express", "MongoDB"], 
            link: "https://github.com/yourusername" 
        },
        { 
            title: "Weather Dashboard", 
            description: "Real-time weather tracking using a third-party API.", 
            techStack: ["React", "Tailwind CSS", "API"], 
            link: "https://github.com/yourusername" 
        }
    ];
    await Project.deleteMany({}); // Clears old data
    await Project.insertMany(seedProjects);
    res.send("Database seeded with sample projects!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));