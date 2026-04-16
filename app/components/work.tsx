import { about } from "@data";
import { CalendarDays } from "lucide-react";
import { Avatar, Card, Chip } from "@heroui/react";

const Work = () => {
	return (
		<div className="flex w-full flex-col justify-center gap-3" id="work">
			<h1 className="text-2xl font-bold">Work Experience</h1>
			<Card className="flex w-full flex-col items-center justify-center gap-0 px-2 py-3" variant="tertiary">
				{about.work.map((work, index) => (
					<Card.Content className="flex w-full flex-col justify-center gap-3 p-3 not-last:border-b" key={index}>
						<div className="xs:flex-row xs:items-center flex flex-col justify-between gap-4">
							<div className="flex items-center justify-center gap-2">
								<Avatar>
									<Avatar.Image src={work.logo} />
									<Avatar.Fallback>{work.organization.charAt(0)}</Avatar.Fallback>
								</Avatar>
								<div className="flex w-full flex-col justify-center">
									<h2 className="line-clamp-1 font-semibold break-all">{work.organization}</h2>
									<p className="text-muted-foreground text-xs">{work.role}</p>
								</div>
							</div>
							<Chip color="accent" size="lg" variant="soft">
								<CalendarDays size={16} />
								{work.startDate} - {work.endDate}
							</Chip>
						</div>
						<ul className="list-inside list-disc">
							{work.achievements &&
								work.achievements.map((achievement, index) => (
									<li className="indent-3 text-sm" key={index}>
										{achievement}
									</li>
								))}
						</ul>
					</Card.Content>
				))}
			</Card>
		</div>
	);
};

export default Work;
