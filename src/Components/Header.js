import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    // color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  logo: {
    height: 40,
    cursor: "pointer",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    zIndex: 5,
  }
}))


const Header = () => {
  
  const classes = useStyles();
  const history = useHistory();
  const { currency, setCurrency } = CryptoState();

  console.log(currency);
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
        color: '#fff',
      },
      type: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar className={classes.header}>
              {/* <Typography 
                  onClick={() => history.push('/')} 
                  className={classes.title}
                  variant="h6"
              >
                Currency App
              </Typography> */}

              <div>
                  <img src="logo.png" alt="logo" onClick={() => history.push('/')} className={classes.logo} />
              </div>
              
              <Select
                  variant="outlined" 
                  style={{
                  width: 100,
                  height: 40,
                  marginRight: 15,
                  }}
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
              </Select>
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header