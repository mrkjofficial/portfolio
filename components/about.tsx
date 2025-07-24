"use client";
import NextImage from "next/image";
import { about, tabs } from "@data";
import { placeholder } from "@assets";
import { Briefcase, GraduationCap, Lightbulb, Trophy } from "lucide-react";
import { Chip, Image, Listbox, ListboxItem, Tab, Tabs } from "@heroui/react";

const AboutSection = () => {
	const getStartContent = (tabId: number) => {
		switch (tabId) {
			case 1:
				return <Briefcase />;
			case 3:
				return <GraduationCap />;
			case 4:
				return <Trophy />;
		}
	};

	return (
		<section className="grid w-full max-w-screen-2xl grid-cols-1 place-items-stretch gap-5 py-10 md:grid-cols-2" id="about">
			<div className="flex w-full justify-center">
				<Image alt="Placeholder" as={NextImage} className="h-auto" height={365} loading="eager" priority src={placeholder.src} width={512} />
			</div>
			<div className="flex w-full flex-col gap-5">
				<div className="flex w-full flex-col items-center justify-center gap-5">
					<h1 className="w-full text-center text-4xl font-bold md:text-left">About Me</h1>
					<p className="w-full text-left text-base lg:text-lg">{about}</p>
				</div>
				<Tabs aria-label="Tabs" classNames={{ base: "flex items-center", panel: "flex w-full items-center justify-center" }} color="primary" size="lg" variant="solid">
					{tabs?.map((tab: Tab) => (
						<Tab key={tab?.id} title={tab?.title}>
							<Listbox aria-label="Items" classNames={{ base: "w-full", list: tab?.id === 2 && "flex-row flex-wrap" }} color="default" selectionMode="none" variant="light">
								{tab?.items?.map((item: ListItem, index: number) => (
									<ListboxItem classNames={{ base: "max-w-fit px-1", title: "w-full whitespace-normal text-base" }} href={item?.link} isReadOnly key={index} startContent={getStartContent(tab?.id)} textValue={item?.name}>
										{tab?.id === 2 ? (
											<Chip color="default" size="lg" startContent={<Lightbulb size={16} />} variant="flat">
												{item?.name}
											</Chip>
										) : (
											item?.name
										)}
									</ListboxItem>
								))}
							</Listbox>
						</Tab>
					))}
				</Tabs>
			</div>
		</section>
	);
};

export default AboutSection;
