import React from "react";
import style from "./FriensPack.module.css";
import s from "./FriensPack.module.css";
import SuperInput from "../../../common/components/superInputText/SuperInput";
import union from "./../../../assets/img/Table/Union.svg";

const InputSearch = () => {
  return (
    <div>
      <div>Search</div>
      <div className={s.search_container}>
        <div className={s.union_block}>
          <img className={s.union_img} src={union} alt="" />
        </div>
        <SuperInput
          className={style.input_search}
          placeholder={"Provide your text"}
        />
      </div>
    </div>
  );
};

export default InputSearch;
