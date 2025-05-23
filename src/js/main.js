
import {app} from "/js/app.js"

const visualizer = new app();

visualizer.init();


const visualize_btn = document.getElementsByClassName("visulaize_btn")[0];
visualize_btn.onclick = () => {
    visualizer.clear(visualizer);
    switch(visualizer.algo_data.selected_algorithm)
    {
        case 1 :
            visualizer.dijkstra(visualizer);
            break;
        case 2:
            visualizer.depthFirstSearch(visualizer);
            break;
        case 3:
            visualizer.breadthFirstSearch(visualizer);
            break;
        case 4:
            visualizer.dijkstra(visualizer);
            break;
    }

};


const algorithm_btn = document.querySelectorAll("#algorithm-menu > .item");

algorithm_btn.forEach((elem)=> {
    elem.addEventListener('click', ()=> {
        algorithm_btn.forEach((elem) => {
            elem.classList.remove("active-menu-item");
        })


        elem.classList.add("active-menu-item");
        visualizer.algo_data.selected_algorithm = parseInt(elem.dataset.algorithmindex);



    })
})



const algoSpeedMenu_btn = document.querySelector(".algoSpeed-btn");
const algoMenu_btn = document.querySelector(".algoMenu-btn");

const algoSpeed_menu = document.querySelector("#algoSpeed-menu");
const algo_menu = document.querySelector("#algorithm-menu");

algoMenu_btn.addEventListener('click', ()=> {
    if(algo_menu.style.display == "none" || !algo_menu.style.display)
    {
        algoSpeed_menu.style.display = "none";
        algo_menu.style.display = "block";
    } else {
        algo_menu.style.display = "none";
    }
})

algoSpeedMenu_btn.addEventListener('click', ()=> {
    if(algoSpeed_menu.style.display == "none" || !algoSpeed_menu.style.display)
    {
        algo_menu.style.display = "none";
        algoSpeed_menu.style.display = "block";
    } else {
        algoSpeed_menu.style.display = "none";
    }
})



const clear_btn = document.querySelector("#clearNode");

clear_btn.addEventListener('click', ()=> {
    console.log(visualizer.algo_data.isRunning);
    if(!visualizer.algo_data.isRunning) {
        visualizer.clear(visualizer);

    }
})



const domElem_speed_btn = document.querySelectorAll("#algoSpeed-menu > .item");

domElem_speed_btn.forEach((elem) => {
    elem.addEventListener('click', ()=> {
        domElem_speed_btn.forEach((e) => {
            e.classList.remove("active-menu-item");
        })
        elem.classList.add("active-menu-item");
        visualizer.setSpeed(parseInt(elem.dataset.speed));
        // console.log(visualizer);
    })

})


const clear_wall_btn = document.querySelector("#clearWall");

clear_wall_btn.addEventListener('click', (e) => {
    visualizer.clear_wall(visualizer);
})