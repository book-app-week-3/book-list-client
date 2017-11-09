'use strict';

var app = app || {};

(function(module){

  let errorView = {};

  errorView.initErrorPage = function(err){
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();
    let template = Handlebars.compile($('#error-template').text());
    $('#error-message').append(err);
    return template(this);
  }

  module.errorView = errorView;

})(app)
