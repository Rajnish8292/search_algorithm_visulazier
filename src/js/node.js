

function create_wall(node_index)
{
    var wall = document.createElement("div");
    var node = document.getElementsByClassName("node")[node_index];
    node.dataset.isWall = true;
    wall.className = "wall";
    node.appendChild(wall);
    return wall;
}
function delete_wall(node_index)
{
    var node = document.getElementsByClassName("node")[node_index];
    var wall = node.children[0];
    node.isWall = false;
    wall.remove();
}