/*
Import
*/
const UserModel = require('../../models/user.model');
//

/*
Functions
*/
const message = body => {
    // Search for user
    return new Promise( (resolve, reject) => {

        UserModel.findOne({ message: body.message }, (error, user) => {
            if(error){ // Mongo Error
                return reject(error)
            }
            else if(user){ // User already exist
                return reject(user)
            }
            else{ 
                bcrypt.hash(body.password, 10)
                .then( hashedPassword => {
                    console.log(hashedPassword)
                    // Replace clear password
                    body.password = hashedPassword;

                    // Save user
                    UserModel.create(body, (error, newUser) => {
                        if(error){ // Mongo error
                            return reject(error)
                        }
                        else{ // User registrated
                            return resolve(newUser);
                        };
                    });
                })
                .catch( hashError => {
                    console.log('error', hashError)
                    return reject(hashError);
                });
            };
        });
    });
};

/*
Export
*/
module.exports = {
    message
}
//