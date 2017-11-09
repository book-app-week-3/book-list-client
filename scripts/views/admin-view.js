'use strict';

var app = app || {};
var __API_URL__ = 'http://localhost:3000';

(function(module) {
  const adminView = {};

  adminView.initAdminPage = function() {
    $('.container').hide();
    $('.admin-view').show();
    $('#admin-form').on('submit', function(event) {
      event.preventDefault();
      let token = event.target.passphrase.value;

      $.get(`${__API_URL__}/admin`, {token})
        .then(() => {
          localStorage.token = true;
          page('/books/new');
        })
        .catch(() => page('/'));
    })
  };

  adminView.verify = function(ctx, next) {
    if(!localStorage.token) $('.admin').hide();
    if(!localStorage.token) console.log('no token')
    else console.log('token');
    next();
  }

  module.adminView = adminView;
})(app)
