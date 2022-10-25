import {AddNewPack} from "./components/AddNewPack";
import {DeletePack} from "./components/DeletePack";
import {UpdatePack} from "./components/UpdatePack";
import {AddNewCard} from "./components/AddNewCard";
import {DeleteCard} from "./components/DeleteCard";
import {UpdateCard} from "./components/UpdateCard";
import {PackCards} from "../PackCards/PackCards";

export const Crud = () => {
    return (
        <div>
            <AddNewPack/>
            <DeletePack/>
            <UpdatePack/>
            <AddNewCard/>
            <DeleteCard/>
            <UpdateCard/>
            <PackCards/>
        </div>
    )
}