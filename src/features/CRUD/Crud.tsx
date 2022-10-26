import {AddNewPack} from "./components/AddNewPack";
import {DeletePack} from "./components/DeletePack";
import {UpdatePack} from "./components/UpdatePack";
import {AddNewCard} from "./components/AddNewCard";
import {DeleteCard} from "./components/DeleteCard";
import {UpdateCard} from "./components/UpdateCard";
import {CardPacks} from "../CardPacks/CardPacks";
import {Card} from "../Card/Card";

export const Crud = () => {
    return (
        <div>
            <AddNewPack/>
            <DeletePack/>
            <UpdatePack/>
            <AddNewCard/>
            <DeleteCard/>
            <UpdateCard/>
            <CardPacks/>
            <Card/>
        </div>
    )
}