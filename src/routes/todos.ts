import { Request, Response } from "express";
import {
  checkUncheckTodo,
  createTodo,
  deleteTodoById,
  getTodosByUserId,
} from "../db";

export async function createTodoRoute(req: Request, res: Response) {
  console.log(req.body);
  const todo = await createTodo(req.body.title, 1);
  res.json(todo);
}

export async function markTodoCompleted(req: Request, res: Response) {
  const todo = await checkUncheckTodo(parseInt(req.params.todoId, 10), true);

  res.json(todo);
}

export async function markTodoUnCompleted(req: Request, res: Response) {
  const todo = await checkUncheckTodo(parseInt(req.params.todoId, 10), false);

  res.json(todo);
}

export async function deleteTodoRoute(req: Request, res: Response) {
  const todo = await deleteTodoById(parseInt(req.params.todoId, 10));

  res.json(todo);
}

export async function listTodosRoute(req: Request, res: Response) {
  const todos = await getTodosByUserId(1);

  res.json(todos);
}
