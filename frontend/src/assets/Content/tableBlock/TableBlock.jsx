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
import HandlerApartament from '../HandlerApartament/HandlerApartament';


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
        id: 'apartament',
        label: '№ Квартиры',
    },
    {
        id: 'object',
        label: 'Объект',
    },
    {
        id: 'floor',
        label: 'Этаж',
    },
    {
        id: 'kv',
        label: 'КВ',
    },
    {
        id: 'date',
        label: 'Дата',
    },
    {
        id: 'status',
        label: 'Статус',
    },
    {
        id: 'price',
        label: 'Цена',
    },
    {
        id: 'client',
        label: 'Клиент',
    },
    {
        id: 'info',
        label: 'Статус',
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

    const currentColor = (status) => {
        switch (status) {
            case 'Активна':
                return s.active;
            case 'Бронь':
                return s.booking;
            case 'Куплено':
                return s.bought;
            case 'Рассрочка':
                return s.installment;
            case 'Бартер':
                return s.barter;
            default:
                break;
        }
    }

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
                            <TableCell align="left">№{row.apartament}</TableCell>
                            <TableCell align="left">{row.object}</TableCell>
                            <TableCell align="left">{row.floor}</TableCell>
                            <TableCell align="left">{row.kv}</TableCell>
                            <TableCell align="left">{row.date}</TableCell>
                            <TableCell align="left">
                                <span className={`${s.status} ${currentColor(row.status)}`}>
                                    {row.status}
                                </span>
                            </TableCell>
                            <TableCell align="left">{String(row.price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} с</TableCell>
                            <TableCell align="left">{!row.client ? '-' : row.client}</TableCell>
                            <TableCell align="left">
                                {
                                    row.status === 'Бронь' ?
                                        `Бронь до ${row.busyUntil}`
                                        :
                                        row.status === 'Куплено' ?
                                            `Куплено ${row.busyUntil}`
                                            :
                                            ''
                                }
                            </TableCell>
                            <TableCell align="left"><HandlerApartament title='Изменить' apartament={row} request='put' /></TableCell>
                            <TableCell align="left"><MenuData id={row._id} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}