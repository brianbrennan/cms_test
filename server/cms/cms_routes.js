(function() {
    'use strict';

    var postTypes = require('./postTypes.mapping');

    module.exports = function(app, express) {
        var cmsRouter = express.Router();

        cmsRouter
            .route('/post-types')
            .get(function(req, res) {
                res.json({
                    postTypes: postTypes
                });
            });

        return cmsRouter;
    };
})();