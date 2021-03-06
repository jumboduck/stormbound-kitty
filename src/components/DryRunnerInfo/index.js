import React from 'react'
import Column from '../Column'
import DryRunnerSettings from '../DryRunnerSettings'
import Row from '../Row'
import Title from '../Title'
import './index.css'

export default React.memo(function DryRunnerInfo(props) {
  const deckIds = props.deck.map(card => card.id)
  const containsFrozenCore = deckIds.includes('W9')
  const containsDawnsparks = deckIds.includes('W16')
  const containsFreeze = props.containsFreeze(props.deck)

  return (
    <div className='DryRunnerInfo'>
      <Row desktopOnly>
        <Column>
          <DryRunnerSettings {...props} />
        </Column>

        <Column>
          <Title>Statistics</Title>

          {props.turn === 1 ? (
            <p>
              Statistics will start showing up at the beginning of the next
              turn.
            </p>
          ) : (
            <>
              <p>
                It has been{' '}
                <span className='Highlight'>{props.turn} turns</span>, during
                which you’ve played{' '}
                <span className='Highlight'>
                  {props.totalCardsPlayed} cards
                </span>{' '}
                (about{' '}
                <span className='Highlight'>
                  {(props.totalCardsPlayed / props.turn).toFixed(2)} cards per
                  turn
                </span>
                ).
              </p>

              <p>
                Of these turns,{' '}
                <span className='Highlight'>{props.turnsWithLeftOverMana}</span>{' '}
                of them left you with some unused mana, for a total of{' '}
                <span className='Highlight'>
                  {props.totalUnspentMana} unspent mana{' '}
                  {props.totalUnspentMana === 1 ? 'point' : 'points'}
                </span>{' '}
                in the game.
              </p>

              <p>
                You’ve willingly not cycled a card on{' '}
                <span className='Highlight'>
                  {props.turnsWithoutCycling}{' '}
                  {props.turnsWithoutCycling === 1 ? 'turn' : 'turns'}
                </span>
                .
              </p>

              {containsFrozenCore ||
                containsDawnsparks ||
                (containsFreeze && (
                  <p>
                    {containsFrozenCore && props.getFrozenCoreText()}
                    {containsDawnsparks && props.getDawnsparksText()}
                    {containsFreeze && props.getFrozenEnemiesText()}
                  </p>
                ))}
            </>
          )}
        </Column>
      </Row>
    </div>
  )
})
