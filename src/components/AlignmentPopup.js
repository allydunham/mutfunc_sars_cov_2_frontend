import React, { Suspense, useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {json} from 'd3-fetch';
const SiftAlignment = React.lazy(() => import('./SiftAlignment'))

const AlignmentPopup = ({mut, open, setOpen, relativeSize=true, width=0.5, height=0.7}) => {
    const [seqs, setSeqs] = useState([])

    useEffect(() => {
        let gene = mut['uniprot'] + '_' + mut['name']
        console.log('Fetching Fasta: ' + gene);
        const url = process.env.PUBLIC_URL + '/data/sift_alignments/' + gene + '.json'
        json(url)
          .then((fasta) => setSeqs(fasta))
          .catch((err) => setSeqs([]))
    }, [mut]);

    if (relativeSize){
        width = Math.round(width * window.innerWidth)
        height = Math.round(height * window.innerHeight)
    }

    return(
        <Dialog open={open} onClose={() => setOpen(false)} scroll='body' fullWidth maxWidth='lg'>
            <DialogTitle>
                SIFT4G Alignment - {mut['uniprot']} {mut['name']}
            </DialogTitle>
            <DialogContent>
                <Grid container justify='center' alignItems='center'>
                    <Grid item xs={12}>
                        <Typography>
                            {seqs.length} sequences aligned. Click and drag to scroll the alignment.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Suspense fallback={<CircularProgress />}>
                            <SiftAlignment
                              seqs={seqs}
                              width={width}
                              height={height}
                            />
                        </Suspense>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default AlignmentPopup