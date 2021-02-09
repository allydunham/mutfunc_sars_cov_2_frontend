import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check'
import green from '@material-ui/core/colors/green';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import SearchBox from './SearchBox'
import SearchErrors from './SearchErrors'
import SearchSummary from './SearchSummary'
import DetailsPanel from './DetailsPanel'
import ResultsTable from './ResultsTable'


const styles = makeStyles({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        marginTop: 'auto'
    },
    item: {
        width: "75%"
    },
    check: {
        color: green[500]
    }
});

const DataDisplay = (props) => {
    const classes = styles();
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('sm'));

    const {dataReady, dataNotification, searchResults,
           searching, data, selectedMut, setSelectedMut,
           search} = props;

    const [longSearch, setLongSearch] = useState(false)

    if (!dataReady){
        return(
            <Grid item className={classes.item}>
                <CircularProgress />
                <br/>
                <Typography>Loading Data</Typography>
            </Grid>
        )
    }

    if (searching){
        if (!longSearch){
            setTimeout(() => setLongSearch(true), 500)
            return <></>
        } else {
            return(
                <Grid item className={classes.item}>
                    <CircularProgress />
                    <br/>
                    <Typography>Searching...</Typography>
                </Grid>
            )
        }
    } else if (longSearch) {
        setLongSearch(false)
    }

    if (!dataNotification && search === false){
        return(
            <Grid item className={classes.item}>
                <CheckIcon className={classes.check} fontSize='large'/>
                <br/>
                <Typography>Data Loaded!</Typography>
            </Grid>
        )
    }

    // Keep site clean before a search has happened, once data loaded etc.
    if (search === false){
        return null
    }

    // Return results table if no special case is found
    return(
        <>
        <Grid item className={classes.item}>
            <SearchSummary searchResults={searchResults} data={data}/>
        </Grid>
        <Grid item id='details' className={classes.item}>
            <DetailsPanel small={small} mut={data[selectedMut]}/>
        </Grid>
        <Grid item className={classes.item}>
            <ResultsTable
              mutIds={searchResults}
              mutData={data}
              selectedMut={selectedMut}
              setSelectedMut={setSelectedMut}
              small={small}
            />
        </Grid>
        </>
    )
}

// Search Page
const Search = (props) => {
    const classes = styles();
    const {data, dataReady, dataNotification, search, setSearch,
           searchResults, searchErrors, searching,
           selectedMut, setSelectedMut} = props

    return(
        <Grid container spacing={4} direction="column" alignItems="center" className={classes.root}>
            <Grid item className={classes.item}>
                <SearchBox
                  search={search}
                  setSearch={setSearch}
                  showSample
                />
                {searchErrors.length > 0 ? <SearchErrors errors={searchErrors}/> : null}
            </Grid>
            <DataDisplay
              data={data}
              dataReady={dataReady}
              dataNotification={dataNotification}
              search={search}
              searchResults={searchResults}
              searching={searching}
              selectedMut={selectedMut}
              setSelectedMut={setSelectedMut}
            />
        </Grid>
    )
}

export default Search