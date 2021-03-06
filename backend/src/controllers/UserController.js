const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secrets = require('../../../backend/secrets.json');

module.exports = {
    async create(request, response){
        const {username, password, user_type } = request.body;

        let user = await UserModel.findOne({username});

        if(!user){
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                // Store hash in your password DB.
                if (err) {
                    console.log(err);
                    return response.status(500);
                    //error on hashing
                } else {
                        user = await UserModel.create({
                            username,
                            password: hash,
                            user_type,
                        });

                        return response.status(201).json(user);
                    }
            });
            
        } else {
            //user already exists
            return response.status(409).send("User already exitst");
        }
    },

    async login(request, response){
        const {username, password } = request.body;

        let user = await UserModel.findOne({username});

        if(!user){
            return response.status(403).send('Wrong username or password');
        } else {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    console.log(err)
                    return response.status(500);
                } else {
                    if(result) {
                        jwt.sign(user.toJSON(),secrets.jwtRS256_private_key, {algorithm: 'RS256'}, (err, token) => {
                            if(err){
                                console.log(err)
                                return response.status(500);
                            } else {
                                return response.status(200).json({token})
                            }
                        })
                    } else {
                        return response.status(403).send('Wrong username or password');
                    }
                }
            });
        }
    }

}