import { useState } from 'react';

const App = () => {
  const [movies, setMovies] = useState([]);

  const loadMovies = () => {
    fetch('https://api.b7web.com.br/cinema/')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setMovies(json);
      });
  }

  return (
    <div>
      <button onClick={loadMovies}>Clique aqui para carregar os filmes</button>

      Total de filmes: {movies.length}

    <div></div>
    </div>    
  );
}

export default App;