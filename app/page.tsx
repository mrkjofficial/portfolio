import { About, Contact, Footer, Hero, Projects } from "@components";

export default function Home() {
	return (
		<main className="my-auto flex h-full min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-10 px-6">
			<Hero />
			<About />
			<Projects />
			<Contact />
			<Footer />
		</main>
	);
}
