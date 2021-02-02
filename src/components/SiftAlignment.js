import React, { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import {
    Labels,
    MSAViewer,
    PositionBar,
    SequenceViewer,
  } from 'react-msa-viewer';

const SiftAlignmnet = ({seqs, hidden, width=600, height=500}) => {
    const [alignHeight, setAlignHeight] = useState(height)
    useEffect(() => setAlignHeight(Math.min(50 + 20 * seqs.length, height)), [height, seqs])

    return(
        <div hidden={hidden} width={width} height={height}>
            {seqs.length > 0 ? (
                <MSAViewer
                  sequences={seqs}
                  width={width}
                  height={alignHeight}
                  markerSteps={4}
                  sequenceScrollBarPositionX='top'
                >
                    <div style={{display: "flex"}} >
                        <div>
                            <br/>
                            <br/>
                            <Labels/>
                        </div>
                        <div>
                            <br/>
                            <PositionBar />
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