import React, { useState, useEffect } from 'react';
import requests from '../../requests';
import { Row, ErrorHandler, Banner, Filter } from '../../components';
import { Search } from '.././';

export const HomeWithFilter = ({ searchState, setSearchState }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});
  const media_rows = [
    {
        id: 1,
        title: 'only on netflix',
        fetch_url: requests?.fetchNetflixOriginals,
        media_type: 'tv',
    },
    {
        id: 2,
        title: 'trending',
        fetch_url: requests?.fetchTrending,
    },
    {
        id: 3,
        title: 'top rated',
        fetch_url: requests?.fetchTopRated,
    },
    {
        id: 4,
        title: 'action movies',
        fetch_url: requests?.fetchActionMovies,
    },
    {
        id: 5,
        title: 'comedy movies',
        fetch_url: requests?.fetchComedyMovies,
    },
    {
        id: 6,
        title: 'horror movies',
        fetch_url: requests?.fetchHorrorMovies,
    },
    {
        id: 7,
        title: 'romance movies',
        fetch_url: requests?.fetchRomanceMovies,
    },
    {
        id: 8,
        title: 'documentaries',
        fetch_url: requests?.fetchDocumentaries,
    },
];




  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(requests?.fetchNetflixOriginals);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError('Netflix Originals');
      }
    };

    fetchMovies();
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filterMovies = (movies) => {
    const { genre, voteAverage, originCountry, releaseDate } = filters;

    let filteredMovies = movies;

    if (genre) {
      filteredMovies = filteredMovies.filter((movie) => {
        return movie.genre_ids.includes(genre);
      });
    }

    if (voteAverage) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.vote_average >= voteAverage
      );
    }

    if (originCountry) {
      filteredMovies = filteredMovies.filter((movie) => {
        return (
          movie.production_countries.findIndex(
            (c) => c.iso_3166_1 === originCountry
          ) >= 0
        );
      });
    }

    if (releaseDate) {
      filteredMovies = filteredMovies.filter((movie) => {
        return movie.release_date.slice(0, 4) === releaseDate;
      });
    }

    return filteredMovies;
  };

  const filteredMovies = filterMovies(movies);

  return (
    <>
      <Filter onFiltersChange={handleFiltersChange} />
      {searchState ? (
        <Search setSearchState={setSearchState} />
      ) : (
        <>
          <Banner />
          {media_rows?.map((row) => (
            <Row
              setError={setError}
              title={row?.title}
              fetchUrl={row?.fetch_url}
              media_type={row?.media_type}
              key={row?.id}
              movies={filteredMovies}
            />
          ))}
          {error && <ErrorHandler setError={setError} media_name={error} />}
        </>
      )}
    </>
  );
};