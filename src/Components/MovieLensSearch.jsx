import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { SearchForm } from './SearchForm';
import { Item } from './Item';
import MovieTable from './MovieTable';


export const MovieLensSearch = () => {
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState();

  const liftSearchResult = (result) => {
    setSearchResults(result);
  }

  const liftError = (error) => {
    setError(error);
  }

  const formatResult = () => {
    if (searchResults) {
      return (
        <MovieTable rows={searchResults} />
      )
    } else {
      return (
        <h3>Nothing to show</h3>
      )
    }
  }

  return (
    <Box
      sx={{
        margin: 10,
        padding: 5,
        display: 'grid',
        bgcolor: 'background.paper',
        borderRadius: 12,
        boxShadow: 1,
        fontWeight: 'bold',
    }}>
      <h1>Movie Lens</h1>
      {error && ({error}) }
      <Grid container spacing={1}>
        <Grid item md={3}>
          <Item>
            <SearchForm setSearchResults={liftSearchResult} setError={liftError} />
          </Item>
        </Grid>
        <Grid item md={9}>
          <Item sx={{width: '100%', span: 2}}>
            {formatResult()}
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
