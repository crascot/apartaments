import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import s from './TableBlock.module.css'
import MenuData from './menu/MenuData';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'fullName',
        label: 'ФИО',
    },
    {
        id: 'phone',
        label: 'Телефон',
    },
    {
        id: 'email',
        label: 'Почта',
    },
    {
        id: 'dateCreated',
        label: 'Дата создания',
    },
    {
        id: 'countDeal',
        label: 'Кол-во сделок',
    }
];

function TableBlockHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, i) => (
                    <TableCell
                        key={i}
                        align='left'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
}

TableBlockHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function TableBlock({ rows }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)),
        [order, orderBy, rows],
    );

    return (
        <TableContainer>
            <Table className={s.TableBlock}>
                <TableBlockHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {visibleRows.map((row, index) => (
                        <TableRow hover key={index}>
                            <TableCell align="left">{row.fullName}</TableCell>
                            <TableCell align="left">{row.phone}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.dateCreated}</TableCell>
                            <TableCell align="left">{row.countDeal}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="left"><MenuData row={row} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}