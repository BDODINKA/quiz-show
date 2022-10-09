import React from 'react';


type authStateType = typeof inititalState
type allActions = ReturnType<typeof SetLoginAC>

const inititalState = {}


export const authReducer = (state: authStateType, action: allActions):authStateType => {
    switch (action.type) {


        default:
            return state
    }
};


const SetLoginAC = () => {
    return {
        type: "SET-LOGIN",
        payload: {}
    } as const
}
