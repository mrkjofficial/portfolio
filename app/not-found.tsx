"use client";
import styles from "./notfound.module.css";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button, Card, CardBody, CardFooter, Chip } from "@heroui/react";

export default function NotFoundPage() {
	const router = useRouter();

	return (
		<main className={styles["container"]}>
			<Card className={styles["card"]}>
				<CardBody className={styles["card-body"]}>
					<AlertTriangle className={styles["alert-icon"]} />
					<div className={styles["text-group"]}>
						<Chip color="danger" size="lg" variant="flat">
							{`Not Found`}
						</Chip>
						<h1>{`Oh No! Error 404`}</h1>
						<p>{`Sorry, the page you are looking for doesn’t exist or has been removed.`}</p>
					</div>
				</CardBody>
				<CardFooter className={styles["card-footer"]}>
					<Button color="primary" onPress={() => router.refresh()} size="lg">{`Refresh`}</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
