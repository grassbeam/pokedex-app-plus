import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import red from '@material-ui/core/colors/red';
import Pages from "./pages";
import withMainComponent from './components/high-order/withMainComponent';

const HOCPages = {
  PokeData: withMainComponent(Pages.PokeData, "PokeDex Plus"),
  
}

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: '#ef5350',
    },
  },
});

function App() {
  return (
    <React.Fragment>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
                <Route exact path="/" component={HOCPages.PokeData} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
