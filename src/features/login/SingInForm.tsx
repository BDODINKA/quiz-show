import React, {useState} from 'react';
import * as Yup from 'yup'
import {Formik} from "formik";
import {useAppDispatch} from "../../app/store";
import {loginTC} from "./login-reducer";
import SuperInput from "../../common/superInputText/SuperInput";
import SuperCheckbox from "../../common/superCheckbox/SuperCheckbox";
import s from './login.module.css'
import show_password from './../image/open_eye_password.png'
import hide_password from './../image/close_eye_password.png'
import SuperButton from "../../common/superButton/SuperButton";
import {NavLink} from "react-router-dom";


const SignInForm = () => {

	 const [shown, setShown] = useState<boolean>(true)

	 const dispatch = useAppDispatch()
	 return (
		 <div className={s.form_container}>
				<div className={s.title_form}>Sing In</div>
				<Formik
					initialValues={{email: '', password: '', rememberMe: false}}
					validationSchema={Yup.object({
						 email: Yup.string().email('Invalid email address').required('Required'),
						 password: Yup.string().required('Required')
							 .min(8, 'Your password is too short')
					})}
					onSubmit={(values) => {
						 dispatch(loginTC(values))
					}}
				>
					 {formik => (
						 <form className={s.form_block} onSubmit={formik.handleSubmit}>
								<div className={s.input_block}>
									 <label className={s.title_input} htmlFor="firstName">Email</label>
									 <SuperInput
										 className={s.input_email}
										 id="email"
										 type="email"
										 {...formik.getFieldProps('email')}
									 />
									 {formik.touched.email && formik.errors.email ? (
										 <div className={s.error_message}>{formik.errors.email}</div>
									 ) : null}
								</div>
								<div className={s.input_block}>
									 <label className={s.title_input} htmlFor="password">Password</label>
									 <div className={s.password_block}>
											<SuperInput
												className={s.input_password}
												id="password"
												type={shown ? 'password' : 'text'}
												{...formik.getFieldProps('password')}
											/>
											<span onClick={() => setShown(!shown)}>
											 <img className={s.visible_password} src={shown ? show_password : hide_password} alt='password'/>
										</span>
									 </div>
									 {formik.touched.password && formik.errors.password ? (
										 <div className={s.error_message}>{formik.errors.password}</div>
									 ) : null}
								</div>
								<div className={s.checkbox_block}>
									 <div className={s.checkbox}>
											<SuperCheckbox
												id="rememberMe"
												type="checkbox" {...formik.getFieldProps('rememberMe')} />
									 </div>
									 <div className={s.rememberMe}>
											<label htmlFor="rememberMe">Remember me</label>
									 </div>
								</div>
								<div>
									 <NavLink to={'/RestorePage'} className={s.forgot_password}>
											Forgot Password?
									 </NavLink>
									 <div className={s.button_sign_in_form_block}>
											<SuperButton type='submit' className={s.button_sign_in_form}>Sing In</SuperButton>
									 </div>
								</div>
								<div className={s.have_account}>
									 Already have an account?
								</div>
						 </form>
					 )}
				</Formik>
				<div className={s.button_sign_up_form_block}>
					 <NavLink className={s.sign_up_button} to='/registration'>Sign Up</NavLink>
				</div>
		 </div>
	 )
};
export default SignInForm