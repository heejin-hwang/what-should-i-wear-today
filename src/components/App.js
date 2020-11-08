import React from 'react';
import Weather from './Weather';
import Example from './Example';
import Grid from '@material-ui/core/Grid';

const App = () => {
  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <h1> WHAT SHOUD I WEAR TODAY </h1>
        </Grid>
        <Grid item>
          <Weather />
        </Grid>
        <Grid item>
          {/*<Example />*/}
        </Grid>
      </Grid>
    </>
  );
};

export default App;
