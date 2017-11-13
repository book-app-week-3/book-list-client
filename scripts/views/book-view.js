'use strict';

var app = app || {};

(function(module) {
  $('.icon-menu').off().on('click', function(event) { // eslint-disable-line
    $('.nav-menu').slideToggle(350);
  })

  function resetView() {
    $('.container').hide();
    $('.nav-menu').slideUp(350);
  }

  const bookView = {};
  bookView.TOKEN = '8282';

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
    $('#update-button').off().on('click', function() {
      if (module.adminView.login === bookView.TOKEN){
        bookView.initUpdateFormPage(ctx);
      } else {
        module.adminView.initAdminPage(ctx);
      }
    })
    $('#delete-button').off().on('click', function(){
      if (module.adminView.login === bookView.TOKEN){
        module.Book.destroy(ctx);
      } else {
        module.adminView.initAdminPage(ctx);
      }
    })
  }

  bookView.initCreateFormPage = function() {
    resetView();
    $('.create-view').show();
    $('#create-form').off().on('submit', function(event) {
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
    $('#update-title').val(ctx.title);
    $('#update-author').val(ctx.author);
    $('#update-isbn').val(ctx.isbn);
    $('#update-image_url').val(ctx.image_url);
    $('#update-description').val(ctx.description);
    $('#update-form').off().on('submit', function(event){
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
        book_id: ctx.book_id
      };
      module.Book.update(ctx, book);
    })
  }

  module.bookView = bookView;

})(app)

$(function () {
  app.Book.fetchAll(app.bookView.initIndexPage);
})
