// "use client" is needed for Framer Motion animations and React state.
"use client";
import { Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

type FlyingRocketProps = {
	// True while the contact form is sending.
	show: boolean;
};

// Rocket icon on the contact form's Send button.
// While sending, it shakes, flies off, comes back and hovers with a flickering flame.
// When sending finishes, it settles back into place.
const FlyingRocket = ({ show }: FlyingRocketProps) => {
	// Lets the effect below play animation steps one after another.
	const controls = useAnimation();
	const [showFlame, setShowFlame] = useState<boolean>(false);
	// Remembers whether a send was in progress, so the "settle" animation only runs after one (not on first render).
	const wasPendingRef = useRef<boolean>(false);

	useEffect(() => {
		if (show) {
			wasPendingRef.current = true;
			const run = async () => {
				// 1. Shake side to side, like an engine starting.
				await controls.start({ x: [-1.5, 1.5, -1.5, 1.5, 0], transition: { duration: 0.35, ease: "easeInOut" } });
				// 2. Fly up and to the right while fading out.
				await controls.start({ y: -28, x: 10, rotate: -45, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } });
				// 3. Jump, invisibly, to below and to the left.
				controls.set({ y: 28, x: -10, rotate: -45, opacity: 0 });
				// 4. Fly back into place, as if it looped around.
				await controls.start({ y: 0, x: 0, rotate: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } });
				// 5. Light the flame and hover gently until sending finishes.
				setShowFlame(true);
				controls.start({ y: [0, -4, 0], rotate: [0, -8, 0], transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } });
			};
			run();
		} else if (wasPendingRef.current) {
			// Sending finished: put out the flame and settle back to rest.
			wasPendingRef.current = false;
			// Deferred so the state update doesn't happen synchronously inside the effect.
			queueMicrotask(() => setShowFlame(false));
			controls.stop();
			controls.start({ y: 0, x: 0, rotate: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } });
		}
	}, [controls, show]);

	return (
		<motion.span animate={controls} style={{ display: "inline-flex", position: "relative" }}>
			<Rocket size={16} />
			{/* AnimatePresence lets the flame play its exit animation before it's removed. */}
			<AnimatePresence>
				{showFlame && (
					// Small blurred yellow-to-red teardrop under the rocket that flickers by randomly stretching.
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
