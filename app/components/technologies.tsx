import { about } from "@data";
import { Chip } from "@heroui/react";

const Technologies = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-3">
			{about.technologies.map(tech => (
				<div className="flex w-full flex-col items-center justify-center gap-3" key={tech.name}>
					<div className="flex w-full items-center gap-1">
						<tech.icon size={24} />
						<h4 className="font-semibold">{tech.name}</h4>
					</div>
					<div className="flex w-full flex-wrap items-center gap-3">
						{tech.skills.map(skill => (
							<Chip className="gap-1" color="default" key={skill.name} size="lg" variant="soft">
								<skill.icon className="size-4" />
								{skill.name}
							</Chip>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Technologies;
