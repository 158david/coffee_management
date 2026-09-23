import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const adapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "coffee_management",
    connectionLimit: 5
});

export const prisma = new PrismaClient({ adapter }); 