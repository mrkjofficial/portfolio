"use client";
import Image from "next/image";
import { toast } from "sonner";
import NextLink from "next/link";
import { useState } from "react";
import { profile } from "@assets";
import { Loader2 } from "lucide-react";
import styles from "./hero.module.css";
import { Avatar, Button } from "@nextui-org/react";
import { TypeAnimation } from "react-type-animation";
import { greeting, intro, nameInitials, subHeading } from "@data";

const HeroComponent = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function onDownload() {
		setIsLoading(true);
		const downloadToast = toast.loading("Resuesting CV...");
		try {
			const response = await fetch("/api/download", {
				method: "POST",
				body: JSON.stringify({ key: "resume" }),
			});
			const res = await response.json();
			if (!response.ok) {
				throw new Error(res.message);
			}
			const link = document.createElement("a");
			link.href = res.url;
			link.download = "KaranCV.pdf";
			link.target = "_blank";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			toast.success(res?.message, { id: downloadToast });
		} catch (error: unknown) {
			toast.error((error as Error)?.message, { id: downloadToast });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<section className={styles["container"]}>
			<div className={styles["hero-wrapper"]}>
				<div className={styles["intro-section"]}>
					<h1>{greeting}</h1>
					<TypeAnimation repeat={Infinity} sequence={intro} speed={50} wrapper="h2" />
					<p>{subHeading}</p>
				</div>
				<div className={styles["avatar-section"]}>
					<Avatar className={styles["avatar"]} color="default" fallback={nameInitials} ImgComponent={Image} imgProps={{ height: 384, loading: "eager", width: 384 }} isBordered radius="full" src={profile.src} />
				</div>
			</div>
			<div className={styles["cta-section"]}>
				<Button as={NextLink} color="primary" href="#contact" radius="full" size="lg" variant="solid">
					{`Hire Me`}
				</Button>
				<Button color="primary" isLoading={isLoading} onPress={onDownload} radius="full" size="lg" spinner={<Loader2 className="animate-spin" size={16} />} variant="ghost">
					{`Download CV`}
				</Button>
			</div>
		</section>
	);
};

export default HeroComponent;
