/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  let temp = undefined;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == bookId) {
      temp = books[i];
      break;
    }
  }

  return temp;
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  let temp = undefined;
  for (let i = 0; i < authors.length; i++) {
    if (authors[i].name.toUpperCase() == authorName.toUpperCase()) {
      temp = authors[i];
      break;
    }
  }

  return temp;
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  let temp = [];
  authors.forEach(author => temp.push({'author': author.name, 'bookCount': author.books.length}));
  return temp;
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  books.forEach(book => {
    let temp = [];
    for (let i = 0; i < books.length; i++) {
      if (books[i].color == book.color)
        temp.push(books[i].title);
    }

    colors[book.color] = temp;
  }); 

  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  let temp = [];
  let ids = [];
  
  for (let i = 0; i < authors.length; i++) {
    if (authors[i].name.toUpperCase() == authorName.toUpperCase())
      ids = authors[i].books;
  }
  
  for (let i = 0; i < books.length; i++) {
    if (ids.includes(books[i].id))
      temp.push(books[i].title)
  }

  return temp;
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  let maxBooks = 0;
  let temp = '';

  for (let i = 0; i < authors.length; i++) {
    if (authors[i].books.length > maxBooks) {
      temp = authors[i].name;
      maxBooks = authors[i].books.length;
    }
  }

  return temp;
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  let temp = [];
  let authorNames = [];

  authors.forEach(author => { if (author.books.includes(bookId)) authorNames.push(author.name) });

  books.forEach(book => { 
    for (let i = 0; i < book.authors.length; i++) {
      if (authorNames.includes(book.authors[i].name))
        temp.push(book.title);
    }
   });

   return temp;
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  let friendlyName = '';
  let mostBooks = 0;

  authors.forEach(author => {
    let temp = 0;
    author.books.forEach(id => {
      for (let i = 0; i < authors.length; i++) {
        if (authors[i].books.includes(id) && authors[i].name != author.name)
          temp++;
      }
    });

    if (temp > mostBooks) {
      friendlyName = author.name;
      mostBooks = temp;
    }
  })

  return friendlyName;
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

const authors = require("./authors.json");
const books = require("./books.json");

// console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(50, authors, books));
console.log(friendliestAuthor(authors));
