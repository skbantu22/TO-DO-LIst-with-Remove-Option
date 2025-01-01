const inputbox = document.getElementById('input-box');
const list = document.getElementById('list-Container');
const btn = document.querySelector(".button-container");

function addtask() {
    if (inputbox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        list.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        inputbox.value = '';
    }
    savedata();
    removeAll(); // Ensure the "Remove All" button visibility is updated after adding a task
}

list.addEventListener("click", function (e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        savedata();
    } else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        savedata();
        removeAll(); // Update the "Remove All" button visibility after deleting a task
    }
}, false);

function savedata() {
    localStorage.setItem("data", list.innerHTML);
}

function getdata() {
    list.innerHTML = localStorage.getItem("data");
    removeAll(); // Ensure "Remove All" button is correctly shown or hidden after refresh
}

getdata();

function removeAll() {
    // Check if there are any tasks in the list
    if (list.children.length > 0) {
        // If there is no "Remove All" button, create it
        if (!document.getElementById("removeAllButton")) {
            let button = document.createElement("button");
            button.innerHTML = "Remove All";
            button.id = "removeAllButton";
            button.onclick = function () {
                list.innerHTML = ''; // Clears the list
                savedata(); // Save the cleared list to localStorage
                removeAll(); // Ensure the button is hidden after clearing the list
            };
            btn.appendChild(button);
        }
    } else {
        // If no tasks exist, remove the "Remove All" button (if it exists)
        let removeAllButton = document.getElementById("removeAllButton");
        if (removeAllButton) {
            removeAllButton.remove(); // Remove the button
        }
    }
}
