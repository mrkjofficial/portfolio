import { v7 as uuidv7 } from "uuid";
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
		id: uuidv7(),
		label: "Home",
		src: "#home",
		icon: Home,
	},
	{
		id: uuidv7(),
		label: "Projects",
		src: "#projects",
		icon: FolderOpen,
	},
	{
		id: uuidv7(),
		label: "Work",
		src: "#work",
		icon: Briefcase,
	},
	{
		id: uuidv7(),
		label: "Education",
		src: "#education",
		icon: GraduationCap,
	},
	{
		id: uuidv7(),
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
			id: uuidv7(),
			name: "LinkedIn",
			icon: LinkedIn,
			url: "https://www.linkedin.com/in/mrkjofficial",
		},
		{
			id: uuidv7(),
			name: "GitHub",
			icon: Github,
			url: "https://github.com/mrkjofficial",
		},
		{
			id: uuidv7(),
			name: "Resume",
			icon: Resume,
			url: "/karan-jaiswal.pdf",
		},
		{
			id: uuidv7(),
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
			id: uuidv7(),
			name: "Location",
			icon: MapPinned,
			value: "India",
		},
		{
			id: uuidv7(),
			name: "Experience",
			icon: Briefcase,
			value: "3 Year+",
		},
		{
			id: uuidv7(),
			name: "Projects",
			icon: FolderOpen,
			value: "7+",
		},
	],
	technologies: [
		{
			id: uuidv7(),
			name: "AI/ML",
			icon: Bot,
			skills: [
				{
					id: uuidv7(),
					name: "Claude",
					icon: Claude,
				},
				{
					id: uuidv7(),
					name: "Copilot",
					icon: Copilot,
				},
				{
					id: uuidv7(),
					name: "Cursor",
					icon: Cursor,
				},
				{
					id: uuidv7(),
					name: "Gemini",
					icon: Gemini,
				},
				{
					id: uuidv7(),
					name: "Ollama",
					icon: Ollama,
				},
				{
					id: uuidv7(),
					name: "OpenAI",
					icon: OpenAI,
				},
			],
		},
		{
			id: uuidv7(),
			name: "Web",
			icon: TerminalSquare,
			skills: [
				{
					id: uuidv7(),
					name: "React.js",
					icon: ReactJS,
				},
				{
					id: uuidv7(),
					name: "Next.js",
					icon: NextJS,
				},
				{
					id: uuidv7(),
					name: "Express.js",
					icon: ExpressJS,
				},
				{
					id: uuidv7(),
					name: "Node.js",
					icon: NodeJS,
				},
				{
					id: uuidv7(),
					name: "Springboot",
					icon: SpringBoot,
				},
				{
					id: uuidv7(),
					name: "JavaScript",
					icon: JavaScript,
				},
				{
					id: uuidv7(),
					name: "TypeScript",
					icon: TypeScript,
				},
				{
					id: uuidv7(),
					name: "Java",
					icon: Java,
				},
				{
					id: uuidv7(),
					name: "HTML5",
					icon: HTML5,
				},
				{
					id: uuidv7(),
					name: "CSS3",
					icon: CSS3,
				},
				{
					id: uuidv7(),
					name: "Tailwind",
					icon: TailwindCSS,
				},
				{
					id: uuidv7(),
					name: "Shadcn UI",
					icon: ShadcnUI,
				},
				{
					id: uuidv7(),
					name: "Hero UI",
					icon: HeroUI,
				},
				{
					id: uuidv7(),
					name: "MUI",
					icon: MUI,
				},
				{
					id: uuidv7(),
					name: "Ant Design",
					icon: AntDesign,
				},
				{
					id: uuidv7(),
					name: "React Router",
					icon: ReactRouter,
				},
				{
					id: uuidv7(),
					name: "Zustand",
					icon: Zustand,
				},
				{
					id: uuidv7(),
					name: "Redux",
					icon: Redux,
				},
				{
					id: uuidv7(),
					name: "Formik",
					icon: Formik,
				},
				{
					id: uuidv7(),
					name: "React Hook Form",
					icon: ReactHookForm,
				},
				{
					id: uuidv7(),
					name: "Yup",
					icon: Yup,
				},
				{
					id: uuidv7(),
					name: "Zod",
					icon: Zod,
				},
				{
					id: uuidv7(),
					name: "SWR",
					icon: SWR,
				},
				{
					id: uuidv7(),
					name: "Tanstack Query",
					icon: ReactQuery,
				},
				{
					id: uuidv7(),
					name: "Tanstack Table",
					icon: ReactTable,
				},
				{
					id: uuidv7(),
					name: "Vite",
					icon: Vite,
				},
				{
					id: uuidv7(),
					name: "Webpack",
					icon: Webpack,
				},
				{
					id: uuidv7(),
					name: "Playwright",
					icon: Playwright,
				},
				{
					id: uuidv7(),
					name: "Postman",
					icon: Postman,
				},
				{
					id: uuidv7(),
					name: "Prisma",
					icon: Prisma,
				},
				{
					id: uuidv7(),
					name: "PostgreSQL",
					icon: PostgreSQL,
				},
				{
					id: uuidv7(),
					name: "MongoDB",
					icon: MongoDB,
				},
				{
					id: uuidv7(),
					name: "MySQL",
					icon: MySQL,
				},
				{
					id: uuidv7(),
					name: "AWS",
					icon: AWS,
				},
				{
					id: uuidv7(),
					name: "MINIO",
					icon: Minio,
				},
				{
					id: uuidv7(),
					name: "Docker",
					icon: Docker,
				},
				{
					id: uuidv7(),
					name: "Appwrite",
					icon: Appwrite,
				},
				{
					id: uuidv7(),
					name: "Clerk",
					icon: Clerk,
				},
				{
					id: uuidv7(),
					name: "Firebase",
					icon: Firebase,
				},
				{
					id: uuidv7(),
					name: "Supabase",
					icon: Supabase,
				},
				{
					id: uuidv7(),
					name: "Razorpay",
					icon: Razorpay,
				},
				{
					id: uuidv7(),
					name: "Stripe",
					icon: Stripe,
				},
				{
					id: uuidv7(),
					name: "Vercel",
					icon: Vercel,
				},
				{
					id: uuidv7(),
					name: "Chrome Extensions",
					icon: ChromeWebStore,
				},
				{
					id: uuidv7(),
					name: "NPM",
					icon: NPM,
				},
				{
					id: uuidv7(),
					name: "PNPM",
					icon: PNPM,
				},
			],
		},
	],
	projects: [
		{
			id: uuidv7(),
			name: "Cognition",
			thumbnail: "/projects/cognition.webp",
			description:
				"Cognition is a next-generation, web-based Learning Management System designed to streamline and enhance the educational experience for institutions, instructors, learners, and organizations. Built with a modern technology stack, Cognition offers secure, scalable, and intuitive tools for managing courses, users, content, and analytics. The platform supports advanced role-based access for a wide range of stakeholders, ensuring a tailored and compliant solution for diverse educational needs.",
			url: "https://cognition.baseel.com",
			githubUrl: "",
			skills: [
				{
					id: uuidv7(),
					name: "Next.js",
					icon: NextJS,
				},
				{
					id: uuidv7(),
					name: "React.js",
					icon: ReactJS,
				},
				{
					id: uuidv7(),
					name: "Springboot",
					icon: SpringBoot,
				},
				{
					id: uuidv7(),
					name: "JavaScript",
					icon: JavaScript,
				},
				{
					id: uuidv7(),
					name: "TypeScript",
					icon: TypeScript,
				},
				{
					id: uuidv7(),
					name: "Java",
					icon: Java,
				},
				{
					id: uuidv7(),
					name: "Shadcn UI",
					icon: ShadcnUI,
				},
				{
					id: uuidv7(),
					name: "Tailwind CSS",
					icon: TailwindCSS,
				},
				{
					id: uuidv7(),
					name: "CSS3",
					icon: CSS3,
				},
				{
					id: uuidv7(),
					name: "HTML5",
					icon: HTML5,
				},
				{
					id: uuidv7(),
					name: "React Hook Form",
					icon: ReactHookForm,
				},
				{
					id: uuidv7(),
					name: "Zod",
					icon: Zod,
				},
				{
					id: uuidv7(),
					name: "Tanstack Query",
					icon: ReactQuery,
				},
				{
					id: uuidv7(),
					name: "Tanstack Table",
					icon: ReactTable,
				},
				{
					id: uuidv7(),
					name: "Zustand",
					icon: Zustand,
				},
				{
					id: uuidv7(),
					name: "PostgreSQL",
					icon: PostgreSQL,
				},
				{
					id: uuidv7(),
					name: "Stripe",
					icon: Stripe,
				},
				{
					id: uuidv7(),
					name: "Ollama",
					icon: Ollama,
				},
				{
					id: uuidv7(),
					name: "Webpack",
					icon: Webpack,
				},
				{
					id: uuidv7(),
					name: "Docker",
					icon: Docker,
				},
				{
					id: uuidv7(),
					name: "Postman",
					icon: Postman,
				},
				{
					id: uuidv7(),
					name: "NPM",
					icon: NPM,
				},
				{
					id: uuidv7(),
					name: "PNPM",
					icon: PNPM,
				},
			],
		},
		{
			id: uuidv7(),
			name: "Certify",
			thumbnail: "/projects/certify.webp",
			description:
				"Certify serves as a versatile certification platform, enabling organizations to obtain certifications aligned with a wide range of global standards and regulations. Our platform checks for compliance with prominent frameworks such as GDPR, Cert-In, Indian DPDPA, RBI Cyber Security Guidelines, UAE Personal Data Protection Law, Abu Dhabi Global Market Regulations, etc.",
			url: "https://certify.baseel.com",
			githubUrl: "",
			skills: [
				{
					id: uuidv7(),
					name: "Next.js",
					icon: NextJS,
				},
				{
					id: uuidv7(),
					name: "React.js",
					icon: ReactJS,
				},
				{
					id: uuidv7(),
					name: "Node.js",
					icon: NodeJS,
				},
				{
					id: uuidv7(),
					name: "JavaScript",
					icon: JavaScript,
				},
				{
					id: uuidv7(),
					name: "TypeScript",
					icon: TypeScript,
				},
				{
					id: uuidv7(),
					name: "Hero UI",
					icon: HeroUI,
				},
				{
					id: uuidv7(),
					name: "Tailwind CSS",
					icon: TailwindCSS,
				},
				{
					id: uuidv7(),
					name: "CSS3",
					icon: CSS3,
				},
				{
					id: uuidv7(),
					name: "HTML5",
					icon: HTML5,
				},
				{
					id: uuidv7(),
					name: "Formik",
					icon: Formik,
				},
				{
					id: uuidv7(),
					name: "Yup",
					icon: Yup,
				},
				{
					id: uuidv7(),
					name: "SWR",
					icon: SWR,
				},
				{
					id: uuidv7(),
					name: "Zustand",
					icon: Zustand,
				},
				{
					id: uuidv7(),
					name: "Prisma",
					icon: Prisma,
				},
				{
					id: uuidv7(),
					name: "PostgreSQL",
					icon: PostgreSQL,
				},
				{
					id: uuidv7(),
					name: "Razorpay",
					icon: Razorpay,
				},
				{
					id: uuidv7(),
					name: "Stripe",
					icon: Stripe,
				},
				{
					id: uuidv7(),
					name: "Ollama",
					icon: Ollama,
				},
				{
					id: uuidv7(),
					name: "Webpack",
					icon: Webpack,
				},
				{
					id: uuidv7(),
					name: "Docker",
					icon: Docker,
				},
				{
					id: uuidv7(),
					name: "Postman",
					icon: Postman,
				},
				{
					id: uuidv7(),
					name: "NPM",
					icon: NPM,
				},
				{
					id: uuidv7(),
					name: "PNPM",
					icon: PNPM,
				},
			],
		},
		{
			id: uuidv7(),
			name: "Greenrhea",
			thumbnail: "/projects/greenrhea.webp",
			description:
				"Greenrhea is a dynamic sustainability platform designed to empower businesses with data-driven insights into the environmental and social responsibility of other companies. The platform is ideal for assessing potential partners’ sustainability efforts, enabling organizations to make informed, responsible decisions aligned with their values and environmental goals.",
			url: "https://www.greenrhea.com",
			githubUrl: "",
			skills: [
				{
					id: uuidv7(),
					name: "Next.js",
					icon: NextJS,
				},
				{
					id: uuidv7(),
					name: "React.js",
					icon: ReactJS,
				},
				{
					id: uuidv7(),
					name: "Springboot",
					icon: SpringBoot,
				},
				{
					id: uuidv7(),
					name: "JavaScript",
					icon: JavaScript,
				},
				{
					id: uuidv7(),
					name: "TypeScript",
					icon: TypeScript,
				},
				{
					id: uuidv7(),
					name: "Java",
					icon: Java,
				},
				{
					id: uuidv7(),
					name: "Shadcn UI",
					icon: ShadcnUI,
				},
				{
					id: uuidv7(),
					name: "Tailwind CSS",
					icon: TailwindCSS,
				},
				{
					id: uuidv7(),
					name: "CSS3",
					icon: CSS3,
				},
				{
					id: uuidv7(),
					name: "HTML5",
					icon: HTML5,
				},
				{
					id: uuidv7(),
					name: "React Hook Form",
					icon: ReactHookForm,
				},
				{
					id: uuidv7(),
					name: "Zod",
					icon: Zod,
				},
				{
					id: uuidv7(),
					name: "Tanstack Query",
					icon: ReactQuery,
				},
				{
					id: uuidv7(),
					name: "Tanstack Table",
					icon: ReactTable,
				},
				{
					id: uuidv7(),
					name: "Zustand",
					icon: Zustand,
				},
				{
					id: uuidv7(),
					name: "PostgreSQL",
					icon: PostgreSQL,
				},
				{
					id: uuidv7(),
					name: "Stripe",
					icon: Stripe,
				},
				{
					id: uuidv7(),
					name: "Ollama",
					icon: Ollama,
				},
				{
					id: uuidv7(),
					name: "Webpack",
					icon: Webpack,
				},
				{
					id: uuidv7(),
					name: "Docker",
					icon: Docker,
				},
				{
					id: uuidv7(),
					name: "Postman",
					icon: Postman,
				},
				{
					id: uuidv7(),
					name: "NPM",
					icon: NPM,
				},
				{
					id: uuidv7(),
					name: "PNPM",
					icon: PNPM,
				},
			],
		},
		{
			id: uuidv7(),
			name: "Neosmile",
			thumbnail: "/projects/neosmile.webp",
			description:
				"NeoSmile is an advanced web-based Dental and Facial Aesthetics Practice Management Platform built for modern clinics to streamline their daily operations. The system is designed to assist in managing appointments, patients, staff, treatments, and financial workflows efficiently through a secure and intuitive interface.",
			url: "https://www.neosmile.co.uk",
			githubUrl: "",
			skills: [
				{
					id: uuidv7(),
					name: "Next.js",
					icon: NextJS,
				},
				{
					id: uuidv7(),
					name: "React.js",
					icon: ReactJS,
				},
				{
					id: uuidv7(),
					name: "Springboot",
					icon: SpringBoot,
				},
				{
					id: uuidv7(),
					name: "JavaScript",
					icon: JavaScript,
				},
				{
					id: uuidv7(),
					name: "TypeScript",
					icon: TypeScript,
				},
				{
					id: uuidv7(),
					name: "Java",
					icon: Java,
				},
				{
					id: uuidv7(),
					name: "Shadcn UI",
					icon: ShadcnUI,
				},
				{
					id: uuidv7(),
					name: "Tailwind CSS",
					icon: TailwindCSS,
				},
				{
					id: uuidv7(),
					name: "CSS3",
					icon: CSS3,
				},
				{
					id: uuidv7(),
					name: "HTML5",
					icon: HTML5,
				},
				{
					id: uuidv7(),
					name: "React Hook Form",
					icon: ReactHookForm,
				},
				{
					id: uuidv7(),
					name: "Zod",
					icon: Zod,
				},
				{
					id: uuidv7(),
					name: "Tanstack Query",
					icon: ReactQuery,
				},
				{
					id: uuidv7(),
					name: "Tanstack Table",
					icon: ReactTable,
				},
				{
					id: uuidv7(),
					name: "Zustand",
					icon: Zustand,
				},
				{
					id: uuidv7(),
					name: "PostgreSQL",
					icon: PostgreSQL,
				},
				{
					id: uuidv7(),
					name: "Stripe",
					icon: Stripe,
				},
				{
					id: uuidv7(),
					name: "Ollama",
					icon: Ollama,
				},
				{
					id: uuidv7(),
					name: "Webpack",
					icon: Webpack,
				},
				{
					id: uuidv7(),
					name: "Docker",
					icon: Docker,
				},
				{
					id: uuidv7(),
					name: "Postman",
					icon: Postman,
				},
				{
					id: uuidv7(),
					name: "NPM",
					icon: NPM,
				},
				{
					id: uuidv7(),
					name: "PNPM",
					icon: PNPM,
				},
			],
		},
	],
	work: [
		{
			id: uuidv7(),
			organization: "Baseel",
			organizationUrl: "https://www.baseel.com",
			role: "Lead Software Engineer",
			logo: "/logos/baseel-partners.webp",
			startDate: "Oct, 2024",
			endDate: "Present",
			achievements: [
				{
					id: uuidv7(),
					title: "Forged & upheld two client-facing platforms utilizing Next.js & Node.js, decreasing system errors by 20%.",
				},
				{
					id: uuidv7(),
					title: "Interviewed Freshers & Experienced candidates in technical rounds for Interns & Full-time roles.",
				},
				{
					id: uuidv7(),
					title: "Trained & guided 2 Interns & 2 Junior Developers on JavaScript, TypeScript, React.js & Next.js.",
				},
			],
		},
		{
			id: uuidv7(),
			organization: "Baseel",
			organizationUrl: "https://www.baseel.com",
			role: "Software Engineer",
			logo: "/logos/baseel-partners.webp",
			startDate: "Jun, 2023",
			endDate: "Sep, 2024",
			achievements: [
				{
					id: uuidv7(),
					title: "Spearheaded the development of interactive web applications using modern technologies such as React.js, Next.js and Node.js.",
				},
				{
					id: uuidv7(),
					title: "Collaborated with product teams to design scalable solutions that revamped user experience and boosted customer retention by 20%.",
				},
				{
					id: uuidv7(),
					title: "Optimized database performance by writing efficient SQL queries & implementing caching mechanisms to reduce load time by 10%.",
				},
			],
		},
		{
			id: uuidv7(),
			organization: "Enterprise Minds Inc.",
			organizationUrl: "https://www.eminds.ai",
			role: "Web Development Intern",
			logo: "/logos/enterprise-minds.webp",
			startDate: "Jan, 2023",
			endDate: "Apr, 2023",
			achievements: [
				{
					id: uuidv7(),
					title: "Engineered a cutting-edge talent acquisition platform using React.js, optimizing 5000+ lines of code & increased user experience by 20%.",
				},
				{
					id: uuidv7(),
					title: "Partnered with senior developers to implement new features and enhancements to improve overall experience by 35%.",
				},
				{
					id: uuidv7(),
					title: "Implemented Multi Factor Auth to fortify application security by 50% and leveraged Redux to optimize performance.",
				},
			],
		},
	],
	education: [
		{
			id: uuidv7(),
			institution: "Pondicherry University",
			institutionUrl: "https://www.pondiuni.edu.in",
			degree: "Master of Computer Applications",
			logo: "/logos/pondicherry-university.webp",
			startDate: "Oct, 2021",
			endDate: "May, 2023",
			achievements: [
				{
					id: uuidv7(),
					title: "Scored an overall CGPA of 9.29 out of 10.00.",
				},
				{
					id: uuidv7(),
					title: "Achieved 2nd Rank in CyZen (A Cyber Security awareness event) 2022's SecuroPoint (Inter-Department Quiz Competition based on Cyber Security)",
				},
			],
		},
		{
			id: uuidv7(),
			institution: "Siliguri Institute of Technology",
			institutionUrl: "https://www.sittechno.org",
			degree: "Bachelor of Computer Applications",
			logo: "/logos/siliguri-institute-of-technology.webp",
			startDate: "Jun, 2015",
			endDate: "May, 2018",
			achievements: [
				{
					id: uuidv7(),
					title: "Scored an overall CGPA of 7.38 out of 10.00.",
				},
				{
					id: uuidv7(),
					title: "Finalist of ExQuizIT 2016, an Inter-Department Quiz Competition based on computer programming.",
				},
			],
		},
	],
};
