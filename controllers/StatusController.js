const Status = require('../models/status');

exports.getAll = (req, res) => {
    Status.getAll().then(
        function(allStatus) {
            console.log(allStatus);
            res.json(allStatus);
        }
    );
    //res.json(products);
};