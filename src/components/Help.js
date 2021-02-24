import React from "react";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { MutBadge } from './MutBadges'
import config from '../config'

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
    subheading: {
        paddingTop: '25px'
    },
    content: {
        paddingTop: '25px',
    },
    badgeList: {
        marginTop: 5,
        listStyle: 'none'
    },
    badgeKey: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10
    }
});

const Help = () => {
    const classes = styles()
    return(
        <div className={classes.root}>
            <Typography className={classes.content}>
                Mutfunc: SARS-CoV-2 provides a subset of <Link href='https://www.mutfunc.com'>Mutfunc</Link> variant effect predictions for SARS-CoV-2, the novel coronavirus responsible for COVID-19.
                Mutfunc is a database of precomputed variant effect predictions from various tools for all <i>S. cerevisiae</i>, <i>H. sapians</i> and <i>E. coli</i> variants.
                The main Mutfunc website has predictions based on conservation, structural consequences, protein interfaces, post-transational modifications, transcription factor binding sites and linear motifs.
                Mutfunc: SARS-CoV-2 currently covers variants' overall frequency, conservation, structural consequences, protein interfaces and phosphosites.
                The predictions found here are largely computational predictions and must be interpreted with care, complementaing other evidence or prioritising variants for further study.
            </Typography>
            <Typography className={classes.content}>
                The website provides an interface for searching variants online, downloading the complete dataset and gives an overview analysis of the data.
                Additional breakdowns of all statistics, for example the factors contributing to FoldX's &Delta;&Delta;G statistic, are available in the full dataset.
                Most features work on smaller screens/windows but the interface is geared towards for desktop so use on small screen may not be as smooth.
            </Typography>
            <Typography variant='h5' id='search' className={classes.heading}>
                Searching Variants
            </Typography>
            <Typography component={'span'} className={classes.content}>
                The search interface allows you to search SARS-CoV-2 variants with a number of terms:

                <ul>
                    <li>Protein names - all variants in a given protein (e.g. nsp1).</li>
                    <li>Uniprot ID - all variants for a Uniprot ID (e.g. P0DTC3)</li>
                    <li>Positions - A specific gene position (e.g. nsp1 1). Wildtype amino acid specification is also supported (e.g. nsp1 M1)</li>
                    <li>Specific variants - A specific variant (e.g. nsp1 M1A). Searching without the wildtype is also supported (e.g. nsp1 1A) but is slightly slower.</li>
                </ul>

                Formatting:
                <ul>
                    <li>Search terms should be separated by newlines, commas (,) or semicolons (;).</li>
                    <li>Any time a gene name is used the corresponding Uniprot ID can be used if it uniquely identifies the gene. The Uniprot IDs for the two polyprotein variants (P0DTD1 and P0DTC1) cannot replace names as they refer to multiple final proteins.</li>
                    <li>Gene name synonymns (sourced from Uniprot) are also supported, for example Pol, RdRp and nsp12 all refer to the same protein.</li>
                    <li>Gene names and Uniprot IDs are both case insensitive.</li>
                </ul>
            </Typography>
            <Typography variant='h5' id='results' className={classes.heading}>
                Results Table
            </Typography>
            <Typography component={'span'} className={classes.content}>
                The mutations returned by your search are displayed in a table, by default filtered to only display variants with a significant predicted effect.
                All identified variants can be displayed using the checkbox in the table controls.
                Variants are predicted to be significant if they fulfil any of the following conditions:

                <ul className={classes.badgeList}>
                    <li className={classes.badgeKey}>
                        <MutBadge type='frequency'/>
                        &nbsp;&nbsp;Frequency: The variant has been observed in &gt; 1% of samples taken since the start of the pandemic.
                    </li>
                    <li className={classes.badgeKey}>
                        <MutBadge type='conservation'/>
                        &nbsp;&nbsp;Conservation (High Confidence): SIFT4G Score &lt; 0.05 and Median IC &le; 3.25
                    </li>
                    <li className={classes.badgeKey}>
                        <MutBadge type='conservationWeak'/>
                        &nbsp;&nbsp;Conservation (Low Confidence): SIFT4G Score &lt; 0.05 but Median IC &gt; 3.25, indicating a potentially suboptimal alignment.
                    </li>
                    <li className={classes.badgeKey}>
                        <MutBadge type='structure'/>
                        &nbsp;&nbsp;Structure: FoldX &Delta;&Delta;G &gt; 1, indicating the variant destabilises the protein, or &Delta;&Delta;G &lt; 1, indicating stabilisation.
                    </li>
                    <li className={classes.badgeKey}>
                        <MutBadge type='interfaces'/>
                        &nbsp;&nbsp;Interfaces: The site is in a known interface with another protein. Includes other viral proteins, human proteins and antibodies.
                    </li>
                    <li className={classes.badgeKey}>
                        <MutBadge type='ptm'/>
                        &nbsp;&nbsp;PTM: The site has a post-translational modification (currently only phosphorylations are annotated).
                    </li>
                    <li className={classes.badgeKey}>
                        <MutBadge type='antibody'/>
                        &nbsp;&nbsp;Experimental Antibody Escape: variants have a mean antibody escape proportion over 0.05 or a maximum escape proportion over 0.2 <Link href="https://doi.org/10.1016/j.chom.2020.11.007" target="_blank" rel="noopener noreferrer">(Greaney et al., 2021)</Link>
                    </li>
                </ul>

                The predictions column shows which factors are predicted to be significant.
                Clicking on a row opens a panel with additional details on predictions for that variant.
            </Typography>
            <Typography variant='h5' id='predictions' className={classes.heading}>
                Predictions
            </Typography>
            <Typography className={classes.content}>
                Three categories of predictions and measurement are shown in the details panel of each variant: conservation, structure and interfaces.
            </Typography>
            <Typography variant='h6' id='conservation' className={classes.subheading}>
                Conservation
            </Typography>
            <Typography component={'span'} className={classes.content}>
                The conservation data consists of:
                <ul>
                    <li>The observed frequency of the variant in all samples since the start of the pandemic. This is calculated from an alignment of public sequences from GENBANK, COG-UK and The China National Center for Bioinformation, as used for <Link href="https://github.com/roblanf/sarscov2phylo" target="_blank" rel="noopener noreferrer">sarscov2phylo</Link></li>
                    <li>Whether the position has an post-translational modifications (currently only phosphorylations from <Link href="https://europepmc.org/article/med/32645325" target="_blank" rel="noopener noreferrer"> Bouhaddou et al. (2020) </Link> are included)</li>
                    <li><Link href="https://sift.bii.a-star.edu.sg/sift4g/" target="_blank" rel="noopener noreferrer"> SIFT4G </Link> score and Median IC</li>
                    <li>The alignment generated by SIFT4G (Warning: this display is not tuned for small window/screen sizes)</li>
                </ul>

                SIFT4G scores are sometimes generated from few or closely related sequences and need to be interpretted with caution, particularly when the median IC score is greater than 3.5. The optimal range is 2.75 &le; Median IC &le; 3.5. Viewing the alignment can help with interpretation, for example if the alignments has few very similar sequences the SIFT4G score may not be informative.
            </Typography>
            <Typography variant='h6' id='structure' className={classes.subheading}>
                Structure
            </Typography>
            <Typography component={'span'} className={classes.content}>
                The structural data consists of:
                <ul>
                    <li>Whether the position has a post-translational modifications (currently only phosphorylations from <Link href="https://europepmc.org/article/med/32645325" target="_blank" rel="noopener noreferrer"> Bouhaddou et al. (2020) </Link> are included)</li>
                    <li><Link href="https://swissmodel.expasy.org/" target="_blank" rel="noopener noreferrer">SWISS-Model</Link> template PDB</li>
                    <li><Link href="http://foldxsuite.crg.eu/" target="_blank" rel="noopener noreferrer">FoldX</Link> &Delta;&Delta;G statistic</li>
                    <li><Link href="http://wolf.bms.umist.ac.uk/naccess/" target="_blank" rel="noopener noreferrer">Naccess</Link> residue relative surface accessiblity measurement</li>
                </ul>

                Models were identified using the <Link href="https://swissmodel.expasy.org/repository/species/2697049" target="_blank" rel="noopener noreferrer">SWISS-Model COVID Repository</Link> and contain a mixture of experimental SARS-CoV-2 models and homology models. The quality and completeness of the structure should be considered when interpretting both predictions.
                This model is viewable with the variant highlighted.
                The FoldX &Delta;&Delta;G statistic summarises the predicted change in folding energy (&Delta;G) caused by a mutation.
                This measures the predicted stabilisation (&lt;0) or destabilisation (&gt;0) of the variant, with absolute values greater than one being considered significant.
                The Naccess prediction measures the relative percentage of the residue surface accessible to solvent compared to an extended Ala - X - Ala conformation.
            </Typography>
            <Typography variant='h6' id='interfaces' className={classes.subheading}>
                Interfaces
            </Typography>
            <Typography className={classes.content}>
                Protein interfaces, gathered from the SWISS-Model COVID Repository and PDBe, were also analysed using FoldX.
                It identifies the amino acids involved in an interface and assesses the properties of the interface.
                The amino acids in the interfaces were computationally mutated to all other amino acids and the interface assessed again by FoldX to determine variants affect on stability.
                This is again summarised by the &Delta;&Delta;G statistic and also includes the predicted change in the number of amino acids involved in the interface.
                Again the template and a viewable structure are available and should be used to help interpret the validity of these predictions.
            </Typography>
            <br/>
            <Typography component={'span'} className={classes.content}>
                Viral proteins are also likely to interact through interfaces not currently in the dataset, particularly if that interface does not have a structural model. The following interfaces are currently included:
                <ul>
                    {config.complexes.map((i) => <li key={i}>{i}</li>)}
                </ul>
            </Typography>
            <Typography variant='h6' id='experiments' className={classes.subheading}>
                Experimental Results
            </Typography>
            <Typography component={'span'} className={classes.content}>
                Currently this section only includes data from <Link href="https://doi.org/10.1016/j.chom.2020.11.007" target="_blank" rel="noopener noreferrer">Greaney et al. (2021)</Link>, who performed a deep mutational scan measuring the proportion of proteins carrying each Spike variant that escaped binding by a range of antibody mixtures. Further relavent large scale experiments may be added in future.
            </Typography>
            <Typography variant='h6' className={classes.subheading}>
                Additional Annotation
            </Typography>
            <Typography className={classes.content}>
                Further curated information about notable variants is included here. It includes presence in well known variant strains and observations from experiment. This data is manually curated and is therefore not comprehensive.
            </Typography>
        </div>
    )
}

export default Help