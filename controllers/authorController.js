const AuthorRepository = require('../repository/sequelize/AuthorRepository');


exports.showAuthorList = (req, res, next) => {
     AuthorRepository.getAuthor()
        .then(aut => {
            res.render('pages/authors/authors-list', {
                aut: aut,
                navLocation: 'authors',
                validationErrors: []
            });
        });
}

exports.showAddAuthorForm = (req, res, next) => {
    res.render('pages/authors/authors-form', {
        aut: {},
        pageTitle: req.__('aut.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('aut.form.add.btnLabel'),
        formAction: '/authors/add',
        navLocation: 'authors',
        validationErrors: []

    });
}

exports.showEditAuthorForm = (req, res, next) => {
    const autId = req.params.autId;
    
    AuthorRepository.getAuthorById(autId)
        .then(aut => {
            
            res.render('pages/authors/authors-form', {
                aut: aut,
                formMode: 'edit',
                pageTitle: req.__('aut.form.edit.pageTitle'),
                btnLabel: req.__('aut.form.edit.btnLabel'),
                formAction: '/authors/edit',
                navLocation: 'authors',
                validationErrors: []
            });
        });
};

exports.showAuthorDetails = (req, res, next) => {
    const autId = req.params.autId;
    AuthorRepository.getAuthorById(autId)
        .then(aut => {
            res.render('pages/authors/authors-form', {
                aut: aut,
                formMode: 'showDetails',
                pageTitle:  req.__('aut.fields.details'),
                formAction: '',
                navLocation: 'authors',
                validationErrors: []
            });
        })
}

exports.addAuthor = (req, res, next) => {
     const autData = { ...req.body };
        AuthorRepository.createAuthor(autData)
            .then( result => {
                res.redirect('/authors');
            })
            .catch(err => {
            res.render('pages/authors/authors-form', {
                aut: autData,
                pageTitle: req.__('aut.form.edit.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('aut.form.add.btnLabel'),
                formAction: '/authors/add',
                navLocation: 'authors',
                validationErrors: err.errors
            });
            })
};

exports.updateAuthor = (req, res, next) => {
    const autId = req.body._id;
    const autData = { ...req.body };
    
    AuthorRepository.updateAuthor(autId, autData)
        .then( result => {
            res.redirect('/authors');
    })
     .catch(err => {
            res.render('pages/authors/authors-form', {
                aut: autData,
                formMode: 'createNew',
                pageTitle: req.__('aut.form.edit.pageTitle'),
                btnLabel: req.__('aut.form.edit.btnLabel'),
                formAction: '/authors/edit',
                navLocation: 'authors',
                validationErrors: err.errors
            });
            })
};

exports.deleteAuthor = (req, res, next) => {
    const autId = req.params.autId;
    AuthorRepository.deleteAuthor(autId)
    .then( () => {
        res.redirect('/authors');
    });
};