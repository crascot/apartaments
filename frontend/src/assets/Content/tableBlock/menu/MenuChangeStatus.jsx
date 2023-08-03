import { Autocomplete, Backdrop, Button, Card, CardActions, CardContent, Menu, MenuItem, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const MenuChangeStatus = ({ changedApartament, getDataChangedApartament }) => {
    const [changeToBusy, setChangeToBusy] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (stat) => {
        if (typeof (stat) === 'string') {
            getDataChangedApartament('status')(stat)
            setChangeToBusy(stat)
        } else stat = getDataChangedApartament.status

        setAnchorEl(null);
    };

    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        if (changeToBusy === 'Бронь' || changeToBusy === 'Куплено') {
            setBackdrop(true)
        }
    }, [changeToBusy])

    const clients = [
        { label: 'Сергей' },
        { label: 'Александр' },
        { label: 'Петров' },
    ]

    return (
        <>
            <Button onClick={handleClick}>
                {changedApartament.status}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClose('Активна')}>Активна</MenuItem>
                <MenuItem onClick={() => handleClose('Бронь')}>Бронь</MenuItem>
                <MenuItem onClick={() => handleClose('Куплено')}>Куплено</MenuItem>
                <MenuItem onClick={() => handleClose('Рассрочка')}>Рассрочка</MenuItem>
                <MenuItem onClick={() => handleClose('Бартер')}>Бартер</MenuItem>
            </Menu>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                <Card>
                    <CardContent>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker
                                defaultValue={dayjs(changedApartament.date)}
                                    onChange={(e) => getDataChangedApartament('busyUntil')(dayjs(e).format('DD.MM.YYYY hh:mm'))}
                                    ampm={false}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <Autocomplete
                            style={{ marginTop: 15 }}
                            disablePortal
                            options={clients}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Клиенты" />}
                        />
                    </CardContent>
                    <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={() => setBackdrop(false)} variant="contained" size="small">Сохранить</Button>
                    </CardActions>
                </Card>

            </Backdrop>
        </>
    )
}

export default MenuChangeStatus;