import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

const SearchPage = ({ onShelfChange, myBooks }) => {
    const [query, setQuery] = useState("");
    const [searchBooks, setSearchBooks] = useState([]);

    useEffect(() => {
        let isActive = true;

        const searchBooks = async () => {
            const trimmedQuery = query.trim();
            if (trimmedQuery) {
                try {
                    const res = await BooksAPI.search(trimmedQuery);
                    if (isActive) {
                        if (res && !res.error) {
                            const synchronizedBooks = res.map((searchBook) => {
                                const myBook = myBooks.find((b) => b.id === searchBook.id);
                                return myBook ? myBook : { ...searchBook, shelf: "none" };
                            });
                            setSearchBooks(synchronizedBooks);
                        } else {
                            setSearchBooks([]);
                        }
                    }
                } catch (error) {
                    if (isActive) {
                        setSearchBooks([]);
                    }
                }
            } else {
                setSearchBooks([]);
            }
        };

        searchBooks();

        return () => {
            isActive = false;
        };
    }, [query, myBooks]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchBooks.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onShelfChange={onShelfChange} showNoneOption={book.shelf && book.shelf !== "none"} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default SearchPage;
