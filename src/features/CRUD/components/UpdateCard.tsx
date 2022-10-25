import SuperButton from "../../../common/components/superButton/SuperButton";
import {updateCardTC} from "../crud-reducer";
import {useAppDispatch} from "../../../utils/hooks/customHooks";

export const UpdateCard = () => {
    const dispatch = useAppDispatch();

    const updateCardHandler = () => {
        dispatch(updateCardTC({_id: "5eb6a2f72f849402d46c6ac7"}))
    }
    return (
        <div>
            <SuperButton title={'Update Card'} onClick={updateCardHandler}/>
        </div>
    )
}