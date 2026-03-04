const Book = ({ book, onShelfChange, showNoneOption = true }) => {

    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : "";


    const authors = book.authors ? book.authors.join(", ") : "Unknown Author";

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${thumbnail}")`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select
                        value={book.shelf || "none"}
                        onChange={(e) => onShelfChange(book, e.target.value)}
                    >
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        {showNoneOption && <option value="none">None</option>}
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    );
};

export default Book;
