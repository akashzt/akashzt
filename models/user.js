const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Users = sequelize.define(
    'Users', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: "UNIQUE"
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    firstName: {
      type: Sequelize.STRING(255),
      allowNull: true
    }, 
    lastName: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    profileImage: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue:'avatar.png'
    },
    Phone: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'user'
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'Users',
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
        name: "UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "INDEX_email",
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });

  module.exports = Users;