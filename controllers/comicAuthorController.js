 const ComicsRepository = require('../repository/sequelize/ComicsRepository');
 const AuthorRepository = require('../repository/sequelize/AuthorRepository');
 const AuthorComicsRepository = require('../repository/sequelize/AuthorComicsRepository');

exports.showComicsAuthorList = (req, res, next) => {
    AuthorComicsRepository.getAuthorComics()
        .then(autcom => {
            res.render('pages/comic-author/comics-authors-list', {
                autcom: autcom,
                navLocation: 'comic-author'
            });
        });
}

exports.showAddComicsAuthorForm = (req, res, next) => {
    let allComics, allAuthor;
    ComicsRepository.getComics()
        .then(com => {
            allComics = com;
            return AuthorRepository.getAuthor();
        })
        .then(aut => {
            allAuthor = aut;
            res.render('pages/comic-author/comic-authors-form', {
                autcom: {},
                allComics: allComics,
                allAuthor : allAuthor,
                formMode: 'createNew',
                pageTitle: req.__('comic-author.form.title'),
                btnLabel: req.__('comic-author.form.btn'),
                formAction: '/comic-author/add',
                navLocation: 'comic-author',
                validationErrors: []
            });
        });
}

exports.showEditComicsAuthorForm = (req, res, next) => {
const autcom = req.params.autcom;
let allComics, allAuthor;
ComicsRepository.getComics()
.then(com => {
    allComics = com;
    return AuthorRepository.getAuthor();
})
.then(aut => {
    allAuthor = aut;
    return AuthorComicsRepository.getAuthorComicsById(autcom)
})
.then(autcom => {
        res.render('pages/comic-author/comic-authors-form', {
                autcom: autcom,
                allComics: allComics,
                allAuthor: allAuthor,
                formMode: 'edit',
                pageTitle: req.__('comic-author.form.titleEdit'),
                btnLabel: req.__('comic-author.form.btnEdit'),
                formAction: '/comic-author/edit',
                navLocation: 'comic-author',
                validationErrors: []
        });
});
           
}

exports.showComicsAuthorDetails = (req, res, next) => {
const autcom = req.params.autcom;
AuthorComicsRepository.getAuthorComicsById(autcom)
.then(autcom => {
        res.render('pages/comic-author/comic-authors-form', {
                autcom: autcom,
                allComics: {},
                allAuthor: {},
                formMode: 'showDetails',
                pageTitle: req.__('comic-author.form.details'),
                btnLabel: req.__('comic-author.form.details'),
                formAction: '/comic-author/details',
                navLocation: 'comic-author',
                validationErrors: []
        });
});
}

exports.addComicsAuthor = (req, res, next) => {
  const autcomData = { ...req.body };
  let allComics, allAuthor;
  ComicsRepository.getComics()
  .then(com => {
    allComics = com;
    return AuthorRepository.getAuthor();
  })
  .then(aut => {
    allAuthor = aut;
    return AuthorComicsRepository.createAuthorComics(autcomData)
  })
        .then( result => {
            res.redirect('/comic-author');  
        })
        .catch(err => {
            res.render('pages/comic-author/comic-authors-form', {
                autcom: autcomData,
                allComics: allComics,
                allAuthor: allAuthor,
                formMode: 'createNew',
                pageTitle: req.__('comic-author.form.title'),
                btnLabel: req.__('comic-author.form.btn'),
                formAction: '/comic-author/add',
                navLocation: 'comic-author',
                validationErrors: err.errors
            });
        })
};

exports.updateComicsAuthor = (req, res, next) => {
    const autcom = req.body._id;
    const autcomData = { ...req.body };
    let allComics, allAuthor;
    ComicsRepository.getComics()
    .then(com => {
        allComics = com;
        return AuthorRepository.getAuthor();
    })
    .then(aut => {
        allAuthor = aut;
        return AuthorComicsRepository.updateAuthorComics(autcom, autcomData);
    })
    .then( result => {
        res.redirect('/comic-author');
    })
     .catch(err => {
            res.render('pages/comic-author/comic-authors-form', {
               autcom : autcomData,
                allComics: allComics,
                allAuthor: allAuthor,
                formMode: 'createNew',
                pageTitle: req.__('comic-author.form.titleEdit'),
                btnLabel: req.__('comic-author.form.btnEdit'),
                formAction: '/comic-author/edit',
                navLocation: 'comic-author',
                validationErrors: err.errors
            });
        })
};

exports.deleteComicsAuthor = (req, res, next) => {
    const autcom = req.params.autcom;
    AuthorComicsRepository.deleteAuthorComics(autcom)
    .then( () => {
        res.redirect('/comic-author');
    });
};