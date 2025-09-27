import { useQuery } from '@apollo/client';
import { BOOK_GENRE, FAVORITEGENRE } from '../queries';

// eslint-disable-next-line react/prop-types
const BooksRecommended = () => {
  const favResult = useQuery(FAVORITEGENRE);
  let genre = '';
  if (!favResult.loading && favResult.data.me) {
    genre = favResult.data.me.favoriteGenre;
  }

  const result = useQuery(BOOK_GENRE, {
    variables: { genre: genre },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <div>
        books in your favorite genre <strong>{genre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksRecommended;
