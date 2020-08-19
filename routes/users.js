let NeDB = require('nedb')
let db = new NeDB({
    filename: 'users.db',
    autoload: true

})

module.exports = (app) => {    

    
    const { check, validationResult } = require('express-validator');
    let route = app.route('/users')

    route.get((req, res) => {

        db.find({}).sort({name:1}).exec((err, users) => {

            if(err){
                app.utils.error.send(err, req, res)
            } else {
                res.statusCode = 200 
                res.setHeader('Content-Type', 'application/json')
                res.json({
                    users 
                })
            } 

        })
    })
    
    
//just pass the checking as middleware not in the callback
//see here I've just passed an array for checking as middleware
// as the middleware is an array therefore you can add multiple checks in the array
route.post([
    check('name', "nome vazio!").notEmpty(),
    check('email', "email inválido!").notEmpty().isEmail()

], (req, res) => {

    if (!app.utils.validator.user(app, req, res, validationResult)) return false 

})

    
    let routeId = app.route('/users/:id')


    routeId.get((req, res) => {
        /* request.params.id take the id from the user passed as a parameter*/
        db.findOne({_id:req.params.id}).exec((err, user) => {

            if (err) {
                app.utils.error.send(err, req, res)
            } else {
                res.status(200).json(user)
            }
 
        })
    })

    routeId.put((req, res) => {

        if (!app.utils.validator.user(app, req, res, validationResult)) return false 

        /* request.params.id take the id from the user passed as a parameter */
        db.update({_id:req.params.id}, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res)
            } else {
                res.status(200).json(Object.assign(req.params, req.body))
            }
        })
    })

    routeId.delete((req, res) => {

        db.remove({_id:req.params.id}, {}, err => {

            if (err) {
                app.utils.error.send(err, req, res)
            } else {
                res.status(200).json(req.params)
            }

        })
    })
}




