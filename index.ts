import express from "express";
import * as dotenv from "dotenv";
import {
  registerRoute,
  loginRoute,
  createTodoRoute,
  markTodoCompleted,
  markTodoUnCompleted,
  deleteTodoRoute,
  listTodosRoute,
} from "./src/routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.get("/register", registerRoute);

app.get("/login", loginRoute);

app.get("/todos", listTodosRoute);
app.post("/todos", createTodoRoute);
app.put("/todos/:todoId/complete", markTodoCompleted);
app.put("/todos/:todoId/uncomplete", markTodoUnCompleted);
app.delete("/todos/:todoId", deleteTodoRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
