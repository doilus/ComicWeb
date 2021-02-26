const Comics = require("../../model/sequelize/Comics");
const AuthorComics = require("../../model/sequelize/AuthorComics");
const Author = require("../../model/sequelize/Author");


exports.getComics = () => {
    return Comics.findAll();
};

exports.getComicsById = (comId) => {
    return Comics.findByPk(comId,
        {
            include: [{
                model: AuthorComics,
                as: 'authorcomics',
                include: [{
                    model: Author,
                    as: 'author'
                }]
            }]
        });
};

exports.createComics = (newComicsData) => {
    return Comics.create({
        title: newComicsData.title,
        releaseDate: newComicsData.releaseDate,
        pages: newComicsData.pages,
        publishingHouse: newComicsData.publishingHouse
    });
};

exports.updateComics = (comId, comicsData) => {
    const title = comicsData.title;
    const releaseDate = comicsData.releaseDate;
    const pages = comicsData.pages;
    const publishingHouse = comicsData.publishingHouse;
    return Comics.update(comicsData, {where: {_id: comId }});
};

exports.deleteComics = (comId) => {
    return Comics.destroy({
        where: { _id: comId }
    });

}; 