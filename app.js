"use strict";


const disEL = document.getElementById("display");

function test(){
    console.log(localStorage);
    itemsInBasket();
}



function itemsInBasket(){
    let display = "<table> <tr> <th>Count</th>   <th>Product</th>   <th>Price</th> </tr>";
    disEL.innerHTML +=display

    console.log(Object.keys(localStorage));
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
                display += `<tr> <th>Sum:</th>   <th></th>   <th>${totalPrice}</th> </tr> </table>`
                disEL.innerHTML =display
            })
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
}