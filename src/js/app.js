// import "js/script.js"

import {bfs, dfs, dijkstra} from "/js/algorithm.js"

export class app {
    constructor()
    {
        this.block_size = 25; // per block size
        this.start_node_row = 5;
        this.start_node_col = 10;   
        this.end_node_row = 20;
        this.end_node_col = 20;
        this.no_of_node_rows = Math.floor(window.innerHeight/this.block_size);
        this.no_of_node_cols = Math.floor(window.innerWidth/this.block_size);
        this.visualization_speed = 10;
        this.saved_data = null;
        // grid legend
        // 0 -> path
        // 1 -> wall
        // 2 -> starting point
        // 3 -> final point

        this.algo_data = {
            isRunning: false,
            grid : [
            ],
            algorithm:{
                DIJKSTRA: 1,
                DFS: 2,
                BFS: 3,
            },
            selected_algorithm: 3,
            visited_node_dom: [],
            wall_dom : []
        }
        this.cache = {mouse_down_className : undefined};

    }
    init() {
        // grid setting for nodes
        let dom_visualizer = document.getElementsByClassName("visualizer")[0];
        dom_visualizer.style.gridTemplateColumns = `repeat(${this.no_of_node_cols}, auto)`;
        dom_visualizer.style.gridTemplateRows = `repeat(${this.no_of_node_rows}, auto)`;

        this.create_empty_block(); // create node
        this.init_event_listener();// add event listener to visualizer
        this.init_grid();// creating matrix 
        this.init_startEnd_node();
        // this.depthFirstSearch();
    }

    setSpeed(val)
    {
        this.visualization_speed = val;
    }
    changeAppRunningStatusTo(val)
    {
        this.algo_data.isRunning = val;
    }
    isRunning()
    {
        return this.algo_data.isRunning;
    }
}


// creating matrix
app.prototype.init_grid = function()
{
    this.algo_data.grid = [];

    for(let i = 0; i < this.no_of_node_rows; i++)
    {
        this.algo_data.grid.push([]);
        for(let j = 0; j < this.no_of_node_cols; j++)
        {
            this.algo_data.grid[i].push(0);
        }
    }

}

// clear the block and create new one's
app.prototype.create_empty_block = function()
{
    let dom_visualizer = document.getElementsByClassName("visualizer")[0];
    dom_visualizer.innerHTML = "";
    // creating nodes

    for(let i = 0; i < this.no_of_node_rows; i++)
    {
        for(let j = 0; j < this.no_of_node_cols; j++)
        {
            let node = document.createElement("div");
            node.className = "node";
            node.dataset.row = i;
            node.dataset.col = j;
            node.dataset.index = this.no_of_node_cols*i + j;
            node.isWall = false;
            node.isStart = false;
            node.isTarget = false;
            node.isExplored = false;
            
            dom_visualizer.appendChild(node);
        }
    }
}



