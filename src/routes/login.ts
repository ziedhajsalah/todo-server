import { Request, Response } from "express";
import { getUserByEmail } from "../db";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function loginRoute(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(404);
  } else {
    const isPasswordCorrect = await compare(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: 60 * 60 * 24 * 30,
        }
      );

      res.json({ token });
    } else {
      res.status(400);
    }
  }
}
