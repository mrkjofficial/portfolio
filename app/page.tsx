import { ScrollShadow } from "@heroui/react";
import { About, Contact, Education, Information, Introduction, Projects, Technologies, Work } from "./components";

const HomePage = () => {
	return (
		<div className="my-6 flex w-full flex-col gap-3 md:my-0 md:flex-row">
			<About />
			<ScrollShadow className="h-full w-full md:h-[calc(100vh-7rem)] md:w-2/3" hideScrollBar>
				<section className="flex h-fit w-full flex-col gap-5 rounded-3xl p-6 md:my-6">
					<Introduction />
					<Information />
					<Technologies />
					<Projects />
					<Work />
					<Education />
					<Contact />
				</section>
			</ScrollShadow>
		</div>
	);
};

export default HomePage;
