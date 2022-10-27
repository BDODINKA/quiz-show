import React, { useState } from "react";
import style from "./PackCard.module.css";
import SuperInput from "../../../common/components/superInputText/SuperInput";
import SuperButton from "../../../common/components/superButton/SuperButton";
import { Box, Slider } from "@mui/material";
import filter_remove from "../../../assets/img/Table/filter-remove.svg";

export const TableTools = () => {
  const [active, setActive] = useState<boolean>(false);
  const onClickHundler = () => {
    setActive(!active);
  };
  const [value, setValue] = useState<number[]>([2, 5]);
  const valuetext = (value: number) => {
    return `${value}`;
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  return (
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

      <div>
        <div>Show Packs Cards</div>
        <div>
          <SuperButton
            onClick={onClickHundler}
            className={active ? style.button_active : style.button_show}
            title="My"
          />
          <SuperButton
            onClick={onClickHundler}
            className={active ? style.button_show : style.button_active}
            title="All"
          />
        </div>
      </div>

      <div>
        <div>Number of cards</div>
        <div className={style.rating_block}>
          <SuperInput
            readOnly
            className={style.border_rating}
            value={value[0]}
          />
          <div className={style.range_slider_block}>
            <Box className={style.range_slider}>
              <Slider
                min={1}
                max={10}
                getAriaLabel={() => "Rating"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </Box>
          </div>
          <SuperInput
            readOnly
            className={style.border_rating}
            value={value[1]}
          />
        </div>
      </div>
      <div className={style.filter_remove_container}>
        <div className={style.filter_remove}>
          <img src={filter_remove} alt="filter-remove" />
        </div>
      </div>
    </div>
  );
};
