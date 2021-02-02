import React, { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MutBadges, { BadgeKey } from './MutBadges';
import MutTableOptions from './MutTableOptions';
import { sarsDisplayNames } from '../lib/sars'
import * as deleterious from '../lib/deleterious';

const NoLineTableCell = withStyles({
    root: {
      borderBottom: "none"
    }
})(TableCell);

const styles = makeStyles((theme) => ({
    tableControls: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%'
    },
    tableControlButton:{
        textTransform: 'none'
    },
    tableControlGroup:{
        paddingBottom: '10px'
    },
    tablePaper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    mutRow: {
        "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: "#d9d9d9"
        }
    },
    pageButton: {
        flexShrink: 0
    },
    pagination: {
        flex: 1,
        flexWrap: 1
    }
}));

const TablePaginationActions = ({count, page, rowsPerPage, onChangePage}) => {
    const classes = styles();

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.pageButton}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
            >
                <FirstPageIcon/>
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                <LastPageIcon/>
            </IconButton>
        </div>
    );
  }

const EmptyRow = ({filtered}) => {
    return(
        <TableRow key='noData'>
            <TableCell colSpan={2} align='center'>
                {filtered ? "No unfiltered results (see options for criteria)" : "No Results"}
            </TableCell>
        </TableRow>
    )
}

const MutRow = ({mutId, mutData, selectedMut, setSelectedMut}) => {
    const classes = styles()
    const mut = mutData[mutId]
    return(
        <TableRow
          hover
          selected={mutId === selectedMut}
          onClick={(event) => {
              setSelectedMut(mutId)
              document.getElementById('details').scrollIntoView({behavior: 'smooth'})
          }}
          className={classes.mutRow}
        >
            <TableCell>
                {[sarsDisplayNames[mut['name']], ' ', mut['wt'],
                    mut['position'], mut['mut']].join('')}
            </TableCell>
            <TableCell><MutBadges mut={mut}/></TableCell>
        </TableRow>
    )
}

const MutTable = ({ mutIds, mutData, selectedMut, setSelectedMut}) => {
    const classes = styles();
    const tableHeaders = ['Variant', 'Predictions'];

    const [options, setOptions] = useState({
        observed: false,
        viewAll: false,
        frequency: true,
        conservation: true,
        structure: true,
        ptm: true,
        interfaces: true
    })
    const [filteredIds, setFilteredIds] = useState([])
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 25;

    useEffect(() => {
        console.log('Filtering...')
        setFilteredIds(mutIds.filter((i) => {
            const mut = mutData[i]
            if (options['observed'] && isNaN(mut['freq'])){
                return false
            }

            if (options['viewAll']){
                return true
            }

            if (options['frequency'] && deleterious.frequency(mut)){
                return true
            }

            if (options['conservation'] && deleterious.conservation(mut)){
                return true
            }

            if (options['structure'] && deleterious.structure(mut)){
                return true
            }

            if (options['ptm'] && deleterious.ptm(mut)){
                return true
            }

            if (options['interfaces'] && deleterious.interfaces(mut)){
                return true
            }

            return false
        }))
    }, [mutIds, options, mutData])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return(
        <>
        <div className={classes.tablePaper}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <NoLineTableCell colSpan={2}>
                                <BadgeKey column/>
                            </NoLineTableCell>
                        </TableRow>
                        <TableRow>
                            <NoLineTableCell colSpan={2}>
                                <MutTableOptions
                                  options={options}
                                  setOptions={setOptions}
                                />
                            </NoLineTableCell>
                        </TableRow>
                        <TableRow>
                            <TablePagination
                              rowsPerPageOptions={[]}
                              colSpan={2}
                              count={filteredIds.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={handleChangePage}
                              ActionsComponent={TablePaginationActions}
                              classes={{toolbar: classes.pagination}}
                            />
                        </TableRow>
                        <TableRow key='header'>
                            {tableHeaders.map((i) => <TableCell key={i}>{i}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredIds.length === 0 ? (
                            <EmptyRow filtered={mutIds.length > 0}/>
                        ) : (
                            filteredIds
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((i) => (
                                <MutRow
                                    mutId={i}
                                    mutData={mutData}
                                    selectedMut={selectedMut}
                                    setSelectedMut={setSelectedMut}
                                    key={i}
                                />
                        )))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </>
    )
}

export default MutTable;