import { z } from 'zod';

export const passwordSchema = z.object({
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
		.regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
		.regex(/\d/, { message: 'Password must contain at least one number' }),
	repeatPassword: z
		.string({ required_error: 'Repeat Password is required' })
		.min(6, { message: 'Repeat Password must be at least 6 characters' })
});

export const emailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.max(64, { message: 'Email must be less than 64 characters' })
		.email({ message: 'Email must be a valid email address' })
});

export const updatePasswordSchema = z
	.object({
		password: passwordSchema.shape.password,
		repeatPassword: passwordSchema.shape.repeatPassword
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: 'Passwords must match',
		path: ['repeatPassword']
	});

export const resetPasswordSchema = z
	.object({
		password: passwordSchema.shape.password,
		repeatPassword: passwordSchema.shape.repeatPassword,
		resetToken: z.string().optional()
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: 'Passwords must match',
		path: ['repeatPassword']
	});

export const registerSchema = z
	.object({
		firstName: z
			.string()
			.min(1, { message: 'First name must be more than 1 character' })
			.max(64, { message: 'First name must be less than 64 characters' })
			.optional(),
		lastName: z
			.string()
			.min(1, { message: 'Last name must be more than 1 character' })
			.max(64, { message: 'Last name must be less than 64 characters' })
			.optional(),
		email: emailSchema.shape.email,
		password: passwordSchema.shape.password,
		repeatPassword: passwordSchema.shape.repeatPassword
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: 'Passwords must match',
		path: ['repeatPassword']
	});

export const updateFormSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'First name must be more than 1 character' })
		.max(64, { message: 'First name must be less than 64 characters' })
		.optional(),
	lastName: z
		.string()
		.min(2, { message: 'Last name must be more than 1 character' })
		.max(64, { message: 'Last name must be less than 64 characters' })
		.optional(),
	email: emailSchema.shape.email,

	// Api takes care of phone validation, you can add you validation if you want
	phone: z.string().optional()
});

export const createAddressSchema = z.object({
	address: z
		.string({ required_error: 'Address is required' })
		.min(2, { message: 'Address must be more than 1 character' })
		.max(64, { message: 'Address must be less than 64 characters' }),
	city: z
		.string({ required_error: 'City is required' })
		.min(2, { message: 'City must be more than 1 character' })
		.max(64, { message: 'City must be less than 64 characters' }),
	country: z
		.string({ required_error: 'Country is required' })
		.min(2, { message: 'Country must be more than 1 character' })
		.max(64, { message: 'Country must be less than 64 characters' }),
	firstName: z
		.string({ required_error: 'First name is required' })
		.min(2, { message: 'First name must be more than 1 character' })
		.max(64, { message: 'First name must be less than 64 characters' }),
	lastName: z
		.string({ required_error: 'Last name is required' })
		.min(2, { message: 'Last name must be more than 1 character' })
		.max(64, { message: 'Last name must be less than 64 characters' }),
	province: z
		.string({ required_error: 'Province is required' })
		.min(2, { message: 'Province must be more than 1 character' })
		.max(64, { message: 'Province must be less than 64 characters' }),
	zip: z
		.string({ required_error: 'Zip is required' })
		.min(2, { message: 'Zip must be more than 1 character' })
		.max(64, { message: 'Zip must be less than 64 characters' }),

	// Api takes care of phone validation, you can add you validation if you want
	phone: z
		.string({ required_error: 'Phone is required' })
		.min(2, { message: 'Phone must be more than 1 character' })
});

export const updateAddressSchema = z.object({
	address: z
		.string()
		.min(2, { message: 'Address must be more than 1 character' })
		.max(64, { message: 'Address must be less than 64 characters' })
		.optional(),
	city: z
		.string()
		.min(2, { message: 'City must be more than 1 character' })
		.max(64, { message: 'City must be less than 64 characters' })
		.optional(),
	country: z
		.string()
		.min(2, { message: 'Country must be more than 1 character' })
		.max(64, { message: 'Country must be less than 64 characters' })
		.optional(),
	firstName: z
		.string()
		.min(2, { message: 'First name must be more than 1 character' })
		.max(64, { message: 'First name must be less than 64 characters' })
		.optional(),
	lastName: z
		.string()
		.min(2, { message: 'Last name must be more than 1 character' })
		.max(64, { message: 'Last name must be less than 64 characters' })
		.optional(),
	province: z
		.string()
		.min(2, { message: 'Province must be more than 1 character' })
		.max(64, { message: 'Province must be less than 64 characters' })
		.optional(),
	zip: z
		.string()
		.min(2, { message: 'Zip must be more than 1 character' })
		.max(64, { message: 'Zip must be less than 64 characters' })
		.optional(),

	// Api takes care of phone validation, you can add you validation if you want
	phone: z.string().optional()
});
