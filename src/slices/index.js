import { combineReducers } from 'redux'

import postsReducer from './posts'
import devicesReducer from './devices'

const rootReducer = combineReducers({
  posts: postsReducer,
  devices: devicesReducer,
})

export default rootReducer