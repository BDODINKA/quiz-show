import React from "react";
import style from "./TablePackCard.module.css";
import { MyActionsButton } from "../TableActionsButton/MyActionsButton";
import { FriendsButton } from "../TableActionsButton/FriendsButton";
import poligon from "./../../../assets/img/Table/Polygon 2.svg";

const users = [
  {
    name: "Pack Name",
    count: 20,
    updated: "20/10/2022",
    created: "Dima",
    actions: <MyActionsButton />,
  },
  {
    name: "XXX",
    count: 15,
    updated: "23/10/2022",
    created: "Vova",
    actions: <FriendsButton />,
  },
];

export const TablePackCard = () => {
  return (
    <>
      <div>
        <table className={style.table}>
          <thead>
            <tr className={style.title_table_header}>
              <th>Name</th>
              <th>Cards</th>
              <th>
                Last Updated
                <img
                  style={{ marginLeft: "5px" }}
                  src={poligon}
                  alt="poligon"
                />
              </th>
              <th>Created by</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((elem) => {
              return (
                <tr className={style.title_table_body}>
                  <td>{elem.name}</td>
                  <td>{elem.count}</td>
                  <td>{elem.updated}</td>
                  <td>{elem.created}</td>
                  <td className={style.actions_button_container}>
                    {elem.actions}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
