"use strict";

const disEL = document.getElementById("display");
const catagoryEl = document.getElementById("catagory");
const button = document.querySelector("button");

fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>displayItems(json,catagoryEl.value))



function displayItems(url,cat){
    let display = "";
    disEL.innerHTML +=display
    console.log(display);
    for(let i = 0; i<url.length;i++){
        if (cat===url[i].category|| cat === "all"){
            
            display += "<section> <img src=" +url[i].image+">";
            display += "<h2>"+i+"<---->"+url[i].title+"</h2><p>"+url[i].price+"€</p> <p>"+url[i].rating.rate+"/5 </p>";         // might want to add number of votes
            display += "<p>"+url[i].description+"</p>" +"<p>"+url[i].category+"</p>";
            display += "<button type:'submit' value:"+i+">put in basket</button>"
            display+="</section>";
            console.log(button.value);
        }
        disEL.innerHTML =display
    }
}

catagoryEl.addEventListener('change',(event) =>{
    console.log("ÄR I event");
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>displayItems(json,catagoryEl.value))
});

button.addEventListener("click",()=>{
    alert(button.value);
});


