import { Bot, Briefcase, FolderOpen, GraduationCap, Home, Mail, MapPinned, TerminalSquare } from "lucide-react";
import {
	AntDesign,
	AWS,
	ChromeWebStore,
	Claude,
	Clerk,
	CSS3,
	Docker,
	ExpressJS,
	Firebase,
	Formik,
	Gemini,
	Github,
	HeroUI,
	HTML5,
	JavaScript,
	LinkedIn,
	MongoDB,
	MUI,
	MySQL,
	NextJS,
	NodeJS,
	NPM,
	Ollama,
	OpenAI,
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
	Stripe,
	Supabase,
	SWR,
	TailwindCSS,
	Topmate,
	TypeScript,
	Vercel,
	Vite,
	Webpack,
	Zod,
	Zustand,
	SpringBoot,
	Java,
	Yup,
	Minio,
	Playwright,
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
		headline: "I turn your ideas into reality",
		subHeadline: "Lead Software Engineer | Architect | Full-Stack Specialist",
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
			description: "From beginner basics to advanced expertise our courses help you grow faster, smarter, and stronger. Trusted by students, teachers, and top companies alike.",
			url: "https://cognition-uat.baseel.com",
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
				"Certify is first of its kind certification body offering accredited certificates to organizations and businesses for privacy and information security compliance in India. Our certificates are designated credentials once earned shall verify your legitimacy and competence to process personal information under national regulations.",
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
				"At Greenrhea, we specialize in deep web intelligence gathering, utilizing advanced tools to actively monitor global media, including dark web sources, regulatory filings, and industry journals. Our approach ensures that your organization stays ahead of potential controversies by anticipating key events and trends.",
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
			description: "Your home for top-tier dental care and stunning smiles. Our modern practice is more than just a dental practice - it is a place where compassion and skill unite to offer you an exceptional dental experience.",
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
			organization: "Baseel Partners",
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
			organization: "Baseel Partners",
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
			organization: "Enterprise Minds, Inc",
			organizationUrl: "https://eminds.ai",
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
