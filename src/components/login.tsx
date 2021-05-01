import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Header from './header';

const Input = styled.input`
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
  height: 60px;
  margin-bottom: 20px;
  &:invalid {
    border: 1px solid #e26f6f;
  }
  &:focus {
    outline: 0;
    border: 1px solid black;
  }
`;

const InputTitle = styled.span`
  font-family: 'Helvetica Neue', sans-serif;
  text-align: left;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 10px;
`;
const Form = styled.form`
  position: relative;
  margin: 0 auto;
  max-width: 640px;
  display: flex;
  flex-direction: column;
`;
const FormError = styled.span`
  background: #f5e9e9;
  border: 1px solid #e26f6f;
  box-sizing: border-box;
  border-radius: 8px;
  height: 60px;
  text-align: center;
`;

const Err = styled.span`
  font-family: 'Helvetica Neue', sans-serif;
  text-align: left;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #e26f6f;
  margin-bottom: 20px;
`;

const Button = styled.button`
  cursor: pointer;
  background: #4a67ff;
  border: none;
  border-radius: 8px;
  height: 60px;
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  color: white;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  &:disabled {
    background: #99a9ff;
  }
`;

const Check = styled.div`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  margin-bottom: 40px;
`;

const CheckText = styled.span`
  text-align: left;
`;

function Login(props: any) {
  const [button, setButton] = useState({ disabled: false });
  const [state, setstate] = useState([
    {
      error: 'yes',
      user: '',
      display: 'none',
    },
  ]);
  const { history, upUser } = props;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data: any) => {
    setButton({ disabled: true });
    axios.get('http://localhost:4200/usersData').then((res) => {
      res.data.forEach((i: any) => {
        if (i.email === data.email && i.password === data.password) {
          history.push('/profile');
          upUser(i.email);
        } else {
          setstate([{ error: 'no', user: data.email, display: 'block' }]);
          setButton({ disabled: false });
        }
      });
    });
  };

  return (
    <div>
      <Header></Header>
      <Form onSubmit={handleSubmit(submit)}>
        {state.map((item, index) => (
          <FormError key={index} style={{ display: item.display }}>
            Пользователя {item.user} не существует
          </FormError>
        ))}
        <InputTitle>Логин</InputTitle>
        <Input type="email" {...register('email', { required: true })}></Input>
        {errors.email && <Err>Обязательное поле</Err>}
        <InputTitle>Пароль</InputTitle>
        <Input type="password" {...register('password')}></Input>
        {errors.email && <Err>Обязательное поле</Err>}
        <Check>
          <input type="checkbox" />
          <CheckText>Запомнить меня</CheckText>
        </Check>
        <Button disabled={button.disabled} type="submit">
          Войти
        </Button>
      </Form>
    </div>
  );
}

export default Login;
