import React from "react";
import style from "../PackCard/PackCard.module.css";
import InputSearch from "./InputSearch";
import { TableFriendsPack } from "./TableFriendsPack";
import { TitleButtonPack } from "../TitleButtonPack";

const FriendsPack = () => {
  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <TitleButtonPack
          titlePack="Friend's Pack"
          titleButton="Learn to pack"
        />
        <InputSearch />
        <TableFriendsPack />
      </div>
    </div>
  );
};

export default FriendsPack;
