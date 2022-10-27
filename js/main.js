let game ={
    jp: 0,
    np: 0,
    jpadd: 1,
    npadd: 1,
    jpidle: 0,
    npidle: 0,
    bought: [0,0,0,0,0,0,0,0],

    up1p: 25,
    up2p: 25,
}

function format(amount) {
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount / Math.pow(10, power);
    if (power < 6) return amount.toFixed(0);
    return mantissa.toFixed(2) + "e" + power;
}

function clickJesse() { 
    game.jp += game.jpadd;
    updateGUI();
}

function clickNeil() { 
    game.np += game.npadd;
    updateGUI();
}


function buyUp1() { //more jesse points
    if (game.np < game.up1p){
        return
    }else{
        game.np -= game.up1p;
        game.up1p *= (2.25+((Math.log2(game.jpadd))/5.5));
        game.jpadd *= 2;
        // element.classList.add("bought");
        // game.bought[0]=1;
        updateGUI();
    }
}

function buyUp2() { //more neil points
    if (game.jp < game.up2p){
        return
    }else{
        game.jp -= game.up2p;
        game.up2p *= (2.25+((Math.log2(game.npadd))/5.5));
        game.npadd *= 2;
        // element.classList.add("bought");
        // game.bought[1]=1;
        updateGUI();
    }
}

function buyUp3() { //idle jesse points
    if (game.np < 100){
        return
    }else{
        game.np -= 100;
        game.jpidle = 1;
        game.bought[2]=1;
        updateGUI();
    }
}

function buyUp4() { //idle jesse points
    let element = document.getElementById("up4");
    if (game.jp < 100 || element.classList.contains("bought")){
        return
    }else{
        game.jp -= 100;
        game.npidle = 1;
        // element.classList.add("bought");
        game.bought[3]=1;
        updateGUI();
    }
}




function updateGUI() {
    document.getElementById('jp').innerHTML = "Jesse Points: " + format(game.jp);
    document.getElementById('np').innerHTML = "Neil Points: " + format(game.np);

    document.getElementById('up1p').innerHTML = format(game.up1p);
    document.getElementById('up2p').innerHTML = format(game.up2p);
    

    for (var i=0; i<8; i++) {//initialisation; condition; action at end of iteration    
        if(game.bought[i] == 1){
            document.getElementById("up" + [i+1]).classList.add("bought");
        }
        game.bought.push(i);
    }

    // unlock row 2
    let u3 = document.getElementById("up3");let u4 = document.getElementById("up4");
    if (u3.classList.contains("bought") && u4.classList.contains("bought")){
        document.getElementById("row2").classList.remove("hiddenrow");
    }
}

setInterval(function(){ // idle points function
    game.jp += game.jpidle;
    game.np += game.npidle;
    updateGUI();
}, 1000);


var saveItemName = "player";

function save(){ //save
    localStorage.setItem(saveItemName, btoa(JSON.stringify(game)));
    console.log("Saved!" + JSON.stringify(game) + "Saved!");
}

function load() { //load
    var loadedSave = localStorage.getItem(saveItemName);
    if (loadedSave===null) return;
    game = JSON.parse(atob(loadedSave));
    updateGUI();
}

window.onload=function () {
    load();
}

setInterval(function(){ // auto save
    save();
}, 15000);