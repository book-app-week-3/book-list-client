'use strict';

var app = app || {};

// const __API_URL__ = 'https://cl-ab-booklist.herokuapp.com';
const __API_URL__ = 'http://localhost:3000';

(function(module) {
  // function errorCallback(err) {
  //   console.error(err);
  //   module.errorView.initErrorPage(err);
  // }

  function Book (rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  Book.all = [];
  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));
  Book.fetchAll = callback =>
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      // .catch(errorCallback);

  module.Book = Book;

})(app)
