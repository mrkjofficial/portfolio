"use client";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button, Card, Chip } from "@heroui/react";

const NotFoundPage = () => {
	const router = useRouter();

	return (
		<main className="flex h-full min-h-[calc(100vh-4rem)] w-full items-center justify-center">
			<Card className="m-5 w-full max-w-3xl px-2 py-16">
				<Card.Content className="flex flex-col items-center justify-center gap-5">
					<AlertTriangle className="xs:size-40 size-32 sm:size-48 md:size-56 lg:size-64 xl:size-72" />
					<div className="flex flex-col items-center justify-center gap-2">
						<Chip className="gap-1 whitespace-nowrap" color="default" size="lg" variant="soft">
							{`Not Found`}
						</Chip>
						<h1 className="xs:text-3xl text-2xl font-medium sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Oh No! Error 404</h1>
						<p className="text-default-500 max-w-sm text-center font-medium sm:max-w-lg">Sorry, the page you are looking for doesn’t exist or has been removed.</p>
					</div>
				</Card.Content>
				<Card.Footer className="flex flex-col items-center justify-center gap-10">
					<Button onPress={router.refresh} size="lg" variant="ghost">{`Refresh`}</Button>
				</Card.Footer>
			</Card>
		</main>
	);
};

export default NotFoundPage;
