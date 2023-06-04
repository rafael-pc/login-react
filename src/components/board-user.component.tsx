import { useEffect, useState } from 'react';
import UserService from '../services/user.service';
import EventBus from '../common/EventBus';

import { Container, Card, CardContent } from '@mui/material';

interface State {
  content: string;
}

const BoardUser = () => {
  const [state, setState] = useState<State>({ content: '' });

  useEffect(() => {
    UserService.getUserBoard()
      .then((response) => {
        setState({
          content: response.data,
        });
      })
      .catch((error) => {
        setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      });
  }, []);

  const card = {
    backgroundColor: '#E9ECEF',
    fontSize: 20,
    minWidth: 275,
    boxShadow: 'none',
    p: '20px',
  };

  return (
    <Container>
      <CardContent>
        <Card sx={card}>{state.content}</Card>
      </CardContent>
    </Container>
  );
};

export default BoardUser;
