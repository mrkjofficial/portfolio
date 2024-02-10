"use client";
import NextLink from "next/link";
import { projects } from "@data";
import NextImage from "next/image";
import { Code2, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import styles from "./projects.module.css";
import { Button, Card, CardFooter, Image, Pagination } from "@nextui-org/react";

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
		<section className={styles["container"]} id="projects">
			<h1>{`My Projects`}</h1>
			<div className={styles["projects"]}>
				{items?.map((project: Project) => (
					<Card className={styles["project"]} isFooterBlurred key={project?.id}>
						<Image alt={project?.title} as={NextImage} height={252} loading="eager" priority src={project?.thumbnail} width={448} />
						<CardFooter className={styles["project-info"]}>
							<div className={styles["info-section"]}>
								<h1>{project.title}</h1>
								<p>{project.description}</p>
							</div>
							<div className={styles["cta-section"]}>
								<Button aria-label="Source Code" as={NextLink} color="default" href={project?.sourceUrl} isIconOnly radius="full" size="sm" variant="light">
									<Code2 />
								</Button>
								<Button aria-label="Preview" as={NextLink} color="default" href={project?.previewUrl} isIconOnly radius="full" size="sm" variant="light">
									<Eye />
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
