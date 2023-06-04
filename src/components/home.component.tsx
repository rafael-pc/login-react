import { useEffect, useState } from 'react';
import UserService from '../services/user.service';

import { Container, Card, CardContent } from '@mui/material';

interface State {
  content: string;
}

const Home = () => {
  const [state, setState] = useState<State>({ content: '' });

  useEffect(() => {
    UserService.getPublicContent()
      .then((response) => {
        setState({
          content: response.data,
        });
      })
      .catch((error) => {
        setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
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

export default Home;
