import React, {useEffect} from "react";
import "./App.css";
import { SignUp } from "../features/SignUp/SignUp";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../features/SignUp/ErrorSnackbar";
import {signUpAPI} from '../features/SignUp/signUp-api'
import {Navigate, Route, Routes} from "react-router-dom";

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(
        state => state.app.status )
    const error = useSelector<AppRootStateType, string | null>(
        state => state.app.error
    )
   /* useEffect(() => {
        signUpAPI.registr({email: 'pavel5284111@mail.ru', password: 'dsfdsff'})
    }, [])*/

  return (
      <div>
          {status === 'loading' && <LinearProgress/>}
          <Routes>
              <Route path = '/' element={<SignUp/>}/>
              <Route path = '/sign-up' element={<SignUp/>}/>

              <Route path = '/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
              <Route path = '*' element={<Navigate to='/404'/>}/>
          </Routes>
          {error !== null && <ErrorSnackbar/>}

      </div>
      )
}

export default App;
