import React from "react";
import Burger from "../../assets/Burger/Burger";
import '../../App.css'
import Content from "../../assets/Content/Content";
import { Paper } from "@mui/material";

const Apartments = () => {
    return (
        <div className='block'>
            <Paper elevation={3}><Burger current='Квартиры' /></Paper>
            <Content title='Квартиры' />
        </div>
    )
}

export default Apartments;