import React from "react";
import style from "./PackCard/PackCard.module.css";
import SuperButton from "../../common/components/superButton/SuperButton";

type PropsType = {
  titlePack: string;
  titleButton: string;
  image?: any;
};

export const TitleAndButtonPack: React.FC<PropsType> = ({
  titlePack,
  titleButton,
  image,
}) => {
  return (
    <div className={style.packs_list_header}>
      <div className={style.packs_list_name}>
        {titlePack}
        <span>{image}</span>
      </div>

      <div>
        <SuperButton title={titleButton} className={style.btn_add_new_pack} />
      </div>
    </div>
  );
};
