import { Router } from "express";
import { conn } from "../bd.js";


export const router_auth = Router();

router_auth.get("/register", (req, res) => {
  res.render("auth/register");
});

router_auth.get("/login", (req, res) => {
  res.render("auth/login");
});

router_auth.post("/register", async (req, res) => {
  const {name, password, confirm_password} = req.body

  let msgs = {
    success: "Successful registration",
    err:  "Passwords do not match try again"
  }

  if(password != confirm_password){
    res.render("auth/register", msgs)
  }else{

    const newUser = {
      name,
      password
    }

    await conn.query('INSERT INTO users SET ?', [newUser])
    res.render("auth/login", msgs)
  }
});

router_auth.post("/login", async (req, res) => {
  const {name, password} = req.body
  const consult = await conn.query('SELECT * FROM users WHERE name = ? AND password = ?', [name, password])
  const user = consult[0]
  let msg = {
    error: "If you forgot your credentials, create another account"
  }
  if(user[0]){
    res.render("contacts/list", {user: user[0]});
  }else{
    res.render("auth/login", msg)
  }
});

