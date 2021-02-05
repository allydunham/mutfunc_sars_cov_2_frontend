import React, { useState, Fragment } from "react";
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

const DetailsSection = ({title, small, children}) => {
    return(
        <>
        {!title ? null : (
            <TableRow>
                <TableCell variant='head'>
                    <Typography variant='h5'>
                        <br/>{title}
                    </Typography>
                </TableCell>
            </TableRow>
        )}
        {typeof children === 'undefined' ? null : (
            small ? (
                children.map((v, i) => <TableRow key={i}><TableCell>{v}</TableCell></TableRow>)
            ) : (
                <TableRow>
                    {children.map((v, i) => <TableCell key={i}>{v}</TableCell>)}
                </TableRow>
            )
        )}
        </>
    )
}

const ConservationSection = ({mut, small}) => {
    const [alignOpen, setAlignOpen] = useState(false);
    return(
        <DetailsSection small={small} title='Conservation'>
            <Typography>
                <b>Frequency</b>: {isNaN(mut['freq']) ? 'Not Observed': mut['freq']}
            </Typography>
            <Typography>
                <b>SIFT4G Score</b>: {isNaN(mut['sift_score']) ? 'NA': mut['sift_score']}
            </Typography>
            <Typography>
                <b>SIFT4G Median IC</b>: {isNaN(mut['sift_median']) ? 'NA': mut['sift_median']}
                &nbsp;
                {mut['sift_median'] > 3.25 ? (
                    <Tooltip title="Median IC scores are ideally between 2.75 and 3.5. Scores >3.25 and especially >3.5 indicate potentially poor alignment quality. Check the alignment is informative before interpreting the SIFT4G Score">
                        <WarningIcon color='error' fontSize='inherit'/>
                    </Tooltip>
                ) : null}
            </Typography>
            <>
            <Button
                color='primary'
                onClick={() => setAlignOpen(true)}
                disabled={isNaN(mut['sift_score'])}>
                View SIFT4G alignment
            </Button>
            <AlignmentPopup mut={mut} open={alignOpen} setOpen={setAlignOpen}/>
            </>
        </DetailsSection>
    )
}

const StructureSection = ({mut, small}) => {
    const [fxOpen, setFxOpen] = useState(false);
    return(
        <DetailsSection small={small} title='Structure'>
            <Typography>
                <b>PTM</b>: {mut['ptm'] === "" ? 'None' : mut['ptm']}
            </Typography>
            <Typography>
                <b>Template</b>: {mut['template'] === '' ? "None" : (
                <Link
                    href={"https://www.ebi.ac.uk/pdbe/entry/pdb/" + mut['template'].split('.')[0]}
                    target="_blank"
                    rel="noopener noreferrer">
                    {mut['template']}
                </Link>
                )}
            </Typography>
            <Typography>
                <b>Rel. Surface Accessibility</b>: {isNaN(mut['relative_surface_accessibility']) ? 'NA': mut['relative_surface_accessibility']}
            </Typography>
            <Typography>
                <b>FoldX &Delta;&Delta;G</b>: {isNaN(mut['foldx_ddg']) ? 'NA': mut['foldx_ddg']}
            </Typography>
            <>
                <Button
                    color='primary'
                    onClick={() => setFxOpen(true)}
                    disabled={mut['template'] === ''}>
                    View Structure
                </Button>
                <StructurePopup mut={mut} open={fxOpen} setOpen={setFxOpen}/>
            </>
        </DetailsSection>
    )
}

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

