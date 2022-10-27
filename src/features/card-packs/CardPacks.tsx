import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/customHooks";
import SuperButton from "../../common/components/superButton/SuperButton";
import {addPackTC, deletePackTC, getPacksTC} from "./cardPacks-reducer";
import {addCardTC} from "../card/card-reducer";

export const CardPacks = () => {
    const dispatch = useAppDispatch();
    const pack = useAppSelector(state => state.cardPacks)
    useEffect(()=>{
        dispatch(getPacksTC())

        }
        ,[]
    )
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
            <SuperButton title={"Get card-packs"} onClick={getPacksHandler}/>
            <SuperButton title={'Add New Pack'} onClick={addPack}/>
            <SuperButton title={'Delete Pack'} onClick={deletePack}/>
            <SuperButton title={'Update Pack'} onClick={updatePack}/>
        </div>
    );
};
