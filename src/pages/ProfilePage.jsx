import React, { useContext, useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Typography, Button, Paper} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ChangeEmailForm from '../components/ChangeEmailForm';
import { AuthContext } from '../context/auth.context';

const sideBarItems = ["My Profile", "My Bookngs", "Log Out"];
const drawerWidth = 220;

export default function ProfilePage() {
    const {getToken} = useContext(AuthContext)
    const [selected, setSelected] =  useState("My Profile");
    const [profileData, setProfileData] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [showEmailForm, setShowEmailForm] = useState(false)
    const navigate = useNavigate();
    const navbarHeight = 74;

    useEffect(() => {
        getProfileData()
    }, [])

    useEffect(()  => {
        console.log("pdata; " , profileData)
    }, [profileData])

    const getProfileData = async () => {
        try {
            const res = await api.get("/api/users/profile", {headers: {
                Authorization: `Bearer ${getToken()}`
            }});
            setProfileData(res.data);
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const toggleEmailForm = () => {
        setShowEmailForm(!showEmailForm)
    }


    const renderContent = () => {
        switch(selected) {
            case "My Profile":
            return (
                <Box>
                    <Typography variant='h5'>👤 My Account</Typography>
                    <Box
                    display={"flex"}
                    gap={20}
                    >
                    <Typography variant='body1'>First name: </Typography>
                    <Typography variant='body1'>Last name: </Typography>
                    </Box>
                    <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    >
                    <Typography variant='body1'>email: </Typography>
                    <Button onClick={toggleEmailForm}>Change email</Button>
                    {showEmailForm && <ChangeEmailForm/> }
                    </Box>
                    <Button>Change Password</Button>
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