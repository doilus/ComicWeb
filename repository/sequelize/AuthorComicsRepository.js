const Sequelize = require('sequelize');

const AuthorComics = require('../../model/sequelize/AuthorComics');
const Comics = require('../../model/sequelize/Comics');
const Author = require('../../model/sequelize/Author');

exports.getAuthorComics = () => {
    return AuthorComics.findAll({include: [
        {
            model: Comics,
            as: 'comics'
        },
        {
            model: Author,
            as: 'author'
        }]
    });
};


exports.getAuthorComicsById = (autcomId) => {
    return AuthorComics.findByPk(autcomId, {include: [
            {
                model: Comics,
                as: 'comics'
            },
            {
                model: Author,
                as: 'author'
            }]
    });
};

exports.createAuthorComics = (data) => {
    console.log(JSON.stringify(data));

    return AuthorComics.create({
        comics_id: data.comics_id,
        author_id: data.author_id,
        role: data.role,
        country: data.country,
        percent: data.percent
    });
};

exports.updateAuthorComics = (autcomId, data) => {
    return AuthorComics.update(data, {where: {_id: autcomId }});
}

exports.deleteAuthorComics = (autcomId) => {
    return AuthorComics.destroy({
        where: { _id: autcomId }
    });
}

exports.deleteManyAuthorComics = (autcomId) => {
    return AuthorComicst.find({ _id: { [Sequelize.Op.in]: autcomId }})
}