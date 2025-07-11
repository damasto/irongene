import {
    Dialog,
    DialogTitle,
    DialogContent,
  } from '@mui/material';
import NewClinicForm from './NewClinicForm';
import NewUserForm from './NewUserForm';
import EditUserForm from './EditUserForm';
import { useNavigate } from 'react-router-dom';
import EditUsersPage from './EditUsersTable';
import { useEffect, useState} from 'react';
  
  export default function ModelDialog ({open, onClose, type, mode}) {

    const navigate = useNavigate();
    const [maxWidth, setMaxWidth] = useState("md");

    useEffect(() => {
      if (mode==="edit") {
        setMaxWidth("lg")
      }
    }, [mode, type])


      return (
        <Dialog
        maxWidth={maxWidth}
        fullWidth
        open={open} 
        onClose={onClose}>
          <DialogTitle
          variant="h6"
          fontWeight={600}
          align='center'
          >
            {mode === "create" ? "Create New" : "Edit"} {type === "clinics" && "Clinic" || type==="users" && "User" || type==="booking" && "Booking"}
          </DialogTitle>
          <DialogContent>
          {mode === "create" && type === "clinics" && (
            <NewClinicForm/>
          )}
          {mode === "create" && type === "users" && (
            <NewUserForm/>
          )}
          {mode === "edit" && type === "users" && (
            <EditUsersPage/>
          )}
          </DialogContent>
        </Dialog>
      );
    };