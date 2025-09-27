import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import BooksRecommended from './components/BooksRecommended';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const navigate = useNavigate();

  const padding = {
    padding: 5,
  };
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate('/');
  };

  useEffect(() => {
    const existing = localStorage.getItem('library-user-token');
    if (existing) {
      setToken(existing);
    }
  }, []);

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          authors
        </Link>
        <Link style={padding} to="/books">
          books
        </Link>
        {token && (
          <>
            <Link style={padding} to="/books/recommended">
              recommended
            </Link>
            <Link style={padding} to="/add">
              add book
            </Link>
            <button onClick={logout}>logout</button>
          </>
        )}
        {!token && (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Authors></Authors>}></Route>
        <Route path="/books" element={<Books></Books>}></Route>
        <Route
          path="/books/recommended"
          element={<BooksRecommended></BooksRecommended>}
        ></Route>
        <Route path="/add" element={<NewBook></NewBook>}></Route>
        <Route
          path="/login"
          element={
            <LoginForm
              setError={(error) => console.log(error)}
              setToken={setToken}
            ></LoginForm>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
