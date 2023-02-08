"use strict";

const disEL = document.getElementById("display");
const catagoryEl = document.getElementById("catagory");
const inBasketEl = document.getElementById("in-basket");

basketCount();



fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>displayItems(json,catagoryEl.value))



function displayItems(url,cat){
    let display = "";
    disEL.innerHTML +=display

    for(let i = 0; i<url.length;i++){
        if (cat===url[i].category|| cat === "all"){
            // console.log(url[i].title);
            display += "<section class='product-line'> <img src=" +url[i].image+">";
            display += "<table> <tr><th colspan='2'>"+url[i].title+"</th> </tr> <tr> <td colspan='2'>"+url[i].price+"€</td></tr> <tr> <td>"+url[i].rating.rate+"/5 ⭐</td> <td>"+
            url[i].rating.count+"</td> </tr>";         // might want to add number of votes
            display += "<tr> <td colspan='2'>"+url[i].description+"</td> </tr> <tr><td colspan='2'>"+url[i].category+"</td> ";
            display += "<tr> <td colspan='2'><button type='submit' onclick='addToBasker("+i+")' id='btn-put-basket'>put in basket</button> </td></tr></table>";
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

    basketCount();
    
    
}


function test(){
    localStorage.clear();
}



function basketCount(){
    let newItemCount = 0;
    console.log("INNE i Basket COUNT");
    console.log("Antal olika produkter "+localStorage.length);
    if(localStorage.length > 0){

        for(let i =0; i<localStorage.length;i++){
            let y =  parseInt(localStorage.getItem(parseInt(Object.keys(localStorage)[i]))); 
            newItemCount += y;
            console.log("FOR Y "+y);
        }
        }   
    console.log("X innan innerHTML "+newItemCount)
    inBasketEl.innerHTML = newItemCount;
}


catagoryEl.addEventListener('change',(event) =>{
    console.log("ÄR I event");
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>displayItems(json,catagoryEl.value))
});



