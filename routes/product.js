const express = require("express");
const router = express.Router();
const controller = require("../controllers/product");
const Auth = require("../middlewares/authorization");


// create a new product
router.post("/product",Auth, controller.createProduct);
// update details for an existing product, it does not allow updating the password
router.put("/product",Auth, controller.updateProduct);
// get product
router.get("/product",Auth, controller.getproduct);
//get all product
router.get("/product/all",Auth, controller.getAllproduct);

module.exports = router;
