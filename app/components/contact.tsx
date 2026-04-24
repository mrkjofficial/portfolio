"use client";
import z from "zod";
import { about } from "@data";
import axios from "@config/axios";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ContactSchema } from "@schemas/contact";
import { motion, useInView } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import FlyingRocket from "@components/common/rocket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CheckCircle, LoaderCircle, Mail, Phone, XCircle } from "lucide-react";
import { Button, Card, Description, FieldError, FieldGroup, Fieldset, Form, Input, Label, Separator, TextArea, TextField, toast, Tooltip } from "@heroui/react";

const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.4;
const DURATION = 2.0;
const REPEAT_DELAY = 5.0;

const Contact = () => {
	const ref = useRef(null);
	const router = useRouter();
	const inView = useInView(ref, { once: true });
	const [onSendToast, setOnSendToast] = useState<string | null>(null);

	const defaultValues: z.infer<typeof ContactSchema> = {
		name: "",
		email: "",
		message: "",
	};

	const { clearErrors, control, formState, handleSubmit, reset } = useForm<z.infer<typeof ContactSchema>>({
		defaultValues,
		mode: "onTouched",
		resolver: zodResolver(ContactSchema),
	});

	const onClear = () => {
		clearErrors();
		reset(defaultValues);
	};

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
		await axios.post("/api/send", { name, email, message });
	};

	const { mutate, isPending } = useMutation({
		mutationFn: onSend,
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
		onError: (error: AxiosError<string>) => {
			if (onSendToast) {
				toast.close(onSendToast);
			}
			toast.danger("Error!", {
				description: error?.response?.data ?? "An error occurred!",
				indicator: <XCircle />,
			});
		},
	});

	return (
		<div ref={ref} className="flex w-full flex-col justify-center gap-3" id="contact">
			<h2 className="text-2xl font-bold">
				{"Let's Connect".split(" ").map((word, i) => (
					<motion.span key={i} className="mr-1 inline-block" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: WORD_DURATION, delay: i * WORD_STAGGER, ease: "easeOut" }}>
						{word}
					</motion.span>
				))}
			</h2>
			<Card className="flex w-full flex-col items-center justify-center overflow-hidden p-0" variant="transparent">
				<Card.Content className="flex w-full flex-col items-center justify-center gap-0 p-6">
					<Form className="flex w-full flex-col items-center justify-center" onSubmit={handleSubmit(values => mutate(values))}>
						<Fieldset className="flex w-full flex-col items-stretch justify-stretch gap-3 sm:flex-row md:flex-col lg:flex-row">
							<div className="w-full flex-1 sm:w-1/3 md:w-full lg:w-1/3">
								<div className="flex h-full items-center justify-between gap-2 sm:flex-col md:flex-row lg:flex-col">
									<div className="flex h-full w-full items-center justify-center gap-2 sm:flex-col md:flex-row lg:flex-col">
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
									<motion.div
										className="text-muted-foreground hidden text-sm sm:flex sm:items-center sm:justify-center sm:gap-1 md:flex-col lg:flex-row"
										initial={{ opacity: 0, x: -30 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
									>
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
							<div className="bg-border h-0.5 w-full shrink-0 sm:h-full sm:w-0.5 md:h-0.5 md:w-full lg:h-full lg:w-0.5" />
							<div className="flex w-full flex-col items-center justify-center gap-3 sm:w-2/3 md:w-full lg:w-2/3">
								<FieldGroup>
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
									<Fieldset.Actions className="w-full">
										<Button className="w-full" isDisabled={isPending} type="submit" variant="outline">
											{isPending ? "Sending..." : "Send"}
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
