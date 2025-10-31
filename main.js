const newBookBtn = document.querySelector(".new-book-button")
const newBookModal = document.querySelector("#newBookDialog")
const submitButton = document.querySelector(".submit-button")
const bookContainer = document.querySelector(".book-container")
const cancelButton = document.querySelector(".cancel-button")
const bookCard = document.querySelector(".book-card")

const myLibrary = [];

//displays myLibrary on the screen
function displayMyLibrary(){
  bookContainer.innerHTML = ""
  myLibrary.forEach((book) => {
        const card = document.createElement("div")
        card.className = "book-card"   
        card.classList.add("card")     
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.bookPages}</p>
            <p>${book.readStatus ? "Read" : "Not Read"}</p>
            <button class="edit-btn" data-id="${book.id}">Edit</button>
            <button class="delete-btn" data-id="${book.id}">Delete</button>`
        bookContainer.appendChild(card)
    })
}

bookContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const bookId = e.target.dataset.id
    editBook(bookId)
  }
  
  if (e.target.classList.contains("delete-btn")) {
    const bookId = e.target.dataset.id
    deleteBook(bookId)
  }
})

 // the constructor...
function Book(title, author, bookPages, readStatus, id) {
    this.title = title
    this.author = author
    this.bookPages = bookPages
    this.readStatus = readStatus
    this.id = id
}

newBookBtn.addEventListener("click", () => {
  newBookModal.showModal()
});

submitButton.addEventListener("click", addBookToLibrary)
function addBookToLibrary(event) {
  event.preventDefault();
    const title = document.querySelector('[data-role="book-title"]').value
    const author = document.querySelector('[data-role="book-author"]').value
    const bookPages = document.querySelector('[data-role="number-of-pages"]').value
    const readStatus = document.querySelector('input[type="checkbox"]').checked 
    const id = crypto.randomUUID()

     // Check if we're editing an existing book
  const editingId = newBookModal.dataset.editingId
  
  if (editingId) {
    // Update existing book
    const book = myLibrary.find(book => book.id === editingId)
    if (book) {
      book.title = title
      book.author = author
      book.bookPages = bookPages
      book.readStatus = readStatus
    }
      delete newBookModal.dataset.editingId
  } else {

    const myBooks = new Book(title, author, bookPages, readStatus, id)
  myLibrary.push(myBooks)
  }
  displayMyLibrary()
  newBookModal.close()

    // Clear the form
  document.querySelector('[data-role="book-title"]').value = ''
  document.querySelector('[data-role="book-author"]').value = ''
  document.querySelector('[data-role="number-of-pages"]').value = ''
  document.querySelector('input[type="checkbox"]').checked = false
  
}

cancelButton.addEventListener("click", () => {
    newBookModal.close()
})

function deleteBook(bookId){
 const index = myLibrary.findIndex(book => book.id === bookId)
  if (index !== -1) {
    myLibrary.splice(index, 1)
    displayMyLibrary() 
  } 
}

function editBook(bookId){
 const book = myLibrary.find(book => book.id === bookId)
 document.querySelector('[data-role="book-title"]').value = book.title
  document.querySelector('[data-role="book-author"]').value = book.author
  document.querySelector('[data-role="number-of-pages"]').value = book.bookPages
  document.querySelector('input[type="checkbox"]').checked = book.readStatus
  
  // Store the book ID we're editing (so submit knows to update instead of add)
  newBookModal.dataset.editingId = bookId

  newBookModal.showModal();
}
