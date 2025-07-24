"use client";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { outro, socials } from "@data";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "@schemas/ContactSchema";
import { Button, Input, Textarea } from "@heroui/react";
import { Github, Linkedin, Loader2, Mail, MessageSquareText, Send, UserCircle } from "lucide-react";

const ContactComponent = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
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

	function onClear() {
		reset({
			name: "",
			email: "",
			message: "",
		});
		clearErrors();
	}

	async function onSubmit(contactData: z.infer<typeof ContactSchema>) {
		setIsLoading(true);
		const contactToast = toast.loading("Sending message...");
		try {
			const response = await fetch("/api/send", {
				method: "POST",
				body: JSON.stringify(contactData),
			});
			const res = await response.json();
			if (!response.ok) {
				throw new Error(res.message);
			}
			toast.success(res?.message, { id: contactToast });
		} catch (error: unknown) {
			toast.error((error as Error)?.message, { id: contactToast });
		} finally {
			onClear();
			setIsLoading(false);
		}
	}

	return (
		<section className="grid w-full max-w-screen-2xl grid-cols-1 place-items-stretch gap-10 py-10 md:grid-cols-2" id="contact">
			<div className="flex w-full max-w-xl flex-col gap-5 justify-self-center md:justify-self-start">
				<h1 className="text-xl font-bold">Let&apos;s Connect</h1>
				<p className="text-default-500">{outro}</p>
				<div className="flex flex-row gap-2">
					<Link aria-label="Github" href={socials?.github}>
						<Github size={32} />
					</Link>
					<Link aria-label="LinkedIn" href={socials?.linkedin}>
						<Linkedin size={32} />
					</Link>
				</div>
			</div>
			<form className="flex w-full max-w-xl flex-col items-center justify-center gap-5 justify-self-center md:justify-self-end" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="name"
					control={control}
					render={({ field: { onBlur, onChange, ref, value } }) => (
						<Input
							errorMessage={formState?.errors?.name?.message}
							isInvalid={!!formState?.errors?.name}
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
							isInvalid={!!formState?.errors?.email}
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
							isInvalid={!!formState?.errors?.message}
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
				<Button className="w-full" color="primary" endContent={!isLoading ? <Send /> : undefined} isLoading={isLoading} size="lg" spinner={<Loader2 className="animate-spin" size={16} />} type="submit" variant="solid">
					Send Message
				</Button>
			</form>
		</section>
	);
};

export default ContactComponent;
