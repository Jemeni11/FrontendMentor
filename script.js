const titleParagraph = document.getElementById("title");
const adviceParagraph = document.getElementById("advice");
const diceContainer = document.getElementById("dice--container");

diceContainer.addEventListener("click", generateAdvice);

async function generateAdvice() {
  let generated = await fetch("https://api.adviceslip.com/advice");
  if (generated.ok) {
    let response = await generated.json();
    let { id, advice } = await response.slip;
    titleParagraph.innerText = `Advice #${id}`;
    adviceParagraph.innerText = `"${advice}"`;
  } else {
    alert("There was an error! Please try again later.");
  }
}
