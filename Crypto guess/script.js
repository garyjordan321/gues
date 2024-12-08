// Token Data with Image Links and Redirect URLs
const tokens = [
    { image: "images/pnut.jpeg", name: ["Peanut the Squirrel", "Pnut", "pnut"], redirectUrl: "https://pump.fun/coin/2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump" },
    { image: "images/goat.jpeg", name: ["Goatseus Maximus", "GOAT", "goat"], redirectUrl: "https://pump.fun/coin/CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump" },
    { image: "images/chillguy.jpeg", name: ["chillguy", "just a chill guy", "Chillguy"], redirectUrl: "https://pump.fun/coin/Df6yfrKC8kZE3KNkrHERKzAetSxbrWeniQfyJY4Jpump" },
    { image: "images/fwog.jpeg", name: ["fwog"], redirectUrl: "https://pump.fun/coin/A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump" },
    { image: "images/luce.jpeg", name: ["luce", "Luce"], redirectUrl: "https://pump.fun/coin/CBdCxKo9QavR9hfShgpEBG3zekorAeD7W1jfq2o3pump" },
    { image: "images/vvaifu.png", name: ["Vvaifu", "dasha", "vvaifu"], redirectUrl: "https://pump.fun/coin/FQ1tyso61AH1tzodyJfSwmzsD3GToybbRNoZxUBz21p8" },
    { image: "images/moodeng.jpeg", name: ["Moo deng", "moodeng"], redirectUrl: "https://pump.fun/coin/ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY" },
    { image: "images/michi.jpeg", name: ["michi", "$michi"], redirectUrl: "https://pump.fun/coin/5mbK36SZ7J19An8jFochhQS4of8g6BwUjbeCSxBSoWdp" },
    { image: "images/act1.jpeg", name: ["act1", "act 1", "act"], redirectUrl: "https://pump.fun/coin/9vpcDyZFhGq6EMZWSqcp1HndDZyqUysCqPCuWXa8pump" },
    { image: "images/fred.jpeg", name: ["fred", "first convicted raccon"], redirectUrl: "https://pump.fun/coin/CNvitvFnSM5ed6K28RUNSaAjqqz5tX1rA5HgaBN9pump" },
    { image: "images/ban.jpeg", name: ["ban", "comedian"], redirectUrl: "https://pump.fun/coin/9PR7nCP9DpcUotnDPVLUBUZKu5WAYkwrCUx9wDnSpump" },
    { image: "images/Shoggoth.png", name: ["shoggoth"], redirectUrl: "https://pump.fun/coin/H2c31USxu35MDkBrGph8pUDUnmzo2e4Rf4hnvL2Upump" },
    { image: "images/billy.png", name: ["billy"], redirectUrl: "https://pump.fun/coin/3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump" },
    { image: "images/sigma.png", name: ["sigma"], redirectUrl: "https://pump.fun/coin/5SVG3T9CNQsm2kEwzbRq6hASqh1oGfjqTtLXYUibpump" },
    { image: "images/bert.png", name: ["bert"], redirectUrl: "https://pump.fun/coin/HgBRWfYxEfvPhtqkaeymCQtHCrKE46qQ43pKe8HCpump" },
    { image: "images/daddy.jpeg", name: ["daddy"], redirectUrl: "https://pump.fun/coin/4Cnk9EPnW5ixfLZatCPJjDB1PUtcRpVVgTQukm9epump" },
    { image: "images/memesai.png", name: ["memesai", "memes ai"], redirectUrl: "https://pump.fun/coin/39qibQxVzemuZTEvjSB7NePhw9WyyHdQCqP8xmBMpump" },
    { image: "images/catana.jpeg", name: ["catana"], redirectUrl: "https://pump.fun/coin/GmbC2HgWpHpq9SHnmEXZNT5e1zgcU9oASDqbAkGTpump" },
    { image: "images/zerebro.jpeg", name: ["zerebro"], redirectUrl: "https://pump.fun/coin/8x5VqbHA8D7NkD52uNuS5nnt3PwA8pLD34ymskeSo2Wn" },
    { image: "images/fartcoin.png", name: ["fartcoin"], redirectUrl: "https://pump.fun/coin/9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump" },
];

