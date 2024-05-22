function addReferenceEffect() {
  var acc = document.querySelectorAll(".accordion");
  var plusIcons = document.getElementsByClassName("plus");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");

      var panel = this.nextElementSibling;

      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }

      // Hide all other panels and show their corresponding plus icons
      for (let x = 0; x < acc.length; x++) {
        if (x !== i) {
          acc[x].classList.remove("active");
          acc[x].nextElementSibling.style.display = "none";
        }
      }
    });
  }
}

function generateRandomId() {
  const randomId = Math.random().toString(36).substr(2, 9);
  return randomId;
}
