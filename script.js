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
