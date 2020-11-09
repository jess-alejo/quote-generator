const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
  quoteContainer.style.display = 'none'
  quoteContainer.hidden = true;
  loader.hidden = false;
}

function complete() {
  loader.hidden = true;
  quoteContainer.style.display = 'flex'
  quoteContainer.hidden = false;
}
//
// Generate a new quote
function newQuote() {
  loading();
  const index = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[index];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  complete();
  quoteText.textContent = quote.text;
}

// Tweet a quote displayed on screen
function tweetQuote() {
  const text = `${quoteText.textContent} - ${authorText.textContent}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(twitterUrl, "_blank");
}

// Get Quote from API
async function getQuote() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (ex) {
    apiQuotes = localQuotes;
    newQuote();
  }
}

// Event Listener
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load
getQuote();
