import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FFFFFF',//white
      main: '#FF69B4',//pink
      dark: '#4B4C4A',//gray dark
      contrastText: '#C40A68',//dark pink
      
    },
    secondary: {
      light: '#D75998',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#C40A68',//dark pin2
    },
  },
    typography: {
    fontFamily: [
      'Playfair Display',
      'Tajawal',
      'sans-serif'
    ].join(','),
    //meduim
    h2: {
      fontFamily: 'Playfair Display',
      fontWeight: 600,
    }
    //semibold
    ,
      h4: {
      fontFamily: 'Playfair Display',
      fontWeight: 700,
    },
    //regular
       h6: {
      fontFamily: 'Playfair Display',
      fontWeight: 400,
    },
    //meduim
    h1: {
      fontFamily: 'Tajawal',
      fontWeight: 500,
    },
    //regular
    h3:{
 fontFamily: 'Tajawal',
      fontWeight: 400,
    }, 
    //semibold
      h5:{
 fontFamily: 'Tajawal',
      fontWeight: 700,
    }
    }
});
export default theme;