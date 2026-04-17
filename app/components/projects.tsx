import Link from "next/link";
import { about } from "@data";
import Image from "next/image";
import { Card, Chip } from "@heroui/react";
import { ExternalLink } from "lucide-react";

const Projects = () => {
	return (
		<div className="flex w-full flex-col justify-center gap-3" id="projects">
			<h2 className="text-2xl font-bold">Notable Projects</h2>
			<div className="flex w-full flex-col items-center justify-center gap-6">
				{about.projects.map(project => (
					<Card key={project.name} variant="tertiary">
						<Card.Header className="relative aspect-2/1 w-full overflow-hidden">
							<Image alt={project.name} className="border-border rounded-3xl border" fill={true} sizes="100vw, (min-width: 768px) 640px" src={project.thumbnail} />
						</Card.Header>
						<Card.Content className="flex w-full flex-col justify-center gap-2">
							<Link className="flex items-center gap-1" href={project.url || project.githubUrl} target="_blank" rel="noreferrer noopener">
								<h3 className="font-semibold">{project.name}</h3>
								<ExternalLink size={16} />
							</Link>
							<p className="text-muted-foreground text-sm">{project.description}</p>
						</Card.Content>
						<Card.Footer className="flex flex-wrap gap-2">
							{project.skills.map(skill => (
								<Chip color="accent" key={skill?.name} size="lg" variant="soft">
									<skill.icon className="size-4" />
									{skill.name}
								</Chip>
							))}
						</Card.Footer>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Projects;
