
import {addPackTC} from "../crud-reducer";
import {useAppDispatch} from "../../../utils/hooks/customHooks";
import SuperButton from "../../../common/components/superButton/SuperButton";
import {CardsPackResponceType} from "../crudAPI";
import {useCallback} from "react";



export const AddNewPack = () => {
    const dispatch = useAppDispatch();

    const addPack = () => {
        dispatch(addPackTC({}))
    }



    return (
        <div>
            <SuperButton title={'Add New Pack'} onClick={addPack}/>
        </div>
    )
}