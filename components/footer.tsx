import Link from "next/link";
import { Divider } from "@heroui/react";

const Footer = () => {
	return (
		<footer className="flex h-24 w-full max-w-screen-2xl flex-col items-center justify-center gap-5 py-10">
			<Divider orientation="horizontal" />
			<div className="flex w-full flex-col items-center justify-center gap-1 xs:flex-row">
				<p>Made with ❤️ in India by</p>
				<Link className="font-medium" href="/">
					Karan Jaiswal
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
