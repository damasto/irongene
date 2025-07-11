import { Button, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import api from "../api/axios";
import { useEffect, useState } from "react";


export default function PropertyTable ({users, onUserUpdate, handleOpen, onError, setConfirmationMessage, onClose, showForm, setUser}) {

  


    const handleEdit = (person) => {
        setUser(person);
        showForm(true)
    }


    const handleDelete = async (userId) => {
        try {
            const res = await api.delete(`/api/users/${userId}`);
            onUserUpdate();
            setConfirmationMessage(res.data.message);
            handleOpen(true)
            setTimeout(() => {
                onClose();
            }, 2000)
        } catch(err) {
            if(err.response) {
                onError(err.response.data.message)
            } else {
                onError(err.message)
            }
        }
    }

    return (
        <>
        <TableBody>
            {users.map((user, index) => (
                 <TableRow key={index}>
                    {Object.values(user).map((value, i) => (
                            <TableCell
                            key={i}
                            sx={{ border: "1px solid #ccc"}}
                            >
                                {String(value)}
                            </TableCell>
                        )
                    )}
                    <TableCell
                    sx={{
                        display:"flex",
                        
                    }}
                    >
                        <Button onClick={() => {handleEdit(user)}}>Edit</Button>
                        <Button onClick={() => {handleDelete(user._id)}} color="error">Delete</Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
        </>
        
        
    )
}