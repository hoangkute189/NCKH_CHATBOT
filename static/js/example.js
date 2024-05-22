var example = document.querySelector(".example");
var example_btn = document.querySelector(".attach-btn");
example_btn.addEventListener("click", function () {
  example.classList.toggle("hidden");
});

function getQuestion(event) {
  var question = event.innerText;
  var question_element = document.querySelector("#question-input");

  question_element.value = question;
  example.classList.toggle("hidden");
}