// add event listener to app
app.prototype.init_event_listener = function()
{
    let self = this; // refer to app class
    self.visualizer_elem = document.getElementsByClassName("visualizer")[0];
    self.isMouseDown = false;


    document.addEventListener("mousedown", function(e)
    {
        self.isMouseDown = true;

       if(e.target.id == "u_node") {
        self.cache.mouse_down_className = e.target.id;
        self.cache.dragging_dom_className = e.target.classList[2];
       }

    });

    document.addEventListener("mouseup", function(e)
    {
        self.isMouseDown = false;
        console.log(e.target);
        if(self.cache.dragging_dom_className)
        {
            if(e.target.className != "wall") {


                e.target.appendChild(document.getElementsByClassName(self.cache.dragging_dom_className)[0]);
                if(self.cache.dragging_dom_className == "start_node")
                {
                    let new_row = parseInt(e.target.dataset.row); // new row position of start 
                    let new_col = parseInt(e.target.dataset.col);// new column position of start 
                    self.algo_data.grid[self.start_node_row][self.start_node_col] = 0; // erase the previous position
                    self.algo_data.grid[new_row][new_col] = 2;// enter new position of start

                    self.start_node_row = new_row; 
                    self.start_node_col = new_col;
                } else {
                    let new_row = e.target.dataset.row; // new row position of start 
                    let new_col = e.target.dataset.col;// new column position of start 
                    self.algo_data.grid[self.end_node_row][self.end_node_col] = 0; // erase the previous position
                    self.algo_data.grid[new_row][new_col] = 3;// enter new position of start

                    self.end_node_row = new_row; 
                    self.end_node_col = new_col;
                }

                // console.log(self.algo_data.grid);
            }
            
        }
        self.cache.mouse_down_className = undefined;
        self.cache.dragging_dom_className = undefined;
    });

    document.addEventListener("mousemove", function(e)
    {
        if(e.target.className == "node") {
            if(self.isMouseDown)
         {

         if(self.cache.mouse_down_className != "u_node")
         {
            if((!e.target.dataset.isWall || e.target.dataset.isWall == "false") && (!e.target.dataset.isStart && !e.target.dataset.isTarget) && (e.target.dataset.isExplored == "false" || !e.target.dataset.isExplored)) {
                const wall_dom = create_wall(e.target.dataset.index);
                self.algo_data.wall_dom.push(wall_dom);
                self.algo_data.grid[e.target.dataset.row][e.target.dataset.col] = 1;
               } 
         } else {

         }
     }
    }
    
});
}

app.prototype.init_startEnd_node = function()
{
    const node = document.getElementsByClassName("node");
    const DOM_start = document.createElement("div");
    const DOM_end = document.createElement("div");
    this.algo_data.grid[this.start_node_row][this.start_node_col] = 2;
    this.algo_data.grid[this.end_node_row][this.end_node_col] = 3;
    DOM_start.className = "material-icons u_node start_node";
    DOM_end.className = "material-icons u_node end_node";

    DOM_start.innerHTML = "keyboard_arrow_right";
    DOM_end.innerHTML = "room";
    DOM_start.id = "u_node";
    DOM_end.id = "u_node";

    node[this.no_of_node_cols*this.start_node_row+this.start_node_col].dataset.isStart = true;
    node[this.no_of_node_cols*this.end_node_row+this.end_node_col].dataset.isTarget = true;
    node[this.no_of_node_cols*this.start_node_row+this.start_node_col].appendChild(DOM_start);
    node[this.no_of_node_cols*this.end_node_row+this.end_node_col].appendChild(DOM_end);

    

}


app.prototype.clear = function(self) 
{

        for(let i = 0; i < self.algo_data.visited_node_dom.length; i++) 
        {
            self.algo_data.visited_node_dom[i].parentElement.dataset.isExplored = false;
            self.algo_data.visited_node_dom[i].remove();
        }
        self.algo_data.visited_node_dom = [];
    
    
}

app.prototype.clear_wall = function(self)
{
    let wall_domList = self.algo_data.wall_dom;
    console.log(wall_domList);
    for(let i = 0; i < wall_domList.length; i++)
    {
        let wall_parent = wall_domList[i].parentElement;
        let row = wall_parent.dataset.row;
        let col = wall_parent.dataset.col;
        // console.log(wall_parent);
        self.algo_data.grid[row][col] = 0;
        wall_domList[i].parentElement.dataset.isWall = false;
        wall_domList[i].remove();
    }
    self.algo_data.wall_dom = [];
}

app.prototype.create_path = function(solution)
{
    let self = this;

    for(let i = 0; i < solution.length; i++)
    {
        const node_1 = document.getElementsByClassName("node")[self.no_of_node_cols*solution[i].data[0] + solution[i].data[1]];
        const path_node = document.createElement("div");
        path_node.className = "path";
        // path_node.style.background = "black";
        node_1.appendChild(path_node);
        self.algo_data.visited_node_dom.push(path_node);
    }
    



}

app.prototype.dijkstra = dijkstra;
app.prototype.breadthFirstSearch = bfs;

app.prototype.depthFirstSearch = dfs;



