import React from "react";
import edit from "../../../assets/img/Table/Edit.svg";
import remove from "../../../assets/img/Table/Delete.svg";

export const MyPackButton = () => {
  return (
    <>
      <div>
        <img src={edit} alt="edit" />
      </div>
      <div>
        <img src={remove} alt="remove" />
      </div>
    </>
  );
};
