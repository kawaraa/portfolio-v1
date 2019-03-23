"use strict";

const isIE = /*@cc_on!@*/ false || !!document.documentMode; // Internet Explorer 6-11
if (isIE) {
  document.getElementById("cube").style.display = "none";
  document.body.innerHTML = `<p id="ie-not-supported"> Sorry our website does not support <strong>Internet Explorer</strong> anymore!</p>`;
}
onload = () => {
  function typeText(str, parent, time) {
    Array.from(str).forEach(el =>
      setTimeout(() => (parent.innerHTML += el), (time += 50))
    );
    return time;
  }
  function typeIntroduction() {
    const introduction = document.getElementById("introduction");
    const txt =
      "My name is Ahmad Kawara. I'm a full stack web developer, Front-end as well as Back-end. ";
    let span = Util.createAppend("span", introduction);
    let time = typeText(txt, span, 2000);
    let span1 = Util.createAppend("span", introduction);
    let time1 = typeText(
      "Feel free to take a look at my work on ",
      span1,
      time
    );
    let a2 = Util.createAppend("a", introduction, {
      href: "#portfolio",
      class: "gen-links"
    });
    let time2 = typeText("Portfolio ", a2, time1);
    let span3 = Util.createAppend("span", introduction);
    let time3 = typeText("page. Enquires at ", span3, time2);
    let a4 = Util.createAppend("a", introduction, {
      href: "mailto:info@kawaraa.com?Subject=Hello%20again",
      class: "gen-links"
    });
    typeText("info@kawaraa.com ", a4, time3);
  }
  typeIntroduction();

  const listLinks = document.querySelectorAll(".list-links");
  listLinks.forEach(el => el.addEventListener("click", showHidList));
  document.getElementById("menu-icon").addEventListener("click", showHidList);
  const menuIcon = document.getElementById("menu-icon");

  function showHidList() {
    let dropList = document.getElementById("drop-list");
    if (menuIcon.className === "m-icon") {
      menuIcon.className = "x-icon";
      dropList.style.top = "45px";
      listLinks.forEach(
        el => (el.style.animation = "margin-max 1s ease 0.5 forwards")
      );
    } else {
      menuIcon.className = "m-icon";
      dropList.style.top = "-200px";
      listLinks.forEach(
        el => (el.style.animation = "margin-min 0.3s ease forwards")
      );
    }
  }

  function animateLinks() {
    document.getElementById("social-media").style.left = "-50px";
    let navLinks = document.querySelectorAll(".nav-links");
    navLinks[0].style.animation = "nav-links-anim 1s ease 0.2s";
    navLinks[1].style.animation = "nav-links-anim 1s ease 0.1s";
    navLinks[2].style.animation = "nav-links-anim 1s ease ";
    navLinks[3].style.animation = "nav-links-anim 1s ease";
    let Klogo = document.getElementById("k-logo");
    let awaraLogo = document.getElementById("awara-logo");
    Klogo.style.animation = "logo 1s ease";
    awaraLogo.style.animation = "logo 1s ease";
    menuIcon.style.animation = "logo 1s ease";
    setTimeout(
      () =>
        navLinks.forEach(el => {
          Klogo.style.animation = "none";
          awaraLogo.style.animation = "none";
          menuIcon.style.animation = "none";
          el.style.animation = null;
          document.getElementById("social-media").style.left = "-38px";
        }),
      1400
    );
  }

  function filterProjects(query) {
    return PROJECTS.filter(el => {
      if (el.isAll) return el.link;
      if (el.tech.find(el => el === query)) return el.link;
    });
  }

  function renderProjects(query) {
    const container = document.getElementById("projects-results");
    container.innerHTML = " ";
    const projects = filterProjects(query);
    projects[0] &&
      projects.forEach(el => {
        let div = Util.createAppend("div", container, { class: "frames" });
        Util.createAppend("iframe", div, { src: el, class: "frames-imgs" });
        Util.createAppend("a", div, {
          href: el,
          txt: "View",
          class: "view-btns"
        });
      });
  }
  renderProjects("all");

  function getProjects(e) {
    let width = document.getElementById("projects-categories").offsetWidth;
    let active = document.getElementById("active-category");
    switch (e.target.innerText.toLowerCase()) {
      case "all":
        active.style.left = "0px";
        renderProjects("all");
        break;
      case "node.js":
        active.style.left = width / 6 + "px";
        renderProjects("node.js");
        break;
      case "javascript":
        active.style.left = width / 3 + "px";
        renderProjects("javascript");
        break;
      case "react":
        active.style.left = width / 2 + "px";
        renderProjects("react");
        break;
      case "css":
        active.style.left = (width / 6) * 4 + "px";
        renderProjects("css");
        break;
      case "wordpress":
        active.style.left = (width / 6) * 5 + "px";
        renderProjects("wordpress");
        break;
    }
  }
  document.querySelectorAll("#projects-categories .btns").forEach(el => {
    el.addEventListener("click", getProjects);
  });

  function showValue(e) {
    if (e.target.name === "budget") {
      document.getElementById("budget-holder").innerHTML = "€" + e.target.value;
    } else {
      document.getElementById("deadline-holder").innerHTML =
        e.target.value + " Days";
    }
  }
  document.getElementById("budget").addEventListener("input", showValue);
  document.getElementById("deadline").addEventListener("input", showValue);

  const submitResponse = document.getElementById("submit-response");
  document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();
    const form = JSON.stringify({
      name: e.target.name.value,
      email: e.target.email.value,
      organization: e.target.organization.value,
      need: e.target.need.value,
      budget: e.target.budget.value,
      deadline: e.target.deadline.value,
      message: e.target.message.value
    });
    Util.postJSON("contact", form)
      .then(res => {
        e.target.style.display = "none";
        submitResponse.style.display = "block";
        document.getElementById("response-h2").innerHTML = res;
      })
      .catch(err => {
        e.target.style.display = "none";
        submitResponse.style.display = "block";
        document.getElementById("response-h2").innerHTML =
          "Something wrong happened, Please try again!";
      });
    setTimeout(() => (location.hash = "#intro"), 1000);
    setTimeout(() => {
      e.target.style.display = "block";
      submitResponse.style.display = "none";
      e.target.reset();
    }, 2000);
  });
};
