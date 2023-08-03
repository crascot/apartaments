import { IconButton, Menu, MenuItem, TextField, Drawer, Grid, Typography, Backdrop, Card, CardContent, CardActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { client } from "../../../../API/api";
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import s from '../../HandlerApartament/HandlerApartament.module.css';
import style from './MenuData.module.css';

const MenuData = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const deleteApartament = async () => {
        await client.delete(`/managers/${row._id}`)
            .then(() => window.location.reload(false))
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [newApartament, setNewApartament] = useState({})
    const fillNewApartament = (key) => (value) => setNewApartament({ ...newApartament, [key]: value })

    useEffect(() => {
        setNewApartament(row)
    }, [row])

    const reducerApartament = () => {
        client.put('/managers', newApartament)
            .then(() => window.location.reload(false))
            .catch((e) => console.log(e))
    }

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        handleClose();
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const [backdropOpen, setBackdropOpen] = useState(false);
    const handleBackdropClose = () => {
        setBackdropOpen(false);
    };
    const handleBackdropOpen = () => {
        handleClose();
        setBackdropOpen(true);
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
                    Изменить
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
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={toggleDrawer('right', true)}>
                    <Button size='small'>
                        Изменить
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleBackdropOpen} style={{ color: 'red' }}>Удалить</MenuItem>
            </Menu>

            <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
            >
                {list('right')}
            </Drawer>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropOpen}
            >
                <Card sx={{ minWidth: 449, padding: '30px 40px' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Вы действительно хотите удалить менеджера?
                        </Typography>
                    </CardContent>
                    <CardActions className={style.removeManager}>
                        <Button onClick={deleteApartament} sx={{backgroundColor: '#F0F0F0', color: 'black'}}>Да</Button>
                        <Button onClick={handleBackdropClose} sx={{backgroundColor: '#CEE6FC', color: 'black'}}>Нет</Button>
                    </CardActions>
                </Card>
            </Backdrop>
        </>
    )
}

export default MenuData;