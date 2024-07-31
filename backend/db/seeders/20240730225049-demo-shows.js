'use strict';

const {Show} = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Show.bulkCreate([
      {
      venue: 'Hoots',
      ownerId: 1,
      lat: 90,
      lng: 90,
      dateTime: new Date(),
      image: 'some.url'
    },
    {
      venue: 'Hoots',
      ownerId: 1,
      lat: 90,
      lng: 90,
      dateTime: new Date(),
      image: 'some.url'
    },
    {
      venue: 'Hoots',
      ownerId: 1,
      lat: 90,
      lng: 90,
      dateTime: new Date(),
      image: 'some.url'
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Shows";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {}
    );
  }
};
