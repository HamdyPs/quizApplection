const nextQuestionBtn = document.querySelector("#submit");
const answersDiv = document.querySelector(".answers-div");
let curruntQuestion = 0;
let numberOfQuestions = 10;
let rightAnswers = 0;
let resultObject = [];

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
  document.querySelector("#questionsCount").textContent = `${
    curruntQuestion + 1
  }/${numberOfQuestions}`;
  document.querySelector(".question").textContent = question.question;
  answers.forEach((answer, i) => {
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

const showResults= (array)=>{
  console.log(array);

  array.forEach(e=>{
    const card = document.createElement('div');
    card.classList.add('card')
    const resultTest = document.createElement('h2');
    resultTest.classList.add('result-test');
    resultTest.textContent = ``
    const qShow = document.createElement('p');
    qShow.classList.add('q-show');
    qShow.textContent = e.question
    const aShow = document.createElement('p');
    aShow.classList.add('a-show')
    aShow.textContent = e.correct
    const resultShow = document.createElement('p');
    resultShow.classList.add('result-show');
    resultShow.textContent = e.isTrue;
    card.appendChild(qShow);
    card.appendChild(aShow);
    card.appendChild(resultShow);
    document.querySelector('.show').appendChild(card)
  })
}

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const showFinalResult = ()=>{
  document.querySelector('.final-result').style.visibility = 'visible'
  if(rightAnswers < 5){
    document.querySelector('.rate').textContent = 'failed'
    document.querySelector('.rate').classList.add('failed');

  }else{
    document.querySelector('.rate').textContent = 'successfull';
    document.querySelector('.rate').classList.add('success');
  }

  document.querySelector('.fin-result').textContent = `${rightAnswers} / ${numberOfQuestions}`;
}

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
      testAnswer(
        response[curruntQuestion].question,
        response[curruntQuestion].correctAnswer
      );
      answersDiv.textContent = "";
      if (curruntQuestion < numberOfQuestions - 1) {
        curruntQuestion++;
        let answers = response[curruntQuestion].incorrectAnswers.concat(
          response[curruntQuestion].correctAnswer
        );
        answers = shuffleArray(answers);
        handleDom(response[curruntQuestion], answers);
      } else {
        showFinalResult()
        showResults(resultObject);
      }
    });
  });
});

function testAnswer(question, rightAnswer) {
  Array.from(answersDiv.children).forEach((answer) => {
    if (answer.classList.contains("checked")) {
      if (rightAnswer === answer.textContent) {
        resultObject.push({
          question,
          correct: answer.textContent,
          isTrue: true,
        });
        rightAnswers++;
      } else {
        resultObject.push({
          question,
          correct: answer.textContent,
          isTrue: false,
        });
      }
    }
  });
}

// Fetch Programming Quiz Data
addListner("#programming", "click", () => {
  const url =
    "https://quizapi.io/api/v1/questions?apiKey=Z3xA2aqi6qhZlGfuJtyKQqAtIOH0JHfvOatj07zQ";

  fetchData(url, (response) => {
    let answers = Object.values(response[curruntQuestion].answers);
    answers = shuffleArray(answers);
    handleDom(response[curruntQuestion], answers);
    nextQuestionBtn.addEventListener("click", () => {
      let anwersResult = Object.values(
        response[curruntQuestion].correct_answers
      );
      let rightAnswer = Object.values(response[curruntQuestion].answers)[
        anwersResult.indexOf("true")
      ];
      testAnswer(response[curruntQuestion].question, rightAnswer);
      answersDiv.textContent = "";
      if (curruntQuestion < numberOfQuestions - 1) {
        curruntQuestion++;
        let answers = Object.values(response[curruntQuestion].answers);
        answers = shuffleArray(answers);
        handleDom(response[curruntQuestion], answers);
      } else {
        console.log(resultObject);
        showResults(resultObject);
      }
    });
  });
});
