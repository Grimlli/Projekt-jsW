"use strict";


const disEL = document.getElementById("display");
const userInfo = document.getElementById("user-info");
const buyButton = document.getElementById("buy-button");


const inBasketEl = document.getElementById("in-basket");

const nameEL = document.getElementById("name");
const mailEL = document.getElementById("mail");
const shipEl = document.getElementById("shipping");


// Bad name for functions sounds the same
itemsInBasket();
basketCount();

function test(){
    console.log(localStorage);
    itemsInBasket();
}



function itemsInBasket(){
    let display = "<table> <tr> <th>Count</th>   <th>Product</th>   <th>Price</th> </tr>";
    disEL.innerHTML +=display

    console.log(Object.keys(localStorage));
    if(localStorage.length > 0){
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>{

            let totalPrice = 0;
            for(let i = 0; i<localStorage.length;i++){
                let price = 0;
                display += `<tr> <td> <input type=button onclick="removeItem(${Object.keys(localStorage)[i]})" value="-">
                ${localStorage.getItem(Object.keys(localStorage)[i])} 
                <input type=button onclick="addItem(${Object.keys(localStorage)[i]})" value="+"</td> `;

                display += `<td><img class='tabel-img' src=${json[Object.keys(localStorage)[i]].image}></td>`;
                price = json[Object.keys(localStorage)[i]].price*localStorage.getItem(Object.keys(localStorage)[i]);
                display += `<td>${price}£</td> </tr>`;
                totalPrice +=price;
                console.log(totalPrice);
            }
                display += `<tr> <th>Sum:</th>   <th></th>   <th>${totalPrice}£</th> </tr> </table>`
                disEL.innerHTML =display
            })
    }
    else{
        disEL.innerHTML ="";
    }
    
}


function removeItem(x){
    console.log("Inne i add basket");
    let newValue = 0;
        newValue = parseInt(localStorage.getItem(x))-1;
        console.log("iF  "+newValue);
    console.log(newValue);
    localStorage.setItem(x,newValue);
    if(localStorage.getItem(x)==0){
        localStorage.removeItem(x);
    }
    itemsInBasket();
    basketCount()
}

function addItem(x){
    console.log("Inne i add basket");
    let newValue = 1;
    if ( localStorage.getItem(x)!=null){
        newValue = parseInt(localStorage.getItem(x))+1;
        console.log("iF  "+newValue);
    }
    console.log(newValue);
    localStorage.setItem(x,newValue);
    itemsInBasket();
    basketCount()
}

function buy(){
    console.log("HEj");

    let x=  itemsInArray();
    let name = nameEL.value;
    let email = mailEL.value;
    let ship = shipEl.value;
    console.log(name, email ,x)
    let body = JSON.stringify(
        {
     
                    "fields":{
                        "name": { 
                            "stringValue": name},
                        "email": { 
                            "stringValue":email},
                        "shipping":{ 
                            "stringValue":ship},
                        "items":{
                            "arrayValue":{ "values":x }}
                    }
                }
    )
    
    fetch("https://firestore.googleapis.com/v1/projects/fakestore-c2abe/databases/(default)/documents/customers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(res => res.json())
    .then(data => console.log(data));
    
    uppdatePage();
}


function itemsInArray(){
console.log("är i Items ARRAY");
let items = [];

for(let i = 0; i<localStorage.length;i++){
    let n = Object.keys(localStorage)[i];
    for(let y = 0; y <localStorage[n]; y++){
        items.push({"stringValue":n});
    }
}
    console.log(items);
    return items;
}

function fire(){
    fetch("https://firestore.googleapis.com/v1/projects/fakestore-c2abe/databases/(default)/documents/customers")
    .then(res => res.json())
    .then(data => console.log(data));
}


function uppdatePage(){

    localStorage.clear();
    itemsInBasket();
    basketCount();
    buyButton.setAttribute("disabled","disabld");
    nameEL.value="";
    mailEL.value ="";

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


userInfo.addEventListener("input", () => {

    console.log(localStorage.length)
    if(nameEL.value.length > 0 && 
        mailEL.value.length > 0 && 
        mailEL.value.includes("@") &&
        localStorage.length  > 0) {
        console.log("inne i if sats");
        buyButton.removeAttribute("disabled");

        }
    else {
        buyButton.setAttribute("disabled","disabld");
    }
})

