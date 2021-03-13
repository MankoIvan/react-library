import { withRouter, Link } from "react-router-dom";
import Button from "./Button";

const BookPage = (props) => {
  const book = props.books.filter(item => item.id == props.match.params.id)[0];
  return (
    <div className="bookpage-container">
      <img src={book.image} className="bookpage-image" alt={`${book.title} bookcover`}/>
      <div className="bookpage-info">
        <h1>{book.title}</h1>
        <table>
          <tbody>
            <tr>
              <td>{`Author${book.authors.length > 1 ? 's': ''}`}</td>
              <td>
                {book.authors.map((author, index) => (
                  <span key={index}>{`${author.name} ${author.surname}`}
                  {index + 1 < book.authors.length ? <br/> : ''}</span>
                ))}
              </td>
            </tr>
            <tr>
              <td>Pages</td>
              <td>{book.pages}</td>
            </tr>
            <tr>
              <td>Publisher</td>
              <td>{book.publisher}</td>
            </tr>
            <tr>
              <td>Publishing year</td>
              <td>{book.publish_year}</td>
            </tr>
            <tr>
              <td>Release Year</td>
              <td>{book.release_date}</td>
            </tr>
            <tr>
              <td>ISBN</td>
              <td>{book.isbn}</td>
            </tr>
          </tbody>
        </table>
      </div>
            <Button onClick={props.onEdit} title="Edit"/>
            <Link to={"/"} className="button button-link">Go back</Link>
    </div>
  );
};

export default withRouter(BookPage);
