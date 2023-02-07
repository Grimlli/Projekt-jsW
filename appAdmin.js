"use strict";

const disEL = document.getElementById("display");
const url = "https://firestore.googleapis.com/v1/projects/fakestore-c2abe/databases/(default)/documents/customers";
const masterInput = document.getElementById("master-input");

let currentURL;
let arrayItems =[];
let currentName = "";
let currenEmail ="";
let currentShipping ="";



function getID(){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        disEL.innerHTML = "";
        let display = "<table> <tr> <th></th>   <th>name</th>   <th></th> </tr>";
        disEL.innerHTML = display;
        for(let i = 0; i<data.documents.length; i++){
            let x = JSON.stringify(data.documents[i].name.slice(64));
            display +=`<tr> <td> <input id="delete-btn" type="button" value="Delete" onclick=deleteSomething(${x})> </td>`;
            display += `<td>${data.documents[i].fields.name.stringValue} </td> `;
            display += `<td> <input id="delete-btn" type="button" value="Eddit" onclick=inspectSomething(${x})> </td> </tr>`
                    
        }
        display += "</table>"
        disEL.innerHTML = display;
        console.log(data.documents[0].fields.name.stringValue)
        console.log(data.documents[0].name)
      
    });
}


function deleteSomething(x){
    console.log("kom in i delete")
    console.log(x);
    currentURL = url+x;
    fetch(currentURL ,{
    method: 'delete'
})   
.then(res => res.json())
.then(data => console.log(data));
    getID();    // dose not work... innerhtml dose not uppdate. 
}

function inspectSomething(x){
    console.log("-----------kom in i inspect-------------")
    
    currentURL = url+x;
    fetch(currentURL)
    .then(res => res.json())
    .then(data => {


        currentName =data.fields.name.stringValue ;
        currenEmail =data.fields.email.stringValue;
        currentShipping =data.fields.shipping.stringValue;
        arrayItems = data.fields.items.arrayValue.values;

        const x = data.fields.name.stringValue;
        let display = "<table>";
        disEL.innerHTML = "";
        display += `<tr> <th>Name</th> <td> ${data.fields.name.stringValue}
        <input type="button" value="change" onclick="hej('name','inget')"> </td>
        <td><input id="delete-btn" type="button" value="delete" onclick=""temp()> </td> </tr> `;

        display +=  `<tr> <th>Email</th> <td> ${data.fields.email.stringValue}" 
        <input type="button" value="change" onclick="hej('email','inget')"> </td>
        <td><input id="delete-btn" type="button" value="delete" onclick=""temp()> </td> </tr> `;

        display +=  `<tr> <th>Shipping</th> <td> ${data.fields.shipping.stringValue}"
        <input type="button" value="change" onclick="hej('shipping','inget')"> </td>
        <td><input id="delete-btn" type="button" value="delete" onclick=""temp()> </td> </tr> `;
        console.log(data.fields.items.arrayValue.values[0].stringValue);
        console.log(x);
        console.log(data.fields.items.arrayValue.values.length);

        for(let i = 0; i<data.fields.items.arrayValue.values.length;i++){
            display += `<tr> <th>item</th> <td>${data.fields.items.arrayValue.values[i].stringValue}
            <input type="button" value="change" onclick="hej('items',${i})"> </td>
            <td><input id="delete-btn" type="button" value="delete" onclick="deleteItem(${i})"> </td> </tr> `
        }
        display += "</table>";
    
        disEL.innerHTML=display;
    });
}



// ASK About this line of code 
/* <input type="button" value="change" onclick="hej('name',${document.getElementById("name").value})">  */
{/* <input id="name" type="text" value="${data.fields.name.stringValue}">  */}

function hej(x,y){
    
    let newValue =JSON.stringify(masterInput.value);
    console.log(x)
    console.log(arrayItems);
    let body;
    if(x==="items"){
        console.log("IN items");
        arrayItems[y] ={"stringValue": newValue};
        
            body = JSON.stringify(
                {
             
                            "fields":{
                                "name": { 
                                    "stringValue": currentName},
                                "email": { 
                                    "stringValue":currenEmail},
                                "shipping":{ 
                                    "stringValue":currentShipping},
                                "items":{
                                    "arrayValue":{ "values":arrayItems }}
                            }
                        }
            )
    }
    else if(x ==="name") {
        console.log("IN names");
        body = JSON.stringify(
            {
         
                "fields":{
                    "name": { 
                        "stringValue": newValue},
                    "email": { 
                        "stringValue":currenEmail},
                    "shipping":{ 
                        "stringValue":currentShipping},
                    "items":{
                        "arrayValue":{ "values":arrayItems }}
                }
            }
        )
    }
    else if(x ==="email"){
        console.log("IN emails");
        body = JSON.stringify(
            {
         
                "fields":{
                    "name": { 
                        "stringValue": currentName},
                    "email": { 
                        "stringValue":newValue},
                    "shipping":{ 
                        "stringValue":currentShipping},
                    "items":{
                        "arrayValue":{ "values":arrayItems }}
                }
            }
        )

    }
    else if(x =="shipping"){
        console.log("IN shipping");
        body = JSON.stringify(
            {
         
                "fields":{
                    "name": { 
                        "stringValue": currentName},
                    "email": { 
                        "stringValue":currenEmail},
                    "shipping":{ 
                        "stringValue":newValue},
                    "items":{
                        "arrayValue":{ "values":arrayItems }}
                }
            }
        )
    }
  
    arrayItems =[];
    console.log(currentURL);
    fetch(currentURL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(res => res.json())
    .then(data => console.log(data));
   
}

// "inspectSomething(${data.documents[i].name})"


function deleteItem(index){
    delete arrayItems[index];
    console.log("ARRAY ITEMS LENGHT "+ arrayItems.length);
    if(arrayItems.length > 0){
        let body = JSON.stringify(
            {
         
            "fields":{
                "name": { 
                    "stringValue": currentName},
                "email": { 
                    "stringValue":currenEmail},
                "shipping":{ 
                    "stringValue":currentShipping},
                "items":{
                    "arrayValue":{ "values":arrayItems }}
                }   
            }
        )
        fetch(currentURL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(res => res.json())
        .then(data => console.log(data));
       
    }
    else{
        console.log("INNE I ELSE")
        let urlForDelete = currentURL.slice(100);
        console.log(urlForDelete);
        deleteSomething(urlForDelete);
    }  
}
