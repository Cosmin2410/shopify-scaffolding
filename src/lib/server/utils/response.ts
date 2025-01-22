// For data and error
export type Response<T, E = Error> = [T | null, E | null];

// For error only
export type ErrorResponse<E = Error> = E | null;

type ServiceError = {
	message: string;
	code?: string;
	name: 'ServiceError';
};

export const createServiceError = (message: string, code?: string): ServiceError => ({
	message,
	code,
	name: 'ServiceError'
});
