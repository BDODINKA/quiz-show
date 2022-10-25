
import {deletePackTC} from "../crud-reducer";
import SuperButton from "../../../common/components/superButton/SuperButton";
import {useAppDispatch} from "../../../utils/hooks/customHooks";

export const DeletePack = () => {
    const dispatch = useAppDispatch();

    const deletePack = () => {
        dispatch(deletePackTC())
    }
    return (
        <div>
            <SuperButton title={'Delete Pack'} onClick={deletePack}/>
        </div>
    )
}