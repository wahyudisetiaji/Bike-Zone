const Cart = require('../models/cart')
const User = require('../models/user')
module.exports = {

    createCart: function(req, res) {

        User.findOne({email: req.user.email})
        .then((result) => {
            if(result) {
                let dataItem = [];
                req.body.listItem.forEach(element => {
                    dataItem.push(element._id)
                });

                Cart.create({
                    customer: result._id,
                    listItem: dataItem,
                    total: req.body.total
                })
                .then((result) => {
                    res.status(200).json({
                        message: 'create cart success !',
                        result
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });
            } else {
                res.status(400).json({
                    message: err.message
                })
            }
        }).catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
        

    },

    allCart: function(req, res) {

        User.findOne({email: req.user.email})
        .then((result) => {
            if(result){

                Cart.find({customer: req.user.id})
                .populate('customer')
                .populate('listItem')
                .then((result) => {
                    res.status(200).json({
                        message: 'data cart',
                        result
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });
            }else {
                res.status(400).json({
                    message: err.message
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
       
    }
}