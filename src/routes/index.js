import { Router } from "express";
import { conn } from "../bd.js";


export const router = Router();

router.get("/", (req, res) => {
  res.render("index")
});

