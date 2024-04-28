const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());

let contacts = [
  {
    id: 1,
    fname: "sam",
    lname: "james",
    email: "samJAMES@email.com",
    phone: 1112223333,
    birthday: "jan 1, 1999",
  },
  {
    id: 2,
    fname: "bob",
    lname: "johnson",
    email: "bobJOHNSON@email.com",
    phone: 4445556666,
    birthday: "sep 20, 2000",
  },
  {
    id: 3,
    fname: "mike",
    lname: "franklin",
    email: "mikeFRANKLIN@email.com",
    phone: 7778889999,
    birthday: "jul 14, 1995",
  },
];

app.use(bodyParser.json());

app.get("/api/contacts", (req, res) => {
  let filteredContacts = [...contacts];

  if (req.query.fname) {
    filteredContacts = filteredContacts.filter(
      (contact) => contact.fname == req.query.fname
    );
  }

  if (req.query.sortBy) {
    const sortParams = req.query.sortBy.split(",");
    filteredContacts.sort((a, b) => {
      for (let param of sortParams) {
        const [field, order] = param.split(":");
        const comparison = order === "asc" ? 1 : -1;
        if (a[field] < b[field]) return -comparison;
        if (a[field] > b[field]) return comparison;
      }
      return 0;
    });
  }

  res.json(filteredContacts);
});

app.post("/api/contacts", (req, res) => {
  const contact = req.body;
  contacts.push(contact);
  res.status(201).json(contact);
});

app.put("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedContact = req.body;
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts[index] = {...contacts[index], ...updatedContact};
    res.json(contacts[index]);
  } else {
    res.status(404).json({error: "Book not found"});
  }
});

app.delete("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    const deletedContact = contacts.splice(index, 1)[0];
    res.json(deletedContact);
  } else {
    res.status(404).json({error: "Contact not found"});
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
