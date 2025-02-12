import Link from "next/link";
import { Divider } from "@heroui/react";
import styles from "./footer.module.css";

const Footer = () => {
	return (
		<footer className={styles["container"]}>
			<Divider orientation="horizontal" />
			<div className={styles["wrapper"]}>
				<p>{`Made with ❤️ in India by`}</p>
				<Link href="/">{`Karan Jaiswal`}</Link>
			</div>
		</footer>
	);
};

export default Footer;
