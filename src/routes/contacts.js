import { Router } from "express";
import { conn } from "../bd.js";


export const router_contact = Router();

router_contact.get('/add', (req, res) => {
  const user_id = req.query.user_id
  res.render('contacts/add', {user_id});
});

router_contact.post('/add', async (req, res) => {
  const {name_contact, phone_number, user_id} = req.body
  const newContact = {
    name: name_contact,
    number: phone_number,
    user_id
  }

  await conn.query('INSERT INTO contacts SET ?', [newContact])
  res.redirect('/contacts')
})

router_contact.get('/', async (req, res) => {
  const consult = await conn.query('SELECT * FROM contacts')
  const contacts = consult[0]
  res.render('contacts/list', {contacts})
})

router_contact.get('/delete/:id', async(req, res)=>{
  const { id } = req.params
  await conn.query('DELETE FROM contacts WHERE ID = ?', [id])
  res.redirect('/contacts')
})

router_contact.get('/edit/:id', async(req, res)=>{
  const { id } = req.params
  const consult = await conn.query('SELECT * FROM contacts WHERE id = ?', [id])
  const contact = consult[0]
  res.render('contacts/edit', {contact: contact[0]} )
})

router_contact.post('/edit/:id', async(req, res)=>{
  const { id } = req.params
  const { name_contact, phone_number } = req.body
  const newContact = {
    name: name_contact,
    number: phone_number
  }
  await conn.query('UPDATE contacts SET ? WHERE id = ?', [newContact, id])
  res.redirect('/contacts')
})