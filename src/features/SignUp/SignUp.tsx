import React from 'react';

import s from './signUp.module.css'
import {useAppSelector} from "../../app/store";
import {useNavigate} from "react-router-dom";
import {SignUpForm} from "./SignUpForm";
import {SignUpErrorSnackbar} from "./SignUpErrorSnackbar";


const SignUp = () => {
    const signUp = useAppSelector(state => state.reg.isSignUp)


    const navigate = useNavigate()
    if (signUp) navigate('/Login')

    return (
        <div className={s.signUp_container}>

            <SignUpForm/>
            <SignUpErrorSnackbar/>
        </div>
    );
};

export default SignUp;