import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Autocomplete, Grid, IconButton, TextField, Typography } from '@mui/material';
import s from './HandlerApartament.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { client } from '../../../API/api';


export default function HandlerApartament({ title, apartament, request }) {
    const [newApartament, setNewApartament] = useState({})
    const fillNewApartament = (key) => (value) => setNewApartament({ ...newApartament, [key]: value })

    useEffect(() => {
        if (apartament) setNewApartament(apartament)
    }, [apartament])

    const reducerApartament = () => {
        switch (request) {
            case 'post':
                client.post('/apartaments', newApartament)
                    .then(() => window.location.reload())
                break;
            case 'put':
                fillNewApartament('_id')(apartament.id);
                client.put('/apartaments', newApartament)
                    .then(() => window.location.reload(false))
                    .catch((e) => console.log(e))
                break;
            default:
                break;
        }
    }

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const stats = ['Бронь', 'Куплено', 'Бартер', 'Рассрочка', 'Активна']
    const statsButtons = stats.map((text, i) => (
        <Button
            onClick={() => fillNewApartament('status')(text)}
            className={newApartament?.status === text ? s.active : ''}
            key={i}
        >
            {text}
        </Button>
    ))

    const removeStatus = () => {
        setNewApartament(current => {
            const copy = { ...current };
            delete copy['status'];
            return copy;
        });
    };

    const [managers, setManagers] = useState([])
    useEffect(() => {
        client.get('/managers')
            .then((res) => setManagers(res.data))
    }, [])

    const getBusyUntilDate = (date) => {
        const [day, month, year, hours, minutes] = date.split(/[.: ]/);
        const dateObject = new Date(year, month - 1, day, hours, minutes);
        return dayjs(dateObject)
    }

    const list = (anchor) => (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            className={s.grid}
        >
            <Grid className={s.title} item>
                <Typography variant="h5">
                    {title}
                </Typography>
                <IconButton onClick={toggleDrawer(anchor, false)}><CloseIcon /></IconButton>
            </Grid>
            <Grid className={s.form} item xs={9}>
                <TextField
                    value={newApartament.apartament || ''}
                    onChange={(e) => fillNewApartament('apartament')(e.target.value)}
                    label='№ Квартиры'
                    fullWidth
                    variant="filled"
                    size="small"
                    type='number'
                />
                <TextField
                    value={newApartament.object || ''}
                    onChange={(e) => fillNewApartament('object')(e.target.value)}
                    label='Название'
                    fullWidth
                    variant="filled"
                    size="small"
                />
                <TextField
                    value={newApartament.floor || ''}
                    onChange={(e) => fillNewApartament('floor')(e.target.value)}
                    label='Этаж'
                    fullWidth
                    variant="filled"
                    size="small"
                    type='number'
                />
                <TextField
                    value={newApartament.kv || ''}
                    onChange={(e) => fillNewApartament('kv')(e.target.value)}
                    label='КВ'
                    fullWidth
                    variant="filled"
                    size="small"
                    type='number'
                />
                <TextField
                    value={newApartament.price || ''}
                    onChange={(e) => fillNewApartament('price')(e.target.value)}
                    label='Цена'
                    fullWidth
                    variant="filled"
                    size="small"
                    type='number'
                />
                <div className={s.status}>
                    {statsButtons}
                    <Button onClick={removeStatus}>Отмена</Button>
                </div>
                {
                    newApartament.status === 'Бронь' || newApartament.status === 'Куплено' ?
                        <>
                            <Autocomplete
                                value={newApartament.client || null}
                                onChange={(e, newValue) => fillNewApartament('client')(newValue)}

                                disablePortal
                                options={managers.map((man) => man.fullName)}
                                renderInput={(params) => <TextField {...params} label="Клиент" />}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        defaultValue={newApartament.busyUntil ? getBusyUntilDate(newApartament.busyUntil) : null}
                                        onChange={(e) => fillNewApartament('busyUntil')(dayjs(e).format('DD.MM.YYYY hh:mm'))}
                                        ampm={false}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </>
                        :
                        ''
                }
            </Grid>
            <Grid item xs className={s.submit}>
                <Button onClick={reducerApartament} fullWidth variant='contained'>Сохранить</Button>
                <Button onClick={toggleDrawer(anchor, false)}>Отменить</Button>
            </Grid>
        </Grid>
    );

    return (
        <div>
            <div>
                <React.Fragment>
                    {
                        request === 'put' ?
                            <Button
                                onClick={toggleDrawer('right', true)}
                                size='small'
                            >
                                Изменить
                            </Button>
                            :
                            <Button
                                size="medium"
                                variant="outlined"
                                color="success"
                                onClick={toggleDrawer('right', true)}
                            >
                                Добавить
                            </Button>
                    }
                    <Drawer
                        anchor={'right'}
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                    >
                        {list('right')}
                    </Drawer>
                </React.Fragment>
            </div>
        </div>
    );
}