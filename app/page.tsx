import { ScrollShadow } from "@heroui/react";
import { About, Contact, Education, Information, Introduction, Projects, Technologies, Work } from "./components";

// The home page, which is the whole portfolio.
// On medium screens and up, About is a fixed sidebar and the other sections scroll beside it.
// On small screens, everything stacks in one column.
const HomePage = () => {
	return (
		<div className="my-6 flex w-full flex-col gap-3 md:my-0 md:flex-row">
			<About />
			{/* Scrollable area for the remaining sections; ScrollShadow fades the top and bottom edges. */}
			{/* Its height is the viewport minus the header and footer, so only this column scrolls. */}
			<ScrollShadow className="h-full w-full md:h-[calc(100vh-7rem)] md:w-2/3" hideScrollBar>
				<section className="flex h-fit w-full flex-col gap-10 rounded-3xl p-6 md:my-6">
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
