import { Bot, Briefcase, FolderOpen, GraduationCap, Home, Mail, MapPinned, TerminalSquare } from "lucide-react";
import {
	AntDesign,
	Appwrite,
	AWS,
	ChromeWebStore,
	Claude,
	Clerk,
	Copilot,
	CSS3,
	Cursor,
	Docker,
	ExpressJS,
	Firebase,
	Formik,
	Gemini,
	Github,
	HeroUI,
	HTML5,
	Java,
	JavaScript,
	LinkedIn,
	Minio,
	MongoDB,
	MUI,
	MySQL,
	NextJS,
	NodeJS,
	NPM,
	Ollama,
	OpenAI,
	Playwright,
	PNPM,
	PostgreSQL,
	Postman,
	Prisma,
	Razorpay,
	ReactJS,
	ReactHookForm,
	ReactQuery,
	ReactRouter,
	ReactTable,
	Redux,
	Resume,
	ShadcnUI,
	SpringBoot,
	Stripe,
	Supabase,
	SWR,
	TailwindCSS,
	Topmate,
	TypeScript,
	Vercel,
	Vite,
	Webpack,
	Yup,
	Zod,
	Zustand,
} from "@assets";

export const APP_NAME = "MrKJOfficial";
export const APP_DESCRIPTION = "Karan's Portfolio";

export const navItems = [
	{
		label: "Home",
		src: "#home",
		icon: Home,
	},
	{
		label: "Projects",
		src: "#projects",
		icon: FolderOpen,
	},
	{
		label: "Work",
		src: "#work",
		icon: Briefcase,
	},
	{
		label: "Education",
		src: "#education",
		icon: GraduationCap,
	},
	{
		label: "Contact",
		src: "#contact",
		icon: Mail,
	},
];

