const nextQuestionBtn = document.querySelector('#submit');
const answersDiv = document.querySelector('.answers-div');
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

const answerCheck = (event)=>{
  let clickedAnswer = event.target;
  Array.from(answersDiv.children).forEach(answer => {
    answer.classList.remove("checked")
  })
  clickedAnswer.classList.add("checked")
}

const handleDom = (question,answers)=>{
  document.querySelector('#questionsCategory').textContent = question.category;
  document.querySelector('#questionsCount').textContent = curruntQuestion + 1;
  document.querySelector('.question').textContent = question.question;
  answers.forEach(answer => {
    let p = document.createElement('p');
    p.classList.add('answer');
    p.textContent = answer;
    p.addEventListener('click', answerCheck)
    answersDiv.appendChild(p)
  });
}

addListner('#random','click',()=>{
  const url = 'https://the-trivia-api.com/api/questions';

  fetchData(url,(response)=>{
    let answers = response[curruntQuestion].incorrectAnswers.concat( response[curruntQuestion].correctAnswer)
    nextQuestionBtn.addEventListener('click',()=>{
      answersDiv.innerHTML = ''
      curruntQuestion++
      handleDom(response[curruntQuestion],answers)      
    })
    handleDom(response[curruntQuestion],answers)
  })
})
