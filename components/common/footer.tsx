// "use client" is needed for Framer Motion animations.
"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

// Site footer: "Made with ♥ in India by Karan Jaiswal".
// On medium screens and up it sticks to the bottom of the viewport.
const Footer = () => {
	return (
		<footer className="border-border xs:flex-row xs:gap-1 flex h-12 w-full flex-col items-center justify-center border-t py-2 text-sm backdrop-blur-sm md:sticky md:bottom-0">
			{/* Slides up into view the first time the footer becomes visible. */}
			<motion.div className="flex items-center gap-1" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }}>
				<span>Made with</span>
				{/* Heart that pulses forever, like a heartbeat. */}
				<motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}>
					<Heart className="fill-danger" strokeWidth={0} size={16} />
				</motion.div>
				<span>in India</span>
			</motion.div>
			{/* Same slide-up, slightly delayed so the two halves appear one after the other. */}
			<motion.div className="flex items-center gap-1" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}>
				<span>by</span>
				<Link className="font-medium" href="/">
					Karan Jaiswal
				</Link>
			</motion.div>
		</footer>
	);
};

export default Footer;
