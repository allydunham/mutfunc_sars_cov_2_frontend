// Functions to check if mutations fulfil various conditions for deleteriousness
export const conservationText = "SIFT4G Score < 0.05 (High Confidence)"
export const conservation = (mut) => {
    return(mut['sift_score'] < 0.05 &&
           mut['sift_median'] <= 3.25)
}

export const conservationWeakText = "SIFT4G Score < 0.05 (Low Confidence)"
export const conservationWeak = (mut) => {
    return(mut['sift_score'] < 0.05 &&
           (mut['sift_median'] > 3.25))
}

export const structureText = "|FoldX \u0394\u0394G| > 1"
export const structure = (mut) => {
    return(Math.abs(mut['foldx_ddg']) > 1)
}

export const ptmText = "PTM"
export const ptm = (mut) => {
    return(mut['ptm'] !== '')
}

export const interfacesText = "Protein Interface"
export const interfaces = (mut) => {
    return(mut['interfaces'].length > 0)
}

export const frequencyText = "Observed Frequency > 0.01"
export const frequency = (mut) => {
    return(mut['freq'] > 0.01)
}

export const antibodyText = "Experimental Antibody Escape"
export const antibody = (mut) => {
    return(mut['mut_escape_mean'] > 0.05 || mut['mut_escape_max'] > 0.2)
}
