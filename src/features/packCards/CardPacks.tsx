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
import { useAppDispatch, useAppSelector } from "../../utils/hooks/customHooks";
import { getCardPacksTC } from "./CardPacks-reducer";
import { RootStateType } from "../../app/store";

export const selectCardsPack = (state: RootStateType) =>
  state.cardPacks.cardPacks;

export const CardPacks = () => {
  const cardsPack = useAppSelector(selectCardsPack);
  const dispatch = useAppDispatch();
  console.log(cardsPack);
  useEffect(() => {
    dispatch(getCardPacksTC());
  }, []);

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
              key={card.cards._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {card.cards.name}
              </TableCell>
              <TableCell align="right">{card.cards.cardsCount}</TableCell>
              <TableCell align="right">{card.cards.updated}</TableCell>
              <TableCell align="right">{card.cards.user_name}</TableCell>
              <TableCell align="right">---</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
