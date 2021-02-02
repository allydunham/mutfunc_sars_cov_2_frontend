import React from "react";
import Typography from '@material-ui/core/Typography';

import {
    Labels,
    MSAViewer,
    PositionBar,
    SequenceViewer,
    createMSAStore
  } from 'react-msa-viewer';

const SiftAlignmnet = ({seqs, hidden, width=600, height=500}) => {
    const msaStore = createMSAStore({
            sequences: seqs,
            width: width,
            height: Math.min(50 + 20 * seqs.length, height),
            markerSteps: 4,
            sequenceScrollBarPositionX: 'top'
        })

    return(
        <div hidden={hidden}>
            {seqs.length > 0 ? (
                <MSAViewer msaStore={msaStore}>
                    <div style={{display: "flex"}} >
                        <div>
                            <br/>
                            <br/>
                            <Labels/>
                        </div>
                        <div>
                            <br/>
                            <PositionBar/>
                            <SequenceViewer/>
                        </div>
                    </div>
                </MSAViewer>
            ) : (
                <Typography>No alignment</Typography>
            )}
        </div>
    )
}

export default SiftAlignmnet