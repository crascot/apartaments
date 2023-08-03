import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import s from './Burger.module.css'
import { Link } from 'react-router-dom';

const buttonsList = [
  {
    text: 'Главная',
    url: ''
  },
  {
    text: 'Отчеты',
    url: ''
  },
  {
    text: 'Квартиры',
    url: '/apartaments'
  },
  {
    text: 'Менеджеры',
    url: '/managers'
  },
  {
    text: 'Бронирования',
    url: ''
  },
]

const Burger = ({ current }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={s.burger}
    >
      <Grid
        item xs={2}
        container
        justifyContent='flex-end'
        style={{ padding: '0 30px' }}
      >
        <SearchIcon />
      </Grid>
      <Grid item xs={8}>
        <List className={s.buttonsList}>
          {
            buttonsList.map((el, i) => (
              <Link to={el.url} style={{textDecoration: 'none', color: 'black'}} key={i}>
                <ListItem className={el.text === current ? s.current : ''} key={i}>{el.text}</ListItem>
              </Link>
            ))
          }
          <hr style={{ width: '70%' }} />
          <ListItem>Редак. сайт</ListItem>
        </List>
      </Grid>
      <Grid item xs={2}>
        <Typography>Уведомления</Typography>
      </Grid>
    </Grid>
  );
}

export default Burger;