const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB

mongoose.connect("mongodb+srv://hellolucky0808_db_user:<vXweK6e0tn3yUVuu>@softwaresolution.taxypud.mongodb.net/?appName=Softwaresolution")
.then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error:", err));

// Schema
const LeadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    service: String,
    message: String,
    timestamp: String
});

const Lead = mongoose.model("Lead", LeadSchema);

// ROOT
app.get("/", (req, res) => {
    res.send("🔥 SERVER RUNNING FINAL");
});

// TEST
app.get("/test", (req, res) => {
    res.send("🔥 TEST WORKING FINAL");
});

// SAVE LEAD
app.post("/api/leads", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

// GET LEADS
app.get("/api/leads", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
