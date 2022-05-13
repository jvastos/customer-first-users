//Variable to hold all data from all users from all pages. Se we only need to fetch onse.
let allUsersdata;

//Function to actually fetch the data from the end point an place in the variable "allUsersData"
async function fetchAllData () {
    await fetch("https://reqres.in/api/users")
    .then((response) => response.json())
    .then((data) => {allUsersdata = data.data})
    .catch((error) => {console.log("There was an error fecthing the users", error)}); 
}
fetchAllData();

//Injecting the data into the HTML
setTimeout(() => {
    console.log(allUsersdata);
    allUsersdata.map(i => document.getElementById("usersList").innerHTML += 
                        `
                            <li onclick="userModal(${i.id})">
                            <a href="#" >
                            ${i.first_name + " " + i.last_name}
                            </a>
                            </li>
                        
                        `
                    );
}, 1000);

//MODAL

//Get the modal element
let modal = document.getElementById("myModal")

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

function userModal(id) {
    modal.style.display = "block";
    document.getElementById("user-image").src = allUsersdata[id-1].avatar;
    document.getElementById("user-name").innerHTML = "Name: " + allUsersdata[id-1].first_name + " " + allUsersdata[id-1].last_name;
    document.getElementById("user-email").innerHTML = "Email: " + allUsersdata[id-1].email;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}