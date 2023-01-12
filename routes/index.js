//routes/index.js

const express = require("express");
const router = express.Router();

// zdefiniowanie odpowiedzi dla "strony głównej"
const IndexController = require("../controllers/IndexController");
router.get("/",IndexController.home);


// zdefiniowanie odpowiedzi dla "kontroli stanu"
const StatusController = require("../controllers/StatusController");
router.get("/status", StatusController.getAll);


// zdefiniowanie odpowiedzi dla "kontroli kategori"
const CategoryController = require("../controllers/CategoryController");
router.get("/categories", CategoryController.getAll);


// zdefiniowanie odpowiedzi dla "kontroli produktów"
const ProductController = require("../controllers/ProductController");
router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getById);
router.post("/products", ProductController.store);
router.put("/products/:id", ProductController.updateById);

// zdefiniowanie odpowiedzi dla "kontroli zamówieni"
const  OrderController = require("../controllers/OrderController");
router.get("/orders",OrderController.getAll);
router.post("/orders",OrderController.store);
router.put("/orders/:id/:status",OrderController.updateStatusById)
router.get("/orders/status/:id",OrderController.getByStatus)



module.exports = router;
