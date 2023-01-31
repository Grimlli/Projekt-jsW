"use strict";

const disEL = document.getElementById("display");
const catagoryEl = document.getElementById("catagory");


fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>displayItems(json,catagoryEl.value))



function displayItems(url,cat){
    let display = "";
    disEL.innerHTML +=display

    for(let i = 0; i<url.length;i++){
        if (cat===url[i].category|| cat === "all"){
            
            display += "<section> <img src=" +url[i].image+">";
            display += "<h2>"+i+"<---->"+url[i].title+"</h2><p>"+url[i].price+"€</p> <p>"+url[i].rating.rate+"/5 </p>";         // might want to add number of votes
            display += "<p>"+url[i].description+"</p>" +"<p>"+url[i].category+"</p>";
            display += "<button type='submit' onclick='addToBasker("+i+")' id='btn-put-basket'>put in basket</button>";
            display+="</section>";
        }

        disEL.innerHTML =display
    }
}

function addToBasker(x){
    console.log("Inne i add basket");
    let newValue = 1;
    if ( localStorage.getItem(x)!=null){
        newValue = parseInt(localStorage.getItem(x))+1;
        console.log("iF  "+newValue);
    }
    console.log(newValue);
    localStorage.setItem(x,newValue);
    
}


function test(){
    localStorage.clear();
}


// function localStorageContainer(){
//     const item = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0}
//     localStorage.setItem("items",item);
// }



catagoryEl.addEventListener('change',(event) =>{
    console.log("ÄR I event");
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>displayItems(json,catagoryEl.value))
});



