document.addEventListener('DOMContentLoaded', function () {
    fetch('index.json')
        .then(response => response.json())
        .then(data => {
            let index = 0; // Initialize index to 0
            displayQuotes(data, index);
            setInterval(() => {
                index = (index + 1) % data.length; // Move to the next quote in a circular manner
                displayQuotes(data, index);
            }, 20000); // Change the time interval (in milliseconds) for a new quote
        });
});

function displayQuotes(quotes, index) {
    const quoteContainer = document.getElementById('quote-text');
    const currentQuote = quotes[index];
    
    quoteContainer.textContent = ''; // Clear previous quote
    typeWriter(quoteContainer, currentQuote, 0);
}

function typeWriter(element, text, i) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i), 100); // Adjust the speed by changing this value
    }
}
