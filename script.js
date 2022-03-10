let boxes = document.querySelectorAll("#container > .box"); 
let span = document.querySelector(".close");
let modal = document.querySelector(".modal");
let title = document.querySelector("#imgtitle");
let description = document.querySelector("#description");
let apiObjects = [];

// place event listeners on each box
boxes.forEach(box => {
    box.addEventListener("click", (e) => {
        console.log(e.path[0].id);
        console.log(apiObjects);
        document.querySelector("#modalimg").src = apiObjects[e.path[0].id].primaryImage;
        document.querySelector("#imgtitle").innerHTML = apiObjects[e.path[0].id].title;
        document.querySelector("#artist").innerHTML = "Artist: " + apiObjects[e.path[0].id].artistDisplayName;
        document.querySelector("#bio").innerHTML = "Nationality: " + apiObjects[e.path[0].id].artistDisplayBio;
        document.querySelector("#created").innerHTML = "Date: " + apiObjects[e.path[0].id].objectDate;
        document.querySelector("#metlink").href = apiObjects[e.path[0].id].objectURL;
        modal.style.display = "block";
    })
})

// close modal when user clicks on span
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



// first pull an array of all object IDs into an array called pieces
fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=Vincent Van Gogh')
    .then(res => res.json())
    .then(res => {
        let pieces = res.objectIDs;

        // populates apiObjects array, and also places images on the page tiles
        for(let i = 0; i < 6; i++) {
        fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + pieces[i])
            .then(res => res.json())
            .then(res => {
                boxes[i].style.backgroundImage = `url(${res.primaryImageSmall})`;
                apiObjects[i] = res;
            })
        }
    });

// pulls one JSON object and pushes it onto apiObjects
let populateObject = (id) => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id)
        .then(res => res.json())
        .then(res => {
            apiObjects.push(res);
        });
}

