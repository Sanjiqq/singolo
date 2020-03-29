const MENU = document.getElementById("menu");

MENU.addEventListener("click", event => {
  MENU.querySelectorAll("a").forEach(el => el.classList.remove("active"));
  event.target.classList.add("active");
});

document.addEventListener("scroll", onScroll);

function onScroll(event) {
  const curPos = window.scrollY;
  const divs = document.querySelectorAll("body .divs");
  const links = document.querySelectorAll("#menu a");

  divs.forEach(el => {
    if (el.offsetTop - 2 < curPos) {
      links.forEach(a => {
        a.classList.remove("active");
        if (el.getAttribute("id") === a.getAttribute("href").substring(1)) {
          a.classList.add("active");
        }
      });
    }
  });
}

let phones = document.querySelectorAll(".slider__phones");
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
  currentSlide = (n + phones.length) % phones.length;
}

function hideSlide(direction) {
  isEnabled = false;
  phones[currentSlide].classList.add(direction);
  phones[currentSlide].addEventListener("animationend", function() {
    this.classList.remove("activated", direction);
  });
}

function showSlide(direction) {
  phones[currentSlide].classList.add("next", direction);
  phones[currentSlide].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("activated");
    isEnabled = true;
  });

  if (currentSlide === 1) {
    document.querySelector("body > .slider").style.backgroundColor = "#648BF0";
    document.querySelector("body > .slider").style.borderColor = "#6f92ef";
  } else {
    document.querySelector("body > .slider").style.backgroundColor = "#f06c64";
    document.querySelector("body > .slider").style.borderColor = "#ea676b";
  }
}

function previousSlide(n) {
  hideSlide("to-right");
  changeCurrentSlide(n - 1);
  showSlide("from-left");
}

function nextSlide(n) {
  hideSlide("to-left"); //<-
  changeCurrentSlide(n + 1);
  showSlide("from-right");
}

document.querySelector(".arrows .left").addEventListener("click", function() {
  if (isEnabled) {
    previousSlide(currentSlide);
  }
});

document.querySelector(".arrows .right").addEventListener("click", function() {
  if (isEnabled) {
    nextSlide(currentSlide);
  }
});

const IPHONEBTNS = document.querySelectorAll(".iphone-btn");

IPHONEBTNS.forEach(btn =>
  btn.addEventListener("click", function(event) {
    let verticalPhoneDiv = document.querySelector(".vertical");
    let horizintalPhoneDiv = document.querySelector(".horizontal");
    let verticalBlackScreen = document.querySelector(".vertical .black-screen");
    let horizontalBlackScreen = document.querySelector(
      ".horizontal .black-screen"
    );

    if (verticalPhoneDiv.contains(btn))
      verticalBlackScreen.hidden = !verticalBlackScreen.hidden;
    if (horizintalPhoneDiv.contains(btn))
      horizontalBlackScreen.hidden = !horizontalBlackScreen.hidden;
  })
);

const BURGER = document.querySelector(".burger");
const NAVIGATION = document.querySelector(".navigation");
const OVERLAY = document.querySelector(".overlay");
let count = 0;

BURGER.addEventListener("click", event => {
  count = (count + 1) % 2;
  if (count === 1) {
    BURGER.classList.add("active");
    OVERLAY.classList.add("active");
    NAVIGATION.classList.add("mobile-active-menu");
    document.removeEventListener("scroll", onScroll);
  } else {
    BURGER.classList.remove("active");
    NAVIGATION.classList.remove("mobile-active-menu");
    OVERLAY.classList.remove("active");
    document.addEventListener("scroll", onScroll);
  }
});

const MOBILEMENU = document.querySelector("#menu");

MOBILEMENU.addEventListener("click", event => {
  if (event.target.closest("ul li a")) {
    count = (count + 1) % 2;
    NAVIGATION.classList.remove("mobile-active-menu");
    BURGER.classList.remove("active");
    OVERLAY.classList.remove("active");
    document.addEventListener("scroll", onScroll);
  } else {
    event.target.stopPropagation();
  }
});

const MENU_PORTFOLIO = document.getElementById("menu-portfolio");
const PORTFOLIO = document.querySelector(".portfolio__picture");

PORTFOLIO.addEventListener("click", event => {
  PORTFOLIO.querySelectorAll("img").forEach(element =>
    element.classList.remove("active")
  );
  event.target.classList.add("active");
});

MENU_PORTFOLIO.addEventListener("click", event => {
  MENU_PORTFOLIO.querySelectorAll("p").forEach(el =>
    el.classList.remove("active")
  );
  event.target.classList.add("active");

  let temp = Array.from(PORTFOLIO.querySelectorAll("img"));
  PORTFOLIO.innerHTML = "";
  portfolioPictures(temp);
  temp.forEach(el => PORTFOLIO.appendChild(el));
});

function portfolioPictures(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const BUTTON = document.getElementById("btn");
const CLOSE_BUTTON = document.getElementById("close-btn");
const ONSUBMIT = document.getElementById("onsubmit");

ONSUBMIT.addEventListener("submit", e => {
  e.preventDefault();
  return false;
});

BUTTON.addEventListener("click", e => {
  if (
    document.getElementById("user-name").checkValidity() &&
    document.getElementById("email").checkValidity()
  ) {
    e.preventDefault();
    const subject = document.getElementById("subject").value.toString();
    const project = document.getElementById("project").value.toString();
    document.getElementById("result1").innerText = "Письмо отправлено";

    if (subject !== "") {
      document.getElementById("result2").innerText = "Тема: " + subject;
    } else {
      document.getElementById("result2").innerText = "Нет темы";
    }

    if (project !== "") {
      document.getElementById("result3").innerText = "Описание: " + project;
    } else {
      document.getElementById("result3").innerText = "Нет описания";
    }

    document.getElementsByTagName("body")[0].classList.add("hide");
    document.getElementById("message-block").classList.remove("hidden");
    document.getElementById("message").classList.remove("hidden");
  }
});

CLOSE_BUTTON.addEventListener("click", () => {
  document.getElementById("result1").innerText = "";
  document.getElementById("result2").innerText = "";
  document.getElementById("result3").innerText = "";
  document.getElementsByTagName("body")[0].classList.remove("hide");
  document.getElementById("message-block").classList.add("hidden");
  document.getElementById("message").classList.add("hidden");
  ONSUBMIT.reset();
});
