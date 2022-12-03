import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser } from "../db";

export async function registerRoute(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await createUser(email, password);

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 60 * 60 * 24 * 30,
    }
  );

  res.json({ token });
}
