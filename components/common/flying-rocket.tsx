"use client";
import { Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

type FlyingRocketProps = {
	show: boolean;
};

const FlyingRocket = ({ show }: FlyingRocketProps) => {
	const controls = useAnimation();
	const [showFlame, setShowFlame] = useState<boolean>(false);
	const wasPendingRef = useRef<boolean>(false);

	useEffect(() => {
		if (show) {
			wasPendingRef.current = true;
			const run = async () => {
				await controls.start({ x: [-1.5, 1.5, -1.5, 1.5, 0], transition: { duration: 0.35, ease: "easeInOut" } });
				await controls.start({ y: -28, x: 10, rotate: -45, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } });
				controls.set({ y: 28, x: -10, rotate: -45, opacity: 0 });
				await controls.start({ y: 0, x: 0, rotate: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } });
				setShowFlame(true);
				controls.start({ y: [0, -4, 0], rotate: [0, -8, 0], transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } });
			};
			run();
		} else if (wasPendingRef.current) {
			wasPendingRef.current = false;
			queueMicrotask(() => setShowFlame(false));
			controls.stop();
			controls.start({ y: 0, x: 0, rotate: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } });
		}
	}, [controls, show]);

	return (
		<motion.span animate={controls} style={{ display: "inline-flex", position: "relative" }}>
			<Rocket size={16} />
			<AnimatePresence>
				{showFlame && (
					<motion.span
						key="flame"
						style={{
							position: "absolute",
							bottom: -4,
							left: 2,
							width: 5,
							height: 10,
							background: "linear-gradient(to bottom, #fde68a, #fb923c, #ef4444)",
							borderRadius: "50% 50% 40% 40%",
							filter: "blur(1px)",
							transformOrigin: "top center",
						}}
						initial={{ scaleY: 0, opacity: 0 }}
						animate={{ scaleY: [0.7, 1.4, 0.8, 1.2, 0.9], scaleX: [1, 0.7, 1.1, 0.8, 1], opacity: [0.9, 1, 0.8, 1, 0.9] }}
						exit={{ scaleY: 0, opacity: 0 }}
						transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
					/>
				)}
			</AnimatePresence>
		</motion.span>
	);
};

export default FlyingRocket;
