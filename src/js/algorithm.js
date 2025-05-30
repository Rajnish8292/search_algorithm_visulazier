import {node_, isVisited, createVisitedNode} from "/js/utils.js"  
export function dfs(self) {
    console.log(self)
    const i = self.start_node_row, j = self.start_node_col;
    const node_stack = new stack();
    let visited = [], solution = [], filter = [[-1, 0], [0, -1], [1, 0], [0, 1]];

    const start = new node_([i, j], null); // (data, parent)
    node_stack.push(start);
    visited.push(start.data);

    (async function() 
    {
        self.changeAppRunningStatusTo(true);
        while(!node_stack.isEmpty())
        {
            const node = node_stack.pop();
            const row = node.data[0], col = node.data[1];
            
            // Check if node is valid before processing
            if(self.algo_data.grid[row] === undefined || self.algo_data.grid[row][col] === undefined) {
                continue;
            }

            // Visualize current node (if not start/end)
            if((row != self.start_node_row || col != self.start_node_col) && 
               (row != self.end_node_row || col != self.end_node_col)) {
                createVisitedNode(self, self.no_of_node_cols, row, col);
            }
            
            if(self.algo_data.grid[row][col] == 3)
            {
                let temp = node;
                while(temp.parent)
                {
                    solution.push(temp);
                    temp = temp.parent;
                }
                solution.shift();
                self.create_path(solution);
                console.log("found it!");
                self.changeAppRunningStatusTo(false);
                return 1;
            }

            for(let f = 0; f < filter.length; f++)
            {
                const n_row = row+filter[f][0], n_col = col+filter[f][1];
                
                // Check boundaries and if already visited
                if(self.algo_data.grid[n_row] === undefined || 
                   self.algo_data.grid[n_row][n_col] === undefined || 
                   self.algo_data.grid[n_row][n_col] == 1 || 
                   isVisited(visited, n_row, n_col)) {
                    continue;
                }
                
                const n_node = new node_([n_row, n_col], node);
                node_stack.push(n_node);
                visited.push(n_node.data);
            }
            await new Promise(resolve => setTimeout(resolve, self.visualization_speed));
        }
        self.changeAppRunningStatusTo(false);
    })();
}
  
export function bfs(self) {
    // starting point
    const i = (self.start_node_row);
    const j = (self.start_node_col);
    
    // queue for storing node
    const node_queue = new queue();
    let visited = []; // list of visited nodes
    let solution = [];// path from start to end node
    
    
    const start = new node_([i, j], null);// start node
    
    node_queue.enqueue(start);
    visited.push([i, j]);
    
    (async function(){
        self.changeAppRunningStatusTo(true);
        while(!node_queue.isEmpty())
        {
            let node = node_queue.dqueue();
            let filter = [[-1, 0], [0, -1], [1, 0], [0, 1]]; 
    
            for(let k = 0; k < filter.length; k++)
            {
                let row = node.data[0]+filter[k][0], col = node.data[1]+filter[k][1];
                if(self.algo_data.grid[row] != undefined) {
                    if(self.algo_data.grid[row][col] != undefined) {
                        if(!isVisited(visited, row, col) && self.algo_data.grid[row][col] != 1)
                        {
                            let new_node = new node_([row, col], node);
                            node_queue.enqueue(new_node);
                            visited.push([row, col]);

                            if(self.algo_data.grid[row][col] == 3) {
                                let temp = new_node;
                                while(temp.parent)
                                {
                                    solution.push(temp);
                                    temp = temp.parent;
                                }
                                solution.shift();
                                self.create_path(solution);
                                self.changeAppRunningStatusTo(false);
                                return 1;
                            }
                            createVisitedNode(self, self.no_of_node_cols, row, col);
                            await new Promise(resolve => setTimeout(resolve, self.visualization_speed));
                        }
                    }
                }
            }
        }
        self.changeAppRunningStatusTo(false);
    })();
}

export function dijkstra(self)
{
    let processed_node = [],
        min_dist = [],
        q = new queue(),
        filter = [[1, 0], [0, 1], [-1, 0], [0, -1]],
        solution = [];
    for(let i = 0; i < self.algo_data.grid.length; i++)
    {
        // processed_node.push([]);
        min_dist.push([]);
        for(let j =0; j < self.algo_data.grid[i].length; j++)
        {
            // processed_node[i].push(false);
            min_dist[i].push(Infinity);
        }
    }
    console.log(processed_node);
    console.log(min_dist);

    let start_node = new node_([self.start_node_row, self.start_node_col], null, 0);


    min_dist[self.start_node_row][self.start_node_col] = 0;

    q.enqueue(start_node);
    (async function(){
        while(!q.isEmpty())
        {
            let node = q.dqueue();
            const row = node.data[0],
                col = node.data[1];
            // processed_node[row][col] = true;
            if(isVisited(processed_node,row, col)) continue;

            processed_node.push([row, col]);
            if((row != self.start_node_row || col != self.start_node_col) && ((row != self.end_node_row || col != self.end_node_col)))
            {
                createVisitedNode(self, self.no_of_node_cols, row, col);
            }
            
            
            
    
            if(self.algo_data.grid[row][col] == 3)
            {
                console.log(processed_node);
                console.log(min_dist);
                console.log("found it");

                let temp = node;

                while(temp)
                {
                    solution.push(temp);
                    temp = temp.parent;
                }
                solution.shift();
                solution.pop();

                self.create_path(solution);
                return 1;
            }
    
            for(let i = 0; i < 4; i++)
            {
                const n_row = row + filter[i][0],
                    n_col = col + filter[i][1];
                
                if(self.algo_data.grid[n_row] != undefined)
                {
                    if(self.algo_data.grid[n_row][n_col] != undefined &&self.algo_data.grid[n_row][n_col] != 1 && !isVisited(processed_node, n_row, n_col))
                    {
                        if(min_dist[n_row][n_col] >= node.distance+1)
                        {
                            min_dist[n_row][n_col] = node.distance+1;
                        }
    
                        let n_node = new node_([n_row, n_col], node, min_dist[n_row][n_col]);
    
                        q.enqueue(n_node);
                    }
                }
            }
            await new Promise(resolve => setTimeout(resolve, self.visualization_speed));
        }
    })();

    
    console.log(processed_node);
    console.log(min_dist);

    return 0;
}