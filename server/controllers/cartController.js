const Cart = require('../models/cart')
const User = require('../models/user')
const nodemailer = require("nodemailer");
require("dotenv").config();

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
                    var transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                          user: "bikezone.id@gmail.com",
                          pass: `${process.env.PASS_EMAIL}`
                        }
                      });
            
                      const mailOptions = {
                        from: `bikezone.id@gmail.com`,
                        to: req.user.email, 
                        subject: "My History - Transaction (BIKE-ZONE)", 
                        html:
                          `
                          <p>Congrats ${req.user.name}, your cart is done with id ${result._id}</p>
                          <p>Total transaction : Rp. ${req.body.total.toLocaleString()}</p>
                          `
                      };
            
                      transporter.sendMail(mailOptions, function(err, info) {
                        if (err)
                          res.status(400).json({
                            message: err.message
                          });
                        else
                          res.status(200).json({
                            message: `email has been sent! your todo is done`
                          });
                      });
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