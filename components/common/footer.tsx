import Link from "next/link";
import { Heart } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-background border-border xs:flex-row xs:gap-1 flex h-12 w-full flex-col items-center justify-center border-t py-2 text-sm md:sticky md:bottom-0">
			<div className="flex items-center gap-1">
				<span>Made with</span>
				<Heart className="fill-danger" strokeWidth={0} size={16} />
				<span>in India</span>
			</div>
			<div className="flex items-center gap-1">
				<span>by</span>
				<Link className="font-medium" href="/">
					Karan Jaiswal
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
