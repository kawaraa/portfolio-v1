
CREATE DATABASE IF NOT EXISTS portfolio;

USE portfolio;

CREATE TABLE IF NOT EXISTS `project` (
`id` INT PRIMARY KEY AUTO_INCREMENT,
`link` VARCHAR(255) UNIQUE NOT NULL,
`title` VARCHAR(255),
`starsRate` INT,
`view` INT,
`javascript` TINYINT(1),
`nodejs` TINYINT(1),
`react` TINYINT(1),
`css` TINYINT(1),
`wordpress` TINYINT(1)
);

-- starsRate get incremented by the stars number that the user give e.g from 1 to 5, then sum the total collected starsRate from all project then divide it by 5, the result will represent the 1 star, and the result time 5 will represent the five star, ... divide the star by 2 and see if the project has les then half star then the projct will have half star if more then half and less star, then will have a star and so on.

-- the view will get incremented by 1 every time a new user 'IP' see the project