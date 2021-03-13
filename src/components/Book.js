import { FaTimes, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

const Book = ({ book, onDelete, onEdit }) => {
  return (
    <div className="book">
      <div className="book-cover">
        <Link to={`/${book.id}`}>
          <img src={book.image} className="book-image" />
        </Link>
        <FaTimes className="book-delete-button"
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(book.id)}
        />
      </div>
      <h2>{book.title}, {book.publish_year}</h2>
      {book.authors.map((author) => (
        <span>
          {`${author.name} ${author.surname}`}
          <br />
        </span>
      ))}
    </div>
  );
};

export default Book;
