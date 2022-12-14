'use strict';
module.exports = function(app) {
  let lakaCtrl = require('./controllers/LakaController');

  // Laka
  app.route('/message/sent')
    .get(lakaCtrl.get)
    .post(lakaCtrl.store);
};