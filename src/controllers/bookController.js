const express = require("express");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
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


