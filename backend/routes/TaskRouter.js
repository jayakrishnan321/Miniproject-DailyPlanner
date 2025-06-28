const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/", (req, res) => {
    res.send("Tasks API is working!");//To test backend is working 
});

router.get("/:date", async (req, res) => {//collections that matches the date go to frontend
    const tasks = await Task.find({ date: req.params.date });
    res.json(tasks);
});

router.get("/complete/:id", async (req, res) => {//collection matches the id go to frontend
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.delete("/:id", async (req, res) => {//delete the data which match the id
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/id/:id", async (req, res) => {//get data to frontend
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {//update the data in database
    try {
        const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/complete/:id", async (req, res) => {//update the database
    try {
        const complete = await Task.findByIdAndUpdate(req.params.id, { completed: req.body.completed })
        res.status(200).json(complete);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})


router.post("/", async (req, res) => {//create new data to database
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
module.exports = router;