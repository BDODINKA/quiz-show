
import { useAppDispatch } from "../../../utils/hooks/customHooks";

import {updatePackTC} from "../crud-reducer";
import SuperButton from "../../../common/components/superButton/SuperButton";

export const UpdatePack = () => {
    const dispatch = useAppDispatch();

    const updatePack = () => {
        //dispatch(updatePackTC({}))
    }
    return (
        <div>
            <SuperButton title={'Update Pack'} onClick={updatePack}/>
        </div>
    )
}