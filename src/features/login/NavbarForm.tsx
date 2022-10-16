import React from 'react';
import s from './login.module.css'
import logo from './../image/logo.svg'
import SuperButton from "../../common/superButton/SuperButton";

const NavbarForm = () => {
	 return (
		 <div className={s.navbar_form_container}>
				<div>
					 <img src={logo} alt='IT-Incubator'/>
				</div>
				<div>
					 <SuperButton className={s.button_sign_in} type='submit'>
							Sing In
					 </SuperButton>
				</div>
		 </div>
	 );
};

export default NavbarForm;