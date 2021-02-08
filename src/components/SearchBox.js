import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

// add e to test very large search
const sampleSearch = `S N501Y
S D614G
nsp12 F157L
orf3a Q57H
RdRp P323L
N S180I
P0DTC2 E484Q
S F456A
nsp1 D152G
M 152
P0DTC4 F20`

const searchHelpText = `Search for SARS-CoV-2 variants

Enter terms in the following formats, split by commas (,) or semicolons (;) or on separate lines:
- Protein names (e.g. nsp1)
- Uniprot IDs (e.g. P0DTC7)
- Protein positions (e.g. nsp2 1 or nsp2 A1)
- Specific variants (e.g. nsp12 K603D or nsp12 603D)
`

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        [theme.breakpoints.down('sm')]: {
            width: "90%"
        },
        [theme.breakpoints.up('md')]: {
            width: "66%"
        }
    }
}));

const SearchBox = ({ search, setSearch, showSample }) => {
    const classes = styles();
    const [newSearch, setNewSearch] = useState(search ? search : '')

    const processSearch = (event) => {
        if (newSearch !== search){
            setSearch(newSearch);
        }
    }

    return(
        <Grid container spacing={2} direction="column" alignItems="center" className={classes.root}>
            <Grid item className={classes.item}>
                <TextField
                    value={newSearch}
                    placeholder={searchHelpText}
                    onChange={(e) => setNewSearch(e.target.value)}
                    variant="outlined"
                    multiline
                    margin="normal"
                    rows={8}
                    fullWidth
                />
            </Grid>
            {showSample ? (
                <Grid item className={classes.item}>
                    <Button variant='outlined' onClick={() => setNewSearch(sampleSearch)}>
                        Load example search
                    </Button>
                </Grid>
            ) : null}
            <Grid item className={classes.item}>
                <Button
                    onClick={processSearch}
                    component={Link}
                    to='/search'
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Search
                </Button>
            </Grid>
        </Grid>
    )
}

export default SearchBox