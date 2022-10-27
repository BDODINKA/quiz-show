import React from "react";
import RatingComponent from "../RatingComponent";
import { MyPackButton } from "../TableActionsButton/MyPackButton";
import style from "./../Table/TablePackCard.module.css";
import poligon from "../../../assets/img/Table/Polygon 2.svg";

const questions = [
  {
    question: "How 'This' work in Java Script",
    answer: "This is how 'This' work in Java Script",
    last_updated: "20/10/2022",
    grade: <RatingComponent />,
    edit: <MyPackButton />,
  },
  {
    question: "How 'This' work in Java Script",
    answer: "This is how 'This' work in Java Script",
    last_updated: "23/10/2022",
    grade: <RatingComponent />,
    edit: <MyPackButton />,
  },
];

export const TableMyPack = () => {
  return (
    <>
      <table className={style.table}>
        <thead>
          <tr className={style.title_table_header}>
            <th>Question</th>
            <th>Answer</th>
            <th>
              Last Updated
              <img style={{ marginLeft: "5px" }} src={poligon} alt="poligon" />
            </th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((elem) => {
            return (
              <tr className={style.title_table_body}>
                <td>{elem.question}</td>
                <td>{elem.answer}</td>
                <td>{elem.last_updated}</td>
                <td>{elem.grade}</td>
                <td className={style.actions_button_my_pack}>{elem.edit}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
