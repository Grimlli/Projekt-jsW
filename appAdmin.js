"use strict";

const disEL = document.getElementById("display");
const url = "https://firestore.googleapis.com/v1/projects/fakestore-c2abe/databases/(default)/documents/customers";
const shortURL ="https://firestore.googleapis.com/v1/"

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
    let newurl = url+x;
    console.log(newurl);
    fetch(newurl ,{
    method: 'delete'
})   
.then(res => res.json())
.then(data => console.log(data));
    getID();    // dose not work... innerhtml dose not uppdate. 
}

function inspectSomething(x){
    console.log("kom in i inspect")
    console.log(url);
    console.log(x);
    fetch(url+x)
    .then(res => res.json())
    .then(data => console.log(data));
}


function hej(){
    console.log("kom in i hej")
    fetch("https://firestore.googleapis.com/v1/projects/fakestore-c2abe/databases/(default)/documents/customers/DKvVtSNxbFaMWmDXTRmO", {
    method: 'delete'
})   
.then(res => res.json())
.then(data => console.log(data));

getID();
}

// "inspectSomething(${data.documents[i].name})"

