let boxes = document.querySelectorAll("#container > .box"); 
var spans = document.querySelectorAll(".close");

for (let i = 1; i <= boxes.length; i++) {
    var modal = document.getElementById("modal" + i);
    var btn = document.getElementById("art" + i);
    
    // When the user clicks on the button, open the modal
    btn.addEventListener("click", () => {
        modal.style.display = "block";
    })
}

// When the user clicks on <span> (x), close the modal
spans.forEach((span) => {
    span.addEventListener("click", modal.style.display = "none");
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
