import { z } from "zod";

export const ContactSchema = z.object({
	name: z
		.string()
		.min(5, { message: "Should contain min of 3 characters!" })
		.max(30, { message: "Should contain max of 30 characters!" })
		.refine(data => RegExp(/^[a-zA-Z0-9\s'@#%&?!,.:()-]+$/).test(data), "Invalid characters found!"),
	email: z.string().email("Invalid email address!"),
	message: z
		.string()
		.min(8, { message: "Should contain min of 8 characters!" })
		.max(30, { message: "Should contain max of 30 characters!" })
		.refine(data => RegExp(/^[a-zA-Z0-9\s'@#%&?!,.:()-]+$/).test(data), "Invalid characters found!"),
});
