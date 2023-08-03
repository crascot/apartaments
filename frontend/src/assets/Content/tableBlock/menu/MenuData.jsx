import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { client } from "../../../../API/api";

const MenuData = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const deleteApartament = async () => {
        await client.delete(`/apartaments/${id}`)
        .then(() => window.location.reload(false))
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <MenuItem onClick={handleClose}>История</MenuItem>
                <MenuItem onClick={deleteApartament}>Удалить</MenuItem>
            </Menu>
        </>
    )
}

export default MenuData;