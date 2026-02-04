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
        status: "ej påbörjad"
      },
      {
        title: "Plugga backend",
        description: "Fixa CRUD-routes",
        status: "pågående"
      },
      {
        title: "Skicka in uppgift",
        description: "Lämna in på Canvas",
        status: "avklarad"
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
