module.exports = {

    user: (app, req, res, validationResult) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            app.utils.error.send( {errors: errors.array()}, req, res);
            return false 
            //if api caller return res.status(422).json({ errors: errors.array() });
            } 

    /* insert recieve two parameters => 
    err = if an error occour, for example, a register with the same ID.
    anwser = the awnser is the register on the database  */
        db.insert(req.body, (user) => {
    

                    return true 
                    //here everything is ok to proceed
                    //res.status(200).json({ user })
                    //to api caller  res.json({msg : "ok"}
            })
        }
    }