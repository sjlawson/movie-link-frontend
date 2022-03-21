import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';


export const SearchForm = ({setSearchResults, setError}) => {
  const [searchValues, setSearchValues] = useState({
    title: '',
    genres: '',
    tags: '',
    rating: '',
  });


  const handleSearch = () => {
    const searchArray = []
    Object.keys(searchValues).map((key, index) => {
      if (searchValues[key]) {
        searchArray.push(`${key}=${searchValues[key]}`)
      }
    })

    const searchQuery = searchArray.join('&');

    fetch(`/api/v1/s?${searchQuery}`).then((res) => {
      return res.json();
    }).then((res) => {
      console.log(res);
      setSearchResults(res['result']);
    }).catch((err) => {
      setError({err});
    });
  }

  const handleChange = (e) => {
    setSearchValues({...searchValues, [e.target.name]: e.target.value.trim()});
  }

  return (
    <>
      <h3>Search filters:</h3>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
        <TextField onChange={handleChange} id="title" name='title' label="Movie Title" variant="outlined" />
        <TextField onChange={handleChange} id="genres" name='genres' label="Genre(s)" variant="outlined" helperText="Separate with commas" />
        <TextField onChange={handleChange} id="tags" name='tags' label="Tag(s)" variant="outlined" helperText="Separate with commas" />
        <Tooltip title="Enter numeric rating from 1 to 5. for range, use a single dash (e.g. 3-5 or 3.2-4.5)">
          <TextField onChange={handleChange} id="rating" name='rating' label="rating" variant="outlined" />
        </Tooltip>
      </Box>
      <Button
        variant='contained'
        onClick={handleSearch}>
        Search
      </Button>
    </>
  )
}
