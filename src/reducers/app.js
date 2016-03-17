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

    [ types.LOAD_DATA ] (state, action) {
      return {
        ...state,
        data_ra: action.data_ra,
        data_rc: action.data_rc
      }
    },


    [ types.INIT ] (state, action) {
      let ra = _.clone(state.ra);
      let rc = _.clone(state.rc);

      if(action.type_ == "ra") {
        ra.nodes = action.nodes,
        ra.links = action.links,
        ra.biLinks = action.biLinks,
        ra.xDomain = action.xDomain,
        ra.yDomain = action.yDomain,
        ra.valNodesDomain = action.valNodesDomain,
        ra.valLinksDomain = action.valLinksDomain,
        ra.scale_node = action.scale_node,
        ra.scale_link = action.scale_link
      } else {
        rc.nodes = action.nodes,
        rc.links = action.links,
        rc.biLinks = action.biLinks,
        rc.xDomain = action.xDomain,
        rc.yDomain = action.yDomain,
        rc.valNodesDomain = action.valNodesDomain,
        rc.valLinksDomain = action.valLinksDomain,
        rc.scale_node = action.scale_node,
        rc.scale_link = action.scale_link
      }
      return {
        ...state,
        ra: ra,
        rc: rc
      }
    },


    [ types.INTERACTION ] (state, action) {
      let ra = _.clone(state.ra);
      let rc = _.clone(state.rc);

      if(action.type_ == "ra") {
        ra.selected_ids = action.selected_ids
      } else {
        rc.selected_ids = action.selected_ids
      }
      rc.selected_ids_others = action.selected_ids_others.rc
      ra.selected_ids_others = action.selected_ids_others.ra

      return {
        ...state,
        hover: action.hover_id,
        ra: ra,
        rc: rc
      };
    },

    [ types.CLICKED_TOGGLE ] (state, action) {
      console.log(action.clicked);
      return {
        ...state,
        clicked: action.clicked
      };
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



