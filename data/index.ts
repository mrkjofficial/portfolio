import { advancegpt, aura } from "@assets";

export const APP_NAME = "MrKJOfficial";
export const APP_DESCRIPTION = "Karan's Portfolio";

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

export const firstName = "Karan";

export const lastName = "Jaiswal";

export const intro = ["Karan Jaiswal", 1000, "Full-Stack Developer", 1000];

export const subHeading = "Passionate Learner | Seasoned Web Dev | Building for the Future.";

export const nameInitials = "KJ";

export const about =
	"I'm a seasoned Full-Stack Developer with a passion for developing scalable web applications. Ability to think critically & implement ideas to design end products. I'm a quick learner and a team player with excellent problem-solving skills who is always eager to learn new technologies and frameworks.";

export const tabs: Tab[] = [
	{
		id: 1,
		title: "Experience",
		items: [
			{
				name: "Lead Software Engineer, Baseel Partners, United Kingdom | Oct 2024 - Present",
				link: "/",
			},
			{
				name: "Software Engineer, Baseel Partners, United Kingdom | Jun 2023 - Sep 2024",
				link: "/",
			},
			{
				name: "Web Developer Intern, Enterprise Minds Inc, India | Jan 2023 - Apr 2023",
				link: "/",
			},
		],
	},
	{
		id: 2,
		title: "Skills",
		items: [
			{
				name: "JavaScript",
				link: "/",
			},
			{
				name: "TypeScript",
				link: "/",
			},
			{
				name: "React.js",
				link: "/",
			},
			{
				name: "React-Native",
				link: "/",
			},
			{
				name: "Next.js",
				link: "/",
			},
			{
				name: "Node.js",
				link: "/",
			},
			{
				name: "PostgreSQL",
				link: "/",
			},
			{
				name: "MongoDB",
				link: "/",
			},
			{
				name: "HTML",
				link: "/",
			},
			{
				name: "CSS",
				link: "/",
			},
			{
				name: "TailwindCSS",
				link: "/",
			},
			{
				name: "Git",
				link: "/",
			},
		],
	},
	{
		id: 3,
		title: "Education",
		items: [
			{
				name: "Master of Computer Applications, Pondicherry University, India | 2021 - 2023",
				link: "/",
			},
			{
				name: "Bachelor of Computer Applications, Siliguri Institute of Technology, India | 2015 - 2018",
				link: "/",
			},
		],
	},
	{
		id: 4,
		title: "Certificates",
		items: [
			{
				name: "Understanding TypeScript | Udemy | 2024",
				link: "https://www.udemy.com/certificate/UC-f125b8b5-9a82-46c4-879c-4e6b9d1f6669",
			},
			{
				name: "React - The Complete Guide 2023 | Udemy | 2023",
				link: "https://www.udemy.com/certificate/UC-619239f2-a456-4b17-9232-410231afb89c",
			},
			{
				name: "JavaScript - The Complete Guide 2023 | Udemy | 2023",
				link: "https://www.udemy.com/certificate/UC-7fd16e41-3d2f-400a-b17e-4783c5d90db6",
			},
			{
				name: "CSS - The Complete Guide 2023 | Udemy | 2023",
				link: "https://www.udemy.com/certificate/UC-daa12bca-f6dd-4df5-9078-3e00739a55b9",
			},
			{
				name: "Cybersecurity Essentials | Cisco Networking Academy | 2022",
				link: "https://www.credly.com/badges/845f5476-7f55-495c-b817-8f6ae555d252",
			},
		],
	},
];

export const projects: Project[] = [
	{
		id: 1,
		title: "AdvanceGPT - AI Chatbot",
		description: "#firebase #next #openai",
		thumbnail: advancegpt.src,
		sourceUrl: "https://github.com/mrkjofficial/AdvanceGPT",
		previewUrl: "/",
		disabled: true,
	},
	{
		id: 2,
		title: "Aura - Ecommerce Platform",
		description: "#react #mongodb #node",
		thumbnail: aura.src,
		sourceUrl: "https://github.com/mrkjofficial/Aura",
		previewUrl: "/",
		disabled: true,
	},
];

export const outro = "I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!";

export const socials = {
	github: "https://github.com/mrkjofficial",
	linkedin: "https://www.linkedin.com/in/mrkjofficial/",
};
