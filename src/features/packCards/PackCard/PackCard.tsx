import React from "react";
import style from "./PackCard.module.css";
import { TablePackCard } from "../Table/TablePackCard";
import { TableTools } from "./TableTools";
import { TitleButtonPack } from "../TitleButtonPack";

export const PackCard = () => {
  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <TitleButtonPack titlePack="Packs list" titleButton="Add new pack" />
        <TableTools />
        <TablePackCard />
      </div>
    </div>
  );
};
