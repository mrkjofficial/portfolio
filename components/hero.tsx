"use client";
import Image from "next/image";
import { toast } from "sonner";
import NextLink from "next/link";
import { useState } from "react";
import { profile } from "@assets";
import { Loader2 } from "lucide-react";
import { Avatar, Button } from "@heroui/react";
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
		<section className="flex w-full max-w-screen-2xl flex-col items-center justify-between gap-5 py-10">
			<div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
				<div className="order-last flex w-full flex-col items-center justify-center gap-5 text-2xl font-extrabold sm:text-3xl md:order-first md:items-start md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
					<h1 className="text-primary">{greeting}</h1>
					<TypeAnimation repeat={Infinity} sequence={intro} speed={50} wrapper="h2" />
					<p className="text-center text-base font-normal text-default-500 sm:text-lg md:text-left lg:text-xl">{subHeading}</p>
				</div>
				<div className="order-first flex w-full items-center justify-center md:order-last">
					<Avatar
						className="h-auto w-48 text-7xl xs:w-52 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96"
						color="default"
						fallback={nameInitials}
						ImgComponent={Image}
						imgProps={{ height: 384, loading: "eager", width: 384 }}
						isBordered
						radius="full"
						src={profile.src}
					/>
				</div>
			</div>
			<div className="flex w-full flex-col items-center justify-center gap-5 xs:flex-row md:justify-start">
				<Button as={NextLink} className="w-64 xs:w-auto" color="primary" href="#contact" radius="full" size="lg" variant="solid">
					Hire Me
				</Button>
				<Button className="w-64 xs:w-auto" color="primary" isLoading={isLoading} onPress={onDownload} radius="full" size="lg" spinner={<Loader2 className="animate-spin" size={16} />} variant="ghost">
					Download CV
				</Button>
			</div>
		</section>
	);
};

export default HeroComponent;
