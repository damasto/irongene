import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button
  } from '@mui/material';
import NewClinicForm from './NewClinicForm';
import RescheduleBooking from './RescheduleBooking';
  
  export default function AdminDialog ({open, onClose, type, mode}) {


      return (
        <Dialog
        maxWidth="sm"
        fullWidth
        open={open} 
        onClose={onClose}>
          <DialogTitle
          variant="h6"
          fontWeight={600}
          align='center'
          >
            {mode === "create" ? "Create New" : "Edit"} {type === "clinics" && "Clinic" }
          </DialogTitle>
          <DialogContent>
          {mode === "create" && type === "clinics" && (
            <NewClinicForm/>
          )}
          </DialogContent>
        </Dialog>
      );
    };