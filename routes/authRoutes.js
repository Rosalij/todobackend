require("dotenv").config();
const express = require("express");
const router = express.Router();

const Todo = require("../models/todo.js");

// get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//post new todo
router.post("/newtodo", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTodo = new Todo({
      title,
      description: description || "",
      status: status || "ej påbörjad"
    });

    await newTodo.save();

    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Creating todo failed" });
  }
});

//update todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const allowedStatus = ["Not started", "In progress", "Finished"];

    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Updating todo failed" });
  }
});

//delete todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Deleting todo failed" });
  }
});

module.exports = router;
