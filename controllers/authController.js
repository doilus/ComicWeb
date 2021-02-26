const AuthorRepository = require('../repository/sequelize/AuthorRepository');
const authUtil = require('../util/authUtils');




exports.login = (req, res, next) => {
    const surname = req.body.surname;
    const password = req.body.password;
    AuthorRepository.findBySurname(surname)
        .then(aut => {
            if(!aut) {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('validationMessage.loginErr')
                })
            } else if(authUtil.comparePasswords(password, aut.password) === true) {
                req.session.loggedUser = aut; //po porawnym uwierzytelnieniu zapisujemy dane zalogowanego uzytkownika w sesji
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('validationMessage.loginErr')
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => { //usuwa dane uzytkownika z sesji
    req.session.loggedUser = undefined;
    res.redirect('/');
}