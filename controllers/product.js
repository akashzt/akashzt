const logger = require("../lib/logger");
const resp = require("../lib/response");
const query = require("../lib/queries/product");
const utils = require("../lib/utils");
const constants = require("../constants/constants");
const _ = require("lodash");

const config = require("config");


const productFields = ["id", "productName","quantity","price","active"];

const createProduct = async function (req, res) {
  try {
    console.log("hiii")
    logger.info("In create product controller");
    const body = req.body;
  
    let Product = await query.createproduct(body);
    logger.info(`Query: responded with new product created: ${Product}`);
       res.body = _.pick(Product, productFields);
   return resp.sendResponse(constants.response_code.SUCCESS, "Success", _.pick(Product, productFields), res);
  } catch (err) {
    logger.info(`Error in creating Product: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, null, null, res, err);
  }
};

const getproduct = async function (req, res) {
  try {
    const Product = req.Product;
    let product = await query.findProduct(Product);
    product = _.pick(product, productFields);
    return resp.sendResponse(constants.response_code.SUCCESS, "Success", product, res);

  } catch (err) {
    logger.info(`Error in creating Product: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, null, null, res, err);
  }
};

const updateProduct = async function (req, res, next) {
  const body = _.pick(req.body, productFields);
  // if admin request make body as ProductData else Product object
  let ProductData = req.url === '/admin/Product' ? _.pick(body, ["ProductId", "product"]) : req.Product;
  try {
    // console.log("Updatable:", body);
    // do not allow duplicate emails in db
    if (body.email && !!(await query.getProductByName(body.productName))) {
      return await resp.sendResponse(constants.response_code.DUPLICATE, "product already exist!", null, res);
    }
    // if email is not duplicate proceed for updating the Product
    // if updating Product email then toggle isEmailVerified column to flase
    if(body.email)
      body.isEmailVerified = false;
    let Product = await query.updateProduct(ProductData.productId, body);
    Product = _.pick(Product, productFields);
    if(body.productName) {
      res.body = Product;
      return next();
    }

    return resp.sendResponse(constants.response_code.SUCCESS, "Product Updated", Product, res);
  } catch (err) {
    logger.info(`Error in updating Product: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, err.message, null, res, err);
  }
};
const getAllproduct = async function (req, res) {
  try {
    const Product = req.Product;
    let product = await query.getAllproducts();
    product = _.pick(product, productFields);
    return resp.sendResponse(constants.response_code.SUCCESS, "Success", product, res);

  } catch (err) {
    logger.info(`Error in creating Product: ${err.message}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, null, null, res, err);
  }
};



module.exports = {
  createProduct,
  updateProduct,
  getproduct,
  getAllproduct
};