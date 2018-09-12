const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const axios = require('axios')

module.exports = {

    register: function(req, res) {

        const salt = bcryptjs.genSaltSync(8);
        const hashPassword = bcryptjs.hashSync(req.body.password, salt);

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })
        .then((user) => {

            let userToken = jwt.sign({
                id: user._id,
                name: user.name,
                email: user.email
            },
                process.env.JWT
            );

            let data = {
                userId: user._id,
                name: user.name,
                email: user.email,
                token: userToken
            }

            res.status(200).json({
                message: 'register success !',
                data
            })
            
        })
        .catch((err) => {

            res.status(400).json({
                err
            })

        });
    },

    login: function(req, res) {

        User.findOne({
            email: req.body.email
        })
        .then((user) => {

            const checkPassword = bcryptjs.compareSync(
                req.body.password,
                user.password
            );

            if(checkPassword){

                let userToken = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                    process.env.JWT
                );
    
                let data = {
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    token: userToken
                }

                res.status(200).json({
                    message: 'login success !',
                    data
                })

            }else {

                res.status(200).json({
                    message: 'email or password is wrong !',
                })
            }

        })
        .catch((err) => {

            res.status(400).json({
                message: err.message
            })

        });
    },

    loginFacebook: function(req, res) {

        let authResponse = req.body;
        let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${
        authResponse.accessToken
        }`;

        axios
        .get(url_user_info)
        .then(user => {  

            User.findOne({ email: user.data.email })
            .then(userDB => {

                if (userDB === null) {
                    const salt = bcryptjs.genSaltSync(8);
                    const hashedPassword = bcryptjs.hashSync(user.data.id, salt);

                    User.create({
                        name: user.data.name,
                        email: user.data.email,
                        password: hashedPassword
                    })
                    .then(user => {
                        const userToken = jwt.sign({
                            id: user._id,
                            name: user.name,
                            email: user.email
                        },
                            process.env.JWT
                        );

                        let data = {
                            token: userToken,
                            userId: user._id,
                            name: user.name,
                            email: user.email
                        };
                        res.status(200).json({

                            message: "user successfully registered",
                            token: data.token,
                            data

                        });
                    });

                }else {

                    const checkPassword = bcryptjs.compareSync(
                        user.data.id,
                        userDB.password
                    );
            
                    if (checkPassword) {
                        const userToken = jwt.sign(
                        {
                            id: userDB._id,
                            name: userDB.name,
                            email: userDB.email
                        },
                            process.env.JWT_SECRET_KEY
                        );
            
                        let data = {
                            userId: userDB._id,
                            name: userDB.name,
                            email: userDB.email,
                            token: userToken
                        };
                        res.status(200).json({
                            message: "sign in success",
                            token: data.token,
                            data: data
                        });
                        
                    } else {

                        res.status(200).json({
                            message: 'email or password is wrong !',
                        })

                    }
                }
            });

        })
        .catch(err => {

            res.status(400).json({
                message: err.message
            });
            
        });
    }

}