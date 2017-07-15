import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import menu from './modules/menu'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{

	},
	actions,
	getters,
	modules: {
		menu
	}
})

