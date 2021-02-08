const initialState = JSON.parse(localStorage.getItem('redux')) || {
  team1: '',
  team2: '',
  rating1: '',
  rating2: '',
  isTeam1: true,
}


export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'AUTH':
      return {
        ...state.auth,
        team1: payload.team1,
        rating1: payload.rating1,
        team2: payload.team2,
        rating2: payload.rating2,
        isTeam1: true,
      }
    default:
      return state
  }
}
