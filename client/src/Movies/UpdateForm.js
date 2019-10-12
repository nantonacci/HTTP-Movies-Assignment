import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);

  console.log('Update form props: ', props);

  const { match, movies } = props;

  useEffect(() => {
    const movieID = match.params.id;

    axios
      .get(`http://localhost:5000/api/movies/${movieID}`)
      .then(res => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch(err => console.log(err));
    // const movieToUpdate = movies.find(film => {
    //   console.log(`${film.id}`, movieID);
    //   return `${film.id}` === movieID;
    // });

    // console.log('movieToUpdate: ', movieToUpdate);

    // if (movieToUpdate) {
    //   setMovie(movieToUpdate);
    // }
  }, []);

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'stars') {
      setMovie({
        ...movie,
        [e.target.name]: value.split(',')
      });
    }

    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.history.push(`/movies/${movie.id}`);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h2>Update movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />

        <input
          type="textarea"
          name="stars"
          onChange={changeHandler}
          placeholder="Movie stars, separated by a comma"
          value={movie.stars}
        />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateForm;
