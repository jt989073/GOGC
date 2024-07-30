"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "Braden23kane@gmail.com",
          username: "BradDrums23",
          firstName: "Braden",
          lastName: "Barrow",
          bandMember: true,
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "Patt.man1002@gmail.com",
          username: "TaylorSings12",
          firstName: "Taylor",
          lastName: "Patterson",
          bandMember: true,
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "jerredtibbets@yahoo.com",
          username: "JerredStrums12",
          firstName: "Jerred",
          lastName: "Tibbets",
          bandMember: true,
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "gfithen5@gmail.com",
          username: "grantShreds12",
          firstName: "Grant",
          lastName: "Fithen",
          bandMember: true,
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "TaylorSings12",
            "JerredStrums12",
            "BradDrums23",
            "grantShreds12",
          ],
        },
      },
      {}
    );
  },
};
