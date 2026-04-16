"use client";
import { about } from "@data";
import { useRouter } from "next/navigation";
import { Avatar, Button, Chip, Surface } from "@heroui/react";

const About = () => {
	const router = useRouter();

	return (
		<Surface className="flex h-full max-h-fit w-full flex-col items-center justify-start gap-6 rounded-3xl p-6 md:sticky md:top-22 md:my-6 md:min-h-[calc(100vh-10rem)]">
			<div className="relative">
				<div aria-hidden className="rgb-glow absolute -inset-2 rounded-full opacity-60 blur-xl" />
				<div className="rgb-glow relative rounded-full p-1">
					<div className="bg-background relative rounded-full p-0.5">
						<Avatar className="size-48">
							<Avatar.Image src={about.avatarUrl} />
							<Avatar.Fallback className="text-7xl" />
						</Avatar>
						<Chip className="absolute right-0 bottom-0 z-50 text-sm font-medium italic" color="default" size="lg" variant="secondary">
							{about.name}
						</Chip>
					</div>
				</div>
			</div>
			<div className="xs:grid-cols-2 grid w-full grid-cols-1 items-center justify-center gap-2 sm:grid-cols-4 md:grid-cols-1">
				{about.links.map(link => (
					<Button className="w-full" key={link.name} onPress={() => router.push(link.url)} size="lg" variant="outline">
						<link.icon />
						{link.name}
					</Button>
				))}
			</div>
		</Surface>
	);
};

export default About;
