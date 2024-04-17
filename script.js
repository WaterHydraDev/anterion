// JavaScript for header slider
const imgs = document.querySelectorAll('.header-slider ul img');
const prev_btn = document.querySelector('.control_prev');
const next_btn = document.querySelector('.control_next');

let n = 0;

function changeSlide() {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = 'none';
    }
    imgs[n].style.display = 'block';
}

function nextSlide() {
    if (n < imgs.length - 1) {
        n++;
    } else {
        n = 0;
    }
    changeSlide();
}

function prevSlide() {
    if (n > 0) {
        n--;
    } else {
        n = imgs.length - 1;
    }
    changeSlide();
}

changeSlide();

prev_btn.addEventListener("click", prevSlide);

next_btn.addEventListener("click", nextSlide);

// Automatically change slide every 7 seconds
setInterval(nextSlide, 7000);

// Product Slider
const scrollContainer = document.querySelectorAll('.products');
for (const item of scrollContainer) {
    item.addEventListener('wheel', (evt)=>{
        evt.preventDefault();
        item.scrollLeft += evt.deltaY;
    })
}

// JavaScript for search functionality
// ! For Auto Complete
// Function to get the guest ID
const MAX_HISTORY_LENGTH = 10; // Maximum number of search history items to store

// Function to get the guest ID
function getGuestId() {
    let guestId = localStorage.getItem('guestId');
    if (!guestId) {
        guestId = Math.random().toString(36).substr(2, 9); // Generate a random guest ID
        localStorage.setItem('guestId', guestId);
    }
    return guestId;
}

// Function to get the user's search history from local storage
function getSearchHistory(guestId) {
    let searchHistory = localStorage.getItem(`searchHistory_${guestId}`);
    return searchHistory ? JSON.parse(searchHistory) : [];
}

// Function to save the user's search history to local storage
function saveSearchHistory(guestId, history) {
    localStorage.setItem(`searchHistory_${guestId}`, JSON.stringify(history));
}

// Function to clear the user's search history
function clearSearchHistory() {
    localStorage.removeItem(`searchHistory_${guestId}`);
    searchHistory = [];
    display([]);
}

// Function to format a timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

// Function to add a search query to the search history
function addToSearchHistory(query) {
    const timestamp = Date.now();
    const historyEntry = { query, timestamp };
    
    // Remove duplicates
    searchHistory = searchHistory.filter(item => item.query !== query);
    
    // Add the new entry to the end of the history
    searchHistory.push(historyEntry);
    
    // If the history exceeds 10 items, remove the oldest one
    if (searchHistory.length > MAX_HISTORY_LENGTH) {
        searchHistory.shift(); // Remove the oldest entry
    }
    
    // Save the updated search history to local storage
    saveSearchHistory(guestId, searchHistory);
}

// Function to display the search history with the most recent items at the bottom
function display(result) {
    const resultsBox = document.querySelector(".result-box");
    const content = result.map((entry) => {
        const timestamp = formatTimestamp(entry.timestamp);
        return `<li onclick=selectInput(this)>${entry.query}<span class="timestamp">${timestamp}</span></li>`;
    });

    resultsBox.innerHTML = `<ul>${content.join('')}</ul>`;
}

// Function to handle user input and display autocomplete suggestions
function handleInput() {
    const inputBox = document.getElementById("nav-search-input");
    const inputValue = inputBox.value.trim();

    if (inputValue.length) {
        const combinedArray = availabeKeywords.concat(searchHistory); // Merge available keywords with user's search history
        const result = combinedArray.filter((keyword) => keyword.toLowerCase().includes(inputValue.toLowerCase()));
        display(result);
    } else {
        const resultsBox = document.querySelector(".result-box");
        resultsBox.innerHTML = ''; // Clear the result box if the input is empty
    }
}

// Function to handle selecting a suggestion
function selectInput(list) {
    const inputBox = document.getElementById("nav-search-input");
    inputBox.value = list.innerHTML;
    const resultsBox = document.querySelector(".result-box");
    resultsBox.innerHTML = ''; // Clear the result box after selecting a suggestion
}

// Main code
let availabeKeywords = [
    'Ikaria Juice',
    'Health',
];

let guestId = getGuestId();
let searchHistory = getSearchHistory(guestId);

// Event listener for handling input changes
const inputBox = document.getElementById("nav-search-input");
inputBox.addEventListener('input', handleInput);

// Load the search history when the page loads
window.addEventListener('load', function() {
    display(searchHistory);
});

// Save the user's search history when the page is unloaded
window.addEventListener('unload', function() {
    saveSearchHistory(guestId, searchHistory);
});

// ! Main Search Function
function search() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (searchInput.includes("ikaria") && searchInput.includes("juice")) {
        window.location.href = 'search/ikariajuice.html';
    } else if (searchInput.includes("weight") && searchInput.includes("loss")) {
        window.location.href = 'search/weightloss.html';
    } else if (searchInput.includes("ikria") && searchInput.includes("juice")) {
        window.location.href = 'search/ikariajuice.html';
    } else if (searchInput.includes("loss") && searchInput.includes("weight")) {
        window.location.href = 'search/weightloss.html';
    } else {
        window.location.href = 'search/noresult.html';
    }
}
