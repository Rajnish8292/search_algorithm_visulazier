class queue {
    constructor()
    {
        this.array = [];
    }

    enqueue(elem) {
        this.array.push(elem);
    }
    dqueue() {
        return this.array.shift();
    }
    isEmpty() {
        return (this.array.length == 0);
    }
    top()
    {
        return this.array[0];
    }
    back()
    {
        return this.array[this.array.length-1];
    }
    size()
    {
        return this.array.length;
    }
}

class node_{
    constructor(data, dist)
    {
        this.data = data;
        this.dist = dist;
    }
}
let matrix = [
    [1, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [2, 0, 0, 1, 1, 1]
]






function dijkstra(matrix)
{
    let isVisited = []
        ,minDist = [];
    let q = new queue();
    let filter = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    for(let i = 0; i < matrix.length; i++)
    {
        isVisited.push([]);
        minDist.push([]);
        for(let j = 0; j < matrix[0].length; j++)
        {
            isVisited[i].push(false);
            minDist[i].push(Infinity);
            // isVisited[i][j] = false;
            // minDist[i][j] = Infinity;
        }
    }

    console.log(isVisited);
    console.log(minDist);
    let start = new node_([5, 0], 0);

    q.enqueue(start);
    // isVisited[5][0] = true;
    minDist[5][0] = 0;


    while(!q.isEmpty())
    {
        let node = q.dqueue();
        const row = node.data[0],
            col = node.data[1];

        isVisited[node.data[0]][node.data[1]] = true;

        if(matrix[row][col] == 3)
        {
            console.log("found it");
            console.log(isVisited);
            console.log(minDist);
            return 1;
        }


        for(let i = 0; i < 4; i++)
        {
            const n_row = row + filter[i][0],
                n_col = col + filter[i][1];
                if(matrix[n_row] != undefined)
                {
                    if(matrix[n_row][n_col] != undefined && matrix[n_row][n_col] != 1 && !isVisited[n_row][n_col])
                    {
                        if(minDist[n_row][n_col] > node.dist+1)
                        {
                            minDist[n_row][n_col] = node.dist+1;
                        }


                        let n_node = new node_([n_row, n_col], minDist[n_row][n_col]);

                        q.enqueue(n_node);
                    }
                }
        }




    }

    console.log(isVisited);
    console.log(minDist);
return 0;
    
}






console.log(dijkstra(matrix));





// console.log("1")

// function sleep(millis)
// {
//     var date = new Date();
//     var curDate = null;
//     do { curDate = new Date(); }
//     while(curDate-date < millis);
// }

// sleep(10000);

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function demo() {
//     for (let i = 0; i < 5; i++) {
//         console.log(`Waiting ${i} seconds...`);
//         await sleep(i * 1000);
//     }
//     console.log('Done');
// }

// demo();
// const sleep = new Promise((resolve, reject) => {setTimeout(resolve, 10000)});

// sleep
//     .then(()=> { alert("2") })

// console.log("3")
// 


// var grid = [
//     [0, 0, 0, 0, 0, 0],
//     [1, 1, 0, 0, 0, 0],
//     [1, 1, 1, 1, 1, 0],
//     [2, 1, 1, 1, 0, 0],
//     [0, 0, 0, 0, 0, 3]
// ];

// // alert("hlo");


// // class node {
// //     constructor(data, parent)
// //     {
// //         this.data = data;
// //         this.parent = parent;
// //     }
// // }




// function node_(data, parent)
// {
//     this.data = data;
//     this.parent = parent;
// }


// function dfs(i, j, grid)
// {
//     var node_stack = new stack();
//     var visited = [];
//     var solution = [];

//     function isVisited(row,col)
//     {
//         for(var i = 0; i < visited.length; i++)
//         {
//             if(visited[i][0] == row && visited[i][1] == col)
//             {
//                 return true;
//             }
//         }

//         return false;
//     }


//     var start = new node_([i, j], null);
//     node_stack.push(start);
//     visited.push([i, j]);
    

//     while(!node_stack.isEmpty())
//     {
//         var node = node_stack.pop();
//         if(grid[node.data[0]][node.data[1]] == 3) {

//             while(node.parent)
//             {
//                 solution.push(node.data);
//                 node = node.parent;
//             }
//             solution = solution.reverse();
//             solution.unshift([i, j]);
//             console.log(solution);
//             return [node.data[0], node.data[1]];
//         }
//         var filter = [[-1, 0], [0, -1], [-1, -1], [1, 1], [1, 0], [0, 1], [-1 , 1], [1, -1]];

//         for(var k = 0; k < filter.length; k++)
//         {
//             var row = node.data[0]+filter[k][0], col = node.data[1]+filter[k][1];
//             // console.log([row, col]);
//             if(grid[row] != undefined) {
//                 if(grid[row][col] != undefined) {
//                     if(!isVisited(row, col) && grid[row][col] != 1)
//                     {
//                         var new_node = new node_([row, col], node);
//                         node_stack.push(new_node);
//                         visited.push([row, col]);
//                     }
//                 }
                
//             }
//         }
//     }

//     return false;

// }



// console.log(dfs(3, 0));