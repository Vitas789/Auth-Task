import Header from './header';
import styled from 'styled-components';

const Greetings = styled.p`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 48px;
`;

const Button = styled.button`
  cursor: pointer;
  background: #F5F5F5;
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

function Profile(props: any) {
  const { history, user } = props;
  const click = () => history.push('/login');
  return (
    <div>
      <Header></Header>
      <Greetings>
        Здравствуйте, <b>{user}</b>
      </Greetings>
      <Button onClick={click}>Выйти</Button>
    </div>
  );
}

export default Profile;
