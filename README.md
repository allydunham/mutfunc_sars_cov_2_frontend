# Mutfunc: SARS-CoV-2 (Frontend)

This repository contains the frontend code for [Mutfunc: SARS-CoV-2](http://sars.mutfunc.com), which is a resource containing variant effect predictions and annotations for all possible SARS-CoV-2 amino acid substitutions.
The pipeline and analysis code is in a separate [repository](https://github.com/allydunham/mutfunc_sars_cov_2).
The dataset and methods are described in detail in the Mutfunc: SARS-CoV-2 [preprint](https://www.biorxiv.org/content/10.1101/2021.02.24.432721v1).


## Citation

Alistair Dunham, Gwendolyn M Jang, Monita Muralidharan, Danielle Swaney & Pedro Beltrao. 2021. A missense variant effect prediction and annotation resource for SARS-CoV-2 ([bioRxiv](https://www.biorxiv.org/content/10.1101/2021.02.24.432721v1))

## Usage

The site is made using [create-react-app](https://github.com/facebook/create-react-app) with [Reactjs](https://reactjs.org/) and [Material UI](https://material-ui.com/). [PV - Protein Viewer](https://biasmv.github.io/pv/) and [React MSA Viewer](https://github.com/plotly/react-msa-viewer) are used to display proteins and sequences.
The project can be installed and run with the usual `npm` commands (`npm install`, `npm start`, `npm run build`, etc.).

The project uses three main branches:

* master - The most recent WIP updates and features
* dev - Version currently being run on the test server
* prod - Version currently on the live server
