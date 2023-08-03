import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import s from './HandlerApartament.module.css';
import CloseIcon from '@mui/icons-material/Close';
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
                client.post('/managers', newApartament)
                    .then(() => window.location.reload())
                break;
            case 'put':
                fillNewApartament('_id')(apartament.id);
                client.put('/managers', newApartament)
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
                    value={newApartament.fullName || ''}
                    onChange={(e) => fillNewApartament('fullName')(e.target.value)}
                    label='ФИО'
                    fullWidth
                    variant="filled"
                    size="small"
                />
                <TextField
                    value={newApartament.phone || ''}
                    onChange={(e) => fillNewApartament('phone')(e.target.value)}
                    label='Телефон'
                    fullWidth
                    variant="filled"
                    size="small"
                />
                <TextField
                    value={newApartament.email || ''}
                    onChange={(e) => fillNewApartament('email')(e.target.value)}
                    label='Почта'
                    fullWidth
                    variant="filled"
                    size="small"
                />
                <TextField
                    value={newApartament.password || ''}
                    onChange={(e) => fillNewApartament('password')(e.target.value)}
                    label='Временный пароль'
                    fullWidth
                    variant="filled"
                    size="small"
                />
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