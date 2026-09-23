import { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client.js";

export const errorMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2003") {
            return res.status(400).json({
                message: "Categoria specificata nu exista"
            });
        }
    

    if (err.code === "P2002") {
        return res.status(409).json({
            message: "Inregistrarea exista deja"
        });  
      }
    }
    res.status(500).json({
        message: "A aparut o eroare interna a serverului"
    });
};