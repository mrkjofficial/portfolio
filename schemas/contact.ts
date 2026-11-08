import { z } from "zod";

const NAME_PATTERN = /^[a-zA-Z0-9 '@#%&?!,.:()-]+$/;

const MESSAGE_PATTERN = /^[a-zA-Z0-9\s'@#%&?!,.:()-]+$/;

export const ContactSchema = z.object({
	name: z
		.string()
		.trim()
		.min(3, { message: "Should contain min of 3 characters!" })
		.max(30, { message: "Should contain max of 30 characters!" })
		.refine(data => NAME_PATTERN.test(data), "Invalid characters found!"),
	email: z.string().trim().email("Invalid email address!"),
	message: z
		.string()
		.trim()
		.min(8, { message: "Should contain min of 8 characters!" })
		.max(1000, { message: "Should contain max of 1000 characters!" })
		.refine(data => MESSAGE_PATTERN.test(data), "Invalid characters found!"),
});
