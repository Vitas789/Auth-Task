import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { RouteComponentProps } from 'react-router';

const Input = styled.input`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
  height: 60px;
  margin-bottom: 20px;
  padding-left: 20px;
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
  margin-top: 252px;
`;
const FormError = styled.span`
  position: relative;
  background: #f5e9e9;
  border: 1px solid #e26f6f;
  box-sizing: border-box;
  border-radius: 8px;
  height: 60px;
  text-align: left;
  padding-left: 55px;
  padding-top: 21px;
  margin-bottom: 27px;
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  img {
    position: absolute;
    left: 20px;
  }
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

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const Button = styled.button<{ buttonColor: string; textColor: string }>`
  width: 100%;
  cursor: pointer;
  background: ${(props) => props.buttonColor || 'white'};
  border: none;
  border-radius: 8px;
  height: 60px;
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  color: ${(props) => props.textColor || 'black'};
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  &:disabled {
    background: ${(props) =>
      props.buttonColor === '#4a67ff' ? '#99a9ff' : '#707070'};
  }
`;

const Check = styled.label`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  margin-bottom: 40px;
  input {
    display: none;
  }
`;

const CheckText = styled.span`
  position: relative;
  text-align: left;
  padding-left: 34px;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    height: 20px;
    padding-right: 20px;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 4px;
  }
  input[type='checkbox']:checked + &::after {
    content: '';
    position: absolute;
    left: 1px;
    margin: 3px;
    height: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    border-radius: 2px;
    background: #4a67ff;
  }
`;

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [button, setButton] = useState({ disabled: false });
  const [state, setstate] = useState([
    {
      user: '',
      display: 'none',
    },
  ]);
  const [cookies, setCookie] = useCookies(['user']);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const submit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      setButton({ disabled: true });
      await axios.get('http://localhost:4200/usersData').then((res) => {
        res.data.forEach((i: any) => {
          if (i.email === data.email && i.password === data.password) {
            setCookie('user', data.email, { path: '/' });
            history.push('/profile');
          } else {
            setstate([{ user: data.email, display: 'block' }]);
            setButton({ disabled: false });
          }
        });
      });
    } catch (err) {
      console.log(`???????????? ${err.name}: ${err.message}`);
    }
  };

  const regist: SubmitHandler<FormData> = async (data: FormData) => {
    console.log(data);
    try {
      setButton({ disabled: true });
      await axios
        .post('http://localhost:4200/usersData', {
          email: data.email,
          password: data.password,
        })
        .then(() => setButton({ disabled: false }));
    } catch (err) {
      console.log(`???????????? ${err.name}: ${err.message}`);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(submit)}>
        {state.map((item, index) => (
          <FormError key={index} style={{ display: item.display }}>
            <img src="warning.svg" alt="warning" />
            ???????????????????????? {item.user} ???? ????????????????????
          </FormError>
        ))}
        <InputTitle>??????????</InputTitle>
        <Input type="email" {...register('email', { required: true })}></Input>
        {errors.email && <Err>???????????????????????? ????????</Err>}
        <InputTitle>????????????</InputTitle>
        <Input
          type="password"
          {...register('password', { required: true })}
        ></Input>
        {errors.password && <Err>???????????????????????? ????????</Err>}
        <Check>
          <input type="checkbox" />
          <CheckText>?????????????????? ????????????</CheckText>
        </Check>
        <Buttons>
          <Button
            buttonColor="#242424"
            textColor="white"
            disabled={button.disabled}
            type="submit"
          >
            ??????????
          </Button>
          <Button
            buttonColor="#4a67ff"
            textColor="white"
            disabled={button.disabled}
            onClick={handleSubmit(regist)}
          >
            ??????????????????????
          </Button>
        </Buttons>
      </Form>
    </div>
  );
};

export default Login;
