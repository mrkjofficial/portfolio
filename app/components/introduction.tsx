import { about } from "@data";

const Introduction = () => {
	return (
		<div className="flex w-full flex-col gap-3" id="home">
			<h1 className="text-2xl font-bold">{about.introduction.headline}</h1>
			<h2 className="font-semibold">{about.introduction.subHeadline}</h2>
			<p className="text-muted-foreground text-sm whitespace-pre-line">{about.introduction.description}</p>
		</div>
	);
};

export default Introduction;
