import Header from './header';
import styled from 'styled-components';
import React from 'react';
import { useCookies } from 'react-cookie';
import { RouteComponentProps } from 'react-router';

const Greetings = styled.p`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 48px;
  margin-top: 342px;
`;

const Button = styled.button`
  cursor: pointer;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  width: 200px;
  height: 60px;
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  color: black;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`;

const Profile: React.FC<RouteComponentProps> = ({ history }) => {
  const [cookies] = useCookies(['user']);
  const redirect = (url: string) => history.push(`/${url}`);

  const checkUser = (user: string) => {
    if (user) {
      return (
        <div>
          <Header></Header>
          <Greetings>
            Здравствуйте, <b>{cookies.user}</b>
          </Greetings>
          <Button onClick={() => redirect('login')}>Выйти</Button>
        </div>
      );
    } else {
      redirect('login');
    }
  };

  return <div>{checkUser(cookies.user)}</div>;
};

export default Profile;
