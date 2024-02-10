"use client";
import { z } from "zod";
import Link from "next/link";
import { useCallback } from "react";
import { outro, socials } from "@data";
import styles from "./contact.module.css";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "@schemas/ContactSchema";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Github, Linkedin, Mail, MessageSquareText, Send, UserCircle } from "lucide-react";

const ContactComponent = () => {
	const defaultValues: z.infer<typeof ContactSchema> = {
		name: "",
		email: "",
		message: "",
	};

	const { clearErrors, control, formState, handleSubmit, reset } = useForm<z.infer<typeof ContactSchema>>({
		defaultValues: defaultValues,
		mode: "onTouched",
		resolver: zodResolver(ContactSchema),
	});

	const onClear = useCallback(
		function onClear() {
			reset({
				name: "",
				email: "",
				message: "",
			});
			clearErrors();
		},
		[clearErrors, reset]
	);

	const onSubmit = useCallback(
		async function onSubmit(contactData: z.infer<typeof ContactSchema>) {
			// setIsLoading(true);
			// const sendMessage = toast.loading("Sending Message...");
			try {
				const response = await fetch("/api/contact", {
					method: "POST",
					body: JSON.stringify(contactData),
				});
				const res = await response.json();
				if (!response.ok) {
					throw new Error(res.message);
				}
				// toast.success(res.message, { id: sendMessage });
			} catch (error: unknown) {
				// toast.error((error as Error)?.message, { id: sendMessage });
			} finally {
				// setIsLoading(false);
				onClear();
			}
		},
		[onClear]
	);

	return (
		<section className={styles["container"]} id="contact">
			<div className={styles["social-wrapper"]}>
				<h1>{`Let's Connect`}</h1>
				<p>{outro}</p>
				<div className={styles["social-links"]}>
					<Link aria-label="Github" href={socials?.github}>
						<Github size={32} />
					</Link>
					<Link aria-label="LinkedIn" href={socials?.linkedin}>
						<Linkedin size={32} />
					</Link>
				</div>
			</div>
			<form className={styles["form-wrapper"]} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="name"
					control={control}
					render={({ field: { onBlur, onChange, ref, value } }) => (
						<Input
							errorMessage={formState?.errors?.name?.message}
							isRequired
							label="Name"
							onBlur={onBlur}
							onChange={onChange}
							placeholder="Enter your name"
							radius="lg"
							ref={ref}
							size="lg"
							startContent={<UserCircle />}
							type="text"
							value={value}
							variant="flat"
						/>
					)}
				/>
				<Controller
					name="email"
					control={control}
					render={({ field: { onBlur, onChange, ref, value } }) => (
						<Input
							errorMessage={formState?.errors?.email?.message}
							isRequired
							label="Email"
							onBlur={onBlur}
							onChange={onChange}
							placeholder="Enter your email"
							radius="lg"
							ref={ref}
							size="lg"
							startContent={<Mail />}
							type="email"
							value={value}
							variant="flat"
						/>
					)}
				/>
				<Controller
					name="message"
					control={control}
					render={({ field: { onBlur, onChange, ref, value } }) => (
						<Textarea
							errorMessage={formState?.errors?.message?.message}
							isRequired
							label="Message"
							maxRows={3}
							onBlur={onBlur}
							onChange={onChange}
							placeholder="Enter your message"
							radius="lg"
							ref={ref}
							size="lg"
							startContent={<MessageSquareText />}
							type="text"
							value={value}
							variant="flat"
						/>
					)}
				/>
				<Button color="primary" endContent={<Send />} size="lg" type="submit" variant="solid">
					{`Send Message`}
				</Button>
			</form>
		</section>
	);
};

export default ContactComponent;
