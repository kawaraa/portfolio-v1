
CREATE DATABASE IF NOT EXISTS `portfolio`;
USE `portfolio`;

CREATE TABLE IF NOT EXISTS `project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `link` VARCHAR(255) UNIQUE NOT NULL,
  `technology` TEXT NOT NULL,
  `starsRate` INT,
  `views` INT,
  PRIMARY KEY(id)
);

INSERT INTO `project` VALUES(0, `Project title`, `https://kawaraa.com`, `html, css, javascript, nodejs`, 0, 0)
INSERT INTO `project` VALUES(0, `Project title`, `https://hobby-projects.apps.us-east-1.starter.openshift-online.com`, `html, css, javascript, react, nodejs,`, 0, 0)
INSERT INTO `project` VALUES(0, `Project title`, `https://class17hackyourestate.herokuapp.com`, `html, css, javascript, react, nodejs,`, 0, 0)

-- technology = ["all", "html", "css", "javascript", "react", "nodejs", "typescript", "wordpress"]

-- starsRate get incremented by the stars number that the user give e.g from 1 to 5, then sum the total collected starsRate from all project then divide it by 5, the result will represent the 1 star, and the result time 5 will represent the five star, ... divide the star by 2 and see if the project has les then half star then the projct will have half star if more then half and less star, then will have a star and so on.

-- the view will get incremented by 1 every time a new user 'IP' see the project