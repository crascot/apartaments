import { Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import s from './Content.module.css';
import TableBlock from './tableBlock/TableBlock';
import { client } from "../../API/api";
import HandlerApartament from "./HandlerApartament/HandlerApartament";

const Content = ({ title }) => {
    const [rows, setRows] = useState([])
    const [filteredRows, setFilteredRows] = useState([])
    const [headers, setHeaders] = useState(['Все'])

    useEffect(() => {
        client.get('/apartaments')
            .then((res) => setRows(res.data))
    }, [])

    useEffect(() => {
        setHeaders(Array.from(new Set(rows.map((el) => el.object))))
    }, [rows])

    useEffect(() => {
        setFilteredRows(rows)
    }, [rows])

    const filterRowsByObject = (object) => {
        setFilteredRows(rows.filter((el) => el.object === object))
    }

    const [filterStatus, setFilterStatus] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const filterByStatus = (status) => {
        setFilterStatus(status)
        setFilteredRows(rows.filter(el => el.status === status));
        handleClose()
    }
    const showAllRows = () => {
        setFilterStatus(null)
        setFilteredRows(rows);
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
        >
            <Grid
                item
                xs={1}
                container
                justifyContent='flex-start'
                className={s.header}
            >
                <Typography style={{ margin: '5px 30px', color: 'gray' }}>{title}</Typography>
                <hr style={{ width: '100%' }} />
            </Grid>
            <Grid
                item
                xs={1}
                container
                justifyContent='space-between'
                style={{ padding: '0 30px' }}
            >
                <div className={s.titles}>
                    <span onClick={() => setFilteredRows(rows)}>Все</span>
                    {
                        headers.map((el, i) => (
                            <span onClick={() => filterRowsByObject(el)} key={i}>{el}</span>
                        ))
                    }
                </div>
                <HandlerApartament title='Добавить' request='post' />


                <div style={{ width: '100%', marginTop: 30 }}>
                    <Button onClick={handleClick} className={s.filter}>
                        Фильтр
                    </Button>
                    {
                        filterStatus !== null ?
                            <span style={{ width: '100%' }}>
                                <Button onClick={showAllRows} className={s.filter}>
                                    Отмена
                                </Button>
                            </span>
                            :
                            ''
                    }
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => filterByStatus('Активна')}>Активна</MenuItem>
                        <MenuItem onClick={() => filterByStatus('Бронь')}>Бронь</MenuItem>
                        <MenuItem onClick={() => filterByStatus('Куплено')}>Куплено</MenuItem>
                        <MenuItem onClick={() => filterByStatus('Рассрочка')}>Рассрочка</MenuItem>
                        <MenuItem onClick={() => filterByStatus('Бартер')}>Бартер</MenuItem>
                    </Menu>
                </div>

            </Grid>
            <Grid item xs={9} style={{ width: '100%', overflowY: 'auto', padding: '0 30px' }}>
                <TableBlock rows={filteredRows} />
            </Grid>
        </Grid>
    )
}

export default Content;