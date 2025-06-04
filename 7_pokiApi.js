const url= "https://pokeapi.co/api/v2/pokemon/"

async function getPokemon(){
    const card= document.getElementById("card");
    const eleName= document.getElementById("pokiname");
    const eleImg= document.getElementById("sprite");
    const eleHP= document.getElementById("hp");
    const eleattack= document.getElementById("attack");
    const eledefense= document.getElementById("defense");
    const elespeed= document.getElementById("speed");
    const eleability= document.getElementById("ability");
    const eletype= document.getElementById("type");
    const eleSearch= document.getElementById("searchBox");
    
    eleImg.src= "..";

    document.addEventListener("keydown", event => { 
            if (event.key === "/" && document.activeElement.tagName !== "INPUT") {
                event.preventDefault(); 
                eleSearch.focus();      
            }
            else if(event.key === "Escape" && document.activeElement.tagName === "INPUT"){
                event.preventDefault(); 
                eleSearch.blur();   
            }
    })

    const name= document.getElementById("searchBox").value.toLowerCase();
    let api= url + name;

    let data;
    try{
        const pokemon= await fetch(api);
        data= await pokemon.json();
    }
    catch(error){

        card.style.display= "block";
        eleName.textContent= `${name} not found!`;
        eleImg.style.display= 'none';
        eleability.textContent= "Ability: ?";
        eledefense.textContent= "Defense: ?";
        eleattack.textContent= "Attack: ?";
        elespeed.textContent= "Speed: ?";
        eletype.textContent= "Type: ?";
        eleHP.textContent= "HP: ?";
        return;
    }
    
    eleName.textContent= data.name;

    eleImg.src= data.sprites.front_default;
    eleImg.style.display= "block";
    
    card.style.display= "block";

    let mode= `Types: `;
    for(let tp of data.types){
        mode += tp.type.name + ', ';
    }
    mode= mode.substring(0,mode.length-2);
    eletype.textContent= mode;

    let ability= 'Ability: ';
    for(let ab of data.abilities){
        ability += ab.ability.name + ', ';
    }
    ability= ability.substring(0,ability.length-2);
    eleability.textContent= ability;

    let hp= `HP: ${data.stats[0].base_stat}`;
    let attack= `Attack: ${data.stats[1].base_stat}`;
    let defense= `Defense: ${data.stats[2].base_stat}`;
    let speed= `Speed: ${data.stats[5].base_stat}`;

    eleHP.textContent= hp;
    eleattack.textContent= attack;
    eledefense.textContent= defense;
    elespeed.textContent= speed;

    card.addEventListener("mouseover", event =>{
        document.body.style.background= "linear-gradient(90deg,rgb(20, 74, 95) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)";
        eleImg.src= data.sprites.front_shiny;
        eleImg.style.transform= "scaleX(-1)";
        card.style.transform= "scale(1.05)";
    })
    card.addEventListener("mouseout", event =>{
        document.body.style.background= "radial-gradient(circle, hsl(0, 75%, 58%) 0%, hsl(52, 100%, 59%) 100%)";
        eleImg.src= data.sprites.front_default;
        eleImg.style.transform= "scaleX(1)";
        card.style.transform= "scale(1)";
    })

}

