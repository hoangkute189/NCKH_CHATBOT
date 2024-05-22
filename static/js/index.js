document.addEventListener("DOMContentLoaded", () => {
  resetChat();
});
const quesButton = document.querySelector(".send-btn");

// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== "") {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       // Does this cookie string begin with the name we want?
//       if (cookie.substring(0, name.length + 1) === name + "=") {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }

// const csrftoken = getCookie("csrftoken");
// console.log(csrftoken);

async function getAnswer(question) {
  // Define the API URL
  const apiUrl = "http://127.0.0.1:5000/question";
  const data = {
    question: question,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify(data),
  };

  var answer, references;
  await fetch(apiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // console.log(data.response);
      // console.log(data.references);
      answer = data.answer;
      // references = data.references;
    })
    .catch((error) => {
      console.error("Error:", error);
      answer = "Có lỗi trong quá trình xử lý!";
    });

  return { answer: answer, references: references };
  // return { answer: "Đây là câu trả lời", references: undefined}
}

function addToBox(name, content, references) {
  var box = document.querySelector(".conversation-message-list");
  var loader = `<div class="loader"></div>`;

  // Check references
  let ref_element = "";
  if (references) {
    for (let i = 0; i < references.length; i++) {
      file_name = references[i].fileName ? references[i].fileName : "";
      // Use template strings to concatenate the values
      ref_element += `<button class="text-faq-dark-purple font-bold text-left pl-2 pb-5 pt-5 text-faq-body cursor-pointer flex justify-between w-full active:bg-faq-light-pink  accordion hover:text-faq-grayish-blue">
                       ${`Tài liệu tham khảo ${i + 1}`}
                       <img
                           class="h-5 w-5 text-slate-800 block plus"
                           src="{% static 'images/add.png' %}"
                       />
                       <img
                           class="h-5 w-5 text-slate-800 hidden minus"
                           src="{% static 'images/documents.png' %}"
                       />
                     </button>
                     <div class="panel hidden">
                       <a target="_blank" href="{% static 'documents/'%}${file_name}" class="inline-block px-4 pb-4">${
        file_name ? "Nguồn: " : ""
      }<span class="text-blue-500 hover:text-red-600">${
        file_name ? file_name : ""
      }</span></a>
                       <p class=" overflow-hidden bg-faq-light-pink pl-4 pr-4 pb-4 pt-0  text-faq-grayish-blue">
                         ${references[i].content}
                       </p>
                     </div>
                     <hr class="bg-faq-grayish-blue">`;
    }
  }

  if (name == "ai") {
    const loader =
      document.querySelector(".conversation-message-list .loader") || null;
    if (loader) {
      loader.remove();
    }
    var myRandomId = generateRandomId();
    var element = `<div
                         class="col-start-1 col-end-8 p-3 rounded-lg conversation-message-box ai-box"
                       >
                         <div class="flex flex-row">
                           <div
                             class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                           >
                             <i class="fa-solid fa-robot"></i>
                           </div>
                           <div
                             class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                           >
                             <div>
                               ${content}
                             </div>
                             <div>

                               ${references ? ref_element : ""}

                             </div>
                           </div>
                         </div>
                       </div>`;
    box.innerHTML += element;
    addReferenceEffect();
  } else {
    var element = `<div
                         class="col-start-6 col-end-13 p-3 rounded-lg conversation-message-box user-box"
                       >
                         <div
                           class="flex justify-start flex-row-reverse"
                         >
                           <div
                             class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                           >
                             U
                           </div>
                           <div
                             class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                           >
                             <div>${content}</div>
                           </div>
                         </div>
                       </div>`;
    box.innerHTML += element;
    box.innerHTML += loader;
  }
  scrollToBottom();
}

quesButton.addEventListener("click", async function () {
  var question_element = document.querySelector("#question-input");
  var question = document.querySelector("#question-input").value;

  const loader =
    document.querySelector(".conversation-message-list .loader") || null;
  if (loader) {
    flashMessage("danger", "Hệ thống đang trả lời, không thể gửi thêm câu hỏi");
    return;
  }

  if (question != "") {
    // Xử lý thêm câu hỏi
    addToBox("user", question);
    question_element.value = "";

    // Xử lý thêm trả lời
    var { answer, references } = await getAnswer(question);
    addToBox("ai", answer, references);

    // Save chat
    addNewConver(question);
    saveChat(question, answer, references);
  }
});

// Add event click enter on keyboard
var input = document.getElementById("question-input");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    quesButton.click();
  }
});

function scrollToBottom() {
  var layout = document.getElementsByClassName(
    "conversation-message-layout"
  )[0];
  var message_frame = document.getElementsByClassName(
    "conversation-message-list"
  )[0];
  layout.scrollTop = message_frame.offsetHeight;
}

function flashMessage(type, content) {
  var color = {
    success: "from-green-500 to-green-400",
    danger: "from-red-500 to-red-400",
    warning: "from-yellow-500 to-yellow-300",
  };

  var result = document.createElement("div");
  result.innerHTML = `<div
                       class="flex bg-white flex-row shadow-md border border-gray-100 rounded-lg overflow-hidden mt-2"
                     >
                       <div
                         class="flex w-3 bg-gradient-to-t ${color[type]}"
                       ></div>
                       <div class="flex-1 p-3">
                         <h1 class="md:text-xl text-gray-600">Thông báo</h1>
                         <p class="text-black-400 text-xs md:text-sm font-light">
                           ${content}
                         </p>
                       </div>

                     </div>`;

  document.querySelector(".flash-message").appendChild(result);
  setTimeout(() => {
    result.remove();
  }, 3000);
}

var elementsArray = document.querySelectorAll(".beta");
elementsArray.forEach(function (elem) {
  elem.addEventListener("click", function () {
    console.log("beta");
    flashMessage("warning", "Chức năng đang trong giai đoạn thử nghiệm");
  });
});
