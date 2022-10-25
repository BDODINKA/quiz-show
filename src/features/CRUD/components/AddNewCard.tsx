
import {addCardTC} from "../crud-reducer";
import {useAppDispatch} from "../../../utils/hooks/customHooks";
import SuperButton from "../../../common/components/superButton/SuperButton";

export const AddNewCard = () => {
    const dispatch = useAppDispatch();

    const addCard = () => {
        dispatch(addCardTC({cardsPack_id: '63569c0865c36e000499fa23'}))
    }
    return (
        <div>
            <SuperButton title={'Add new card'} onClick={addCard}/>
        </div>
    )
}