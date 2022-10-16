import React from 'react';
import SingInForm from "./SingInForm";
import {useAppSelector} from "../../app/store";
import {useNavigate} from "react-router-dom";
import s from './login.module.css'
import NavbarForm from "./NavbarForm";


const Login = () => {
	 const login = useAppSelector(state => state.auth.isLoggedIn)
	 const navigate = useNavigate()
	 if (login) navigate('/Profile')
	 return (
		 <div className={s.login_container}>
				<NavbarForm/>
				<div className={s.form_container}>
					 <div className={s.title_form}>Sing In</div>
					 <SingInForm/>
				</div>

		 </div>
	 );
};

export default Login;