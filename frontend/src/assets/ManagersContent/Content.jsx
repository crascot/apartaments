import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import s from './Content.module.css';
import TableBlock from './tableBlock/TableBlock';
import { client } from "../../API/api";
import HandlerApartament from "./HandlerApartament/HandlerApartament";

const ManagersContent = ({ title }) => {
    const [rows, setRows] = useState([])
    const [filteredRows, setFilteredRows] = useState([])

    useEffect(() => {
        client.get('/managers')
            .then((res) => setRows(res.data))
    }, [])

    useEffect(() => {
        setFilteredRows(rows)
    }, [rows])

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
                <Typography style={{margin: '5px 30px', color: 'gray'}}>{title}</Typography>
                <hr style={{width: '100%'}} />
            </Grid>
            <Grid item xs={1} container justifyContent='space-between' style={{padding: '40px 30px'}}>
                <Button className={s.filter}>
                    Сортировка
                </Button>
                <HandlerApartament title='Добавить' request='post' />
            </Grid>
            <Grid item xs style={{ width: '100%', overflowY: 'auto', padding: '0 30px' }}>
                <TableBlock rows={filteredRows} />
            </Grid>
        </Grid>
    )
}

export default ManagersContent;