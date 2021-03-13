import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { withRouter } from "react-router-dom";
const ISBN = require("isbn-validate");

const AddBook = (props) => {
  const { onAdd, onClose, popupTitle, books } = props;

  let book = {
    id: Date.now(),
    title: "",
    authors: [],
    pages: "",
    publisher: "",
    publish_year: "",
    release_date: "",
    image: "",
    isbn: "",
  };
  if (props.match.params.id) {
    book = books.filter((item) => item.id == props.match.params.id)[0];
  }

  const [id, setId] = useState(book.id);
  const [title, setTitle] = useState(book.title);
  const [author_name, setAuthorName] = useState(
    book.authors.map((author) => `${author.name} ${author.surname}`).join("; ")
  );
  const [pages, setPages] = useState(book.pages);
  const [publisher, setPublisher] = useState(book.publisher);
  const [publish_year, setPublishYear] = useState(book.publish_year);
  const [release_date, setReleaseDate] = useState(book.release_date);
  const [image, setImage] = useState(book.image);
  const [isbn, setISBN] = useState(book.isbn);

  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      setImage(reader.result);
    },
    false
  );

  const onSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const authorsArray = author_name.split(/\s*;\s*/).map((item, index) => {
      let author = item.split(" ");
      if (author[1]) {
        if (author[0].length <= 20 && author[1].length <= 20) {
          return { name: author[0], surname: author[1] };
        }
        alert(`${index + 1} author's name is too long`);
        isValid = false;
        return;
      }
      alert(`Make sure ${index + 1} author has both name and surname`);
      isValid = false;
      return;
    });

    if (isbn && !ISBN.Validate(isbn)) {
      alert("ISBN is not valid, please try again or leave this field empty");
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    onAdd({
      id,
      title,
      authorsArray,
      pages,
      publisher,
      publish_year,
      release_date,
      image: image ? image : "../img/default_book_cover.jpg",
      isbn,
    });

    setId("");
    setTitle("");
    setAuthorName("");
    setPages("");
    setPublisher("");
    setPublishYear("");
    setReleaseDate("");
    setImage("");
    setISBN("");
  };

  return (
    <div className="add-book-popup">
      <form onSubmit={onSubmit} className="add-book-form">
        <FaTimes onClick={onClose} className="add-book-close" />
        <h2 className="add-book-title">{popupTitle} book</h2>
        <div className="add-book-input-block">
          <label className="add-book-label">Title: </label>
          <input
            className="add-book-input"
            required
            maxLength="30"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-book-input-block">
          <label className="add-book-label">Authors:</label>
          <input
            className="add-book-input"
            required
            type="text"
            placeholder="Name and Surname (use semicolon ';' fore multiple authors)"
            value={author_name}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>
        <div className="add-book-input-block">
          <label className="add-book-label">Number of pages:</label>
          <input
            className="add-book-input"
            required
            max="10000"
            min="0"
            type="number"
            placeholder="Number of pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </div>
        <div className="add-book-input-block">
          <label className="add-book-label">Publishing house:</label>
          <input
            className="add-book-input"
            type="text"
            placeholder="Publishing house"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>
        <div className="add-book-input-block">
          <label className="add-book-label">Publication year:</label>
          <input
            className="add-book-input"
            min="1800"
            type="number"
            placeholder="Publication year"
            value={publish_year}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <div className="add-book-input-block">
          <label className="add-book-label">First published date:</label>
          <input
            className="add-book-input"
            min="1800-01-01"
            type="date"
            placeholder="First published date"
            value={release_date}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
        <div className="add-book-input-block">
          <label className="add-book-label">
            Image link{" "}
            <small>
              (choose URL or file, last changed field will be prioritized)
            </small>
            :
          </label>
          <input
            className="add-book-input"
            type="url"
            placeholder="Image link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
          <input
            className="add-book-input"
            type="file"
            placeholder="Image file"
            onChange={(e) => {
              reader.readAsDataURL(e.target.files[0]);
            }}
          />
        </div>
        <div className="add-book-input-block">
          <label className="add-book-label">ISBN</label>
          <input
            className="add-book-input"
            type="number"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setISBN(e.target.value)}
          />
        </div>
        <input type="submit" value="Save Book" className="button" />
      </form>
    </div>
  );
};

export default withRouter(AddBook);
