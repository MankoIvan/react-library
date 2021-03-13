import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Books from "./components/Books";
import AddBook from "./components/AddBook";
import BookPage from "./components/BookPage";
import Button from "./components/Button";

function App() {
  const [showAddBook, setShowAddBook] = useState(false);
  const [showEditBook, setShowEditBook] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const booksFromServer = await fetchBooks();
      if (localStorage.sortTitle === "true") {
        sortByTitle(booksFromServer);
      } else if (localStorage.sortDate === "true") {
        sortByDate(booksFromServer);
      } else {
        sortByDefault(booksFromServer);
      }
      setBooks(booksFromServer);
    };

    getBooks();
  }, []);

  //Fetch Books
  const fetchBooks = async () => {
    const res = await fetch("http://localhost:5000/books");
    const data = await res.json();

    return data;
  };

  //Delete Book
  const deleteBook = async (id) => {
    await fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE",
    });
    setBooks(books.filter((book) => book.id !== id));
  };
  //Sort By Title
  const sortByTitle = (booksArray) => {
    booksArray.sort((a, b) => a.title.localeCompare(b.title));
  };
  //Sort By Date
  const sortByDate = (booksArray) => {
    booksArray.sort((a, b) => (a.publish_year > b.publish_year ? 1 : -1));
  };
  //Sort By Default
  const sortByDefault = (booksArray) => {
    booksArray.sort((a, b) => (a.id > b.id ? 1 : -1));
  };

  //Sort By Title
  const rednerSortByTitle = () => {
    localStorage.sortTitle = true;
    localStorage.sortDate = false;

    sortByTitle(books);
    setBooks([...books]);
  };
  //Sort By Date
  const rednerSortByDate = () => {
    localStorage.sortTitle = false;
    localStorage.sortDate = true;

    sortByDate(books);
    setBooks([...books]);
  };
  //Sort By Default
  const rednerSortByDefault = () => {
    localStorage.sortTitle = false;
    localStorage.sortDate = false;

    sortByDefault(books);
    setBooks([...books]);
  };

  //Add Book
  const addBook = async (book) => {
    const newBook = {
      id: book.id,
      title: book.title,
      authors: book.authorsArray,
      pages: book.pages,
      publisher: book.publisher,
      publish_year: book.publish_year,
      release_date: book.release_date,
      image: book.image,
      isbn: book.isbn,
    };

    const res = await fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    const data = await res.json();

    setBooks([...books, data]);
    setShowAddBook(false);
  };

  //Edit Book
  const editBook = async (book) => {
    const updatedBook = {
      id: book.id,
      title: book.title,
      authors: book.authorsArray,
      pages: book.pages,
      publisher: book.publisher,
      publish_year: book.publish_year,
      release_date: book.release_date,
      image: book.image,
      isbn: book.isbn,
    };
    const res = await fetch(`http://localhost:5000/books/${updatedBook.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    const data = await res.json();
    setBooks(books.map((item) => (item.id === updatedBook.id ? data : item)));
    setShowEditBook(false);
  };

  return (
    <Router>
      <>
        <Header />
        <Route path="/" exact>
          <>
            {books.length > 0 ? (
              <>
                <div>
                  <Button
                    onClick={() => setShowAddBook(!showAddBook)}
                    title={showAddBook ? "Adding" : "Add"}
                  />
                  <div>
                    <span style={{ marginRight: "20px", fontSize: "20px" }}>
                      Sort:
                    </span>
                    <Button
                      onClick={rednerSortByTitle}
                      title={"Title"}
                    ></Button>
                    <Button onClick={rednerSortByDate} title={"Date"}></Button>
                    <Button
                      onClick={rednerSortByDefault}
                      title={"Default"}
                    ></Button>
                  </div>
                </div>
                <Books books={books} onDelete={deleteBook} onEdit={editBook} />
              </>
            ) : (
              <h2>There are no books in the library</h2>
            )}
            {showAddBook && (
              <AddBook
                onAdd={addBook}
                onClose={() => setShowAddBook(!showAddBook)}
                popupTitle="Add"
              />
            )}
          </>
        </Route>
        <Route path="/:id" exact>
          <BookPage
            books={books}
            onEdit={() => setShowEditBook(!showEditBook)}
          />
          {showEditBook && (
            <AddBook
              onAdd={editBook}
              onClose={() => setShowEditBook(!showEditBook)}
              popupTitle="Edit"
              books={books}
            />
          )}
        </Route>
      </>
    </Router>
  );
}

export default App;
