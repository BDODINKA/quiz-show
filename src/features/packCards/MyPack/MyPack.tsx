import React from "react";
import style from "../PackCard/PackCard.module.css";
import InputSearch from "../FriendsPack/InputSearch";
import { TableFriendsPack } from "../FriendsPack/TableFriendsPack";
import { TitleButtonPack } from "../TitleButtonPack";

export const MyPack = () => {
  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <TitleButtonPack titlePack="My Pack" titleButton="Add new card" />
        <InputSearch />
        <TableFriendsPack />
      </div>
    </div>
  );
};
