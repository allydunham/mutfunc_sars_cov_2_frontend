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
import MuiTooltip from "@material-ui/core/Tooltip";
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

const Tooltip = withStyles({
    tooltip: {
        color: "black",
        backgroundColor: "whitesmoke",
        border: "1px solid #000",
        borderRadius: 5
    },
    arrow: {
        fontSize: 16,
        width: 17,
        "&::before": {
            border: "1px solid #000",
            backgroundColor: "#fff",
            boxSizing: "border-box"
        }
    }
})(MuiTooltip);

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
    },
    hoverHeading: {
        textDecorationStyle: 'dotted',
        textDecorationLine: 'underline',
        textUnderlineOffset: '2px',
        fontWeight: 'bold',
        '&:hover': {
            color: 'grey'
        }
    },
    baseHeading: {
        fontWeight: 'bold'
    }
}));

// Round scores for display
function precise(x) {
    return Number.parseFloat(x).toPrecision(3);
}

const DetailsSection = ({title, small, children}) => {
    const mapper = small ? (
        (v, i) => <TableRow key={i}><TableCell>{v}</TableCell></TableRow>
    ) : (
        (v, i) => <TableCell key={i}>{v}</TableCell>
    )

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
        {small ? (
            React.Children.map(children, mapper)
        ) : (
            <TableRow>{React.Children.map(children, mapper)}</TableRow>
        )}
        </>
    )
}

const DetailItem = (props) => {
    const classes = styles()
    const {title, value = false, tooltip = false, alert = false, alertTooltip = false} = props

    return(
        <>
            {tooltip !== false ? (
                <Tooltip title={tooltip} interactive arrow leaveDelay={300} enterDelay={300}>
                    <Typography display='inline' className={classes.hoverHeading}>
                        {title}
                    </Typography>
                </Tooltip>
            ) : (
                <Typography display='inline' className={classes.baseHeading}>
                    {title}
                </Typography>
            )}
            {value !== false ? (
            <Typography display='inline'>
                :&nbsp;{value}
                {alert ? (
                <Tooltip title={alertTooltip} interactive arrow leaveDelay={300} enterDelay={300}>
                    {alert}
                </Tooltip>
                ) : null}
            </Typography>
            ) : null}
        </>
    )
}

const ConservationSection = ({mut, small}) => {
    const [alignOpen, setAlignOpen] = useState(false);

    return(
        <DetailsSection small={small} title='Conservation'>
            <DetailItem
              title="Frequency"
              value={isNaN(mut['freq']) ? 'Not Observed': precise(mut['freq'])}
              tooltip="Frequency reflects the overall frequency a variant has been observed since the start of the pandemic, across a large library of samples. It does not reflect current global or regional prevalence"
            />
            <DetailItem
              title="SIFT4G Score"
              value={isNaN(mut['sift_score']) ? 'NA': precise(mut['sift_score'])}
              tooltip="Score generated by SIFT4G. Scores <0.05 are considered deleterious."
            />
            <DetailItem
              title="SIFT4G Median IC"
              value={isNaN(mut['sift_median']) ? 'NA': precise(mut['sift_median'])}
              tooltip="Describes the reliability of SIFT4G scores. Median IC scores are ideally between 2.75 and 3.5. Scores >3.25 and especially >3.5 indicate potentially poor alignment quality. Check the alignment is informative before interpreting the SIFT4G Score"
              alert={mut['sift_median'] > 3.25 ? <WarningIcon color='error' fontSize='inherit'/> : null}
              alertTooltip="High Median IC - Check alignment quality"
            />
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
            <DetailItem
              title="PTM"
              value={mut['ptm'] === "" ? 'None' : mut['ptm']}
              tooltip="Post-translational modification"
            />
            <DetailItem
              title="Template"
              value={mut['template'] === '' ? "None" : (
                <Link
                    href={"https://www.ebi.ac.uk/pdbe/entry/pdb/" + mut['template'].split('.')[0]}
                    target="_blank"
                    rel="noopener noreferrer">
                    {mut['template']}
                </Link>
              )}
            />
            <DetailItem
              title="Surface Accessibility"
              value={isNaN(mut['relative_surface_accessibility']) ? 'NA': precise(mut['relative_surface_accessibility'])}
              tooltip="All atom relative residue surface accessibility"
            />
            <DetailItem
              title={<>FoldX &Delta;&Delta;G</>}
              value={isNaN(mut['foldx_ddg']) ? 'NA': precise(mut['foldx_ddg'])}
              tooltip="Predicted change in the protein's folding Gibbs Free Energy change caused by this mutation. Values greater than 1 are considered significantly destabilising and those less than -1 stabilising."
            />
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

const Interface = ({mut, int, small}) => {
    const [intOpen, setIntOpen] = useState(false);

    return(
    <DetailsSection small={small}>
        <DetailItem
          title="Partner"
          value={<><Link href={"https://www.uniprot.org/uniprot/" + int['uniprot']} target="_blank" rel="noopener noreferrer">{int['uniprot']}</Link> {int['name'] in sarsDisplayNames ? sarsDisplayNames[int['name']] : int['name']}</>}
        />
        <DetailItem
          title="Template"
          value={<Link href={"https://www.ebi.ac.uk/pdbe/entry/pdb/" + int['template'].split('.')[0]} target="_blank" rel="noopener noreferrer">{int['template']}</Link>}
        />
        <DetailItem
          title={<>Interface &Delta;&Delta;G</>}
          value={isNaN(int['diff_interaction_energy']) ? 'NA': precise(int['diff_interaction_energy'])}
          tooltip="Change in interface binding Gibbs Free Energy change caused by this mutation. Values greater than 1 are considered significantly destabilising and those less than -1 stabilising."
        />
        <DetailItem
          title="Residue Change"
          value={isNaN(int['diff_interface_residues']) ? 'NA': int['diff_interface_residues']}
          tooltip="Change in the number of residues FoldX predicts contribute towards the interface"
        />
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
    return(
        <>
        <DetailsSection small={small} title='Interfaces'/>
        {mut['interfaces'].length === 0 ? (
            <TableRow>
                <TableCell colSpan={small ? 1 : 5}>
                    <Typography>
                        No interfaces in this dataset
                    </Typography>
                </TableCell>
            </TableRow>
        ) : (
        mut['interfaces'].map((x) => (
            <Interface key={x['template']} mut={mut} int={x} small={small}/>
        )))}
        </>
    )
}

const ExperimentSection = ({mut, small}) => {
    if (isNaN(mut['mut_escape_mean'])){
        return(null)
    }
    return(
        <DetailsSection small={small} title='Experimental Results'>
            <DetailItem
              title="Antibody Escape DMS"
              tooltip={<><Link href="https://doi.org/10.1016/j.chom.2020.11.007" target="_blank" rel="noopener noreferrer">Greaney et al. (2021)</Link> performed a deep mutational scan testing the proportional antibody escape of each Spike variant against a range of antibodies.</>}
            />
            <DetailItem
              title="Mean Escape"
              value={isNaN(mut['mut_escape_mean']) ? 'NA': precise(mut['mut_escape_mean'])}
            />
            <DetailItem
              title="Max Escape"
              value={isNaN(mut['mut_escape_max']) ? 'NA': precise(mut['mut_escape_max'])}
            />
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

const DetailsPanel = ({mut, small}) => {
   const classes = styles();

    if (mut == null){
        return(
            <Paper className={classes.root} variant="outlined" elevation={3}>
                <Typography align='center'>
                    Select a variant from the table below to view detailed annotation
                </Typography>
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

export default DetailsPanel