import { Button, Card, CardActions, CardContent, Container, TextField } from "@mui/material";
import s from './Form.module.css';
import React, { useEffect, useState } from "react";
import { client } from "../../API/api";

const Form = () => {
    const [managers, setManagers] = useState([])
    useEffect(() => {
        client.get('/managers')
            .then((res) => setManagers(res.data))
    }, [managers])

    const [login, setLogin] = useState({})
    const fillLogin = (key) => (value) => setLogin({ ...login, [key]: value })


    const funcLogin = () => {
        let currentManager = managers.find((el) => el.email === login.email && el.password === login.password)
        if(currentManager) {
            window.location.href = '/apartaments';
            setLogin({})
        }
        else if (login.email === 'admin' && login.password === 'admin') {
            window.location.href = '/apartaments';
            setLogin({})
        }
        else alert('Такого пользователя не существует или вы неверно ввели свой пароль');
    }

    return (
        <Container maxWidth="sm" className={s.container}>
            <Card className={s.card}>
                <CardContent>
                    <TextField value={login.email || ''} onChange={(e) => fillLogin('email')(e.target.value)} fullWidth label="Почта" margin="dense" />
                    <TextField value={login.password || ''} onChange={(e) => fillLogin('password')(e.target.value)} fullWidth label="Пароль" margin="dense" />
                </CardContent>
                <CardActions className={s.actionBlock}>
                    <Button onClick={funcLogin} size="small" variant="contained">Войти</Button>
                </CardActions>
            </Card>
        </Container>
    )
}

export default Form;