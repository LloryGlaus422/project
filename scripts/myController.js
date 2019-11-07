const Item = require('./model.js');

module.exports.create = (req, res) => {

    const newItem = new Item({
        item: req.body.item,
        quantity: req.body.quantity,
        priority: req.body.priority
    });

    newItem.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error!"
            });
        });
};


exports.findAll = (req, res) => {
    Item.find()
        .then(items => {
            res.send(items);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error!"
            });
        });
};


exports.findOne = (req, res, id) => {
    Item.findByIdAndUpdate(id)
        .then(items => {
            if (!items) {
                return res.status(404).send({
                    message: "Can't find " + id
                });
            }
            res.send(items);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Can't find " + id
                });
            }
            return res.status(500).send({
                message: "Error to retrieve " + id
            });
        });
};

exports.update = (req, res, id) => {

    
    Item.findByIdAndUpdate(id, {
        item: req.body.item,
        quantity: req.body.quantity,
        priority: req.body.priority
    }, { new: true })
        .then(items => {
            if (!items) {
                return res.status(404).send({
                    message: "Can't find " + id
                });
            }
            res.send(items);
        }).catch( err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Can't find " + id
                });
            }
            return res.status(500).send({
                message: "Error updating " + id
            });
        });

    
};

exports.delete = (req, res, id) => {
    Item.findByIdAndRemove(id)
        .then(items => {
            if (!items) {
                return res.status(404).send({
                    message: "Can't find " + id
                });
            }
            res.send({ message: "Deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Can't find  " + id
                });
            }
            return res.status(500).send({
                message: "Can't find " + id
            });
        });
};
