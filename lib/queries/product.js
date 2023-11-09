const db = require("../../models/Product");
const constants = require("../../constants/constants");
const logger = require('../../lib/logger') 
const Sequelize=require('sequelize');
const Fields = ["id", "productName","quantity","price","active"];
createproduct = async function (opts) {
  try {
    const product = await db.create(opts);
    return product ? product.dataValues : null;
  } catch (err) {
    logger.info(`Error in creating product db query: ${err.message}`);
    throw new Error(`Error in creating product`);
  }
};

findproduct = async function (opts) {
  console.log(opts);
  const product = await db.findOne(
    { where: {  opts } });
  return product ? product.dataValues : product;
};

updateproduct = async function (productId, product) {
  await db.update(product, { where: { id: productId } });
  const updatedproduct = (await db.findOne({
    where: { productId }
  }));
  return (updatedproduct ? updatedproduct.dataValues : null);
};
getAllproducts = async function () {
  return db.findAll();
};

getArrayproducts = async function (opts) {
  try {
   return db.findAll({
      where: { productId: { [Sequelize.Op.in]: opts } },
      raw: true
    });
  } catch (err) {
    logger.info(`Error in finding product email db query: ${err.message}`);
    throw new Error(`Error in finding a product using array of product id: ${err}`);
  }
};

module.exports = {
  createproduct,
  findproduct,
  updateproduct,
  getAllproducts,
  getArrayproducts
};
