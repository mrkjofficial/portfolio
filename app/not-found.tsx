"use client";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button, Card, CardBody, CardFooter, Chip } from "@heroui/react";

export default function NotFoundPage() {
	const router = useRouter();

	return (
		<main className="flex h-full min-h-[calc(100vh-4rem)] w-full items-center justify-center">
			<Card className="m-5 w-full max-w-3xl px-2 py-16">
				<CardBody className="flex flex-col items-center justify-center gap-5">
					<AlertTriangle className="size-32 xs:size-40 sm:size-48 md:size-56 lg:size-64 xl:size-72" />
					<div className="flex flex-col items-center justify-center gap-2">
						<Chip color="danger" size="lg" variant="flat">
							{`Not Found`}
						</Chip>
						<h1 className="text-2xl font-medium xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Oh No! Error 404</h1>
						<p className="max-w-sm text-center font-medium text-default-500 sm:max-w-lg">Sorry, the page you are looking for doesn’t exist or has been removed.</p>
					</div>
				</CardBody>
				<CardFooter className="flex flex-col items-center justify-center gap-10">
					<Button color="primary" onPress={() => router.refresh()} size="lg">{`Refresh`}</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
