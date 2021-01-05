"use strict";

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
