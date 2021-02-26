const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const AuthorComics = sequelize.define('AuthorComics', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   role: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           len: {
               args: [2,60],
               msg: "Pole powinno zawieraæ od 2 do 60 znaków"
           }
       }
   },
   country: {
       type: Sequelize.STRING,
       allowNull: true,
       validate: {
        len: {
               args: [0,90],
               msg: "Pole powinno zawieraæ od 2 do 90 znaków"
           }
       
       }
       
   },
   percent: {
       type: Sequelize.DECIMAL(10,2),
       allowNull: false,
        validate: {
        notEmpty: {
               msg: "Pole jest wymagane"
           },
           checkSize(value){
            if(value < 0 || value > 100){
                throw new Error("Pole powinno zawierac procent od 0 do 100");
            }
           }

        
       }
   },
   comics_id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           }
          
       }
   },
   author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           }
          
       }
   }
});

module.exports = AuthorComics;