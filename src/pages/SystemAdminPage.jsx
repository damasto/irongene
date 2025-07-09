import { Box, Button } from "@mui/material";
import EditSystemCard from "../components/EditSystemCard";
import { useState, useRef} from "react";
import AdminDialog from "../components/ModelDialog";

export default function SystemAdminPage() {
    const [dialogMode, setDialogMode] = useState("");
    const [dialogType, setDialogType] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false)

    const openButtonRef = useRef(null) //used to move focus back to button that was clicked before opening a dialog
    const modelCards = [
        { title: "Clinics", id: "clinics" },
        { title: "Bookings", id: "bookings", },
        { title: "Users", id: "users", }
    ]

    //handles which action (which form and if create/edit) the EditSystemCard should render
    const handleAction = (mode, type, opener) => {
        setDialogMode(mode);
        setDialogType(type);
        openButtonRef.current = opener; //stores which button opened the dialog
        setDialogOpen(true);
    }

    const handleClose = () => {
        setDialogOpen(false);
        openButtonRef.current?.focus(); //sets focus back to the button that opened
    }

    return (
        <Box
            sx={{
                width: "100%",
                borderRadius: 4,
                height: '100%',
                backgroundColor: "transparent",
                backgroundImage: "none",
                color: '#fff',
                cursor: 'pointer',
                boxShadow: 1,
                display: "flex",

            }}
        >
            {modelCards.map(({ title, id }) => {
                return (
                    <EditSystemCard
                        key={id}
                        title={title}
                        id={id}
                        onAction={(mode, type, event) => handleAction(mode, type, event.currentTarget)}
                    />
                )

            })}
            <AdminDialog open={dialogOpen} onClose={handleClose} mode={dialogMode} type={dialogType}/>
        </Box>
    )
}