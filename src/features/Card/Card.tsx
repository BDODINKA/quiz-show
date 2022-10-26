import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/customHooks";
import {getCardsTC, getPacksTC} from "../CRUD/crud-reducer";
import SuperButton from "../../common/components/superButton/SuperButton";

export const Card = () => {
    const dispatch = useAppDispatch();
    const pack = useAppSelector(state => state.packs)
    useEffect(()=>{
        dispatch(getCardsTC())

        }
        ,[]
    )

    const getCardsHandler = () => {
        dispatch(getCardsTC())
    }

    console.log(pack)
    return (
        <div>
            <SuperButton title={"Get Cards"} onClick={getCardsHandler}/>
        </div>
    );
};
