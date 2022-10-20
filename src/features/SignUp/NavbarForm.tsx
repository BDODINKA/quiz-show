import React from 'react';
import s from './signUp.module.css'
import logo from '../../assets/svg/logo-Incubator.svg'
import SuperButton from "../../common/superButton/SuperButton";
import {NavLink} from "react-router-dom";


const NavbarForm = () => {

    return (
        <div className={s.navbar_form_container}>
            <div>
                <img src={logo} alt='IT-Incubator'/>
            </div>
            <div></div>
            <NavLink to={'/Login'}>
                <SuperButton className={s.button_signUp_navbar} type='submit'>
                    Sing In
                </SuperButton>
            </NavLink>
        </div>
    );
};

export default NavbarForm;