const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quotesCollection = [];

function showLoadingSpinner() {
  loader.classList.remove("hidden");
  quoteContainer.classList.add("hidden");
}

function hideLoadingSpinner() {
  loader.classList.add("hidden");
  quoteContainer.classList.remove("hidden");
}

function newQuote() {
  showLoadingSpinner();

  const index = Math.floor(Math.random() * quotesCollection.length);
  const quote = quotesCollection[index];

  updateQuoteAuthor(quote);
  updateQuoteMessage(quote);

  hideLoadingSpinner();
}

function updateQuoteAuthor(quote) {
  let authorName = "Unknown";

  if (quote.author) {
    authorName = quote.author;
  }

  if (authorName.length > 18) {
    authorText.classList.add("long-name");
  } else {
    authorText.classList.remove("long-name");
  }

  authorText.textContent = authorName;
}

function updateQuoteMessage(quote) {
  if (quote.text.length > 80) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
}

function tweetCurrentQuote() {
  const text = `${quoteText.textContent} - ${authorText.textContent}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(twitterUrl, "_blank");
}

async function fetchQuoteFromApi() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    quotesCollection = await response.json();
    newQuote();
  } catch (ex) {
    quotesCollection = localQuotes;
    newQuote();
  }
}

// Event Listener
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetCurrentQuote);

// On Load
fetchQuoteFromApi();
