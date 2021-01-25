import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sarsDisplayNames } from '../lib/sars'

import GenomeViewer from './GenomeViewer'
import MutBadges from './MutBadges'
import AlignmentPopup from './AlignmentPopup'
import StructurePopup from './StructurePopup'

const TableCell = withStyles({
    root: {
      borderBottom: "none",
      padding: '2px'
    }
  })(MuiTableCell);

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        display: 'flex',
        paddingLeft: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(0),
        paddingBottom: theme.spacing(0)
    }
}));

const getInterfaceNumString = (change) => {
    switch (Math.sign(change)){
        case 0:
            return('No change in interface residues')
        case 1:
            return(change + ' interface residues gained')
        case -1:
            return(Math.abs(change) + ' interface residues lost')
        default:
            return('Unknown interface residue count change')
    }
}

const EmptyInterfaceRow = () => {
    return(
        <TableRow>
            <TableCell>
                No interfaces in this dataset
            </TableCell>
        </TableRow>
        )
}

const InterfaceRow = ({mut, int}) => {
    const [intOpen, setIntOpen] = useState(false);

    return(
    <TableRow>
        <TableCell>
            Interface partner: <Link href={"https://www.uniprot.org/uniprot/" + int['uniprot']} target="_blank" rel="noopener noreferrer"
            >{int['uniprot']}</Link> {int['name'] in sarsDisplayNames ? sarsDisplayNames[int['name']] : int['name']}
        </TableCell>
        <TableCell>
            Template: <Link href={"https://www.ebi.ac.uk/pdbe/entry/pdb/" + int['template'].split('.')[0]} target="_blank" rel="noopener noreferrer">{int['template']}</Link>
        </TableCell>
        <TableCell>
            Interface &Delta;&Delta;G: {isNaN(int['diff_interaction_energy']) ? 'NA': int['diff_interaction_energy']}
        </TableCell>
        <TableCell>
            {getInterfaceNumString(int['diff_interface_residues'])}
        </TableCell>
        <TableCell>
            <Button
                color='primary'
                onClick={() => setIntOpen(true)}
                disabled={int['template'] === ''}>
                View Interface
            </Button>
            <StructurePopup
                mut={mut}
                int={int}
                open={intOpen}
                setOpen={setIntOpen}
            />
        </TableCell>
    </TableRow>
    )
}

const MutDetailStats = ({mut}) => {
    const [fxOpen, setFxOpen] = useState(false);
    const [alignOpen, setAlignOpen] = useState(false);

    return(
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell variant='head'>
                        <Typography variant='h6'>
                            Conservation
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Frequency: {isNaN(mut['freq']) ? 'Not Observed': mut['freq']}
                    </TableCell>
                    <TableCell>
                        SIFT4G Score: {isNaN(mut['sift_score']) ? 'NA': mut['sift_score']}
                    </TableCell>
                    <TableCell>
                        SIFT4G Median IC: {isNaN(mut['sift_median']) ? 'NA': mut['sift_median']}
                        &nbsp;
                        {mut['sift_median'] > 3.25 ? (
                            <Tooltip title="Median IC scores are ideally between 2.75 and 3.5. Scores >3.25 and especially >3.5 indicate potentially poor alignment quality. Check the alignment is informative before interpreting the SIFT4G Score">
                                <WarningIcon color='error' fontSize='inherit'/>
                            </Tooltip>
                        ) : null}
                    </TableCell>
                    <TableCell>
                        <Button
                            color='primary'
                            onClick={() => setAlignOpen(true)}
                            disabled={isNaN(mut['sift_score'])}>
                            View SIFT4G alignment
                        </Button>
                        <AlignmentPopup mut={mut} open={alignOpen} setOpen={setAlignOpen}/>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell variant='head'>
                        <Typography variant='h6'>
                            Structure
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        PTM: {mut['ptm'] === "" ? 'None' : mut['ptm']}
                    </TableCell>
                    <TableCell>
                        Template: {mut['template'] === '' ? "None" : (
                            <Link
                                href={"https://www.ebi.ac.uk/pdbe/entry/pdb/" + mut['template'].split('.')[0]}
                                target="_blank"
                                rel="noopener noreferrer">
                                {mut['template']}
                            </Link>
                        )}
                    </TableCell>
                    <TableCell>
                        Relative Surface Accessibility: {isNaN(mut['relative_surface_accessibility']) ? 'NA': mut['relative_surface_accessibility']}
                    </TableCell>
                    <TableCell>
                        FoldX &Delta;&Delta;G: {isNaN(mut['foldx_ddg']) ? 'NA': mut['foldx_ddg']}
                    </TableCell>
                    <TableCell>
                        <Button
                            color='primary'
                            onClick={() => setFxOpen(true)}
                            disabled={mut['template'] === ''}>
                            View Structure
                        </Button>
                        <StructurePopup mut={mut} open={fxOpen} setOpen={setFxOpen}/>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell variant='head'>
                        <Typography variant='h6'>
                            Interfaces
                        </Typography>
                    </TableCell>
                </TableRow>
                {mut['interfaces'].length === 0 ? (
                    <EmptyInterfaceRow/>
                ) : (
                    mut['interfaces'].map((x) => (
                    <InterfaceRow
                      key={x['template']}
                      mut={mut}
                      int={x}
                    />
                )))}
            </TableBody>
        </Table>
    )
}

const MutDetails = ({mut}) => {
   const classes = styles();

    if (mut == null){
        return(
            <Paper className={classes.root} variant="outlined" elevation={3}>
                <Typography align='center'>Click a result to view details</Typography>
            </Paper>
        )
    }

    const mut_text = [sarsDisplayNames[mut['name']], ' ', mut['wt'],
                      mut['position'], mut['mut']].join('')

    return(
        <Paper variant="outlined" elevation={2} className={classes.root}>
            <Grid
              container
              spacing={1}
              direction='row'
              justify="space-around"
              alignItems="stretch"
            >
                <Grid item xs={12}>
                    <Typography align='left' variant='h6' className={classes.title}>
                        <Link
                          href={"https://www.uniprot.org/uniprot/" + mut['uniprot']}
                          target="_blank"
                          rel="noopener noreferrer">
                            {mut['uniprot']}
                        </Link>
                        &nbsp;
                        {mut_text}
                        &nbsp;
                        <MutBadges mut={mut}/>
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.root}>
                    <GenomeViewer geneName={mut['name']} mutPosition={mut['position']}/>
                </Grid>
                <Grid item xs={10}>
                    <MutDetailStats mut={mut}/>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default MutDetails