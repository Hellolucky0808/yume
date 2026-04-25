const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== MongoDB =====
mongoose.connect("mongodb+srv://hellolucky0808_db_user:vXweK6e0tn3yUVuu@softwaresolution.taxypud.mongodb.net/leadsDB?retryWrites=true&w=majority&appName=Softwaresolution")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// ===== Schema =====
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

// ===== Root =====
app.get("/", (req, res) => {
    res.send("🚀 Server running perfectly");
});

// ===== Test =====
app.get("/test", (req, res) => {
    res.send("✅ API WORKING");
});

// ===== Save Lead =====
app.post("/api/leads", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();

        res.json({ success: true });

    } catch (error) {
        console.error("SAVE ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== Get Leads =====
app.get("/api/leads", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);

    } catch (error) {
        console.error("FETCH ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== Server =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});
