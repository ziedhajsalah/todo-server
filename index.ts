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
import { authenticateToken } from "./src/middlewares";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.post("/register", registerRoute);

app.post("/login", loginRoute);

app.get("/todos", authenticateToken, listTodosRoute);
app.post("/todos", authenticateToken, createTodoRoute);
app.put("/todos/:todoId/complete", authenticateToken, markTodoCompleted);
app.put("/todos/:todoId/uncomplete", authenticateToken, markTodoUnCompleted);
app.delete("/todos/:todoId", authenticateToken, deleteTodoRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
