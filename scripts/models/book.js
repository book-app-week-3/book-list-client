'use strict';

var app = app || {};

const __API_URL__ = 'https://cl-ab-booklist.herokuapp.com';
// const __API_URL__ = 'http://localhost:3000';

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book (rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  Book.all = [];
  Book.loadAll = rows => {
    Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));
  }
  Book.fetchAll = callback =>
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  Book.fetchOne = (ctx, callback) =>
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.book_id}`)
      .then(results => ctx.book = results[0])
      .then(callback)
      .catch(errorCallback);

  Book.create = (book, callback) =>
    $.post(`${__API_URL__}/api/v1/books`, book)
      .then(() => page('/'))
      .then(callback)
      .catch(errorCallback);


  Book.update = (ctx, book) => {
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${book.book_id}`,
      method: 'PUT',
      data: book,
      success: () => page('/')
    })
      .catch(errorCallback);
  }

  Book.destroy = (ctx) => {
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${ctx.book_id}`,
      method: 'DELETE'
    })
      .then(console.log('deleted book'))
      .then(() => page('/'))
      .catch(errorCallback);
  }


  module.Book = Book;

})(app)
