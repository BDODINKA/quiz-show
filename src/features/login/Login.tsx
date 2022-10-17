import React from 'react';
import SingInForm from "./SingInForm";
import s from './login.module.css'
import NavbarForm from "./NavbarForm";
import {useAppSelector} from "../../app/store";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const login = useAppSelector(state => state.auth.isLoggedIn)

    const navigate = useNavigate()
    if (login) navigate('/Profile')

    return (
      <div className={s.login_container}>
          <NavbarForm/>
          <SingInForm/>
      </div>
    );
};

export default Login;