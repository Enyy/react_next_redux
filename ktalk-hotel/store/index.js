import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// 비동기 처리를 해결하기 위해서 thunk 가 필요함
// 외부 데이터 연동 하기 
const middleware = [thunk]

const configureStore = () => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))
    return store
}

export default configureStore
