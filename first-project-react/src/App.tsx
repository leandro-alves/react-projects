import { useState, useEffect, ChangeEvent } from 'react';
import { PostForm } from './components/PostForm';
import { PostItem } from './components/PostItem';
import { Movie } from './types/Movie';
import { Post } from './types/Post';
import { api } from './api';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
    //loadMovies();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    let json = await api.getAllPosts();
    setLoading(false);
    setPosts(json);
  }

  /*const handleAddClick = async (title: string, body: string) => {
    let json = await api.addNewPost(title, body, 1);
    if(json.id) {
      alert('Post adicionado com sucesso!');
    } else {
      alert('Ocorreu algum erro');
    }
  }*/

  /*const loadPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPosts(json);
      })
      .catch(e => {
        setLoading(false);
        setPosts([]);
        console.error(e);
      });
  }*/

  /*const loadPosts = async () => {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts');
      let json = await response.json();
      setPosts(json);
    } catch (e) {
      setLoading(false);
      setPosts([]);
      console.error(e);
    }
  }*/

  const loadMovies = () => {
    fetch('https://api.b7web.com.br/cinema')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setMovies(json);
      })
      .catch(e => {
        setLoading(false);
        setMovies([]);
        console.error(e);
      });
  }

  /*const loadMovies = async () => {
    try {
      setLoading(true);
      let response = await fetch('https://api.b7web.com.br/cinema');
      let json = await response.json();
      setLoading(false);
      setMovies(json);
    } catch(e) {
      setLoading(false);
      setMovies([]);
      console.error(e);
    }
  }*/

  const handleAddPost = async (title: string, body: string) => {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body, userId: 1 }),
      headers: { 'Content-Type': 'application/json' }
    });
    let json = await response.json();

    if(json.id) {
      alert('Post adiconado com sucesso!');
    } else {
      alert('Ocorreu algum erro');
    }
  }

  return (
    /*<div>

      {loading &&
        <div>Carregando...</div>
      }

      {!loading && movies.length > 0 &&
        <>
          Total de filmes: {movies.length}

          <div className='grid grid-cols-6 gap-3'>
            {movies.map((item, index) => (
              <div key={index}>
                <img src={item.avatar} alt="Filme" className='w-32 block' />
                {item.titulo}
              </div>
            ))}
          </div>
        </>
      }

      {!loading && movies.length === 0 &&
        <div>Tente mais tarde novamente.</div>
      }
    </div>*/
    /*<div>
      {loading &&
        <div>Carregando...</div>
      }

      {!loading && posts.length > 0 && 
        <>
          Total de posts: {posts.length}

          <div>
            {posts.map((post, index) => (
              <div key={index}>
                <p>{post.userId}</p>
                <p>{post.id}</p>
                <p>{post.title}</p>
                <p>{post.body}</p>
              </div>
            ))};
          </div>
        </>
      }

    </div>*/

    <div className='p-5'>
      {loading &&
        <div>Carregando...</div>
      }

      <PostForm onAdd={handleAddPost} />
      

      {!loading && posts.length > 0 &&
        <>
          <div>Total de Posts: {posts.length}</div>
          <div>
            {posts.map((item, index) => (
              <PostItem data={item} />
            ))}
          </div>
        </>
      }
    </div>
  );
}

export default App;