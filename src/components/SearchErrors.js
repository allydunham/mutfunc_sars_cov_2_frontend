import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from "@material-ui/core/Button";
import red from '@material-ui/core/colors/red';

import { makeStyles } from '@material-ui/core/styles';


const styles = makeStyles({
    errorButton: {
        color: red[900]
    }
});

const SearchErrors = ({errors}) => {
    const classes = styles()
    const [open, setOpen] = React.useState(false);

    return(
        <>
        <Button
          variant='outlined'
          className={classes.errorButton}
          onClick={() => setOpen(true)}>
            See details of unrecognised searches ({errors.length})
        </Button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>Unrecognised Searches</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Unrecognised search terms:
                    <ul>
                        {errors.map((e) => (
                            <li key={e}>
                                {e}
                            </li>
                        ))}
                    </ul>

                    Searches of the following formats are supported:
                    <ul>
                        <li>Protein name (e.g. nsp1)</li>
                        <li>Uniprot ID can replace protein name when it unambiguously identifies the protein (e.g. P0DTC7 but not P0DTD1 as it is the orf1ab polyprotein)</li>
                        <li>Protein position (e.g. nsp2 1 or nsp2 A1, specifying the WT)</li>
                        <li>Specific variant (e.g. nsp12 K603D or nsp12 603D, without specifying the WT). Not specifying the WT is slightly slower to search.</li>
                    </ul>

                    Note: some syntatically valid searches yield no results too, for example if the position is not within the protein.
                </DialogContentText>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default SearchErrors