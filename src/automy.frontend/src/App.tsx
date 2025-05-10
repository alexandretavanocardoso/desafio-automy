import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import BatteryList from './components/BatteryList';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BatteryList />
    </ThemeProvider>
  );
}

export default App;
