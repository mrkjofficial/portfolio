import { z } from "zod";

// Allowed characters in a name: letters, digits, plain spaces and common punctuation.
// Line breaks are deliberately not allowed, because the name is used in the email subject.
const NAME_PATTERN = /^[a-zA-Z0-9 '@#%&?!,.:()-]+$/;

// Same as the name, but any whitespace (including line breaks) is allowed, so messages can have paragraphs.
const MESSAGE_PATTERN = /^[a-zA-Z0-9\s'@#%&?!,.:()-]+$/;

// Validation rules for the contact form, shared by the browser (React Hook Form) and the API route.
// Every field is trimmed first, so input that is only spaces fails the minimum length.
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
