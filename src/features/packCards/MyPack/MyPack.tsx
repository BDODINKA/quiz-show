import React from "react";
import style from "../PackCard/PackCard.module.css";
import s from "./MyPack.module.css";
import InputSearch from "../FriendsPack/InputSearch";
import { TitleAndButtonPack } from "../TitleAndButtonPack";
import dots from "./../../../assets/img/Table/dots.svg";
import { TableMyPack } from "./TableMyPack";

export const MyPack = () => {
  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <TitleAndButtonPack
          titlePack="My Pack"
          titleButton="Add new card"
          image={<img className={s.dots} src={dots} alt="dots" />}
        />
        <InputSearch />
        <TableMyPack />
      </div>
    </div>
  );
};
