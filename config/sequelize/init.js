//zdefiniowane relacje pomiędzy tabelami
//zainicjowana instancja mappera, ktora bedzie uzywana w naszych repo
//wymuszenie synchronizacji modelu ze schematem bazy danych
//wstawienie przykladowych danych

const sequelize = require('./sequelize');

const Comics = require('../../model/sequelize/Comics');
const Author= require('../../model/sequelize/Author');
const AuthorComics = require('../../model/sequelize/AuthorComics');
const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Comics.hasMany(AuthorComics, {as: 'authorcomics', foreignKey: {name: 'comics_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    AuthorComics.belongsTo(Comics, {as: 'comics', foreignKey: {name: 'comics_id', allowNull: false} } );
    Author.hasMany(AuthorComics, {as: 'authorcomics', foreignKey: {name: 'author_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    AuthorComics.belongsTo(Author, {as: 'author', foreignKey: {name: 'author_id', allowNull: false} });

    let allComics, allAuthor;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Comics.findAll();
        })
        .then(com => {
            if( !com || com.length == 0 ) {
                return Comics.bulkCreate([
                    {title: 'Y-Ostatni z mężczyzn tom I', releaseDate: 2008, pages: 264, publishingHouse: 'Egmont', password: passHash},
                    {title: 'Y-Ostatni z mężczyzn tom II', releaseDate: 2009, pages: 312, publishingHouse: 'Egmont', password: passHash},
                    {title: 'Y-Ostatni z mężczyzn tom III', releaseDate: 2010, pages: 312, publishingHouse: 'Egmont', password: passHash}           
                ])
                .then( () => {
                    return Comics.findAll();
                });
            } else {
                return com;
            }
        })
        .then( com => {
            allComics = com;
            return Author.findAll();
        })
        .then( aut => {
            if( !aut || aut.length == 0 ) {
                return Author.bulkCreate([
                    { firstName: 'Brian', surname: 'K. Vaughan', birthDate: '1976-07-17', deathDate: null, country: 'USA', password: passHash },
                    { firstName: 'Pia', surname: 'Guerra', birthDate: '1971-12-02', deathDate: null, country: 'USA', password: passHash  },
                    { firstName: 'Marzan', surname: 'Jr.Jose', birthDate: '1966-09-01', deathDate: null, country: 'USA', password: passHash  }
                ])
                .then( () => {
                    return Comics.findAll();
                });
            } else {
                return aut;
            }
        })
        .then( aut => {
            allAuthor = aut;
            return AuthorComics.findAll();
        })
        .then( autcom => {
            if( !autcom || autcom.length == 0 ) {
                return AuthorComics.bulkCreate([
                    {comics_id: allComics[0]._id, author_id: allAuthor[0]._id, role: 'Scenarzysta', country: null, percent: 40},
                    {comics_id: allComics[0]._id, author_id: allAuthor[1]._id, role: 'Ilustrator', country: null, percent: 40},
                    {comics_id: allComics[0]._id, author_id: allAuthor[2]._id, role: 'Tusz', country: null, percent: 10},
                    {comics_id: allComics[1]._id, author_id: allAuthor[0]._id, role: 'Scenarzysta', country: null, percent: 40},
                    {comics_id: allComics[2]._id, author_id: allAuthor[2]._id, role: 'Ilustrator', country: null, percent: 40}
                ]);
            } else {
                return autcom;
            }
        });
};