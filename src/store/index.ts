import { createStore } from 'vuex'
import Letters from './letters'

const store = createStore({})

new Letters({ store, name: 'letters' })

export default store
