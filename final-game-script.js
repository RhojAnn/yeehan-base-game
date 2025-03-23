let score = 0;
let chocolateBox = [];
let selectedDropDown = [];
    
let optionScores = new Map([
    ["Colecito", 5],
    ["My Love", 8],
    ["My Dearest Darling", 11],
    ["the cherry blossoms that falls down to me", 11],
    ["the soothing symphony that sings me", 8],
    ["the morning green tea that wakes me", 11],
    ["sun", 11],
    ["star", 8],
    ["light", 5],
    ["every single day.", 8],
    ["every breath I take.", 11],
    ["every chance I get.", 5],
    ["Hanzito", 5],
    ["The One You Called Sweetheart", 11],
    ["MARCO POOKIE", 100]
]);

function startGame(){
    document.getElementsByClassName("start-button")[0].addEventListener("click", function () {
        window.location.href = "chocolate-game.html";
    });
}

function dragandDrop(){
    let chocolates = document.getElementsByClassName("chocolate-list");
    let containers = document.getElementsByClassName("container");

    let selected = null;

    for (let i = 0; i < chocolates.length; i++) {
        chocolates[i].addEventListener("dragstart", function(e) {
            selected = e.target;
        });
    }

    for (let i = 0; i < containers.length; i++) {
        containers[i].addEventListener("dragover", function(e) {
            e.preventDefault();
        });

        containers[i].addEventListener("drop", function(e) {
            e.preventDefault();
            if (selected) {
                e.currentTarget.innerHTML = '';

                let clone = selected.cloneNode(true);
                clone.style.margin = "0";
                clone.style.marginLeft = "5px";

                e.currentTarget.appendChild(clone);

                console.log(clone.id);
                
                selected = null;
            }
        });
    }
}

function resetButton(){
    let containers = document.getElementsByClassName("container");

    document.getElementById("reset-button")?.addEventListener("click", function () {   
        window.location.href = "chocolate-game.html";
    });
}

function submitButton(){
    let containers = document.getElementsByClassName("container");

    document.getElementById("submit-button")?.addEventListener("click", function () {   
        console.log("clicked");
        let count = [0, 0, 0, 0];
       
        for(let i = 0; i < containers.length; i++){
            let container = containers[i];
            let chocolateInContainer = container.querySelector("img");
            
            if(chocolateInContainer){
                let chocolateId = chocolateInContainer.id;
                console.log(chocolateId);

                if(chocolateId === "flower-chocolate"){
                    count[0]++;
                    chocolateBox[i] = "images/chocolates/flower.svg";
                    console.log("Detected");
                } else if(chocolateId === "heart-chocolate"){
                    count[1]++;
                    chocolateBox[i] = "images/chocolates/heart.svg";
                    console.log("Detected");
                } else if(chocolateId === "star-chocolate"){
                    count[2]++;
                    chocolateBox[i] = "images/chocolates/star.svg";
                    console.log("Detected");
                } else if(chocolateId === "circle-chocolate"){
                    count[3]++;
                    chocolateBox[i] = "images/chocolates/circle.svg";
                    console.log("Detected");
                }
            }

        }

        for(let i = 0; i < count.length; i++){
            console.log(count[0] + " " + count[1] + " "  + count[2] + " "  + count[3] + " "  );
        }

        sumofScore(count);
        score = score - atLeastOne(count);
        console.log(score);

        sessionStorage.setItem("chocolateBox", JSON.stringify(chocolateBox));
        sessionStorage.setItem("score", score);

        window.location.href = "loveletter-game.html";
    });
}

function atLeastOne(arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] != 0){
            console.log("No deduction");
            return 0;
        }
    }

    return 10;
}

function sumofScore(arr){
    for(let i = 0; i < arr.length; i++){
        score = score + (arr[i] * 5);
    }
}

function dropDown(){
    let select = document.getElementsByClassName("select");
    let option = document.getElementsByClassName("option");
    let selected = null;

    for(let i = 0; i < select.length; i++){
            select[i].addEventListener("mouseover", function(e){
                console.log("Detected");
                e.preventDefault();
                selected = e.target;
            });
        }

    for(let i = 0; i < option.length; i++){
        option[i].addEventListener("click", function(e) {
            console.log("Clicked");
            e.preventDefault();
            selected.innerHTML = option[i].innerHTML;
        });
    }
}

