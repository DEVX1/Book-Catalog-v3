// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

  // UI constructor
function UI() { }

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
    // Create tr element
  const row = document.createElement('tr');
    // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
}

  // Show alert
UI.prototype.showAlert = function(message, className) {
  // create div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent element
  const container = document.querySelector('.container');
  // get the form element
  const form = document.querySelector('#book-form');
  // insert alert
  container.insertBefore(div, form);
  // timeout after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

  // Delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

  // Clear entry fields function
UI.prototype.clearFields = function() {
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('isbn').value = "";
}
  // Add book event listener
document.getElementById('book-form').addEventListener('submit', function(e) {
    // get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    // Instantiate a book
  const book = new Book(title, author, isbn); 
    // Instantiate a UI object
  const ui = new UI();

    //Validate
  if(title === '' || author === '' || isbn === '') {
    // error alert
    ui.showAlert('Please complete all fields', 'error');
  } else if(isbn.length !== 11) {
    ui.showAlert('ISBN must be formatted XXXXXXXXX-X', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // show success
    ui.showAlert('Book added to list!', 'success');

    // Clear entry upon submission
    ui.clearFields();
  }
  e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI;
  // Call deleteBook function
  ui.deleteBook(e.target);
  // show an alert
  ui.showAlert('Book deleted from list!', 'deleted');
  // prevent the default behavior
  e.preventDefault();
});
