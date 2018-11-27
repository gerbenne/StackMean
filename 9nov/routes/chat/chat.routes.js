/*
Imports
*/
const express = require('express');
const chatRouter = express.Router({ mergeParams: true });
const { message } = require('./chat.controller');
//

/*
Routes definition
*/
class ChatRouterClass {
    routes(){
        // HATEOAS
        authRouter.get('/', (req, res) => {
            res.json('HATEOAS for chat');
        });

        //Message
        authRouter.post('/chat', (req, res) => {
            // Use controller function
            message(req.body)
            .then( apiResponse => res.json(apiResponse) )
            .catch( apiResponse => res.json(apiResponse) )
        });

    };

    init(){
        this.routes();
        return chatRouter;
    }
}
//

/*
Export
*/
module.exports = ChatRouterClass;
//