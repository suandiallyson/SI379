/**
 * A function to randomly shuffle the items in an array and return a copy of the shuffled array.
 * Based on: https://stackoverflow.com/a/12646864
 *
 * @param {Array} array An array of any type
 * @returns A shuffled copy of the array
 */
function shuffleArray(array) {
  const shuffledArray = array.slice(); // Copy the array

  // Shuffle the copy of the array using https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // For each index,
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements i and j
  }
  return shuffledArray; // Return the shuffled copy
}

function displayQuestions(questions) {
  const container = document.querySelector("#question-container");
  container.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const div = document.createElement("div");
    div.className = "question";

    const p = document.createElement("p");
    p.innerText = question.question.text;
    div.appendChild(p);

    const ul = document.createElement("ul");

    const answers = shuffleArray([
      question.correctAnswer,
      ...question.incorrectAnswers,
    ]);
    for (let j = 0; j < answers.length; j++) {
      const answer = answers[j];
      const li = document.createElement("li");
      li.className = "option";

      const button = document.createElement("button");
      button.textContent = answer;

      const feedbackSpan = document.createElement("span");
      feedbackSpan.className = "feedback";
      feedbackSpan.style.marginLeft = "10px";

      button.addEventListener("click", function () {
        handleAnswer(question, button.textContent, ul);
      });

      li.appendChild(button);
      li.appendChild(feedbackSpan);
      ul.appendChild(li);
    }

    div.appendChild(ul);
    container.appendChild(div);
  }
}

function handleAnswer(question, selectedAnswerText, ul) {
  const options = ul.querySelectorAll(".option");

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const button = option.querySelector("button");
    const feedbackSpan = option.querySelector(".feedback");
    button.disabled = true;

    feedbackSpan.innerHTML = "";

    if (button.textContent === question.correctAnswer) {
      if (button.textContent === selectedAnswerText) {
        feedbackSpan.innerHTML = "👈 ✔️"; // user selected the correct answer
      } else {
        feedbackSpan.innerHTML = "❌"; // show the correct answer
      }
    } else if (button.textContent === selectedAnswerText) {
      feedbackSpan.innerHTML = "👈"; // mark user's incorrect selection
    }
  }

  //used chat to figure out how to update the score

  updateScore(selectedAnswerText === question.correctAnswer ? 1 : 0);
}

let correctAnswers = 0;
let attemptedAnswers = 0;

function updateScore(increment) {
  correctAnswers += increment;
  attemptedAnswers++;
  document.querySelector("#correct-answers").textContent = correctAnswers;
  document.querySelector("#attempted-answers").textContent =
    "/" + attemptedAnswers;
}

fetch("https://the-trivia-api.com/v2/questions")
  .then((response) => response.json()) // Parse the JSON response
  .then((data) => {
    const shuffledQuestions = shuffleArray(data); // Shuffle the array of questions
    displayQuestions(shuffledQuestions); // Display the shuffled questions
  })
  .catch((error) => console.error("Failed to fetch questions:", error));
