import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import api from "../api/axios";
import { useEffect, useState } from "react";
import PropertyTable from "./PropertyTable";
import ConfirmationDialog from "./ConfirmationDialog";

export default function EditUsersTable() {

    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getUsers();
    }, [])


    const getUsers = async () => {

        try {
            const res = await api.get("/api/users");
            console.log(res.data)
            setUsers(res.data)
        } catch (err) {
            if (err.response) {
                setErrorMessage(err.respnse.data.message)
            } else {
                setErrorMessage(err.message);
                console.error("Network error:", err.message)
            }
        }

    }


    return (
        <>
        <TableContainer 
        component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {users.length > 0 && Object.keys(users[0]).map((key) => {
                            return (
                                <TableCell
                                key={key}
                                sx={{borderRight: "1px solid #ccc"}}
                                >{key}</TableCell>
                            )
                        }
                        )}
                        <TableCell
                        key="actions"
                        sx={{borderRight: "1px solid #ccc"}}
                        >Actions</TableCell>
                    </TableRow>
                </TableHead>
                {users.length > 0 && (
                    <PropertyTable 
                    users={users} 
                    onUserUpdate={getUsers}
                    handleOpen={(state) => setOpen(state)} 
                    onError={(error) => setErrorMessage(error)}
                    setConfirmationMessage={(message) => setConfirmationMessage(message)}
                    />
                )}
            </Table>
        </TableContainer>
        <ConfirmationDialog open={open} message={confirmationMessage}/>
        </>
    )
}