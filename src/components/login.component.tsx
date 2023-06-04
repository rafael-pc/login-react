import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import AuthService from '../services/auth.service';

import {
  Container,
  Box,
  Avatar,
  FormControl,
  TextField,
  Alert,
  Modal,
  Collapse,
  IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import LoadingButton from '@mui/lab/LoadingButton';

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(true);
  const [shouldReload, setShouldReload] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      setRedirect('/profile');
    }

    return () => {
      if (shouldReload) {
        window.location.reload();
      }
    };
  }, [shouldReload]);

  const schema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const handleLogin = (formValue: FormValues) => {
    const { username, password } = formValue;

    setMessage('');
    setLoading(true);

    //await new Promise((resolve) => setTimeout(resolve, 2000));

    AuthService.login(username, password)
      .then(() => {
        setRedirect('/profile');
        setShouldReload(true);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch(
        (error: {
          response: { data: { message: string } };
          message: string;
          toString: () => never;
        }) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
  };
  
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const form = {
    maxWidth: '360px',
    height: '500px',
    f: 20,
    p: '40px',
    mt: '40px',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    boxShadow: '6',
    flexDirection: 'column',
  };

  const error = {
    height: 0,
    color: 'red',
    fontSize: 12,
    mb: '5px',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={form}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
          <Avatar
            src='/broken-image.jpg'
            alt='Profile-img'
            sx={{ width: '100px', height: '100px' }}
          />
        </Box>

        <FormControl
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '300px',
          }}
        >
          <Box
            component='form'
            onSubmit={handleSubmit(handleLogin)}
            sx={{
              '& .MuiTextField-root': { m: 1.8, width: '35ch' },
              height: '250px',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignContent: 'space-between',
            }}
            noValidate
            autoComplete='off'
          >
            <Box sx={{ height: '100%' }}>
              <Box>
                <TextField
                  error={!!errors.username}
                  id='outlined-name-input'
                  label='Name'
                  type='text'
                  {...register('username')}
                />
                {errors.username && (
                  <Box
                    sx={error}
                  >
                    <ErrorIcon sx={{ mr: 0.5, ml: 1.5, width: '15px' }} />
                    {errors.username.message}
                  </Box>
                )}
              </Box>
              <Box>
                <TextField
                  error={!!errors.password}
                  id='outlined-password-input'
                  label='Password'
                  type='password'
                  {...register('password')}
                />
                {errors.password && (
                  <Box
                    sx={error}
                  >
                    <ErrorIcon sx={{ mr: 0.5, ml: 1.5, width: '15px' }} />
                    {errors.password.message}
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LoadingButton
                type='submit'
                disableRipple
                loading={loading}
                variant='contained'
                sx={{
                  width: '315px',
                  height: '50px',
                  bgcolor: '#000000',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#000000',
                    color: '#fff',
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <span>Login</span>
              </LoadingButton>
            </Box>
          </Box>

          {message && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box
                sx={{
                  position: 'absolute' as const,
                  top: '8%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                }}
              >
                <Collapse in={open}>
                  <Alert
                    severity='error'
                    action={
                      <IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize='inherit' />
                      </IconButton>
                    }
                  >
                    {message}
                  </Alert>
                </Collapse>
              </Box>
            </Modal>
          )}
        </FormControl>
      </Box>
    </Container>
  );
};

export default Login;
