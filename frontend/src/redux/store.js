import { createStore } from 'redux'

import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// store.subscribe(() => {
//   localStorage.setItem('redux', JSON.stringify(store.getState()))
// })

export default store
