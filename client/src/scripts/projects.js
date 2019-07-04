const projects = [
  {
    tech: ["javascript", "css", "node.js"],
    link: "https://kawaraa.com"
  },
  {
    tech: ["javascript", "css"],
    link: "https://social-app.kawaraa.com"
  },
  {
    tech: ["node.js", "javascript", "react", "css"],
    link: "https://class17hackyourestate.herokuapp.com/"
  }
];

function filterProjects(query) {
  if (query === "all") return projects.map(el => el.link);
  const links = [];
  projects.forEach(el => {
    if (el.tech.find(el => el === query)) links.push(el.link);
  });
  return links;
}
