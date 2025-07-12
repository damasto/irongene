import React, { useContext, useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ChangeEmailForm from '../components/ChangeEmailForm';
import { AuthContext } from '../context/auth.context';
import ChangePwdForm from '../components/ChangePwdForm';
import DeleteAccountDialog from '../components/DeleteAccountDialog';
import ConfirmationDialog from '../components/ConfirmationDialog';
import BookingCard from '../components/BookingCard';

const sideBarItems = ["My Profile", "My Bookings"];
const drawerWidth = 220;

export default function ProfilePage() {
    const { getToken, logOutUser, removeToken } = useContext(AuthContext);
    const [selected, setSelected] = useState("My Profile");
    const [profileData, setProfileData] = useState({});
    const [bookingData, setBookingData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [emailForm, setEmailForm] = useState(false);
    const [changePasswordForm, setChangePasswordForm] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showLogOut, setShowLogOut] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const navbarHeight = 74;
    const title = "Delete Account"
    const deleteMessage = "Are you sure you want to delete your account? This action cannot be undone."
    const deleteAction = "delete"

    useEffect(() => {
        getProfileData();
        getBookingData();
    }, [])

    const getProfileData = async () => {
        try {
            const res = await api.get("/api/users/profile", {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setProfileData(res.data);
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const getBookingData = async () => {
        try {
            const res = await api.get("/api/users/profile/bookings", {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            setBookingData(res.data);
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteUserAccount = async () => {
        try {
            const res = await api.delete("/api/users/profile", {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            removeToken()
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    const toggleEmailForm = () => {
        setEmailForm(!emailForm)
    }

    const togglePasswordForm = () => {
        setChangePasswordForm(!changePasswordForm)
    };

    const handleMenuClick = (item) => {
        if (item === "Log Out") {
            logOutUser();
            navigate("/")
        } else {
            setSelected(item)
        }
    }

    const handleLogout = () => {
        logOutUser();
        navigate("/")
    }


    const renderContent = () => {
        switch (selected) {
            case "My Profile":
                return (
                    <Box>
                        <Typography variant='h5'>👤 My Account</Typography>
                        <Box
                            display={"flex"}
                            gap={20}
                            marginTop={"25px"}
                        >
                            <List disablePadding dense>
                                <ListItem disableGutters>
                                    <ListItemText
                                        primary={"Name:"}
                                        secondary={profileData.firstName}
                                        slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                                    />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemText
                                        primary={"Last Name:"}
                                        secondary={profileData.lastName}
                                        slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                                    />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemText
                                        primary={"Email:"}
                                        secondary={profileData.email}
                                        slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                                    />
                                </ListItem>
                            </List>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "40px 0"
                            }}
                        >
                            <Button onClick={toggleEmailForm}>Change email</Button>
                            {emailForm &&
                                <ChangeEmailForm
                                    email={profileData.email}
                                    setErrorMessage={(error) => setErrorMessage(error)}
                                    setMessage={(text) => setConfirmationMessage(text)}
                                    toggleDialog={(status) => setShowConfirmation(status)}
                                    hideForm={toggleEmailForm}
                                />}

                            <Button onClick={togglePasswordForm}>Change Password</Button>
                            {changePasswordForm &&
                                <ChangePwdForm
                                    setErrorMessage={(error) => setErrorMessage(error)}
                                    setMessage={(text) => setConfirmationMessage(text)}
                                    toggleDialog={(status) => setShowConfirmation(status)}
                                    hideForm={togglePasswordForm}
                                />}
                        </Box>
                        <Typography onClick={() => { setShowDialog(true) }} variant='body2' color="error">Delete Account</Typography>
                        <DeleteAccountDialog
                            open={showDialog}
                            onClose={() => { setShowDialog(false) }}
                            onConfirm={deleteUserAccount}
                            title={title}
                            message={deleteMessage}
                            action={deleteAction}
                        />
                        <ConfirmationDialog open={showConfirmation} onClose={() => { setShowConfirmation(false) }} message={confirmationMessage} />
                    </Box>
                )
                break;
            case "My Bookings":
                return (
                    <>
                        {bookingData.length > 0 ? (
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap={4}
                                px={4}
                                py={6}
                                alignItems="center"
                            >
                                {bookingData.map((booking, i) => (
                                    <BookingCard
                                        key={i}
                                        bookingData={booking}
                                        onBookingUpdate={getBookingData} />
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 6 }}>
                                You haven't any appointments booked
                            </Typography>
                        )
                        }

                    </>
                )
                break;
            default:
                return null;

        }
    }

    return (
        <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}> {/* Adjust for navbar height */}
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        top: `${navbarHeight}px`,
                        backgroundColor: '#f5f5f5',
                        borderRight: '1px solid #ddd',
                    },
                }}
            >
                <Box sx={{ mt: 8 }}>
                    <List>
                        {sideBarItems.map((text) => (
                            <ListItem
                                component="button"
                                key={text}
                                onClick={() => handleMenuClick(text)}
                                sx={{
                                    borderRadius: 2,
                                    mx: 1,
                                    mb: 1,
                                    backgroundColor: selected === text ? '#e0e0e0' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{ p: 2, marginTop: "100px"}}>
                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={handleLogout} // 👈 your logout function here
                    >
                        Logout
                    </Button>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    mt: 8,
                    backgroundColor: '#ffffff',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: 4,
                        p: 4,
                        maxWidth: '800px',
                        mx: 'auto',
                        backgroundColor: '#fafafa',
                    }}
                >
                    {renderContent()}
                </Paper>
            </Box>
        </Box>
    );
}