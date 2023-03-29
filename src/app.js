import express from "express";
import { conn } from "./bd.js";
import { PORT } from "./config.js";

const app = express();

app.get("/", (req, res)=>{
    res.send("Welcome to server")
})

app.get("/test", async (req, res)=>{
    const [result] = await conn.query('SELECT "Hello world" as RESULT');
    res.json(result[0]);
})

app.get("/show", async(req, res) => {
    const [result] = await conn.query("SELECT * FROM products");
    res.json(result);
} )

app.listen(PORT);

console.log("Server on port ", PORT);