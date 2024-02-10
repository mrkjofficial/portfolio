import { project1, project2, project3, project4, project5, project6 } from "@assets";

export const APP_NAME = "MrKJOfficial";
export const APP_DESCRIPTION = "MrKJOfficial's Portfolio";

export const menuItems: MenuItem[] = [
	{
		id: 1,
		title: "About",
		path: "#about",
	},
	{
		id: 2,
		title: "Projects",
		path: "#projects",
	},
	{
		id: 3,
		title: "Contact",
		path: "#contact",
	},
];

export const greeting = "Hello, I'm";

export const intro = ["Karan Jaiswal", 1000, "Web Developer", 1000];

export const subHeading = "Seasoned Web Dev | Passionate Learner | Open to Opportunities | Building for the Future.";

export const nameInitials = "KJ";

export const about =
	"I'm a seasoned Full-Stack Developer with a passion for developing scalable web applications. Ability to think critically & implement ideas to design end products. I'm a quick learner and a team player with excellent problem-solving skills who is always eager to learn new technologies and frameworks.";

export const tabs: Tab[] = [
	{
		id: 1,
		title: "Experience",
		items: ["Full-Stack Developer, Baseel Partners, United Kingdom | Jun 2023 - Present", "Web Developer Intern, Enterprise Minds Inc, India | Jan 2023 - Apr 2023"],
	},
	{
		id: 2,
		title: "Skills",
		items: ["JavaScript", "TypeScript", "React.js", "React-Native", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "MySQL", "HTML", "CSS", "SASS", "TailwindCSS", "Git", "Docker", "AWS", "Firebase"],
	},
	{
		id: 3,
		title: "Education",
		items: ["Master of Computer Applications, Pondicherry University, India | 2021 - 2023", "Bachelor of Computer Applications, Siliguri Institute of Technology, India | 2015 - 2018"],
	},
	{
		id: 4,
		title: "Certificates",
		items: ["React - The Complete Guide 2023 (incl. React Router & Redux)", "JavaScript - The Complete Guide 2023 (Beginner + Advanced)", " CSS - The Complete Guide 2023 (incl. Flexbox, Grid & Sass)"],
	},
];

export const projects: Project[] = [
	{
		id: 1,
		title: "React Portfolio Website",
		description: "#react #next #postgres",
		thumbnail: project1.src,
		sourceUrl: "http://www.github.com/",
		previewUrl: "/",
	},
	{
		id: 2,
		title: "Potography Portfolio Website",
		description: "#react #next #postgres",
		thumbnail: project2.src,
		sourceUrl: "http://www.github.com/",
		previewUrl: "/",
	},
	{
		id: 3,
		title: "E-commerce Application",
		description: "#react #next #postgres",
		thumbnail: project3.src,
		sourceUrl: "http://www.github.com/",
		previewUrl: "/",
	},
	{
		id: 4,
		title: "Food Ordering Application",
		description: "#react #next #postgres",
		thumbnail: project4.src,
		sourceUrl: "http://www.github.com/",
		previewUrl: "/",
	},
	{
		id: 5,
		title: "React Firebase Template",
		description: "#react #next #postgres",
		thumbnail: project5.src,
		sourceUrl: "http://www.github.com/",
		previewUrl: "/",
	},
	{
		id: 6,
		title: "Full-stack Roadmap",
		description: "#react #next #postgres",
		thumbnail: project6.src,
		sourceUrl: "http://www.github.com/",
		previewUrl: "/",
	},
];

export const outro = "I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!";

export const socials = {
	github: "https://github.com/mrkjofficial",
	linkedin: "https://www.linkedin.com/in/mrkjofficial/",
};
