"use client";
import Image from "next/image";
import NextLink from "next/link";
import { profile } from "@assets";
import styles from "./hero.module.css";
import { Avatar, Button } from "@nextui-org/react";
import { TypeAnimation } from "react-type-animation";
import { greeting, intro, nameInitials, subHeading } from "@data";

const HeroComponent = () => {
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
				<Button as={NextLink} color="primary" href="/KaranCV.pdf" radius="full" size="lg" variant="ghost">
					{`Download CV`}
				</Button>
			</div>
		</section>
	);
};

export default HeroComponent;
