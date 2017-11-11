'use strict';

var app = app || {};

(function(module) {
  const adminView = {};

  adminView.initAdminPage = function(ctx) {
    $('.container').hide();
    $('.admin-view').show();
    $('#admin-form').on('submit', function(event) {
      event.preventDefault();
      if(event.target.password.value !== module.bookView.TOKEN){
        $('#incorrect').text('ACCESS DENIED');
      } else {
        adminView.login = event.target.password.value;
        module.bookView.initDetailPage(ctx);
      }
    })
  };

  module.adminView = adminView;
})(app)
