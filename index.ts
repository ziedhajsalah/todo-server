import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {
  registerRoute,
  loginRoute,
  createTodoRoute,
  markTodoCompleted,
  markTodoincompleted,
  deleteTodoRoute,
  listTodosRoute,
} from "./src/routes";
import { authenticateToken } from "./src/middlewares";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.post("/register", registerRoute);

app.post("/login", loginRoute);

app.get("/todos", authenticateToken, listTodosRoute);
app.post("/todos", authenticateToken, createTodoRoute);
app.put("/todos/:todoId/complete", authenticateToken, markTodoCompleted);
app.put("/todos/:todoId/incomplete", authenticateToken, markTodoincompleted);
app.delete("/todos/:todoId", authenticateToken, deleteTodoRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
