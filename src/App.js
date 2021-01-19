import React from 'react';
import About from './components/About';
import Download from './components/Download';
import Help from './components/Help';
import Changelog from './components/Changelog';
import DataController from './components/DataController';
import TitleBar from './components/TitleBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from '@material-ui/core/styles';
import theme from './theme';

const styles = makeStyles({
    main: {
        display: 'flex',
        minHeight: '87vh',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden'
    }
});

function PageNotFound() {
    return(
        <>
        <Typography variant='h4' align='center' gutterBottom>
            <br/>Page Not Found
        </Typography>
        <Typography align='center'>
            Use the menu bar above to navigate the site
        </Typography>
        </>
    )
}

function InnerApp() {
    const classes = styles()
    const page = useLocation()

    // Empty search route is required to prevent error text showing
    // when going to /search or redirecting from / because DataController
    // lives outside ReactRouter. This is done so the dataset is only downloaded
    // once and stays loaded in the background when visiting other pages.
    // The only negative is it downloads in the background for people who want to
    // visit the other pages without searching, however it is small and this is a
    // rare use case
    return(
        <>
        <TitleBar/>
        <div className={classes.main}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/search"/>
                </Route>

                <Route path="/search">
                </Route>

                <Route path="/help">
                    <Help/>
                </Route>

                <Route path="/about">
                    <About/>
                </Route>

                <Route path="/download">
                    <Download/>
                </Route>

                <Route path="/changelog">
                    <Changelog/>
                </Route>

                <Route path="*">
                    <PageNotFound/>
                </Route>
            </Switch>
            <DataController hidden={page.pathname !== '/search'}/>
        </div>
        <Footer/>
        </>
    )
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <InnerApp/>
            </Router>
        </ThemeProvider>
  );
}

export default App;
