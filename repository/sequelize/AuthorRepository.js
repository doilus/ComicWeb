const Comics = require("../../model/sequelize/Comics");
const AuthorComics = require("../../model/sequelize/AuthorComics");
const Author = require("../../model/sequelize/Author");

const authUtils = require('../../util/authUtils');



exports.getAuthor = () => {
    return Author.findAll();
};

exports.getAuthorById = (autId) => {
    return Author.findByPk(autId,
        {
            include: [{
                model: AuthorComics,
                as: 'authorcomics',
                include: [{
                    model: Comics,
                    as: 'comics'
                }]
            }]
        });
};

exports.findBySurname = (surname) => {
    return Author.findOne({
        where: {surname: surname}
    });
};

exports.createAuthor = (newAuthorData) => {
var date = Date.parse(newAuthorData.deathDate);
if(!date){
    date = null;
}
    return Author.create({
        firstName: newAuthorData.firstName,
        surname: newAuthorData.surname,
        birthDate: newAuthorData.birthDate,
        deathDate: date,
        country: newAuthorData.country,
        password: authUtils.hashPassword(newAuthorData.password)
    });
};

exports.updateAuthor = (autId, newAuthorData) => {
var date = Date.parse(newAuthorData.deathDate);
if(!date){
    date = null;
}
    console.log(newAuthorData);
    return Author.update({
        firstName: newAuthorData.firstName,
        surname: newAuthorData.surname,
        birthDate: newAuthorData.birthDate,
        deathDate: date,
        country: newAuthorData.country,
        password: authUtils.hashPassword(newAuthorData.password)
    }, {where: {_id: autId }});
};

exports.deleteAuthor = (autId) => {
    return Author.destroy({
        where: { _id: autId }
    });

}; 
 
