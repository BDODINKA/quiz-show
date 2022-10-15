import React from 'react'

type profileStateType = typeof inititalState
type allActions = ReturnType<typeof SetProfileAC>

const inititalState = {}

export const profileReducer = (state: profileStateType, action: allActions): profileStateType => {
  switch (action.type) {
    default:
      return state
  }
}

const SetProfileAC = () => {
  return {
    type: 'SET-PROFILE',
    payload: {},
  } as const
}
