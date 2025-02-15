import React from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    root: {
        flexGrow: 1,
        margin: 'auto',
        padding: '10px',
        width: '70%'
    },
    heading: {
        paddingTop: '50px'
    },
    content: {
        paddingTop: '25px',
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: '30px',
        paddingTop: '25px'
    },
    image: {
        marginRight: '10px'
    },
    button: {
        textTransform: 'none'
    }
});

const About = () => {
    const classes = styles()
    return(
        <div className={classes.root}>
            <Typography variant='h5' className={classes.heading}>
                18/05/2021 - Version 1.1.0
            </Typography>
            <Typography component={'span'} className={classes.content}>
                Added a data table containing FoldX results for the Spike protein in both open and closed conformations.
            </Typography>

            <Typography variant='h5' className={classes.heading}>
                21/04/2021 - Version 1.0.2
            </Typography>
            <Typography component={'span'} className={classes.content}>
                Added annotations for strain B.1.617, which emerged in India in Febuary.
            </Typography>

            <Typography variant='h5' className={classes.heading}>
                05/03/2021 - Version 1.0.1
            </Typography>
            <Typography component={'span'} className={classes.content}>
                Added basic Google Analytics in order to keep track of usage and prioritise development efforts.
            </Typography>

            <Typography variant='h5' className={classes.heading}>
                01/02/2021 - Version 1.0.0
            </Typography>
            <Typography component={'span'} className={classes.content}>
                The initial pipeline implementation calculated the following statistics:
                <ul>
                    <li>SIFT4G Scores</li>
                    <li>FoldX &Delta;&Delta;G for the top structures/model(s) from SWISS-MODEL for each protein</li>
                    <li>
                        FoldX Interface residues and binding &Delta;&Delta;G for the following complexes:
                        <ul>
                            <li>S - ACE2</li>
                            <li>S homotrimer</li>
                            <li>Nucleocapsid homodimer</li>
                            <li>Nsp1 - 40s Ribosome Subunit</li>
                            <li>Nsp7 - Nsp8</li>
                            <li>Nsp7 - Nsp8 - RdRp</li>
                            <li>Nsp10 - ExoN</li>
                            <li>Nsp10 - Nsp16</li>
                            <li>Orf3a homodimer</li>
                            <li>Orf9b homodimer</li>
                            <li>Orf9b - Tom70</li>
                            <li>Replication Complex (nsp7, nsp8, RdRp and Hel)</li>
                            <li>S RBD - COVA2-04 Antibody (7JMO)</li>
                            <li>S RBD - REGN Antibody (6XDG)</li>
                            <li>S Open State RBD - H014 Fab Antibody (7CAI)</li>
                            <li>S Open State RBD - H014 Fab Antibody (7CAK)</li>
                        </ul>
                    </li>
                    <li>Phosphorylation sites</li>
                    <li>Variant frequency, based on the GISAID dataset from 16/10/2020</li>
                    <li>Antibody Escape data from Greaney et al. 2021</li>
                    <li>Manual variant annotation, for exampling giving well known strains a variant is found in</li>
                </ul>
            </Typography>
            <Typography component={'span'} className={classes.content}>
                The initial website included the following features:
                <ul>
                    <li>Searching variants via uniprot ID, protein name, position, wild-type and variant</li>
                    <li>View results with significant predictions highlighted</li>
                    <li>Filter results by prediction</li>
                    <li>Show details of selected variant</li>
                    <li>SIFT4G alignment viewer</li>
                    <li>Structure viewer for proteins and interfaces</li>
                </ul>
            </Typography>
        </div>
    )
}

export default About
