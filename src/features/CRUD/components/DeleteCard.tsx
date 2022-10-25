
import {deleteCardTC} from "../crud-reducer";
import {useAppDispatch} from "../../../utils/hooks/customHooks";
import SuperButton from "../../../common/components/superButton/SuperButton";

export const DeleteCard = () => {
    const dispatch = useAppDispatch();

    const deleteCardHandler = () => {
        dispatch(deleteCardTC())
    }
    return (
        <div>
            <SuperButton title={'Delete Card'} onClick={deleteCardHandler}/>
        </div>
    )
}