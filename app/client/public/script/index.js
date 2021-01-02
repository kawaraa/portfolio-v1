"use strict";

function typeText(ele, str, time) {
  Array.from(str).forEach((char) => setTimeout(() => (ele.innerHTML += char), (time += 50)));
  return time;
}
function typeIntroduction() {
  const introduction = document.getElementById("introduction");
  introduction.innerHTML = "";
  introduction.style.zIndex = "1";
  const txt =
    "My name is Armando Kawara. I'm a full stack web developer, I do Front-end as well as Back-end development. ";
  let span = Util.createAppend("span", introduction);
  let time = typeText(span, txt, 2000);
  let span1 = Util.createAppend("span", introduction);
  let time1 = typeText(span1, "Feel free to take a look at my work on ", time);
  let a2 = Util.createAppend("a", introduction, {
    href: "#portfolio",
    class: "gen-links",
  });
  let time2 = typeText(a2, "Portfolio ", time1);
  let span3 = Util.createAppend("span", introduction);
  let time3 = typeText(span3, "page. Enquires at ", time2);
  let a4 = Util.createAppend("a", introduction, {
    href: "mailto:info@kawaraa.com?Subject=Hello%20again",
    class: "gen-links",
  });
  typeText(a4, "info@kawaraa.com ", time3);
}
typeIntroduction();

const listLinks = document.querySelectorAll(".list-links");
listLinks.forEach((el) => el.addEventListener("click", showHidList));
document.getElementById("menu-icon").addEventListener("click", showHidList);
const menuIcon = document.getElementById("menu-icon");

function showHidList() {
  let dropList = document.getElementById("drop-list");
  if (menuIcon.className === "m-icon") {
    menuIcon.className = "x-icon";
    dropList.style.top = "45px";
    listLinks.forEach((el) => (el.style.animation = "margin-max 1s ease 0.5 forwards"));
  } else {
    menuIcon.className = "m-icon";
    dropList.style.top = "-200px";
    listLinks.forEach((el) => (el.style.animation = "margin-min 0.3s ease forwards"));
  }
}

function animateLinks() {
  let navLinks = document.querySelectorAll(".nav-links");
  navLinks[0].style.animation = "nav-links-anim 1s ease 0.2s";
  navLinks[1].style.animation = "nav-links-anim 1s ease 0.1s";
  navLinks[2].style.animation = "nav-links-anim 1s ease ";
  navLinks[3].style.animation = "nav-links-anim 1s ease";
  let Klogo = document.getElementById("k-logo");
  let logoLetters = document.getElementById("logo-letters");
  Klogo.style.animation = "logo 1s ease";
  logoLetters.style.animation = "logo 1s ease";
  menuIcon.style.animation = "logo 1s ease";
  setTimeout(
    () =>
      navLinks.forEach((el) => {
        Klogo.style.animation = "none";
        logoLetters.style.animation = "none";
        menuIcon.style.animation = "none";
        el.style.animation = null;
      }),
    1400
  );
}

function renderProjects(techName) {
  const container = document.getElementById("projects-results");
  container.innerHTML = " ";

  Util.fetchJSON("/api/project/" + techName)
    .then((projects) => {
      if (!projects[0]) return;
      projects.forEach((project) => {
        let div = Util.createAppend("div", container, { class: "frames" });
        console.log(project.link);
        Util.createAppend("iframe", div, {
          src: project.link,
          class: "frames-imgs",
        });
        Util.createAppend("a", div, {
          href: project.link,
          target: "_blank",
          txt: "View",
          class: "view-btns",
        });
      });
    })
    .catch(console.error);
}

function filterProjects(e) {
  let width = document.getElementById("projects-categories").offsetWidth;
  let active = document.getElementById("active-category");
  renderProjects(e.target.name);

  switch (e.target.name) {
    case "all":
      active.style.left = "0px";
      break;
    case "nodejs":
      active.style.left = width / 6 + "px";
      break;
    case "javascript":
      active.style.left = width / 3 + "px";
      break;
    case "react":
      active.style.left = width / 2 + "px";
      break;
    case "css":
      active.style.left = (width / 6) * 4 + "px";
      break;
    case "typescript":
      active.style.left = (width / 6) * 5 + "px";
      break;
  }
}
document.querySelectorAll("#projects-categories .btns").forEach((el) => {
  el.addEventListener("click", filterProjects);
});

function showValue(e) {
  if (e.target.name === "budget") {
    document.getElementById("budget-holder").innerHTML = "€" + e.target.value;
  } else {
    document.getElementById("deadline-holder").innerHTML = e.target.value + " Days";
  }
}
document.getElementById("budget").addEventListener("input", showValue);
document.getElementById("deadline").addEventListener("input", showValue);

const submitResponse = document.getElementById("submit-response");
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = JSON.stringify({
    name: e.target.name.value,
    email: e.target.email.value,
    organization: e.target.organization.value,
    need: e.target.need.value,
    budget: e.target.budget.value,
    deadline: e.target.deadline.value,
    message: e.target.message.value,
  });
  Util.postJSON("/api/contact", data)
    .then((res) => {
      e.target.style.display = "none";
      submitResponse.style.display = "block";
      document.getElementById("response-h2").innerHTML =
        "Thanks for contacting me!<br />I will contact you back very soon.";
    })
    .catch((err) => {
      e.target.style.display = "none";
      submitResponse.style.display = "block";
      document.getElementById("response-h2").innerHTML = "Something wrong happened, Please try again!";
    });

  setTimeout(() => (location.hash = "#intro"), 4000);
  setTimeout(() => {
    e.target.style.display = "block";
    submitResponse.style.display = "none";
    e.target.reset();
  }, 6000);
});
