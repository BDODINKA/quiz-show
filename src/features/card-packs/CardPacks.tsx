import React, { useEffect } from 'react'

import SuperButton from '../../common/components/superButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'
import { addCardTC } from '../card/card-reducer'

import { addPackTC, deletePackTC, getPacksTC } from './cardPacks-reducer'

export const CardPacks = () => {
  const dispatch = useAppDispatch()
  const pack = useAppSelector(state => state.cardPacks)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])
  const getPacksHandler = () => {
    dispatch(getPacksTC())
  }
  const addPack = () => {
    dispatch(addPackTC({}))
  }
  const deletePack = () => {
    dispatch(deletePackTC())
  }
  const updatePack = () => {
    //dispatch(updatePackTC({}))
  }

  //console.log(pack)
  return (
    <div>
      <SuperButton title={'Get card-packs'} onClick={getPacksHandler} />
      <SuperButton title={'Add New Pack'} onClick={addPack} />
      <SuperButton title={'Delete Pack'} onClick={deletePack} />
      <SuperButton title={'Update Pack'} onClick={updatePack} />
    </div>
  )
}
