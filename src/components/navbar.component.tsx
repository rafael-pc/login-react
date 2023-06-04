import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AuthService from '../services/auth.service';
import IUser from '../types/user.type';
import EventBus from '../common/EventBus';

import { AppBar, Box, Toolbar, Button } from '@mui/material';

type State = {
  showModeratorBoard: boolean;
  showAdminBoard: boolean;
  currentUser: IUser | undefined;
};

function NavBar() {
  const [state, setState] = useState<State>({
    showModeratorBoard: false,
    showAdminBoard: false,
    currentUser: undefined,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setState((prevState) => ({
        ...prevState,
        currentUser: user,
        showModeratorBoard: user.roles.includes('ROLE_MODERATOR'),
        showAdminBoard: user.roles.includes('ROLE_ADMIN'),
      }));
    }

    EventBus.on('logout', logOut);

    return () => {
      EventBus.remove('logout', logOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    AuthService.logout();
    setState((prevState) => ({
      ...prevState,
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    }));
    navigate('/login');
  };

  const { currentUser, showModeratorBoard, showAdminBoard } = state;

  const button = {
    color: 'white',
    '&:hover': {
      backgroundColor: 'inherit',
      opacity: [0.9, 0.8, 0.7],
    },
  };

  return (
    <>
      <AppBar
        position='static'
        sx={{
          backgroundColor: '#000000',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Link to={'/'}>
              <Button disableRipple sx={button}>
                App
              </Button>
            </Link>

            <Link to={'/home'}>
              <Button disableRipple sx={button}>
                Home
              </Button>
            </Link>

            {showModeratorBoard && (
              <Link to={'/mod'}>
                <Button disableRipple sx={button}>
                  Moderator Board
                </Button>
              </Link>
            )}

            {showAdminBoard && (
              <Link to={'/admin'}>
                <Button disableRipple sx={button}>
                  Admin Board
                </Button>
              </Link>
            )}

            {currentUser && (
              <Link to={'/user'}>
                <Button disableRipple sx={button}>
                  User
                </Button>
              </Link>
            )}
          </Box>

          <Box>
            {currentUser ? (
              <Toolbar>
                <Link to={'/profile'}>
                  <Button disableRipple sx={button}>
                    {currentUser.username}
                  </Button>
                </Link>

                <a href='/login' onClick={logOut}>
                  <Button disableRipple sx={button}>
                    LogOut
                  </Button>
                </a>
              </Toolbar>
            ) : (
              <Toolbar>
                <Link to={'/login'}>
                  <Button disableRipple sx={button}>
                    Login
                  </Button>
                </Link>

                <Link to={'/register'}>
                  <Button disableRipple sx={button}>
                    Sign Up
                  </Button>
                </Link>
              </Toolbar>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
