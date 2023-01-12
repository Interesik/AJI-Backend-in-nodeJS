const Category = require('../models/category');

exports.getAll = (req, res) => {
    Category.getAll().then(
        function(allCategories) {
            console.log(allCategories);
            res.status(200).json(allCategories);
        }
    );
    //res.json(products);
};