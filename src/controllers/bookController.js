const express = require("express");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "postgresql-globular-73363",
    user: "postgres",
    password: "123",
    database: "book_store",
  },
});

exports.getBooks = (req, res) => {
  let sort = "book_title";
  if (req.query.cat && req.query.sort) {
    sort = req.query.sort;
    knex
      .select("*")
      .from("book_detail")
      .where("category", req.query.cat)
      .orderBy(sort)
      .then((data) => res.send(data))
      .catch((err) => res.status(500).json("Database not accessible"));
  } else if (req.query.sort) {
    sort = req.query.sort;
    knex
      .select("*")
      .from("book_detail")
      .orderBy(sort)
      .then((data) => res.send(data))
      .catch((err) => res.status(500).json("Database not accessible"));
  } else if (req.query.cat) {
    knex
      .select("*")
      .from("book_detail")
      .where("category", req.query.cat)
      .then((data) => res.send(data))
      .catch((err) => res.status(500).json("Database not accessible"));
  } else
    knex
      .select("*")
      .from("book_detail")
      .orderBy(sort)
      .then((data) => res.send(data))
      .catch((err) => res.status(500).json("Database not accessible"));
};

exports.getBookByID = (req, res) => {
  knex
    .select("*")
    .from("book_detail")
    .where("ISBN", req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).json("Database not accessible"));
};

exports.addNewBook = (req, res) => {
  // console.log(JSON.stringify(req.body));
  const newBook = { ...req.body };
  console.log(newBook);
  knex("book_detail")
    .insert({
      ISBN: newBook.ISBN,
      book_title: newBook.book_title,
      author: newBook.author,
      publisher: newBook.publisher,
      category: newBook.category,
      price: newBook.price,
      synopsis: newBook.synopsis,
      stack_count: newBook.stack_count,
    })
    .then((data) => res.send(newBook))
    .catch((err) => res.status(500).json("Database not accessible"));
};
exports.updateBook = (req, res) => {
  const newBook = { ...req.body };
  console.log("Update ", newBook);
  knex("book_detail")
    .where("ISBN", "=", req.params.id)
    .update({
      ISBN: newBook.ISBN,
      book_title: newBook.book_title,
      author: newBook.author,
      publisher: newBook.publisher,
      category: newBook.category,
      price: newBook.price,
      synopsis: newBook.synopsis,
      stack_count: newBook.stack_count,
    })
    .then((data) => res.send(newBook))
    .catch((err) => res.status(400).json("Database not accessible"));
};

exports.deleteBook = (req, res) => {
  knex("book_detail")
    .where("ISBN", "=", req.params.id)
    .del()
    .then((data) => res.send("Deleted"))
    .catch((err) => res.status(400).json("Database not accessible"));
};

const value = [
  {
    ISBN: 1505573947,
    book_title: "journey to the center of earth ",
    author: "Jules Verne",
    publisher: "Pierre-Jules Hetzel",
    category: "Science Fiction",
    price: "₹120.00",
    synopsis:
      "Journey to the Center of the Earth follows three adventurers who undertake a perilous expedition to the center of the earth. Professor Lidenbrock discovers a manuscript that reveals the location of a passage to the center of the earth.",
    stack_count: 100,
  },
  {
    ISBN: 62515675,
    book_title: "The Monk Who Sold His Ferrari",
    author: "Robin Sharma",
    publisher: "Robin Sharma",
    category: "Motivation",
    price: "₹750.00",
    synopsis:
      "The Monk Who Sold His Ferrari is a self-help book by Robin Sharma, a writer and motivational speaker. The book is a business fable derived from Sharmas personal experiences after leaving his career as a litigation lawyer at the age of 25.",
    stack_count: 150,
  },
];
