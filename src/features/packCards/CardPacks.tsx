import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import style from "./CardPacks.module.css";
import SuperButton from "../../common/components/superButton/SuperButton";
import SuperInput from "../../common/components/superInputText/SuperInput";
import image from "./../../assets/img/Table/Delete.svg";

export const CardPacks = () => {
  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <div className={style.packs_list_header}>
          <div className={style.packs_list_name}>Packs list</div>
          <div>
            <SuperButton
              title={"Add new pack"}
              className={style.btn_add_new_pack}
            />
          </div>
        </div>

        <div className={style.tools_container}>
          <div>
            <div>Search</div>
            <div>
              <SuperInput
                className={style.input_table}
                placeholder={"Provide your text"}
              />
            </div>
          </div>
          <div></div>
          <div>3</div>
          <div>4</div>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead className={style.header_table}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Cards</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Created by</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell>count</TableCell>
                <TableCell>updated</TableCell>
                <TableCell>user name</TableCell>
                <TableCell>image</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
