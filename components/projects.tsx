"use client";
import NextLink from "next/link";
import { projects } from "@data";
import NextImage from "next/image";
import { Code2, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { Button, Card, CardFooter, Image, Pagination } from "@heroui/react";

const ProjectsComponent = () => {
	const [page, setPage] = useState<number>(1);
	const rowsPerPage = 6;
	const pages = projects?.length > 0 ? Math.ceil(projects?.length / rowsPerPage) : 1;

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return projects?.slice(start, end);
	}, [page, rowsPerPage]);

	return (
		<section className="flex w-full max-w-screen-2xl flex-col items-center justify-center gap-10 py-10" id="projects">
			<h1 className="text-center text-4xl font-bold">My Projects</h1>
			<div className="grid w-full max-w-screen-2xl grid-cols-1 place-items-center gap-10 md:grid-cols-2 xl:grid-cols-3">
				{items?.map((project: Project) => (
					<Card className="aspect-video w-full max-w-md border-none" isFooterBlurred key={project?.id}>
						<Image alt={project?.title} as={NextImage} className="object-cover" height={252} loading="eager" priority src={project?.thumbnail} width={448} />
						<CardFooter className="absolute bottom-1 z-10 mx-1 w-[calc(100%-8px)] justify-between overflow-hidden rounded-large bg-background/70">
							<div className="flex flex-col justify-center gap-1">
								<h1 className="text-xs text-foreground">{project.title}</h1>
								<p className="text-xs font-light text-foreground">{project.description}</p>
							</div>
							<div className="flex items-center justify-center gap-1">
								<Button aria-label="Source Code" as={NextLink} color="default" disabled={project?.disabled} href={project?.sourceUrl} isIconOnly radius="full" size="sm" variant="light">
									<Code2 className="text-foreground" size={20} />
								</Button>
								<Button aria-label="Preview" as={NextLink} color="default" disabled={project?.disabled} href={project?.previewUrl} isIconOnly radius="full" size="sm" variant="light">
									<Eye className="text-foreground" size={20} />
								</Button>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
			<Pagination color="primary" isCompact onChange={setPage} page={page} showControls showShadow size="lg" total={pages} variant="flat" />
		</section>
	);
};

export default ProjectsComponent;
