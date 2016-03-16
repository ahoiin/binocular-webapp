//  defining actions, they do not dispatch to the store
import * as types from '../constants'


export function init(nodes, links, biLinks, xDomain, yDomain, valNodesDomain, valLinksDomain, scale_node, scale_link) {
  return {
    type: types.INIT,
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

export function interaction(selected_ids, selected_ids_obj, selected_ids_others) {
  return {
  	type: types.INTERACTION,
    selected_ids: selected_ids,
    selected_ids_obj: selected_ids_obj,
    selected_ids_others: selected_ids_others
  }
}


