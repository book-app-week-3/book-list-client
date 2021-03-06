'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage)); // eslint-disable-line
page('/books/new', ctx => app.bookView.initCreateFormPage(ctx));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/admin', ctx => app.adminView.initAdminPage()); // eslint-disable-line

page();
