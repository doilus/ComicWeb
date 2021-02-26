const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Comics = sequelize.define('Comics', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true,
   },
   title: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           len: {
               args: [2,90],
               msg: "Pole powinno zawieraæ od 2 do 90 znaków"
           }
       }
   },
   releaseDate: {
       type: Sequelize.DECIMAL(10,0),
       allowNull: true,
        validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
         max: 2021,
         min: 1000
       }
   },
   pages: {
       type: Sequelize.DECIMAL(10,0),
       allowNull: true,
       validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           min: 1
           }

   },
   publishingHouse: {
       type: Sequelize.STRING,
       allowNull: true,
        validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           len: {
               args: [2,60],
               msg: "Pole powinno zawieraæ od 2 do 60 znaków"
           },
       }
   }
});

module.exports = Comics;