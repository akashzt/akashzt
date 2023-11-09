const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define(
    'Product', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    productName: {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: "UNIQUE"
    },
    quantity: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    price: {
      type: Sequelize.DECIMAL(7, 2),
      allowNull: true
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'Product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FOREIGNINDEX_Product_userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      }
    ]
  });

  module.exports = Product;