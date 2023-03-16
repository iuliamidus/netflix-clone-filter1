import axios from "axios";
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import './Filter.scss';

const filterOptions = [
  { value: 'genres', label: 'Genres', options: [
      { value: '28', label: 'Action' },
      { value: '35', label: 'Comedy' },
      { value: '18', label: 'Drama' },
      { value: '53', label: 'Thriller' }
  ] },
  { value: 'vote_average', label: 'Vote Average', options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
      { value: '8', label: '8' },
      { value: '9', label: '9' },
      { value: '10', label: '10' }
  ] },
  { value: 'with_original_language', label: 'Original Language', options: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'ja', label: 'Japanese' }
  ] },
  { value: 'primary_release_date', label: 'Release Date', options: [
      { value: '2020-01-01', label: '2020' },
      { value: '2019-01-01', label: '2019' },
      { value: '2018-01-01', label: '2018' },
      { value: '2017-01-01', label: '2017' }
  ] },
];

export const Filter = ({ setMovies }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleFilterChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleFilterSubmit = () => {
    const selectedGenres = selectedOptions.filter((option) => option.value !== 'genres').map((option) => option.value).join(',');
    const selectedVoteAverage = selectedOptions.filter((option) => option.value === 'vote_average').map((option) => option.options[0].value).join(',');
    const selectedLanguage = selectedOptions.filter((option) => option.value === 'with_original_language').map((option) => option.options[0].value).join(',');
    const selectedReleaseDate = selectedOptions.filter((option) => option.value === 'primary_release_date').map((option) => option.options[0].value).join(',');

    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=a536e6ecf7260210ca04dea3a3695e8e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false${selectedGenres ? `&with_genres=${selectedGenres}` : ''}${selectedVoteAverage ? `&vote_average.gte=${selectedVoteAverage}` : ''}${selectedLanguage ? `&with_original_language=${selectedLanguage}` : ''}${selectedReleaseDate ? `&primary_release_date.gte=${selectedReleaseDate}` : ''}`)
      .then((res) => {
      setMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="filter">
      <Select
        options={filterOptions}
        isMulti
        placeholder="Select filters"
        onChange={handleFilterChange}
      />
      {selectedOptions.map((option) => (
        <span key={option.value} className="filter-option">
          {option.label}: {option.value}
        </span>
      ))}
      <button onClick={handleFilterSubmit}>Filter</button>
    </div>
  );
};



