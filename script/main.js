const nextQuestionBtn = document.querySelector("#submit");
const answersDiv = document.querySelector(".answers-div");
let curruntQuestion = 0;

const addListner = (selector, eventName, callback) => {
  document.querySelector(selector).addEventListener(eventName, callback);
};
const fetchData = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      callback(response);
    }
  };
  xhr.open("GET", url);
  xhr.send();
};

const handleDom = (question, answers) => {
  document.querySelector("#questionsCategory").textContent = question.category;
  document.querySelector("#questionsCount").textContent = curruntQuestion + 1;
  document.querySelector(".question").textContent = question.question;
  answers.forEach((answer) => {
    if (answer) {
      let p = document.createElement("p");
      p.classList.add("answer");
      p.textContent = answer;
      p.addEventListener("click", answerCheck);
      answersDiv.appendChild(p);
    }
  });
};
const answerCheck = (event) => {
  let clickedAnswer = event.target;
  Array.from(answersDiv.children).forEach((answer) => {
    answer.classList.remove("checked");
  });
  clickedAnswer.classList.add("checked");
};

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Fetch Random Quiz Data
addListner("#random", "click", () => {
  const url = "https://the-trivia-api.com/api/questions";

  fetchData(url, (response) => {
    let answers = response[curruntQuestion].incorrectAnswers.concat(
      response[curruntQuestion].correctAnswer
    );
    answers = shuffleArray(answers);
    handleDom(response[curruntQuestion], answers);
    nextQuestionBtn.addEventListener("click", () => {
      answersDiv.innerHTML = "";
      curruntQuestion++;
      let answers = response[curruntQuestion].incorrectAnswers.concat(
        response[curruntQuestion].correctAnswer
      );
      answers = shuffleArray(answers);
      handleDom(response[curruntQuestion], answers);
    });
  });
});

// Fetch Programming Quiz Data
addListner("#programming", "click", () => {
  const url =
    "https://quizapi.io/api/v1/questions?apiKey=Z3xA2aqi6qhZlGfuJtyKQqAtIOH0JHfvOatj07zQ";

  fetchData(url, (response) => {
    let answers = Object.values(response[curruntQuestion].answers);
    answers = shuffleArray(answers);
    handleDom(response[curruntQuestion], answers);
    nextQuestionBtn.addEventListener("click", () => {
      answersDiv.innerHTML = "";
      curruntQuestion++;
      let answers = Object.values(response[curruntQuestion].answers);
      answers = shuffleArray(answers);
      handleDom(response[curruntQuestion], answers);
    });
  });
});
