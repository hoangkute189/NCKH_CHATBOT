var conversation_layout = document.querySelector(".conversation-message-list");
var conversations = JSON.parse(localStorage.getItem("conversations")) || [];
var currentConver = document.getElementById("converid");
var layout_history = document.querySelector(".conversation-list");
var size = document.querySelector(".conversations-size");
var conversations_detail =
  JSON.parse(localStorage.getItem("conversations_detail")) || [];

loadHistory();

function loadHistory() {
  var html = "";
  conversations
    .slice()
    .reverse()
    .forEach((conver) => {
      html += `<div class="flex flex-row items-center">
                <button
                  class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                  onclick="loadChat('${conver.id}')"
                >
                  <div
                    class="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"
                  >
                    <i class="fa-solid fa-message"></i>
                  </div>
                  <div class="ml-2 text-sm font-semibold conversation-title">
                    ${conver.title}
                  </div>
                </button>
                <button
                  class="ml-2 text-sm font-semibold text-red hover:bg-red-400 px-1 rounded-full"
                  onclick="removeChat(this, '${conver.id}')"
                >
                  <i class="fa-solid fa-xmark text-red-600"></i>
                </button>
              </div>`;
    });

  layout_history.innerHTML += html;
  size.innerText = conversations.length;
}

function loadChat(id_conver = "1") {
  console.log(id_conver);
  currentConver.innerText = id_conver;
  conversation_layout.innerHTML = "";
  addToBox(
    "ai",
    "Xin chào tôi là trợ lý ảo có thể giúp bạn giải đáp các vấn đề về tâm lý. Bạn cần tôi giúp gì nào?"
  );

  var filteredConversations = conversations_detail.filter(function (
    conversation
  ) {
    return conversation.id === id_conver;
  });

  filteredConversations.forEach((chat) => {
    addToBox("user", chat["question"]);
    addToBox("ai", chat["answer"], chat["references"]);
  });
}

function saveChat(question, answer, ref) {
  var newChat = {
    id: currentConver.innerText,
    question: question,
    answer: answer,
    references: ref,
  };
  conversations_detail.push(newChat);
  localStorage.setItem(
    "conversations_detail",
    JSON.stringify(conversations_detail)
  );
}

function addNewConver(question) {
  if (currentConver.innerText == "") {
    currentConver.innerText = generateRandomId();
    var newButton = `<div class="flex flex-row items-center">
                        <button
                          class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                          onclick="loadChat('${currentConver.innerText}')"
                        >
                          <div
                            class="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"
                          >
                            <i class="fa-solid fa-message"></i>
                          </div>
                          <div class="ml-2 text-sm font-semibold conversation-title">
                            ${question}
                          </div>
                        </button>
                        <button
                          class="ml-2 text-sm font-semibold text-red hover:bg-red-400 px-1 rounded-full"
                          onclick="removeChat(this, '${currentConver.innerText}')"
                        >
                          <i class="fa-solid fa-xmark text-red-600"></i>
                        </button>
                      </div>`;

    layout_history.innerHTML = newButton + layout_history.innerHTML;

    conversations.push({
      id: currentConver.innerText,
      title: question,
    });
    size.innerText = conversations.length;
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }
}

function removeChat(event, id) {
  console.log(event.parentElement);
  console.log(id);
  event.parentElement.remove();

  conversations = conversations.filter(function (conversation) {
    return conversation.id != id;
  });

  conversations_detail = conversations_detail.filter(function (conversation) {
    return conversation.id != id;
  });

  size.innerText = conversations.length;
  localStorage.setItem("conversations", JSON.stringify(conversations));
  localStorage.setItem(
    "conversations_detail",
    JSON.stringify(conversations_detail)
  );

  flashMessage("success", "Bạn vừa xóa lịch sử hội thoại thành công!");

  if (currentConver.innerText == id) {
    resetChat();
  }
}

function resetChat() {
  currentConver.innerText = "";
  conversation_layout.innerHTML = "";
  var content =
    "Xin chào tôi là trợ lý ảo có thể giúp bạn giải đáp các vấn đề về tâm lý. Bạn cần tôi giúp gì nào?";
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
                          <div class="stream-content">

                          </div>
                        </div>
                      </div>
                    </div>`;
  conversation_layout.innerHTML += element;

  appendContent(0, content);
}

function appendContent(index, content) {
  var streamIndex = document.querySelector(".stream-content");
  if (index < content.split("").length) {
    streamIndex.innerHTML += content[index];
    setTimeout(function () {
      appendContent(index + 1, content);
    }, 20); // Adjust the delay in milliseconds as needed (0.1 seconds in this case)
  }
}

// var conversations = [
//   {
//     id: "1",
//     title: "Xin chào",
//   },
//   {
//     id: "2",
//     title: "Xin lỗi",
//   },
// ];

// var conversations_detail = [
//   {
//     id: "1",
//     question: "Bạn là ai?",
//     answer: "Tôi là trợ lý ảo chuyên trả lời các câu hỏi về pháp luật",
//     references: [
//       {
//         score: 9,
//         content: "ahihi",
//         fileName: "luat-thuong-mai.pdf",
//       },
//       {
//         score: 8,
//         content: "ahuhu",
//         fileName: "luat-thuong-mai.pdf",
//       },
//     ],
//   },
//   {
//     id: "1",
//     question: "Xin chào",
//     answer: "Tôi là trợ lý ảo chuyên trả lời các câu hỏi về pháp luật",
//     references: [
//       {
//         score: 9,
//         content: "ahihi",
//         fileName: "luat-thuong-mai.pdf",
//       },
//       {
//         score: 7,
//         content: "ahuhu",
//         fileName: "luat-thuong-mai.pdf",
//       },
//     ],
//   },
// ];
