import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./components/Bookshelf";
import SearchPage from "./components/SearchPage";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };
    getBooks();
  }, []);

  const changeShelf = (book, shelf) => {
    const updateBooks = async () => {
      await BooksAPI.update(book, shelf);
      const res = await BooksAPI.getAll();
      setBooks(res);
    };
    updateBooks();
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/search"
          element={
            <SearchPage onShelfChange={changeShelf} myBooks={books} />
          }
        />
        <Route
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf
                    title="Currently Reading"
                    books={books.filter((b) => b.shelf === "currentlyReading")}
                    onShelfChange={changeShelf}
                  />
                  <Bookshelf
                    title="Want to Read"
                    books={books.filter((b) => b.shelf === "wantToRead")}
                    onShelfChange={changeShelf}
                  />
                  <Bookshelf
                    title="Read"
                    books={books.filter((b) => b.shelf === "read")}
                    onShelfChange={changeShelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
