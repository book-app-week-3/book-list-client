'use strict';

const __API_URL__ = 'https://cl-ab-booklist.herokuapp.com';

$.get('${__API_URL__}/api/v1/books')
  .then(results => {
    Article.loadAll(results);
    callback();
  })
);
