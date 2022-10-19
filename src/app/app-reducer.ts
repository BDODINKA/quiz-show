export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle' as RequestStatusType,
    error: null
}


export const appReducer = (state: InitialStateType = initialState,
                           action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export  type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}

type ActionsType = SetAppStatusActionType | SetAppErrorActionType