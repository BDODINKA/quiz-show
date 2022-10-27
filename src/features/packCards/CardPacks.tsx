import React, { useState } from 'react'

import {
  Box,
  Paper,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import SuperButton from '../../common/components/superButton/SuperButton'
import SuperInput from '../../common/components/superInputText/SuperInput'

import remove from './../../assets/img/Table/Delete.svg'
import edit from './../../assets/img/Table/Edit.svg'
import filter_remove from './../../assets/img/Table/filter-remove.svg'
import teacher from './../../assets/img/Table/teacher.svg'
import style from './CardPacks.module.css'

const MyActionsButton = () => {
  return (
    <>
      <div>
        <img src={teacher} alt="teacher" />
      </div>
      <div>
        <img src={edit} alt="edit" />
      </div>
      <div>
        <img src={remove} alt="remove" />
      </div>
    </>
  )
}

const users: {
  created: string
  cardsCount: number
  name: string
  updated: string
  actions: JSX.Element
}[] = [
  {
    name: 'Our Team',
    cardsCount: 10,
    updated: '26/10/2022',
    created: '25/10/2022',

    actions: <MyActionsButton />,
  },
]

export const CardPacks = () => {
  const [active, setActive] = useState<boolean>(false)
  const onClickHundler = () => {
    setActive(!active)
  }
  const [value, setValue] = useState<number[]>([2, 5])
  const valuetext = (value: number) => {
    return `${value}`
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <div className={style.packs_list_header}>
          <div className={style.packs_list_name}>Packs list</div>
          <div>
            <SuperButton title={'Add new pack'} className={style.btn_add_new_pack} />
          </div>
        </div>

        <div className={style.tools_container}>
          <div>
            <div>Search</div>
            <div>
              <SuperInput className={style.input_table} placeholder={'Provide your text'} />
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
              <SuperInput readOnly className={style.border_rating} value={value[0]} />
              <div className={style.range_slider_block}>
                <Box className={style.range_slider}>
                  <Slider
                    min={1}
                    max={10}
                    getAriaLabel={() => 'Rating'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                  />
                </Box>
              </div>
              <SuperInput readOnly className={style.border_rating} value={value[1]} />
            </div>
          </div>
          <div className={style.filter_remove_container}>
            <div className={style.filter_remove}>
              <img src={filter_remove} alt="filter-remove" />
            </div>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table className={style.table_block}>
            <TableHead className={style.table_header}>
              <TableRow className={style.title_table_header}>
                <TableCell>Name</TableCell>
                <TableCell>Cards</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Created by</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={style.table_body}>
              <TableRow className={style.title_table_body}>
                <TableCell>name</TableCell>
                <TableCell>count</TableCell>
                <TableCell>updated</TableCell>
                <TableCell>user name</TableCell>
                <TableCell className={style.actions_button_container}>
                  <MyActionsButton />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
