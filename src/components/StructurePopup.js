import React, { Suspense } from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles';
import { sarsDisplayNames } from '../lib/sars';

const ProteinViewer = React.lazy(() => import('./ProteinViewer'))

const styles = makeStyles({
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

const StructurePopup = ({mut, int, open, setOpen, relativeSize=true, width=0.5, height=0.6}) => {
    const classes = styles()
    let template = ''
    let chain = ''
    let path = ''
    let int_chain = ''

    let name = sarsDisplayNames[mut['name']]
    let int_name = ''

    if (int){
        [template, chain, int_chain] = int['template'].split('.')
        path = [process.env.PUBLIC_URL, 'data/pdb_interface/', template, '.pdb'].join('')
        int_name = int['name'] in sarsDisplayNames ? sarsDisplayNames[int['name']] : int['name']
    } else {
        [template, chain] = mut['template'].split('.')
        path = [process.env.PUBLIC_URL, 'data/pdb_foldx/', mut['uniprot'], '_',
                mut['name'], '/', template, '.pdb'].join('')
    }

    if (relativeSize){
        width = Math.round(width * window.innerWidth)
        height = Math.round(height * window.innerHeight)
    }

    return(
        <Dialog open={open} onClose={() => setOpen(false)} scroll='body' fullWidth maxWidth='lg'>
            <DialogTitle disableTypography className={classes.title}>
                <Typography variant='h6'>
                    {int ? 'Interface Structure Model: ' + name + ' - ' + int_name : 'Structure Model: ' + sarsDisplayNames[mut['name']]}
                </Typography>
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container justify='space-evenly' alignItems='center'>
                    <Grid item xs={6}>
                        <Typography>
                            Drag to rotate the protein and use the scroll wheel or pinch with two fingers to zoom.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Suspense fallback={<CircularProgress />}>
                            <ProteinViewer
                              pdb_path={path}
                              position={mut['position']}
                              chain={chain}
                              int_chain={int_chain}
                              width={width}
                              height={height}
                            />
                        </Suspense>
                    </Grid>
                    <Grid item>
                        <Typography display='inline' variant='h5' style={{color: '#e6180d'}}>
                            &#9632;&nbsp;
                        </Typography>
                        <Typography display='inline'>Mutant Position</Typography>
                    </Grid>
                    <Grid item>
                        <Typography display='inline' variant='h5' style={{color: '#8cb2f2'}}>
                            &#9632;&nbsp;
                        </Typography>
                        <Typography display='inline'>{name}</Typography>
                    </Grid>
                    {int ? (
                    <Grid item>
                        <Typography display='inline' variant='h5' style={{color: '#fa8ce6'}}>
                            &#9632;&nbsp;
                        </Typography>
                        <Typography display='inline'>{int_name}</Typography>
                    </Grid>
                    ) : null}
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default StructurePopup