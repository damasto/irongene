import React, { useContext, useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ChangeEmailForm from '../components/ChangeEmailForm';
import { AuthContext } from '../context/auth.context';
import ChangePwdForm from '../components/ChangePwdForm';
import DeleteAccountDialog from '../components/DeleteAccountDialog';
import ConfirmationDialog from '../components/ConfirmationDialog';

const sideBarItems = ["My Profile", "My Bookings", "Log Out"];
const drawerWidth = 220;

export default function ProfilePage() {
    const { getToken, logOutUser, removeToken } = useContext(AuthContext)
    const [selected, setSelected] = useState("My Profile");
    const [profileData, setProfileData] = useState({});
    const [bookingData, setBookingData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [emailForm, setEmailForm] = useState(false)
    const [changePasswordForm, setChangePasswordForm] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const navigate = useNavigate();
    const navbarHeight = 74;

    useEffect(() => {
        getProfileData();
        getBookingData();
    }, [])

    useEffect(() => {
        console.log("pdata; ", profileData)
        console.log("Bdata; ", bookingData)
    }, [profileData])

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


    const renderContent = () => {
        switch (selected) {
            case "My Profile":
                return (
                    <Box>
                        <Typography variant='h5'>👤 My Account</Typography>
                        <Box
                            display={"flex"}
                            gap={20}
                        >
                            <Typography variant='body1'>First name: {profileData.firstName} </Typography>
                            <Typography variant='body1'>Last name: {profileData.lastName}</Typography>
                        </Box>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"flex-start"}
                        >
                            <Typography variant='body1'>email: {profileData.email} </Typography>
                            <Button onClick={toggleEmailForm}>Change email</Button>
                            {emailForm &&
                                <ChangeEmailForm
                                    setMessage={(text) => setConfirmationMessage(text)}
                                    toggleDialog={(status) => setShowConfirmation(status)}
                                    hideForm={toggleEmailForm}
                                />}
                        </Box>
                        <Button onClick={togglePasswordForm}>Change Password</Button>
                        {changePasswordForm &&
                            <ChangePwdForm
                                setMessage={(text) => setConfirmationMessage(text)}
                                toggleDialog={(status) => setShowConfirmation(status)}
                                hideForm={togglePasswordForm}
                            />}
                        <Typography onClick={() => { setShowDialog(true) }} variant='body2' color="error">Delete Account</Typography>
                        <DeleteAccountDialog open={showDialog} onClose={() => { setShowDialog(false) }} onConfirm={deleteUserAccount} />
                        <ConfirmationDialog open={showConfirmation} onClose={() => { setShowConfirmation(false) }} message={confirmationMessage} />
                    </Box>
                )
                break;
            case "My Bookings":
                return (
                    <Box>
                        Map bookings
                    </Box>
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
                                button
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