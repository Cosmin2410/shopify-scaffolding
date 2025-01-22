import { createHeaders, createAdminHeaders } from '@/server/utils/headers';
import { request, type RequestDocument } from 'graphql-request';

export async function get<TResponse, TVariables extends object | undefined>(
	query: RequestDocument,
	variables?: TVariables
): Promise<TResponse | undefined> {
	try {
		const { header, endpoint } = createHeaders();
		return await request<TResponse>(endpoint, query, variables, header);
	} catch (err) {
		console.error('Error Getter Func:', err);
		throw err;
	}
}

export async function getAdmin<TResponse, TVariables extends object | undefined>(
	query: RequestDocument,
	variables?: TVariables
): Promise<TResponse | undefined> {
	try {
		const { header, endpoint } = createAdminHeaders();
		return await request<TResponse>(endpoint, query, variables, header);
	} catch (err) {
		console.error('Error Getter Admin Func:', err);
		throw err;
	}
}