// Variables
let currentTokenIndex = 0;
let score = 0;

// DOM Elements
const imageContainer = document.getElementById("image-container");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.createElement("div");

// Add score display to the game section
const gameSection = document.getElementById("game");
scoreDisplay.id = "score-display";
gameSection.insertBefore(scoreDisplay, feedback);

// Prevent default link behavior for "Start a New Coin"
const startNewCoinLink = document.querySelector(".start-new-coin a");
startNewCoinLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Save current game state to localStorage before navigating
    localStorage.setItem('gameScore', score);
    localStorage.setItem('currentTokenIndex', currentTokenIndex);

    // Open the create page in a new tab
    window.open("https://pump.fun/create", '_blank');
});

// Restore game state from localStorage
function restoreGameState() {
    const savedScore = localStorage.getItem('gameScore');
    const savedTokenIndex = localStorage.getItem('currentTokenIndex');

    if (savedScore !== null) {
        score = parseInt(savedScore);
    }

    if (savedTokenIndex !== null) {
        currentTokenIndex = parseInt(savedTokenIndex);
    }
}

// Update Score Display
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
    // Save score to localStorage whenever it changes
    localStorage.setItem('gameScore', score);
    localStorage.setItem('currentTokenIndex', currentTokenIndex);
}

// Load Token Image
function loadTokenImage() {
    imageContainer.innerHTML = ""; // Clear existing images
    const token = tokens[currentTokenIndex];
    const img = document.createElement("img");
    img.src = token.image;
    img.alt = "Token Image";
    img.addEventListener("click", () => {
        window.open(token.redirectUrl, "_blank");
    });
    imageContainer.appendChild(img);
    updateScoreDisplay(); // Update score display when loading new image
}

// Check User Guess
function checkGuess() {
    const userGuess = guessInput.value.trim().toLowerCase();
    const currentTokenNames = tokens[currentTokenIndex].name.map(name => name.toLowerCase());

    if (currentTokenNames.includes(userGuess)) {
        feedback.textContent = "Correct! Moving to the next token.";
        score++;
        currentTokenIndex++;
        if (currentTokenIndex < tokens.length) {
            loadTokenImage();
            guessInput.value = ""; // Clear input
            updateScoreDisplay();
        } else {
            feedback.textContent = `Congratulations! You've guessed all tokens correctly! Final Score: ${score}`;
            resetGame();
        }
    } else {
        // Alert for incorrect guess and reset game
        alert(`Incorrect! Your current score is ${score}. Game will restart.`);
        resetGame();
    }
}

// Reset Game
function resetGame() {
    currentTokenIndex = 0;
    score = 0;
    loadTokenImage();
    guessInput.value = ""; // Clear input
    feedback.textContent = ""; // Clear feedback
    // Clear localStorage when game is fully reset
    localStorage.removeItem('gameScore');
    localStorage.removeItem('currentTokenIndex');
}

// Event Listeners
submitButton.addEventListener("click", checkGuess);

// Selectors for Modal
const howItWorksLink = document.querySelector(".nav-container a:first-child");
const howItWorksModal = document.querySelector(".how-it-works-modal");
const closeModal = document.querySelector(".close-modal");
const iMReadyButton = document.querySelector(".i-m-ready");

// Show Modal
howItWorksLink.addEventListener("click", (event) => {
    event.preventDefault();
    howItWorksModal.style.display = "flex";
});

howItWorksLink.addEventListener("click", () => {
    howItWorksModal.classList.remove("hidden");
});

// Close the modal using close button or [I'm Ready to Pump] button
function closeModalHandler() {
    howItWorksModal.classList.add("hidden");
}

closeModal.addEventListener("click", closeModalHandler);
iMReadyButton.addEventListener("click", closeModalHandler);

// Close modal when clicking outside content
window.addEventListener("click", (event) => {
    if (event.target === howItWorksModal) {
        closeModalHandler();
    }
});

// Initialize Game
// Restore previous game state if exists
restoreGameState();
loadTokenImage(); 