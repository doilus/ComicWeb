const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Author = sequelize.define('Author', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
           notEmpty: {
               msg: 'aut.form.add.pageTitle',
           },
           len: {
               args: [2,60],
               msg: "Pole powinno zawiera� od 2 do 90 znak�w"
           }
       }
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           len: {
               args: [2,60],
               msg: "Pole powinno zawiera� od 2 do 90 znak�w"
           }
       }
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           checkDate(value) {
            let nowDate = new Date(),
	        day = '' + nowDate.getDate(),
            month = '' + (nowDate.getMonth() + 1),
            year = nowDate.getFullYear();

            if (month.length < 2){
            month = '0' + month;}
	        if (day.length < 2)
            day = '0' + day;
	        const nowString = [year, month, day].join('-');

            const compareToDate = new Date(nowString);
            const valueDate = new Date(value);
            if(valueDate.getTime() > compareToDate.getTime()){
                throw new Error('Nie moze byc z przyszlosci');
            }
           }
        }
    },
    deathDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
        checkDate(value) {
            let nowDate = new Date(),
	        day = '' + nowDate.getDate(),
            month = '' + (nowDate.getMonth() + 1),
            year = nowDate.getFullYear();

            if (month.length < 2){
            month = '0' + month;}
	        if (day.length < 2)
            day = '0' + day;
	        const nowString = [year, month, day].join('-');

            const compareToDate = new Date(nowString);
            const valueDate = new Date(value);
            if(valueDate.getTime() > compareToDate.getTime()){
                throw new Error('Nie moze byc z przyszlosci');
            }
            },
            checkDateDeath(value) {
            if(value != null){
            const birthDate = this.birthDate;
            const compareToDate = new Date(birthDate);
            const valueDate = new Date(value);
            if(valueDate.getTime() < compareToDate.getTime()){
                throw new Error('Data pusi byc po urodzeniu');
            }
           }}
        }
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
         validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           },
           len: {
               args: [2,60],
               msg: "Pole powinno zawiera� od 2 do 60 znak�w"
           },
       }
    },
    password: {
       type: Sequelize.STRING,
        allowNull: false,
        validate: {
           notEmpty: {
               msg: "Pole jest wymagane"
           }
           }
    }
});

module.exports = Author;