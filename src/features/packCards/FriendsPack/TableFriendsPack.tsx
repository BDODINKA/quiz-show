import React from "react";
import RatingComponent from "../RatingComponent";
import style from "./FriensPack.module.css";
import poligon from "../../../assets/img/Table/Polygon 2.svg";

const questions = [
  {
    question: "How 'This' work in Java Script",
    answer: "This is how 'This' work in Java Script",
    last_updated: "20/10/2022",
    grade: <RatingComponent />,
  },
  {
    question: "How 'This' work in Java Script",
    answer: "This is how 'This' work in Java Script",
    last_updated: "23/10/2022",
    grade: <RatingComponent />,
  },
];

export const TableFriendsPack = () => {
  return (
    <>
      <table className={style.table_friends_pack}>
        <thead>
          <tr className={style.title_table}>
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
              <tr className={style.title_table_body_friends}>
                <td>{elem.question}</td>
                <td>{elem.answer}</td>
                <td>{elem.last_updated}</td>
                <td>{elem.grade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
