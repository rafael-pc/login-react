import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

import {
  Container,
  CardContent,
  Card,
  Typography,
  List,
  ListItem,
  Box,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

type State = {
  redirect: string | null;
  userReady: boolean;
  currentUser: IUser & { accessToken: string };
};

const Profile = () => {
  const [state, setState] = useState<State>({
    redirect: null,
    userReady: false,
    currentUser: { accessToken: "" },
  });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      setState((prevState) => ({ ...prevState, redirect: "/home" }));
    } else {
      setState((prevState) => ({
        ...prevState,
        currentUser: currentUser as IUser & { accessToken: string },
        userReady: true,
      }));
    }
  }, []);

  if (state.redirect) {
    return <Navigate to={state.redirect} />;
  }

  const { currentUser } = state;

  const card = {
    backgroundColor: "#E9ECEF",
    fontSize: 20,
    minWidth: 275,
    boxShadow: "none",
    p: "20px",
  };

  return (
    <Container>
      {state.userReady && (
        <Box>
          <CardContent>
            <Card sx={card}>
              <b>{currentUser.username}</b> Profile
            </Card>
          </CardContent>
          <Box sx={{ p: "20px" }}>
            <Typography paragraph={true}>
              <b>Token:</b> {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substring(
                currentUser.accessToken.length - 20
              )}
            </Typography>
            <Typography>
              <b>Id:</b> {currentUser.id}
            </Typography>
            <Typography>
              <b>Email:</b> {currentUser.email}
            </Typography>
            <Typography>
              <b>Authorities:</b>
            </Typography>
            <List component="ul">
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <ListItem component="li" key={index} sx={{ p: 0.2, ml: 0.5 }}>
                    <FiberManualRecordIcon sx={{ fontSize: 8, mr: 1 }} />
                    {role}
                  </ListItem>
                ))}
            </List>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Profile;
