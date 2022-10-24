import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RootStateType } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/customHooks";
import { getCardPacksTC } from "./CardPacks-reducer";

export const selectCardsPack = (state: RootStateType) =>
  state.cardPacks.cardsPack;

export const CardPacks = () => {
  const cardsPack = useAppSelector(selectCardsPack);
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created by</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardsPack.map((card) => (
            <TableRow
              key={card._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {card.name}
              </TableCell>
              <TableCell align="right">{card.cardsCount}</TableCell>
              <TableCell align="right">{card.updated}</TableCell>
              <TableCell align="right">{card.created}</TableCell>
              <TableCell align="right">---</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardPacks;
