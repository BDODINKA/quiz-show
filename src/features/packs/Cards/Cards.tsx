import React, { useEffect, useState } from 'react'

import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { AddAndUpdateCardType } from '../../../api/cardAPI'
import { CardsPackAddType } from '../../../api/cardPacksAPI'
import { ArrowBackTo } from '../../../common/components/ArrowBackTo/ArrowBackTo'
import { ModalMain } from '../../../common/components/Modal/ModalMain'
import { ModalsAll } from '../../../common/components/Modal/ModalsAll'
import { Pagination } from '../../../common/components/Pagination/pagination'
import { Search } from '../../../common/components/Search/Search'
import { Wrapper } from '../../../common/components/Wrapper/Wrapper'
import { PATH } from '../../../common/routes/const-routes'
import {
  selectorCards,
  selectorCardsParams,
  selectorCardsTotalCount,
  selectorIsLogin,
  selectorMaxGrade,
  selectorMinGrade,
  selectorPackDeckCover,
  selectorPackName,
  selectorPackUserId,
  selectorProfileId,
} from '../../../common/selectors/selectors'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/customHooks'
import { deletePackTC, updatePackTC } from '../Packs-reducer'
import { TitleBlockTable } from '../TitleBlockTable/TitleBlockTable'
import style from '../TitleBlockTable/TitleBlockTable.module.css'

import dots from './../../../assets/img/Table/dots.svg'
import {
  addCardTC,
  changeRatingCardTC,
  deleteCardTC,
  getCardsTC,
  updateCardTC,
} from './cards-reducer'
import { CardsTable } from './Cards-Table'
import s from './Cards.module.css'

export const Cards = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams<'id'>()
  const cards = useAppSelector(selectorCards)
  const packUserId = useAppSelector(selectorPackUserId)
  const packName = useAppSelector(selectorPackName)
  const minGrade = useAppSelector(selectorMinGrade)
  const maxGrade = useAppSelector(selectorMaxGrade)
  const cardsTotalCount = useAppSelector(selectorCardsTotalCount)
  const profileId = useAppSelector(selectorProfileId)
  const cardsParams = useAppSelector(selectorCardsParams)
  const isLogin = useAppSelector(selectorIsLogin)
  const packDeckCover = useAppSelector(selectorPackDeckCover)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalName, setModalName] = useState<'modalCard' | 'modalDelete' | 'modalPack' | ''>('')

  useEffect(() => {
    dispatch(getCardsTC(params.id))
  }, [dispatch])

  const deleteCard = (_id: string, packId: string) => {
    dispatch(deleteCardTC(_id, packId))
  }

  const editCard = (updateCard: AddAndUpdateCardType) => {
    dispatch(updateCardTC(updateCard))
  }

  const setOpenModalHandler = () => {
    setOpenModal(true)
  }

  const addNewCard = (card: AddAndUpdateCardType, cardsPack_id: string) => {
    dispatch(addCardTC({ ...card, cardsPack_id }))
  }

  const changeRating = (cardId: string, value: number) => {
    dispatch(changeRatingCardTC({ card_id: cardId, grade: value }))
  }

  const changePackTitle = (pack: CardsPackAddType) => {
    dispatch(updatePackTC(pack, params.id as string))
  }
  const deletePack = () => {
    dispatch(deletePackTC(params.id as string))
    navigate(PATH.PACK_CARDS_PAGE)
  }
  const addPackModal = () => {
    setOpenModalHandler()
    setModalName('modalPack')
  }

  const navigateLearnPage = (cardId: string) => {
    sessionStorage.setItem('url', `${PATH.LEARN_PAGE}/${cardId}`)
    sessionStorage.setItem('packId', `${params.id}`)
    navigate(`${PATH.LEARN_PAGE}/${params.id}/${cardId}`)
  }

  if (!isLogin) return <Navigate to={PATH.LOGIN_PAGE} />

  return (
    <Wrapper className={style.packs_list_container}>
      <div className={style.table_container}>
        {cards && cards.length ? (
          <>
            <ArrowBackTo />
            <TitleBlockTable
              titlePack={packName ? packName : ''}
              titleButton={packUserId === profileId ? 'Add new card' : 'Learn to pack'}
              image={packUserId === profileId && <img className={s.dots} src={dots} alt="dots" />}
              deckCoverImg={packDeckCover as string}
              onClick={() => {
                packUserId === profileId ? addPackModal() : navigateLearnPage(cards[0]._id)
              }}
              style={style}
              navigateToLearn={() => navigateLearnPage(cards[0]._id)}
              changeModal={() => {
                setModalName('modalPack')
                setOpenModalHandler()
              }}
              deleteModal={() => {
                setModalName('modalDelete')
                setOpenModalHandler()
              }}
            />
            <Search onSearchChange={() => {}} value={''} className={s.search} />
            <CardsTable
              cards={cards}
              userId={profileId}
              minGrade={minGrade}
              maxGrade={maxGrade}
              profileId={profileId}
              deleteHandler={(_id, packId) => deleteCard(_id, packId)}
              editCardHandler={updateCard => editCard(updateCard)}
              changeRating={(cardId, value) => changeRating(cardId, value)}
              navigateLearnPage={cardId => navigateLearnPage(cardId)}
            />
            <Pagination
              pageCount={cardsParams.pageCount}
              currentPage={cardsParams.page}
              totalCount={cardsTotalCount as number}
              setPage={() => () => {}}
              setPageCount={() => () => {}}
              maxPages={cardsParams.max}
            />
          </>
        ) : (
          <>
            <ArrowBackTo />
            <TitleBlockTable
              titlePack={packName as string}
              titleButton={packUserId === profileId ? 'Add new card' : 'Learn to pack'}
              deckCoverImg={packDeckCover as string}
              onClick={() => {
                packUserId === profileId && addPackModal()
              }}
              style={style}
            />
          </>
        )}
      </div>
      {modalName !== '' && (
        <ModalMain open={openModal} setOpenModal={setOpenModal}>
          <ModalsAll
            nameModal={modalName}
            setOpenModal={setOpenModal}
            onSubmitCard={card => addNewCard(card, params.id!)}
            onSubmitPack={pack => changePackTitle(pack)}
            text={packName as string}
            deckCover={packDeckCover ? packDeckCover : ''}
            onSubmitDelete={deletePack}
            deleteName={packName as string}
            title={{ card: 'card', pack: 'pack', delete: 'delete' }}
          />
        </ModalMain>
      )}
    </Wrapper>
  )
}