export const about = {
	name: "Karan Jaiswal",
	avatarUrl: "/profile.webp",
	contact: {
		email: "karanjaiswal0000@gmail.com",
		phone: "+91 99336 27730",
	},
	links: [
		{
			name: "LinkedIn",
			icon: LinkedIn,
			url: "https://www.linkedin.com/in/mrkjofficial",
		},
		{
			name: "GitHub",
			icon: Github,
			url: "https://github.com/mrkjofficial",
		},
		{
			name: "Resume",
			icon: Resume,
			url: "/karan-jaiswal.pdf",
		},
		{
			name: "1:1 Meeting",
			icon: Topmate,
			url: "https://topmate.io/mrkjofficial",
		},
	],
	introduction: {
		headline: "Turning ideas into production-ready products.",
		subHeadline: "Lead Software Engineer | Team Lead | Frontend Specialist",
		description:
			"👋 Hi, I’m Karan. I am a Frontend-heavy Full-Stack Engineer who specializes in building scalable products from the first line of code to final deployment.\n\nCurrently, I lead a high-performing team of seven developers, bridging the gap between complex technical architecture and seamless user experiences. Having architected multiple projects from scratch, I focus on building systems that aren't just functional, but enduring.\n\nI’m now integrating AI/ML capabilities into my workflow to create smarter, adaptive applications that drive real business value. I thrive where thoughtful engineering meets strategic leadership.",
	},
	information: [
		{
			name: "Location",
			icon: MapPinned,
			value: "India",
		},
		{
			name: "Experience",
			icon: Briefcase,
			value: "3 Year+",
		},
		{
			name: "Projects",
			icon: FolderOpen,
			value: "7+",
		},
	],
	technologies: [
		{
			name: "AI/ML",
			icon: Bot,
			skills: [
				{
					name: "Claude",
					icon: Claude,
				},
				{
					name: "Copilot",
					icon: Copilot,
				},
				{
					name: "Cursor",
					icon: Cursor,
				},
				{
					name: "Gemini",
					icon: Gemini,
				},
				{
					name: "Ollama",
					icon: Ollama,
				},
				{
					name: "OpenAI",
					icon: OpenAI,
				},
			],
		},
		{
			name: "Web",
			icon: TerminalSquare,
			skills: [
				{
					name: "React.js",
					icon: ReactJS,
				},
				{
					name: "Next.js",
					icon: NextJS,
				},
				{
					name: "Express.js",
					icon: ExpressJS,
				},
				{
					name: "Node.js",
					icon: NodeJS,
				},
				{
					name: "Springboot",
					icon: SpringBoot,
				},
				{
					name: "JavaScript",
					icon: JavaScript,
				},
				{
					name: "TypeScript",
					icon: TypeScript,
				},
				{
					name: "Java",
					icon: Java,
				},
				{
					name: "HTML5",
					icon: HTML5,
				},
				{
					name: "CSS3",
					icon: CSS3,
				},
				{
					name: "Tailwind",
					icon: TailwindCSS,
				},
				{
					name: "Shadcn UI",
					icon: ShadcnUI,
				},
				{
					name: "Hero UI",
					icon: HeroUI,
				},
				{
					name: "MUI",
					icon: MUI,
				},
				{
					name: "Ant Design",
					icon: AntDesign,
				},
				{
					name: "React Router",
					icon: ReactRouter,
				},
				{
					name: "Zustand",
					icon: Zustand,
				},
				{
					name: "Redux",
					icon: Redux,
				},
				{
					name: "Formik",
					icon: Formik,
				},
				{
					name: "React Hook Form",
					icon: ReactHookForm,
				},
				{
					name: "Yup",
					icon: Yup,
				},
				{
					name: "Zod",
					icon: Zod,
				},
				{
					name: "SWR",
					icon: SWR,
				},
				{
					name: "Tanstack Query",
					icon: ReactQuery,
				},
				{
					name: "Tanstack Table",
					icon: ReactTable,
				},
				{
					name: "Vite",
					icon: Vite,
				},
				{
					name: "Webpack",
					icon: Webpack,
				},
				{
					name: "Playwright",
					icon: Playwright,
				},
				{
					name: "Postman",
					icon: Postman,
				},
				{
					name: "Prisma",
					icon: Prisma,
				},
				{
					name: "PostgreSQL",
					icon: PostgreSQL,
				},
				{
					name: "MongoDB",
					icon: MongoDB,
				},
				{
					name: "MySQL",
					icon: MySQL,
				},
				{
					name: "AWS",
					icon: AWS,
				},
				{
					name: "MINIO",
					icon: Minio,
				},
				{
					name: "Docker",
					icon: Docker,
				},
				{
					name: "Appwrite",
					icon: Appwrite,
				},
				{
					name: "Clerk",
					icon: Clerk,
				},
				{
					name: "Firebase",
					icon: Firebase,
				},
				{
					name: "Supabase",
					icon: Supabase,
				},
				{
					name: "Razorpay",
					icon: Razorpay,
				},
				{
					name: "Stripe",
					icon: Stripe,
				},
				{
					name: "Vercel",
					icon: Vercel,
				},
				{
					name: "Chrome Extensions",
					icon: ChromeWebStore,
				},
				{
					name: "NPM",
					icon: NPM,
				},
				{
					name: "PNPM",
					icon: PNPM,
				},
			],
		},
	],
	projects: [
		{
			name: "Cognition",
			thumbnail: "/projects/cognition.webp",
			description:
				"Cognition is a next-generation, web-based Learning Management System designed to streamline and enhance the educational experience for institutions, instructors, learners, and organizations. Built with a modern technology stack, Cognition offers secure, scalable, and intuitive tools for managing courses, users, content, and analytics. The platform supports advanced role-based access for a wide range of stakeholders, ensuring a tailored and compliant solution for diverse educational needs.",
			url: "https://cognition.baseel.com",
			githubUrl: "",
			skills: [
				{
					name: "Next.js",
					icon: NextJS,
				},
				{
					name: "React.js",
					icon: ReactJS,
				},
				{
					name: "Springboot",
					icon: SpringBoot,
				},
				{
					name: "JavaScript",
					icon: JavaScript,
				},
				{
					name: "TypeScript",
					icon: TypeScript,
				},
				{
					name: "Java",
					icon: Java,
				},
				{
					name: "Shadcn UI",
					icon: ShadcnUI,
				},
				{
					name: "Tailwind CSS",
					icon: TailwindCSS,
				},
				{
					name: "CSS3",
					icon: CSS3,
				},
				{
					name: "HTML5",
					icon: HTML5,
				},
				{
					name: "React Hook Form",
					icon: ReactHookForm,
				},
				{
					name: "Zod",
					icon: Zod,
				},
				{
					name: "Tanstack Query",
					icon: ReactQuery,
				},
				{
					name: "Tanstack Table",
					icon: ReactTable,
				},
				{
					name: "Zustand",
					icon: Zustand,
				},
				{
					name: "PostgreSQL",
					icon: PostgreSQL,
				},
				{
					name: "Stripe",
					icon: Stripe,
				},
				{
					name: "Ollama",
					icon: Ollama,
				},
				{
					name: "Webpack",
					icon: Webpack,
				},
				{
					name: "Docker",
					icon: Docker,
				},
				{
					name: "Postman",
					icon: Postman,
				},
				{
					name: "NPM",
					icon: NPM,
				},
				{
					name: "PNPM",
					icon: PNPM,
				},
			],
		},
		{
			name: "Certify",
			thumbnail: "/projects/certify.webp",
			description:
				"Certify serves as a versatile certification platform, enabling organizations to obtain certifications aligned with a wide range of global standards and regulations. Our platform checks for compliance with prominent frameworks such as GDPR, Cert-In, Indian DPDPA, RBI Cyber Security Guidelines, UAE Personal Data Protection Law, Abu Dhabi Global Market Regulations, etc.",
			url: "https://certify.baseel.com",
			githubUrl: "",
			skills: [
				{
					name: "Next.js",
					icon: NextJS,
				},
				{
					name: "React.js",
					icon: ReactJS,
				},
				{
					name: "Node.js",
					icon: NodeJS,
				},
				{
					name: "JavaScript",
					icon: JavaScript,
				},
				{
					name: "TypeScript",
					icon: TypeScript,
				},
				{
					name: "Hero UI",
					icon: HeroUI,
				},
				{
					name: "Tailwind CSS",
					icon: TailwindCSS,
				},
				{
					name: "CSS3",
					icon: CSS3,
				},
				{
					name: "HTML5",
					icon: HTML5,
				},
				{
					name: "Formik",
					icon: Formik,
				},
				{
					name: "Yup",
					icon: Yup,
				},
				{
					name: "SWR",
					icon: SWR,
				},
				{
					name: "Zustand",
					icon: Zustand,
				},
				{
					name: "Prisma",
					icon: Prisma,
				},
				{
					name: "PostgreSQL",
					icon: PostgreSQL,
				},
				{
					name: "Razorpay",
					icon: Razorpay,
				},
				{
					name: "Stripe",
					icon: Stripe,
				},
				{
					name: "Ollama",
					icon: Ollama,
				},
				{
					name: "Webpack",
					icon: Webpack,
				},
				{
					name: "Docker",
					icon: Docker,
				},
				{
					name: "Postman",
					icon: Postman,
				},
				{
					name: "NPM",
					icon: NPM,
				},
				{
					name: "PNPM",
					icon: PNPM,
				},
			],
		},
		{
			name: "Greenrhea",
			thumbnail: "/projects/greenrhea.webp",
			description:
				"Greenrhea is a dynamic sustainability platform designed to empower businesses with data-driven insights into the environmental and social responsibility of other companies. The platform is ideal for assessing potential partners’ sustainability efforts, enabling organizations to make informed, responsible decisions aligned with their values and environmental goals.",
			url: "https://www.greenrhea.com",
			githubUrl: "",
			skills: [
				{
					name: "Next.js",
					icon: NextJS,
				},
				{
					name: "React.js",
					icon: ReactJS,
				},
				{
					name: "Springboot",
					icon: SpringBoot,
				},
				{
					name: "JavaScript",
					icon: JavaScript,
				},
				{
					name: "TypeScript",
					icon: TypeScript,
				},
				{
					name: "Java",
					icon: Java,
				},
				{
					name: "Shadcn UI",
					icon: ShadcnUI,
				},
				{
					name: "Tailwind CSS",
					icon: TailwindCSS,
				},
				{
					name: "CSS3",
					icon: CSS3,
				},
				{
					name: "HTML5",
					icon: HTML5,
				},
				{
					name: "React Hook Form",
					icon: ReactHookForm,
				},
				{
					name: "Zod",
					icon: Zod,
				},
				{
					name: "Tanstack Query",
					icon: ReactQuery,
				},
				{
					name: "Tanstack Table",
					icon: ReactTable,
				},
				{
					name: "Zustand",
					icon: Zustand,
				},
				{
					name: "PostgreSQL",
					icon: PostgreSQL,
				},
				{
					name: "Stripe",
					icon: Stripe,
				},
				{
					name: "Ollama",
					icon: Ollama,
				},
				{
					name: "Webpack",
					icon: Webpack,
				},
				{
					name: "Docker",
					icon: Docker,
				},
				{
					name: "Postman",
					icon: Postman,
				},
				{
					name: "NPM",
					icon: NPM,
				},
				{
					name: "PNPM",
					icon: PNPM,
				},
			],
		},
		{
			name: "Neosmile",
			thumbnail: "/projects/neosmile.webp",
			description:
				"NeoSmile is an advanced web-based Dental and Facial Aesthetics Practice Management Platform built for modern clinics to streamline their daily operations. The system is designed to assist in managing appointments, patients, staff, treatments, and financial workflows efficiently through a secure and intuitive interface.",
			url: "https://www.neosmile.co.uk",
			githubUrl: "",
			skills: [
				{
					name: "Next.js",
					icon: NextJS,
				},
				{
					name: "React.js",
					icon: ReactJS,
				},
				{
					name: "Springboot",
					icon: SpringBoot,
				},
				{
					name: "JavaScript",
					icon: JavaScript,
				},
				{
					name: "TypeScript",
					icon: TypeScript,
				},
				{
					name: "Java",
					icon: Java,
				},
				{
					name: "Shadcn UI",
					icon: ShadcnUI,
				},
				{
					name: "Tailwind CSS",
					icon: TailwindCSS,
				},
				{
					name: "CSS3",
					icon: CSS3,
				},
				{
					name: "HTML5",
					icon: HTML5,
				},
				{
					name: "React Hook Form",
					icon: ReactHookForm,
				},
				{
					name: "Zod",
					icon: Zod,
				},
				{
					name: "Tanstack Query",
					icon: ReactQuery,
				},
				{
					name: "Tanstack Table",
					icon: ReactTable,
				},
				{
					name: "Zustand",
					icon: Zustand,
				},
				{
					name: "PostgreSQL",
					icon: PostgreSQL,
				},
				{
					name: "Stripe",
					icon: Stripe,
				},
				{
					name: "Ollama",
					icon: Ollama,
				},
				{
					name: "Webpack",
					icon: Webpack,
				},
				{
					name: "Docker",
					icon: Docker,
				},
				{
					name: "Postman",
					icon: Postman,
				},
				{
					name: "NPM",
					icon: NPM,
				},
				{
					name: "PNPM",
					icon: PNPM,
				},
			],
		},
	],
	work: [
		{
			organization: "Baseel",
			organizationUrl: "https://www.baseel.com",
			role: "Lead Software Engineer",
			logo: "/logos/baseel-partners.webp",
			startDate: "Oct, 2024",
			endDate: "Present",
			achievements: [
				"Forged & upheld two client-facing platforms utilizing Next.js & Node.js, decreasing system errors by 20%.",
				"Interviewed Freshers & Experienced candidates in technical rounds for Interns & Full-time roles.",
				"Trained & guided 2 Interns & 2 Junior Developers on JavaScript, TypeScript, React.js & Next.js.",
			],
		},
		{
			organization: "Baseel",
			organizationUrl: "https://www.baseel.com",
			role: "Software Engineer",
			logo: "/logos/baseel-partners.webp",
			startDate: "Jun, 2023",
			endDate: "Sep, 2024",
			achievements: [
				"Spearheaded the development of interactive web applications using modern technologies such as React.js, Next.js and Node.js.",
				"Collaborated with product teams to design scalable solutions that revamped user experience and boosted customer retention by 20%.",
				"Optimized database performance by writing efficient SQL queries & implementing caching mechanisms to reduce load time by 10%.",
			],
		},
		{
			organization: "Enterprise Minds Inc.",
			organizationUrl: "https://www.eminds.ai",
			role: "Web Development Intern",
			logo: "/logos/enterprise-minds.webp",
			startDate: "Jan, 2023",
			endDate: "Apr, 2023",
			achievements: [
				"Engineered a cutting-edge talent acquisition platform using React.js, optimizing 5000+ lines of code & increased user experience by 20%.",
				"Partnered with senior developers to implement new features and enhancements to improve overall experience by 35%.",
				"Implemented Multi Factor Auth to fortify application security by 50% and leveraged Redux to optimize performance.",
			],
		},
	],
	education: [
		{
			institution: "Pondicherry University",
			institutionUrl: "https://www.pondiuni.edu.in",
			degree: "Master of Computer Applications",
			logo: "/logos/pondicherry-university.webp",
			startDate: "Oct, 2021",
			endDate: "May, 2023",
			achievements: ["Scored an overall CGPA of 9.29 out of 10.00.", "Achieved 2nd Rank in CyZen (A Cyber Security awareness event) 2022's SecuroPoint (Inter-Department Quiz Competition based on Cyber Security)"],
		},
		{
			institution: "Siliguri Institute of Technology",
			institutionUrl: "https://www.sittechno.org",
			degree: "Bachelor of Computer Applications",
			logo: "/logos/siliguri-institute-of-technology.webp",
			startDate: "Jun, 2015",
			endDate: "May, 2018",
			achievements: ["Scored an overall CGPA of 7.38 out of 10.00.", "Finalist of ExQuizIT 2016, an Inter-Department Quiz Competition based on computer programming."],
		},
	],
};