const Interface = ({mut, int, small}) => {
    const [intOpen, setIntOpen] = useState(false);

    return(
    <DetailsSection small={small}>
        <Typography>
            <b>Interface partner</b>: <Link href={"https://www.uniprot.org/uniprot/" + int['uniprot']} target="_blank" rel="noopener noreferrer">{int['uniprot']}</Link> {int['name'] in sarsDisplayNames ? sarsDisplayNames[int['name']] : int['name']}
        </Typography>
        <Typography>
            <b>Template</b>: <Link href={"https://www.ebi.ac.uk/pdbe/entry/pdb/" + int['template'].split('.')[0]} target="_blank" rel="noopener noreferrer">{int['template']}</Link>
        </Typography>
        <Typography>
            <b>Interface &Delta;&Delta;G</b>: {isNaN(int['diff_interaction_energy']) ? 'NA': int['diff_interaction_energy']}
        </Typography>
        <Typography>
            {getInterfaceNumString(int['diff_interface_residues'])}
        </Typography>
        <>
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
        </>
    </DetailsSection>
    )
}

const InterfaceSection = ({mut, small}) => {
    if (mut['interfaces'].length === 0){
        return(
            <DetailsSection small={small} title='Interfaces'>
                <Typography>No interfaces in dataset</Typography>
            </DetailsSection>
        )
    }
    return(
        <>
        <DetailsSection small={small} title='Interfaces'/>
        {mut['interfaces'].map((x) => (
            <Interface key={x['template']} mut={mut} int={x} small={small}/>
        ))}
        </>
    )
}

const ExperimentSection = ({mut, small}) => {
    if (isNaN(mut['mut_escape_mean'])){
        return(null)
    }
    return(
        <DetailsSection small={small} title='Experimental Results'>
            <Typography variant='subtitle1'>
                Antibody Escape Spike DMS <Link href="https://doi.org/10.1016/j.chom.2020.11.007" target="_blank" rel="noopener noreferrer">(Greaney et al. 2021)</Link>
            </Typography>
            <Typography>
                <b>Escape Proportion</b>
            </Typography>
            <Typography>
                <b>Mean</b>: {isNaN(mut['mut_escape_mean']) ? 'NA': mut['mut_escape_mean']}
            </Typography>
            <Typography>
                <b>Max</b>: {isNaN(mut['mut_escape_max']) ? 'NA': mut['mut_escape_max']}
            </Typography>
        </DetailsSection>
    )
}


const AnnotationLine = ({str}) => {
    let links = [...str.matchAll(/\[([^[\]]+)\]\(([\w-.:/?=#]+)\)/g)].map((v, i) => <Link key={'l' + i} href={v[2]} target="_blank" rel="noopener noreferrer">{v[1]}</Link>)

    str = str.split(/\[[^[\]]+\]\([\w-.:/?=#]+\)/g).reduce((a, v, i) => a.concat(<Fragment key={'t' + i}>{v}</Fragment>, links[i]), [])

    return(
        <li>
            {str}
        </li>
    )
}

const AnnotationSection = ({mut, small}) => {
    if (mut['annotation'] === ''){
        return(null)
    }

    return(
        <>
        <TableRow>
            <TableCell variant='head'>
                <Typography variant='h5'>
                    <br/>Additional Annotation
                </Typography>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={small ? 1 : 5}>
                <Typography component='span'>
                <ul>
                    {mut['annotation'].split(';').map((v, i) => <AnnotationLine key={i} str={v}/>)}
                </ul>
                </Typography>
            </TableCell>
        </TableRow>
        </>
    )
}

const MutDetails = ({mut, small}) => {
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
              direction={small ? 'column' : 'row'}
              justify={small ? 'space-evenly' : 'space-around'}
              alignItems={small ? 'center' : 'stretch'}
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
                {small ? null : (
                <Grid item xs={12} className={classes.root}>
                    <GenomeViewer geneName={mut['name']} mutPosition={mut['position']}/>
                </Grid>
                )}
                <Grid item xs={10}>
                    <Table>
                        <TableBody>
                            <ConservationSection small={small} mut={mut}/>
                            <StructureSection small={small} mut={mut}/>
                            <InterfaceSection small={small} mut={mut}/>
                            <ExperimentSection small={small} mut={mut}/>
                            <AnnotationSection small={small} mut={mut}/>
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default MutDetails