const newBookBtn = document.querySelector(".new-book-button")
const newBookModal = document.querySelector("#newBookDialog")
const submitButton = document.querySelector(".submit-button")
const bookContainer = document.querySelector(".book-container")
const cancelButton = document.querySelector(".cancel-button")

const myLibrary = [];

//displays myLibrary on the screen
function displayMyLibrary(){
  bookContainer.innerHTML = ""
  myLibrary.forEach((book) => {
        const card = document.createElement("div")
        card.className = "book-card"
        
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.bookPages}</p>
            <p>${book.readStatus ? "Read" : "Not Read"}</p>
            <button>Edit</button>
            <button>Delete</button>`
        bookContainer.appendChild(card)
    })
}

 // the constructor...
function Book(title, author, bookPages, readStatus) {
    this.title = title
    this.author = author
    this.bookPages = bookPages
    this.readStatus = readStatus
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
  const myBooks = new Book(title, author, bookPages, readStatus)
  myLibrary.push(myBooks)
  displayMyLibrary()
  newBookModal.close()
}

cancelButton.addEventListener("click", () => {
    newBookModal.close()
})
