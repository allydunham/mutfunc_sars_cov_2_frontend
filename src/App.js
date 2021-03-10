import React from 'react';
import DataController from './components/DataController';
import TitleBar from './components/TitleBar';
import Footer from './components/Footer';
import GoogleAnalyticsWrapper from './components/GoogleAnalyticsWrapper';
import CookieBanner from './components/CookieBanner';
import { BrowserRouter as Router } from "react-router-dom";
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


function App() {
    const classes = styles()

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <GoogleAnalyticsWrapper testMode={true}>
                    <TitleBar/>
                    <div className={classes.main}>
                        <DataController/>
                    </div>
                    <Footer/>
                </GoogleAnalyticsWrapper>
                <CookieBanner/>
            </Router>
        </ThemeProvider>
  );
}

export default App;
