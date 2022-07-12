const express = require("express");
const router = express.Router();
const quotesController = require("../controllers/quotesController.js");


router.get("/api",quotesController.getApiQuotes);

router.get("/",quotesController.getAllQuotes);

router.post("/",quotesController.postQuotes);

router.put("/:id",quotesController.updateQuotes);

router.delete("/:id",quotesController.deleteQuotes);

module.exports=router;