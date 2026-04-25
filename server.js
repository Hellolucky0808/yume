const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE CONNECTION =================
mongoose.connect("mongodb+srv://hellolucky0808_db_user:06qRWWsKshF3CarW@cluster0.jriztgx.mongodb.net/leadsDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));

// ================= SCHEMA =================
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

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
    res.send("Server is running");
});

// ================= SAVE LEAD =================
app.post("/api/leads", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.get("/", (req, res) => {
  res.send("SERVER VERSION 2 ✅");
});

app.get("/test", (req, res) => {
  res.send("API WORKING V2 ✅");
});

// ================= GET LEADS =================
app.get("/api/leads", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ success: false });
    }
});
app.get("/test", (req, res) => {
    res.send("API WORKING");
});
// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
