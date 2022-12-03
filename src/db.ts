import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function createUser(email: string, password: string) {
  const passwordHash = await hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: passwordHash },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  return user;
}

export async function getUserById(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  return user;
}

export async function createTodo(title: string, userId: number) {
  const todo = await prisma.todo.create({
    data: { title, checked: false, authorId: userId },
  });

  return todo;
}

export async function getTodosByUserId(userId: number) {
  const todos = await prisma.todo.findMany({ where: { authorId: userId } });

  return todos;
}

export async function checkUncheckTodo(todoId: number, checked: boolean) {
  const todo = await prisma.todo.update({
    where: { id: todoId },
    data: { checked },
  });

  return todo;
}

export async function deleteTodoById(todoId: number) {
  const todo = await prisma.todo.delete({ where: { id: todoId } });

  return todo;
}
