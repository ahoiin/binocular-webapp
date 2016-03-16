// reducers are modifiying! the state of the app
// are pure functions: (previousState, action) => newState
// pure means: Given the same arguments, it should calculate the next state and return it.
// No surprises. No side effects. No API calls. No mutations. Just a calculation.
// define which action triggers which function and result in what state
import * as types from '../constants'
import _ from 'lodash'


// actually write the reducer
export default app(

  {},

  {


    [ types.INIT ] (state, action) {
      return {
        ...state,
        nodes: action.nodes,
        links: action.links,
        biLinks: action.biLinks,
        xDomain: action.xDomain,
        yDomain: action.yDomain,
        valNodesDomain: action.valNodesDomain,
        valLinksDomain: action.valLinksDomain,
        scale_node: action.scale_node,
        scale_link: action.scale_link
      }
    },


    [ types.INTERACTION ] (state, action) {
      console.log(action.selected_ids_obj);
      return {
        ...state,
        selected_ids: action.selected_ids,
        selected_ids_obj: action.selected_ids_obj,
        selected_ids_others: action.selected_ids_others
      }
    }





  }
)

// reducer =  takes any kind of action - along with the current state - and invokes the core function that matches the action
function app(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}



