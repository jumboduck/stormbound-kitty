const EMOJIS = [' 🥇', ' 🥈', ' 🥉']

const groupScoresByPoints = scores => (acc, id) => {
  const score = String(scores[id])
  if (!acc[score]) acc[score] = []
  acc[score].push(id)
  return acc
}

const renderScore = scoresByPoints => (score, index) => {
  const emoji = EMOJIS[index] || ''
  const users = scoresByPoints[score].map(id => `<@${id}>`).join(' ')

  return `-${emoji} **${score} point${
    Math.abs(score) === 1 ? '' : 's'
  }** — ${users}`
}

const formatTriviaScores = scores => {
  if (Object.keys(scores).length === 0) {
    return '🏅 No scores yet.'
  }

  // Reverse the object to map individual scores to list of user IDs having that
  // amount of points.
  const scoresByPoints = Object.keys(scores).reduce(
    groupScoresByPoints(scores),
    {}
  )

  return [
    '**Current scores:**',
    // Iterate over the individual scores, sort them from the highest
    // to the lowest, and render each line individually by listing the
    // users with that amount of points.
    ...Object.keys(scoresByPoints)
      .sort((a, b) => +b - +a)
      .map(renderScore(scoresByPoints)),
  ].join('\n')
}

export default formatTriviaScores