 const ComicsRepository = require('../repository/sequelize/ComicsRepository');

exports.showComicsList = (req, res, next) => {
  ComicsRepository.getComics()
        .then(com => {
            res.render('pages/comics/comics-list', {
                com: com,
                navLocation: 'comics'
              
            });
        });
}

exports.showAddComicsForm = (req, res, next) => {
    res.render('pages/comics/comics-form', {
        com: {},
        pageTitle: req.__('comics.form.title'),
        formMode: 'createNew',
        btnLabel: req.__('comics.form.btn'),
        formAction: '/comics/add',
        navLocation: 'comics',
        validationErrors: []
        
    });
}


exports.showEditComicsForm = (req, res, next) => {
    const comId = req.params.comId;
    ComicsRepository.getComicsById(comId)
        .then(com => {
            res.render('pages/comics/comics-form', {
                com: com,
                formMode: 'edit',
                pageTitle: req.__('comics.form.titleEdit'),
                btnLabel: req.__('comics.form.btnEdit'),
                formAction: '/comics/edit',
                navLocation: 'comics',
                validationErrors: []
               
            });
        });
};

exports.showComicsDetails = (req, res, next) => {
    const comId = req.params.comId;
    ComicsRepository.getComicsById(comId)
        .then(com => {
            res.render('pages/comics/comics-form', {
                com: com,
                formMode: 'showDetails',
                pageTitle: req.__('comics.form.details'),
                formAction: '',
                navLocation: 'comics',
                validationErrors: []
                
            });
        });
}

exports.addComics = (req, res, next) => {
    const comData = { ...req.body };
    ComicsRepository.createComics(comData)
        .then( result => {
            res.redirect('/comics');
        })
        .catch(err => {
            res.render('pages/comics/comics-form', {
                com: comData,
                pageTitle: req.__('comics.form.title'),
                formMode: 'createNew',
                btnLabel: req.__('comics.form.btn'),
                formAction: '/comics/add',
                navLocation: 'comics',
                validationErrors: err.errors
            });
        });
};

exports.updateComics = (req, res, next) => {
    const comId = req.body._id;
    const comData = { ...req.body };
    ComicsRepository.updateComics(comId, comData)
        .then( result => {
            res.redirect('/comics');
    })
     .catch(err => {
            res.render('pages/comics/comics-form', {
                com: comData,
                pageTitle: req.__('comics.form.titleEdit'),
                formMode: 'createNew',
                btnLabel: req.__('comics.form.btnEdit'),
                formAction: '/comics/edit',
                navLocation: 'comics',
                validationErrors: err.errors
            });
        });
};

exports.deleteComics = (req, res, next) => {
    const comId = req.params.comId;
    ComicsRepository.deleteComics(comId)
    .then( () => {
        res.redirect('/comics');
    });
};