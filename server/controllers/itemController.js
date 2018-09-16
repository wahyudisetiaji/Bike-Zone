const Item = require('../models/item')
const User = require('../models/user')

module.exports = {

    createItem: function(req, res) {

        User.findOne({email: req.user.email})
        .then((result) => {
            if(result) {
                Item.create({
                    itemName: req.body.itemName,
                    description: req.body.description,
                    image: req.body.image,
                    stock: req.body.stock,
                    price: req.body.price,
                    category: req.body.category
                })
                .then((item) => {
        
                    res.status(200).json({
                        message: 'create item success !',
                        item
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
        })
        .catch((err) => {

            res.status(400).json({
                message: err.message
            })

        });
        
    },

    deleteItem: function(req, res) {

        User.findOne({email: req.user.email})
        .then((result) => {
            if(result) {
                Item.deleteOne({
                    _id: req.params.id
                })
                .then((item) => {
        
                    res.status(200).json({
                        message: 'delete item success !',
                        item
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
        })
        .catch((err) => {

            res.status(400).json({
                message: err.message
            })

        });
        
    },

    editItem: function(req, res) {

        User.findOne({email: req.user.email})
        .then((result) => {
            if(result) {
                Item.updateOne(
                    {_id: req.params.id},
                    { $set:
                        {
                            itemName: req.body.itemName,
                            description: req.body.description,
                            image: req.body.image,
                            stock: req.body.stock,
                            price: req.body.price,
                            category: req.body.category
                        }
                    })
                    .then((item) => {
            
                        res.status(200).json({
                            message: 'edit item success !',
                            item
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
        })
        .catch((err) => {
            
            res.status(400).json({
                message: err.message
            })

        });
        

    },

    allItem: function(req, res) {

        Item.find({})
        .then((item) => {

            res.status(200).json({
                message: 'data all item !',
                item
            })

        })
        .catch((err) => {
            
            res.status(400).json({
                message: err.message
            })

        });

    },

    searchItem: function(req, res) {
        let valueSearch = req.params.name
        Item.find({})
        .then((item) => {
 
            let items = []
            item.forEach(element => {
                if(element.itemName.toLowerCase().indexOf(valueSearch.toLowerCase()) > -1 ) {
                    items.push(element)
                    
                }
            });
            console.log(items);
            
            res.status(200).json({
                message: 'data search item !',
                items
            })

        })
        .catch((err) => {
            
            res.status(400).json({
                message: err.message
            })

        });

    },

    categoryItem: function(req, res) {

        Item.find({category: req.params.category})
        .then((item) => {

            res.status(200).json({
                message: 'data category !',
                item
            })

        })
        .catch((err) => {
            
            res.status(400).json({
                message: err.message
            })

        });

    }

}