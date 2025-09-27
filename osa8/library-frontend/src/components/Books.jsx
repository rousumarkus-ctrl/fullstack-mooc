import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { BOOK_ADDED, BOOK_GENRE } from '../queries';
import { useState } from 'react';

const Books = () => {
  const [genre, setGenre] = useState('');
  const result = useQuery(BOOK_GENRE, { variables: { genre: genre } });
  const genreQuery = useQuery(BOOK_GENRE);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      /*       client.cache.updateQuery({ query: BOOK_GENRE }, ({ allBooks }) => {
        console.log('book', addedBook);
        console.log('all', allBooks);
        return { allBooks: allBooks.concat(addedBook) };
      }); */
      client.refetchQueries({
        include: 'active',
      });
      window.alert(`${addedBook.title} added`);
    },
  });

  if (result.loading || genreQuery.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks;
  const allBooks = genreQuery.data.allBooks;

  const genres = [
    ...new Set(
      allBooks.reduce((genres, book) => genres.concat(book.genres), [])
    ),
  ];
  genres.push('all');

  const onChange = (g) => {
    client.refetchQueries({
      include: 'active',
    });
    g === 'all' ? setGenre('') : setGenre(g);
  };

  return (
    <div>
      <h2>books</h2>

      {genre === '' && <p>in all genres</p>}
      {genre !== '' && <p>in genre {genre}</p>}

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
      {genres.map((g) => (
        <button key={g} onClick={() => onChange(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
