"use client";
import NextImage from "next/image";
import { about, tabs } from "@data";
import { placeholder } from "@assets";
import styles from "./about.module.css";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { Chip, Image, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";

const AboutSection = () => {
	const getStartContent = (tabId: number) => {
		switch (tabId) {
			case 1:
				return <Briefcase />;
			case 3:
				return <GraduationCap />;
			case 4:
				return <Award />;
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
				<Tabs aria-label="Tabs" classNames={{ base: styles["tabs-base"], tabList: styles["tabs-tab-list"], panel: styles["tabs-panel"] }} color="primary" size="lg" variant="solid">
					{tabs?.map((tab: Tab) => (
						<Tab key={tab?.id} title={tab?.title}>
							<Listbox aria-label="Items" classNames={{ base: styles["listbox-base"], list: tab?.id === 2 && styles["listbox-list"] }} color="default" selectionMode="none" variant="light">
								{tab?.items?.map((item: string, index: number) => (
									<ListboxItem classNames={{ base: styles["listbox-item-base"], title: styles["listbox-item-title"] }} isReadOnly key={index} startContent={getStartContent(tab?.id)} textValue={item}>
										{tab?.id === 2 ? (
											<Chip color="primary" variant="flat">
												{item}
											</Chip>
										) : (
											item
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
