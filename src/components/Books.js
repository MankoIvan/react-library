import Book from "./Book";

const Books = ({ books, onDelete, onEdit }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {books.map((book, index) => (
        <Book key={index} book={book} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default Books;
