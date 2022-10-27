import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'

import { addPackTC, deletePackTC, getPacksTC } from './cardPacks-reducer'
import { Filtration } from './Filtration/Filtration'

export const CardPacks = () => {
  const dispatch = useAppDispatch()
  // const pack = useAppSelector(state => state.cardPacks)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])
  const getPacksHandler = () => {
    dispatch(getPacksTC())
  }
  const updatePack = () => {
    //dispatch(updatePackTC({}))
  }

  //console.log(pack)
  return (
    <div>
      <Filtration />
    </div>
  )
}
