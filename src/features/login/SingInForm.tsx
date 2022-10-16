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


const SignInForm = () => {
	 const [shown, setShown] = useState<boolean>(false)
	 const dispatch = useAppDispatch()
	 return <div>
			<Formik
				initialValues={{email: '', password: '', rememberMe: false}}
				validationSchema={Yup.object({
					 email: Yup.string().email('Invalid email address').required('Required'),
					 password: Yup.string().required('Required'),
				})}
				onSubmit={(values, {setSubmitting}) => {
					 dispatch(loginTC(values))
					 setSubmitting(false);
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
											type={shown ? 'text' : 'password'}
											{...formik.getFieldProps('password')}
										/>
										<span onClick={() => setShown(!shown)}>
											 <img className={s.visible_password} src={shown ? show_password : hide_password} alt=''/>
										</span>
								 </div>
								 {formik.touched.password && formik.errors.password ? (
									 <div className={s.error_message}>{formik.errors.password}</div>
								 ) : null}
							</div>
							<div className={s.checkbox_block}>
								 <SuperCheckbox
									 className={s.checkbox}
									 id="rememberMe"
									 type="checkbox" {...formik.getFieldProps('rememberMe')} />
								 <label className={s.rememberMe} htmlFor="rememberMe">Remember me</label>
							</div>
							<div>
								 <button type="submit">Submit</button>
							</div>
					 </form>
				 )}
			</Formik>
	 </div>;
};
export default SignInForm