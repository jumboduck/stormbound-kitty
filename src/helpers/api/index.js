import fetch from 'node-fetch'

const API_SCORES_PATH = process.env.API_SCORES_PATH
const API_TOKEN = process.env.API_TOKEN
const API_BASE_URL = 'https://jsonbin.org/kittysparkles'
const backup = {}

const getScores = () =>
  fetch(API_BASE_URL + '/' + API_SCORES_PATH, {
    method: 'GET',
    headers: { Authorization: 'token ' + API_TOKEN },
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error)
      return backup
    })

const setScore = (id, update = +1) =>
  getScores()
    .then(scores => +(scores[id] || 0))
    .then(score => {
      fetch(API_BASE_URL + '/' + API_SCORES_PATH, {
        method: 'PATCH',
        headers: { Authorization: 'token ' + API_TOKEN },
        body: JSON.stringify({ [id]: score + update }),
      })
    })
    .catch(error => {
      console.error(error)
      backup[id] += update
    })

export default {
  getScores,
  setScore,
}