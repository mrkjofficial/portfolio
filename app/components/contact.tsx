"use client";
import z from "zod";
import { about } from "@data";
import { useState } from "react";
import axios from "@config/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ContactSchema } from "@schemas/contact";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CheckCircle, LoaderCircle, Mail, Phone, Send, XCircle } from "lucide-react";
import { Button, Card, Description, FieldError, FieldGroup, Fieldset, Form, Input, Label, TextArea, TextField, toast, Tooltip } from "@heroui/react";

const Contact = () => {
	const router = useRouter();
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
		<div className="flex w-full flex-col justify-center gap-3" id="contact">
			<h1 className="text-2xl font-bold">{"Let's Connect"}</h1>
			<Card className="flex w-full flex-col items-center justify-center overflow-hidden p-0" variant="tertiary">
				<Card.Content className="flex w-full flex-col items-center justify-center gap-0 p-6">
					<Form className="flex w-full flex-col items-center justify-center" onSubmit={handleSubmit(values => mutate(values))}>
						<Fieldset className="flex w-full flex-col items-stretch justify-stretch gap-3 sm:flex-row md:flex-col lg:flex-row">
							<div className="bg-default w-full flex-1 sm:w-1/3 md:w-full lg:w-1/3">
								<div className="flex h-full items-center justify-between gap-2 sm:flex-col md:flex-row lg:flex-col">
									<div className="flex h-full w-full items-center justify-center gap-2 sm:flex-col md:flex-row lg:flex-col">
										<div className="bg-background flex size-16 shrink-0 items-center justify-center rounded-full">
											<Mail className="stroke-muted-foreground" size={32} />
										</div>
										<div className="flex w-full flex-col sm:items-center sm:text-center md:items-start md:text-left lg:items-center lg:text-center">
											<Fieldset.Legend className="text-sm font-semibold">Contact Me</Fieldset.Legend>
											<Description className="text-muted-foreground w-full text-xs leading-snug whitespace-pre-line">{`I'd love to hear from you!\nFill the form & I'll get back to you soon.`}</Description>
										</div>
									</div>
									<div className="text-muted-foreground hidden text-sm sm:flex sm:items-center sm:justify-center md:flex-col lg:flex-row">
										<Tooltip>
											<Tooltip.Trigger>
												<Button isIconOnly onPress={() => router.push(`tel:${about.contact.phone}`)} variant="ghost">
													<Phone />
												</Button>
											</Tooltip.Trigger>
											<Tooltip.Content>
												<Tooltip.Arrow />
												{about.contact.phone}
											</Tooltip.Content>
										</Tooltip>
										<hr className="bg-foreground h-6 w-0.5 md:h-0.5 md:w-6 lg:h-6 lg:w-0.5" />
										<Tooltip>
											<Tooltip.Trigger>
												<Button isIconOnly onPress={() => router.push(`mailto:${about.contact.email}`)} variant="ghost">
													<Mail />
												</Button>
											</Tooltip.Trigger>
											<Tooltip.Content>
												<Tooltip.Arrow />
												{about.contact.email}
											</Tooltip.Content>
										</Tooltip>
									</div>
								</div>
							</div>
							<div className="bg-border h-0.5 w-full shrink-0 sm:h-full sm:w-0.5 md:h-0.5 md:w-full lg:h-full lg:w-0.5" />
							<div className="flex w-full flex-col items-center justify-center gap-3 sm:w-2/3 md:w-full lg:w-2/3">
								<FieldGroup>
									<Controller
										name="name"
										control={control}
										render={({ field: { onBlur, onChange, ref, value } }) => (
											<TextField fullWidth id="name" isInvalid={!!formState?.errors?.name} isRequired name="name" onBlur={onBlur} onChange={onChange} ref={ref} validationBehavior="aria" value={value}>
												<Label>Name</Label>
												<Input placeholder="Enter your name" />
												<FieldError>{formState?.errors?.name?.message}</FieldError>
											</TextField>
										)}
									/>
									<Controller
										name="email"
										control={control}
										render={({ field: { onBlur, onChange, ref, value } }) => (
											<TextField fullWidth id="email" isInvalid={!!formState?.errors?.email} isRequired name="email" onBlur={onBlur} onChange={onChange} ref={ref} validationBehavior="aria" value={value}>
												<Label>Email</Label>
												<Input placeholder="Enter your email" />
												<FieldError>{formState?.errors?.email?.message}</FieldError>
											</TextField>
										)}
									/>
									<Controller
										name="message"
										control={control}
										render={({ field: { onBlur, onChange, ref, value } }) => (
											<TextField fullWidth id="message" isInvalid={!!formState?.errors?.message} isRequired name="message" onBlur={onBlur} onChange={onChange} ref={ref} validationBehavior="aria" value={value}>
												<Label>Message</Label>
												<TextArea className="resize-none" placeholder="Enter your message here" rows={4} />
												<FieldError>{formState?.errors?.message?.message}</FieldError>
											</TextField>
										)}
									/>
								</FieldGroup>
								<Fieldset.Actions className="w-full">
									<Button className="w-full" isDisabled={isPending} type="submit">
										{isPending ? "Sending..." : "Send"}
										<Send size={16} />
									</Button>
								</Fieldset.Actions>
							</div>
						</Fieldset>
					</Form>
				</Card.Content>
			</Card>
		</div>
	);
};

export default Contact;
