import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/customHooks";
import SuperButton from "../../common/components/superButton/SuperButton";
import {addCardTC, deleteCardTC, getCardsTC, updateCardTC} from "./card-reducer";

export const Card = () => {
    const dispatch = useAppDispatch();
    const pack = useAppSelector(state => state.card)
    useEffect(()=>{
        dispatch(getCardsTC())

        }
        ,[]
    )

    const getCardsHandler = () => {
        dispatch(getCardsTC())
    }
    const addCard = () => {
        dispatch(addCardTC({cardsPack_id: '63569c0865c36e000499fa23'}))
    }
    const deleteCardHandler = () => {
        dispatch(deleteCardTC())
    }
    const updateCardHandler = () => {
        dispatch(updateCardTC({_id: "5eb6a2f72f849402d46c6ac7"}))
    }

    //console.log(pack)
    return (
        <div>
            <SuperButton title={"Get Cards"} onClick={getCardsHandler}/>
            <SuperButton title={'Add new card'} onClick={addCard}/>
            <SuperButton title={'Delete card'} onClick={deleteCardHandler}/>
            <SuperButton title={'Update card'} onClick={updateCardHandler}/>
        </div>
    );
};
