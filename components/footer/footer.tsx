import Link from "next/link";
import styles from "./footer.module.css";
import { Divider } from "@nextui-org/react";

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
