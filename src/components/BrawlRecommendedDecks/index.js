import React from 'react'
import decks from '../../data/decks'
import { BrawlContext } from '../BrawlProvider'
import Decks from '../Decks'
import Title from '../Title'

export default React.memo(function BrawlRecommendedDecks(props) {
  const { id } = React.useContext(BrawlContext)
  const brawlDecks = decks
    .filter(deck => deck.brawl === id)
    .slice(0, props.limit)

  if (brawlDecks.length === 0) return null

  return (
    <>
      <Title>Recommended deck{props.limit === 1 ? '' : 's'}</Title>
      <Decks showUpgrades columns={props.columns} decks={brawlDecks} />
    </>
  )
})
