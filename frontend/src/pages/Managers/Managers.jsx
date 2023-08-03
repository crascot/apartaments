import React from "react";
import '../../App.css'
import Burger from "../../assets/Burger/Burger";
import ManagersContent from "../../assets/ManagersContent/Content";
import { Paper } from "@mui/material";

const Managers = () => {
    return (
        <div className='block'>
            <Paper elevation={3}><Burger current='Менеджеры' /></Paper>
            <ManagersContent title='Менеджеры' />
        </div>
    )
}

export default Managers;