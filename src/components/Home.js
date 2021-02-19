import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom"
import SearchBox from './SearchBox'

import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
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
    },
    imageItem: {
        [theme.breakpoints.down('sm')]: {
            width: "70%"
        },
        [theme.breakpoints.up('md')]: {
            width: "50%"
        }
    }
}));

const Home = ({search, setSearch}) => {
    const classes = styles();

    return(
        <Grid container spacing={8} direction="column" alignItems="center" className={classes.root}>
            <Grid item className={classes.textItem}>
                <Typography variant='h6'>Welcome to Mutfunc: SARS-CoV-2</Typography>
                <Typography>
                    Computational predictions and annotations for all possible SARS-CoV-2 amino acid substitutions.
                    <br/>
                    Search variants to browse predictions and annotations and identify potential functional effects. Predictions are derived from evolutionary conservation, protein and complex structures and experiments (see <Link to="/help">Help</Link> for details).
                </Typography>
            </Grid>
            <Grid
              container
              item
              direction="row"
              justify="space-around"
              spacing={1}
              className={classes.imageItem}
            >
                <Grid item>
                    <img
                      src={process.env.PUBLIC_URL + 'images/conservation.png'}
                      alt='conservation'
                      height='170px'
                    />
                    <Typography align='center'>Conservation</Typography>
                </Grid>
                <Grid item>
                    <img
                      src={process.env.PUBLIC_URL + 'images/structure.png'}
                      alt='protein-structures'
                      height='170px'
                    />
                    <Typography align='center'>Protein Structures</Typography>
                </Grid>
                <Grid item>
                    <img
                      src={process.env.PUBLIC_URL + 'images/complex.png'}
                      alt='protein-complexes'
                      height='170px'
                    />
                    <Typography align='center'>Protein Complexes</Typography>
                </Grid>
                <Grid item>
                    <img
                      src={process.env.PUBLIC_URL + 'images/annotation.png'}
                      alt='experimental-annotation'
                      height='170px'
                    />
                    <Typography align='center'>Experimental Annotation</Typography>
                </Grid>
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
