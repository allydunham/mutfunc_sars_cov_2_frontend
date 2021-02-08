import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import SearchBox from './SearchBox'

import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        marginTop: 'auto'
    },
    textItem: {
        maxWidth: "50em"
    },
    item: {
        width: "75%"
    }
});

const Home = ({search, setSearch}) => {
    const classes = styles();

    return(
        <Grid container spacing={4} direction="column" alignItems="center" className={classes.root}>
            <Grid item className={classes.textItem}>
                <Typography variant='h6'>Welcome to Mutfunc: SARS-CoV-2</Typography>
                <Typography>Search precomputed computational predictions and annotations for SARS-CoV-2 amino acid substitutions, highlighting variants' potential functional effects. </Typography>
            </Grid>
            <Grid item className={classes.item}>
                <SearchBox
                  search={search}
                  setSearch={setSearch}
                  showSample
                />
            </Grid>
        </Grid>

    )
}

export default Home
