const db = require("../../models/user");
const constants = require("../../constants/constants");
const logger = require('../../lib/logger') 
const Sequelize=require('sequelize');

createUser = async function (opts) {
  try {
    const user = await db.create(opts);
    return user ? user.dataValues : null;
  } catch (err) {
    logger.info(`Error in creating user db query: ${err.message}`);
    throw new Error(`Error in creating User`);
  }
};

findUser = async function (opts) {
  console.log(opts);
  const user = await db.findOne(
    { where: { userId: opts.userId || opts } });
  return user ? user.dataValues : user;
};

getUserByEmail = async function (email) {
  const user = (await db.findOne({ where: { email } }));
  return (user ? user.dataValues : null);
};

updateUser = async function (userId, user) {
  await db.update(user, { where: { userId: userId } });
  const updatedUser = (await db.findOne({
    where: { userId }
  }));
  return (updatedUser ? updatedUser.dataValues : null);
};
getAllUsers = async function (opts) {
  return db.findAll({
    limit: opts.limit,
    offset: opts.limit * (opts.page - constants.Numbers.one),
    order: [["createdAt", "DESC"]],
    attributes: opts.userProfileFields,
  });
};

getArrayUsers = async function (opts) {
  try {
   return db.findAll({
      where: { userId: { [Sequelize.Op.in]: opts } },
      attributes: ['email','userId'],
      raw: true
    });
  } catch (err) {
    logger.info(`Error in finding user email db query: ${err.message}`);
    throw new Error(`Error in finding a user using array of user id: ${err}`);
  }
};

module.exports = {
  createUser,
  findUser,
  getUserByEmail,
  updateUser,
  getAllUsers,
  getArrayUsers
};
