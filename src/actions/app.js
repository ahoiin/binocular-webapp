//  defining actions, they do not dispatch to the store
import * as types from '../constants'


export function loadData(data_ra, data_rc) {
  return {
    type: types.LOAD_DATA,
    data_ra: data_ra,
    data_rc: data_rc
  }
}


export function init(type, nodes, links, biLinks, xDomain, yDomain, valNodesDomain, valLinksDomain, scale_node, scale_link) {
  return {
    type: types.INIT,
    type_: type,
    nodes: nodes,
    links: links,
    biLinks: biLinks,
    xDomain: xDomain,
    yDomain: yDomain,
    valNodesDomain: valNodesDomain,
    valLinksDomain: valLinksDomain,
    scale_node: scale_node,
    scale_link: scale_link
  }
}

export function interaction(type, hover_id, selected_ids, selected_ids_others) {
  return {
  	type: types.INTERACTION,
    type_: type,
    hover_id: hover_id,
    selected_ids: selected_ids,
    selected_ids_others: selected_ids_others
  }
}


export function clickedToggle(clicked) {
  return {
    type: types.CLICKED_TOGGLE,
    clicked: clicked
  }
}



