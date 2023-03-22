const bookContainer = document.querySelector('.book-container');

const bookLibrary = [
  
];

for (let i=1; i < 5; i++) {
  let title = "Title " + i;
  let author = "Author " + i;
  let pages = i * 100;
  let read = true;
  bookLibrary.push(new Book(title,author,pages,read));
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  if (this.read) {
    this.read = false
  } else {
    this.read = true;
  }
}

function toggleModal() {
  let modalElement = document.querySelector('.modal');
  modalElement.classList.toggle('hidden');
}

function submitForm(event) {
  event.preventDefault();
  const form = document.querySelector('.add-book-form');
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const pages = document.querySelector('#pages').value
  const readValueString = document.querySelector('input[name="book-read"]:checked').value;
  let readValue
  if (readValueString === 'true') {
    readValue = true;
  } else {
    readValue = false;
  }

  bookLibrary.push(new Book(title, author, pages, readValue));
  renderLibrary(bookLibrary);
  form.reset();
  toggleModal();
}


function renderBook(book, index) {
  // create the container for the information
  let bookContent = document.createElement('div')
  bookContent.classList.add('card-book');
  bookContent.setAttribute('data-index-number', index);

  let icon = document.createElement('p')
  icon.classList.add('card-icon');
  icon.innerText = 'Fake Icon';
  bookContent.appendChild(icon);
  
  let bookTitle = document.createElement('h2');
  bookTitle.classList.add('card-title');
  bookTitle.innerText = book.title;
  bookContent.appendChild(bookTitle);

  let bookAuthor = document.createElement('div');
  bookAuthor.classList.add("card-author");
  bookAuthor.innerText = "Author: " + book.author;
  bookContent.appendChild(bookAuthor);

  let bookPages = document.createElement('p');
  bookPages.classList.add('card-pages');
  bookPages.innerText = "Pages: " + book.pages;
  bookContent.appendChild(bookPages);

  let bookRead = document.createElement('p');
  bookRead.classList.add('card-read');
  bookRead.innerText = (book.read) ? "Read: yes" : "Read: no";
  bookContent.appendChild(bookRead);

  const toggleReadButton = document.createElement('button');
  toggleReadButton.classList.add('toggle-read-status');
  toggleReadButton.innerText = 'change';
  toggleReadButton.addEventListener('click', (event) => {
    let bookIndex = Number(event.target.parentElement.dataset.indexNumber);
    console.log('book index', bookIndex);
    bookLibrary[bookIndex].toggleRead();
    renderLibrary(bookLibrary);
  })
  bookContent.appendChild(toggleReadButton);
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-book');
  deleteButton.innerText = "Remove from Library";
  deleteButton.addEventListener('click', (event) => {
    let bookIndex = Number(event.target.parentElement.dataset.indexNumber);
    removeBookFromArray(bookIndex);
    renderLibrary(bookLibrary);
  })
  bookContent.appendChild(deleteButton);

  bookContainer.appendChild(bookContent);
}

function renderLibrary(bookArr) {
  bookContainer.innerHTML = '';
  bookArr.forEach((book, index) => {
    renderBook(book, index);
  })
}



function removeBookFromArray(index) {
  return bookLibrary.splice(index, 1);
}

renderLibrary(bookLibrary);

