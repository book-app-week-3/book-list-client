'use strict';

var app = app || {};

(function(module) {
  $('.icon-menu').on('click', function(event) { // eslint-disable-line
    $('.nav-menu').slideToggle(350);
  })

  function resetView() {
    $('.container').hide();
    $('.nav-menu').slideUp(350);
  }

  const bookView = {};

  bookView.initIndexPage = function(ctx) { // eslint-disable-line
    resetView();
    $('.book-view').show();
    $('#book-list').empty();
    module.Book.all.map(book => {
      $('#book-list').append(book.toHtml());
    })
  }

  bookView.initDetailPage = function(ctx) {
    resetView();
    $('.detail-view').show();
    $('.book-details').empty();
    let template = Handlebars.compile($('#book-detail-template').text());
    $('.book-details').append(template(ctx));
    $('#update-button').on('submit', function(event) {
      event.preventDefault();

      bookView.updateHandler();
    })
  }

  bookView.updateHandler = function(ctx) { // eslint-disable-line
    resetView();
    $('.update-view').show();
    $('#update-button').on('submit', function(event){
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
      app.Book.update(book);
    })
  }

  bookView.initCreateFormPage = function() {
    resetView();
    $('.create-view').show();
    $('#create-form').on('submit', function(event) {
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
      module.Book.create(book);
    })
  }

  bookView.initUpdateFormPage = function(ctx) {
    resetView();
    $('.update-view').show();
    $('#update-form').on('submit', function(event){
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
      module.Book.update(ctx, book);
    })
  }

  module.bookView = bookView;

})(app)

$(function () {
  app.Book.fetchAll(app.bookView.initIndexPage);
})
