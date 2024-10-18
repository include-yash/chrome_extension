const inputElement = document.getElementById("inputBox");
const optionElement = document.getElementById("hintOptions");
const buttonElement = document.getElementById("generateButton");
const hintsContainer = document.getElementById("hintsContainer");

buttonElement.onclick = async () => {
    const problemNumber = inputElement.value;

    if (problemNumber) {
        const response = await fetch('http://localhost:3000/gethint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ problemNumber })
        });

        const hints = await response.json();
        hintsContainer.innerHTML = hints.join('<br/>'); // Display hints
    } else {
        console.log("Invalid Input");
    }
};

chrome.storage.local.get(["input", "hint"], (result) => {
    const { input, hint } = result;
    if (input) {
        inputElement.value = input;
    }
    if (hint) {
        optionElement.value = hint;
    }
});
