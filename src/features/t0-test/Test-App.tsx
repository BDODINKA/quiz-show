import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom'
import {login, newPass, notPage, profile, register, restorePass} from '../../app/m1-ui/routes/const-routes'
import PageNotFound from './common/c4-Page-404/PageNotFound'
import SuperComponents from './SuperComponents'
import style from './testApp.module.css'



export const TestApp = () => {
    return (
            <BrowserRouter>
                <div className={style.block}>
                    <NavLink to={login}>login</NavLink>
                    <NavLink to={register}>register</NavLink>
                    <NavLink to={profile}>profile</NavLink>
                    <NavLink to={notPage}>notPage</NavLink>
                    <NavLink to={restorePass}>restorePass</NavLink>
                    <NavLink to={newPass}>newPass</NavLink>
                    <NavLink to={'/'}>SuperComponents</NavLink>
                </div>
                <Routes>
                    <Route path={'/'} element={<SuperComponents/>}/>
                    <Route path={login} element={<h1>Login</h1>}/>
                    <Route path={register} element={<h1>Register</h1>}/>
                    <Route path={profile} element={<h1>profile</h1>}/>
                    <Route path={notPage} element={<PageNotFound/>}/>
                    <Route path={restorePass} element={<h1>Restore Password</h1>}/>
                    <Route path={newPass} element={<h1>Enter New Password</h1>}/>
                </Routes>
            </BrowserRouter>
    )
}