function loveLetterResetButton(){
    let select = document.getElementsByClassName("select");

    document.getElementById("loveletter-reset-button")?.addEventListener("click", function () {
        const space = ["_________________", "____________________________________", "_____", "__________________", "___________________________"];
        for(let i = 0; i < select.length; i++){
            select[i].innerHTML = space[i];
        }
        
    });
}

function loveLetterSubmitButton(){
    let score = parseInt(sessionStorage.getItem("score")) || 0;
    let select = document.getElementsByClassName("select");

    document.getElementById("loveletter-submit-button")?.addEventListener("click", function () {
        console.log("clicked");
        for(let i = 0; i < select.length; i++){
            if(optionScores.get(select[i].innerHTML)){
                selectedDropDown[i] = select[i].innerHTML;
                score = score + optionScores.get(select[i].innerHTML);
            }
        }
        
        console.log(score);

        sessionStorage.setItem("score", score);
        sessionStorage.setItem("selectedDropDown", JSON.stringify(selectedDropDown));

        window.location.href = "endgame.html";
    });
}

function displayEndGame(){
    let score = parseInt(sessionStorage.getItem("score")) || 0;
    document.getElementsByClassName("score")[0].innerHTML = score;
    scoreRange(score);

}

function creationButton(){
    document.getElementsByClassName("creations")[0].addEventListener("click", function () {
        window.location.href = "creation.html";
    });
}

function scoreRange(score){
    let imgURLs =[
        "images/endgame/end-game-best.svg", 
        "images/endgame/end-game-mid.svg",
        "images/endgame/end-game-low.svg"
    ];
    
    let desc = [
        "Colecito loves it and showers Hanzito with kisses!",
        "Colecito likes it... but he knows Hanzito can do better",
        "It’s not the greatest but Colecito will still love Hanzito"
    ];
    
    if(score >= 80 && score <= 100){
        document.getElementsByClassName("score-description")[0].innerHTML = desc[0];
        document.getElementById("images").src = imgURLs[0];
    }else if(score >= 50 && score <= 79){
        document.getElementsByClassName("score-description")[0].innerHTML = desc[1];
        document.getElementById("images").src = imgURLs[1];
    }else if(score >= 0 && score <= 49){
        document.getElementsByClassName("score-description")[0].innerHTML = desc[2];
        document.getElementById("images").src = imgURLs[2];
    }

    console.log(document.getElementById("images").src);
}

function displayCreation(){
    let chocolateBox = JSON.parse(sessionStorage.getItem("chocolateBox")) || [];
    let containers = document.getElementsByClassName("final-container");

    for(let i = 0; i < chocolateBox.length; i++){
        if(chocolateBox[i]){
            let img = document.createElement("img");
            img.src = chocolateBox[i];
            img.classList.add("final-chocolate");
            containers[i].appendChild(img);
            console.log(containers[i])
        }
    }

    let selectedDropDown = JSON.parse(sessionStorage.getItem("selectedDropDown")) || [];
    let select = document.getElementsByClassName("final-select");

    for(let i = 0; i < selectedDropDown.length; i++){
        if(selectedDropDown[i]){
            select[i].innerHTML = selectedDropDown[i];
        }
    }
}

function backButton(){
    document.getElementsByClassName("back-button")[0].addEventListener("click", function () {
        window.location.href = "endgame.html";
    });
}

function tryAgain(){
    document.getElementsByClassName("try-again")[0].addEventListener("click", function () {
        sessionStorage.clear();
        window.location.href = "index.html";
    });
}

//Drag and drop
document.addEventListener("DOMContentLoaded", function() {
    let score = parseInt(sessionStorage.getItem("score")) || 0;
    if(window.location.pathname.includes("index.html")){
        startGame();
    }else if (window.location.pathname.includes("chocolate-game.html")) {
        console.log(score);
        dragandDrop();
        resetButton();
        submitButton();
    } else if(window.location.pathname.includes("loveletter-game.html")){
        console.log(score);
        dropDown()
        loveLetterResetButton();
        loveLetterSubmitButton();
    } else if (window.location.pathname.includes("endgame.html")){
        displayEndGame();
        creationButton();
        tryAgain();
    } else if(window.location.pathname.includes("creation.html")){
        displayCreation();
        backButton();
    } 
    
});