"use client";
import NextImage from "next/image";
import { about, tabs } from "@data";
import { placeholder } from "@assets";
import styles from "./about.module.css";
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
		<section className={styles["container"]} id="about">
			<div className={styles["placeholder-wrapper"]}>
				<Image alt="Placeholder" as={NextImage} height={365} loading="eager" priority src={placeholder.src} width={512} />
			</div>
			<div className={styles["about-wrapper"]}>
				<div className={styles["info-section"]}>
					<h1>{`About Me`}</h1>
					<p>{about}</p>
				</div>
				<Tabs aria-label="Tabs" classNames={{ base: styles["tabs-base"], panel: styles["tabs-panel"] }} color="primary" size="lg" variant="solid">
					{tabs?.map((tab: Tab) => (
						<Tab key={tab?.id} title={tab?.title}>
							<Listbox aria-label="Items" classNames={{ base: styles["listbox-base"], list: tab?.id === 2 && styles["listbox-list"] }} color="default" selectionMode="none" variant="light">
								{tab?.items?.map((item: ListItem, index: number) => (
									<ListboxItem classNames={{ base: styles["listbox-item-base"], title: styles["listbox-item-title"] }} href={item?.link} isReadOnly key={index} startContent={getStartContent(tab?.id)} textValue={item?.name}>
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
