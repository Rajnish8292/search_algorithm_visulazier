export function node_(data, parent, distance = null)
{
    this.data = data;
    this.parent = parent;
    this.distance = distance;
}

export function isVisited(visited_list, row, col)
{
    for(let i = 0; i < visited_list.length; i++)
    {
        if(visited_list[i][0] == row && visited_list[i][1] == col)
        {
            return true;
        }
    }

    return false;
}

export function createVisitedNode(self, no_of_cols, row, col) {
    const node_elem = document.getElementsByClassName("node")[no_of_cols*row + col];
    const visited_dom_elem = document.createElement("div");
    visited_dom_elem.className = "visiting_node";
    node_elem.appendChild(visited_dom_elem);
    self.algo_data.visited_node_dom.push(visited_dom_elem); // insert visited dom element
    
    node_elem.dataset.isExplored = true;
}