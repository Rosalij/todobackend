require("dotenv").config();
const mongoose = require("mongoose");
const Todo = require("./models/todo");

const seedTodos = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);

    await Todo.deleteMany();

    await Todo.insertMany([
      {
        title: "Handla mat",
        description: "Köp mjölk och bröd",
        status: "Not started"
      },
      {
        title: "Plugga backend",
        description: "Fixa CRUD-routes",
        status: "In progress"
      },
      {
        title: "Skicka in uppgift",
        description: "Lämna in på Canvas",
        status: "Finished"
      }
    ]);

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error);
    mongoose.connection.close();
  }
};

seedTodos();
