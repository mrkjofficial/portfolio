// "use client" is needed for the form state, Turnstile widget and Framer Motion animations.
"use client";
import z from "zod";
import { about } from "@data";
import axios from "@config/axios";
import { AxiosError } from "axios";
import splitWords from "@lib/splitWords";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ContactSchema } from "@schemas/contact";
import { motion, useInView } from "framer-motion";
import useThemeToggle from "@hooks/useThemeToggle";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import FlyingRocket from "@components/common/flying-rocket";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { CheckCircle, LoaderCircle, Mail, Phone, XCircle } from "lucide-react";
import { Button, Card, Description, FieldError, FieldGroup, Fieldset, Form, Input, Label, Separator, TextArea, TextField, toast, Tooltip } from "@heroui/react";

// Heading animation: each word slides in 0.08 s after the previous one and takes 0.4 s.
const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.4;
// Timing of the mail icon's spin-and-hop: 2 seconds of motion, then a 5-second pause.
const DURATION = 2.0;
const REPEAT_DELAY = 5.0;

// Public Turnstile site key. If it isn't set, the widget isn't shown and the form doesn't wait for verification.
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string;

// Contact section: phone and email shortcuts on one side, and a validated message form on the other.
// Submitting posts to /api/send, with a Cloudflare Turnstile token proving the sender is human.
const Contact = () => {
	const ref = useRef(null);
	const router = useRouter();
	const { theme } = useThemeToggle();
	// Becomes true the first time the section scrolls into view, which starts the heading animation.
	const inView = useInView(ref, { once: true });
	// Handle to the Turnstile widget, used to reset it after each submission.
	const turnstileRef = useRef<TurnstileInstance>(null);
	// Token from Turnstile once the visitor passes the check; empty until then.
	const [turnstileToken, setTurnstileToken] = useState("");
	// Match the widget to the site's theme. Anything other than "dark" (including undefined before the theme loads) uses light.
	const turnstileTheme = theme === "dark" ? "dark" : "light";
	// ID of the "Loading..." toast, so it can be closed when sending finishes.
	const [onSendToast, setOnSendToast] = useState<string | null>(null);
	// The Send button stays disabled until Turnstile issues a token (only when Turnstile is configured).
	const isAwaitingVerification = Boolean(turnstileSiteKey) && !turnstileToken;

	// Empty form, used on first load and after a successful send.
	const defaultValues: z.infer<typeof ContactSchema> = {
		name: "",
		email: "",
		message: "",
	};

	// React Hook Form, validated with the same Zod schema the API route uses.
	// "onTouched": a field is first validated when the visitor leaves it, then on every change after that.
	const { clearErrors, control, formState, handleSubmit, reset } = useForm<z.infer<typeof ContactSchema>>({
		defaultValues,
		mode: "onTouched",
		resolver: zodResolver(ContactSchema),
	});

	// Empties the form and clears any error messages.
	const onClear = () => {
		clearErrors();
		reset(defaultValues);
	};

	// Shows a loading toast, then posts the message and the Turnstile token to the API.
	// Axios throws on any non-2xx response, which sends the mutation to onError below.
	const onSend = async (data: z.infer<typeof ContactSchema>) => {
		setOnSendToast(
			toast("Loading...", {
				description: "Please wait while we send your message!",
				indicator: <LoaderCircle className="animate-spin" />,
				isLoading: true,
				timeout: 0,
			})
		);
		const { name, email, message } = data;
		await axios.post("/api/send", { name, email, message, token: turnstileToken });
	};

	// TanStack Query mutation wrapping onSend. isPending is true while the request is in flight.
	const { mutate, isPending } = useMutation({
		mutationFn: onSend,
		// Sent: clear the form and swap the loading toast for a success toast.
		onSuccess: () => {
			onClear();
			if (onSendToast) {
				toast.close(onSendToast);
			}
			toast.success("Success!", {
				description: "You've successfully sent your message!",
				indicator: <CheckCircle />,
			});
		},
		// Failed: keep what the visitor typed, and show the API's { message } (e.g. "Too many requests!") in an error toast.
		onError: (error: AxiosError<{ message: string }>) => {
			if (onSendToast) {
				toast.close(onSendToast);
			}
			toast.danger("Error!", {
				description: error?.response?.data?.message ?? "An error occurred!",
				indicator: <XCircle />,
			});
		},
		// Runs after success or failure.
		onSettled: () => {
			// A Turnstile token can only be verified once, so get a fresh one for the next submission.
			setTurnstileToken("");
			turnstileRef.current?.reset();
		},
	});

	return (
		// id="contact" is the target of the "Contact" link in the navigation.
		<div ref={ref} className="flex w-full flex-col justify-center gap-3" id="contact">
			<h2 className="text-2xl font-bold">
				{splitWords("Let's Connect").map(({ key, word }, i) => (
					<motion.span key={key} className="mr-1 inline-block" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: i * WORD_STAGGER, ease: "easeOut" }}>
						{word}
					</motion.span>
				))}
			</h2>
			<Card className="flex w-full flex-col items-center justify-center overflow-hidden p-0" variant="transparent">
				<Card.Content className="flex w-full flex-col items-center justify-center gap-0 py-5">
					{/* handleSubmit validates every field first and only calls mutate if they all pass. */}
					<Form className="flex w-full flex-col items-center justify-center" onSubmit={handleSubmit(values => mutate(values))}>
						{/* Two panels: side by side on small and large screens, stacked on medium (where the sidebar takes space) and phones. */}
						<Fieldset className="flex w-full flex-col items-stretch justify-stretch gap-3 sm:flex-row md:flex-col lg:flex-row">
							{/* Left panel: intro text plus phone and email shortcuts. */}
							<div className="w-full flex-1 sm:w-1/3 md:w-full lg:w-1/3">
								<div className="flex h-full items-center justify-between gap-2 sm:flex-col md:flex-row lg:flex-col">
									<div className="flex h-full w-full items-center justify-center gap-2 sm:flex-col md:flex-row lg:flex-col">
										{/* Round badge with a mail icon that periodically spins and hops. */}
										<motion.div
											className="bg-default flex size-16 shrink-0 items-center justify-center rounded-full"
											initial={{ opacity: 0, x: -30 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, ease: "easeOut" }}
										>
											<motion.div animate={{ rotate: [0, 360], y: [0, -10, 0] }} transition={{ duration: DURATION, repeat: Infinity, repeatType: "reverse", repeatDelay: REPEAT_DELAY, ease: "easeInOut" }}>
												<Mail className="stroke-muted-foreground" size={32} />
											</motion.div>
										</motion.div>
										{/* Form title and short invitation. */}
										<motion.div
											className="flex w-full flex-col sm:items-center sm:text-center md:items-start md:text-left lg:items-center lg:text-center"
											initial={{ opacity: 0, x: -30 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
										>
											<Fieldset.Legend className="text-sm font-semibold">Contact Me</Fieldset.Legend>
											<Description className="text-muted-foreground w-full text-xs leading-snug whitespace-pre-line">{`I'd love to hear from you!\nFill the form & I'll get back to you soon.`}</Description>
										</motion.div>
									</div>
									{/* Call and email buttons (hidden on the smallest screens). Each shows its number or address in a tooltip. */}
									<motion.div
										className="text-muted-foreground hidden text-sm sm:flex sm:items-center sm:justify-center sm:gap-1 md:flex-col lg:flex-row"
										initial={{ opacity: 0, x: -30 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
									>
										{/* tel: opens the phone dialler; the icon wiggles on hover. */}
										<Tooltip>
											<Tooltip.Trigger>
												<Button aria-label={`Call ${about.contact.phone}`} isIconOnly onPress={() => router.push(`tel:${about.contact.phone}`)} variant="ghost">
													<motion.div whileHover={{ x: [0, -4, 4, -4, 4, 0] }} transition={{ duration: 0.4, ease: "easeInOut" }}>
														<Phone />
													</motion.div>
												</Button>
											</Tooltip.Trigger>
											<Tooltip.Content>
												<Tooltip.Arrow />
												{about.contact.phone}
											</Tooltip.Content>
										</Tooltip>
										<Separator className="h-6 w-0.5 md:h-0.5 md:w-6 lg:h-6 lg:w-0.5" />
										{/* mailto: opens the visitor's email app. */}
										<Tooltip>
											<Tooltip.Trigger>
												<Button aria-label={`Email ${about.contact.email}`} isIconOnly onPress={() => router.push(`mailto:${about.contact.email}`)} variant="ghost">
													<motion.div whileHover={{ x: [0, -4, 4, -4, 4, 0] }} transition={{ duration: 0.4, ease: "easeInOut" }}>
														<Mail />
													</motion.div>
												</Button>
											</Tooltip.Trigger>
											<Tooltip.Content>
												<Tooltip.Arrow />
												{about.contact.email}
											</Tooltip.Content>
										</Tooltip>
									</motion.div>
								</div>
							</div>
							{/* Divider between the panels: a horizontal line when stacked, a vertical one when side by side. */}
							<div className="bg-border h-0.5 w-full shrink-0 sm:h-full sm:w-0.5 md:h-0.5 md:w-full lg:h-full lg:w-0.5" />
							{/* Right panel: the form fields, Turnstile check and Send button. */}
							<div className="flex w-full flex-col items-center justify-center gap-3 px-1 sm:w-2/3 md:w-full lg:w-2/3">
								<FieldGroup>
									{/* Each field slides in from the right, 0.1 s after the previous one. */}
									{/* Controller connects React Hook Form to HeroUI's TextField, passing its value, handlers and errors. */}
									{/* validationBehavior="aria" shows errors without the browser's own validation popups. */}
									<motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }}>
										<Controller
											name="name"
											control={control}
											render={({ field: { onBlur, onChange, ref, value } }) => (
												<TextField
													autoComplete="on"
													fullWidth
													id="name"
													isInvalid={!!formState?.errors?.name}
													isRequired
													name="name"
													onBlur={onBlur}
													onChange={onChange}
													ref={ref}
													validationBehavior="aria"
													value={value}
													variant="secondary"
												>
													<Label>Name</Label>
													<Input placeholder="Enter your name" />
													<FieldError>{formState?.errors?.name?.message}</FieldError>
												</TextField>
											)}
										/>
									</motion.div>
									<motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}>
										<Controller
											name="email"
											control={control}
											render={({ field: { onBlur, onChange, ref, value } }) => (
												<TextField
													autoComplete="on"
													fullWidth
													id="email"
													isInvalid={!!formState?.errors?.email}
													isRequired
													name="email"
													onBlur={onBlur}
													onChange={onChange}
													ref={ref}
													validationBehavior="aria"
													value={value}
													variant="secondary"
												>
													<Label>Email</Label>
													<Input placeholder="Enter your email" />
													<FieldError>{formState?.errors?.email?.message}</FieldError>
												</TextField>
											)}
										/>
									</motion.div>
									<motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}>
										<Controller
											name="message"
											control={control}
											render={({ field: { onBlur, onChange, ref, value } }) => (
												<TextField
													autoComplete="on"
													fullWidth
													id="message"
													isInvalid={!!formState?.errors?.message}
													isRequired
													name="message"
													onBlur={onBlur}
													onChange={onChange}
													ref={ref}
													validationBehavior="aria"
													value={value}
													variant="secondary"
												>
													<Label>Message</Label>
													<TextArea className="resize-none" placeholder="Enter your message here" rows={4} />
													<FieldError>{formState?.errors?.message?.message}</FieldError>
												</TextField>
											)}
										/>
									</motion.div>
								</FieldGroup>
								<motion.div className="w-full" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}>
									{/* Cloudflare Turnstile check, shown only when a site key is configured. */}
									{/* It's re-created when the theme changes (key), since its theme can't change after it loads. */}
									{/* The widget is 1px larger than this wrapper on every side, so the wrapper clips off its border. */}
									{turnstileSiteKey && (
										<div className="mb-3 w-full overflow-hidden rounded-2xl">
											<Turnstile
												key={turnstileTheme}
												onError={() => setTurnstileToken("")}
												onExpire={() => setTurnstileToken("")}
												onSuccess={setTurnstileToken}
												options={{ size: "flexible", theme: turnstileTheme }}
												ref={turnstileRef}
												siteKey={turnstileSiteKey}
												style={{ margin: -1, width: "calc(100% + 2px)" }}
											/>
										</div>
									)}
									{/* Send button: "Verifying..." until Turnstile passes, "Sending..." while the request runs. */}
									<Fieldset.Actions className="w-full">
										<Button className="w-full" isDisabled={isPending || isAwaitingVerification} type="submit" variant="outline">
											{isPending ? "Sending..." : isAwaitingVerification ? "Verifying..." : "Send"}
											<FlyingRocket show={isPending} />
										</Button>
									</Fieldset.Actions>
								</motion.div>
							</div>
						</Fieldset>
					</Form>
				</Card.Content>
			</Card>
		</div>
	);
};

export default Contact;
