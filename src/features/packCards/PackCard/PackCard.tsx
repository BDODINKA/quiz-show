import React from "react";
import style from "./PackCard.module.css";
import { TablePackCard } from "../Table/TablePackCard";
import { TitleAndButtonPack } from "../TitleAndButtonPack";

export const PackCard = () => {
  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <TitleAndButtonPack titlePack="Packs list" titleButton="Add new pack" />
        <TablePackCard />
      </div>
    </div>
  );
};
