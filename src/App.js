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
  PokeDetail: withMainComponent(Pages.PokeDetail, "PokeDex Plus"),
  Error404: withMainComponent(Pages.Error404, "PokeDex Plus"),
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
                <Route path="/detail/:id" component={HOCPages.PokeDetail}  />
                <Route exact path="/error-404" component={HOCPages.Error404} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
