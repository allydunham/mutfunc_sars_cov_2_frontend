import React, { useState, useEffect} from "react";
import {tsv} from "d3-fetch";
import Typography from '@material-ui/core/Typography';
import { Switch, Route, Redirect } from "react-router-dom";
import Home from './Home';
import Search from './Search';
import About from './About';
import Download from './Download';
import Help from './Help';
import Changelog from './Changelog';
import { addMutToMap, searchMutations } from "../lib/mutations";

// Page to show when no other found
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

// Main site controller - this component manages the shared state
// and dispatches it between the various pages
// Downloading, storing and searching the main dataset is done here
const DataController = () => {
    const [data, setData] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    const [dataNotification, setDataNotification] = useState(false);

    const [search, setSearch] = useState(false);
    const [searching, setSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchErrors, setSearchErrors] = useState([]);

    const [selectedMut, setSelectedMut] = useState(null);

    // Initial Data Load
    useEffect(() => {
        console.log('Fetching Data...');
        tsv(process.env.PUBLIC_URL + '/data/summary.tsv')
            .then((download) => {
                const mutMap = download.reduce(addMutToMap, {});
                setData(mutMap);
                console.log('Data Loaded');
                setDataReady(true);
                setTimeout(() => setDataNotification(true), 2000)
            })
    }, []);

    // Search data for variants
    useEffect(() => {
        if (!(search === false)){
            setSelectedMut(null)
            setSearchResults([])
            setSearchErrors([])
            setSearching(true)
            searchMutations(search, data).then((result) => {
                console.log(result)
                setSearchResults(result['results']);
                setSearchErrors(result['errors']);
                setSearching(false)
                // Simulate long search for testing
                //setTimeout(() => setSearching(false), 5000);
            })
        }
    }, [search, data])

    return(
        <Switch>
            <Route exact path="/">
                <Redirect to="/home"/>
            </Route>

            <Route path="/home">
                <Home search={search} setSearch={setSearch}/>
            </Route>

            <Route path="/search">
                <Search
                  data={data}
                  dataReady={dataReady}
                  dataNotification={dataNotification}
                  search={search}
                  setSearch={setSearch}
                  searchResults={searchResults}
                  searchErrors={searchErrors}
                  searching={searching}
                  selectedMut={selectedMut}
                  setSelectedMut={setSelectedMut}
                />
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
    )
}

export default DataController;
