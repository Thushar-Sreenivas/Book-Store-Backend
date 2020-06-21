const express = require("express");
const bookRoute = require("../controllers/bookController");
const router = express.Router();

router.get("/", bookRoute.getBooks);
router.post("/", bookRoute.addNewBook);
router.put("/:id", bookRoute.updateBook);
router.put("/:id", bookRoute.updateBook);
router.delete("/:id", bookRoute.deleteBook);
module.exports = router;
