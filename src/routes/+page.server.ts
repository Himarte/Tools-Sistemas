import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	const isLogado = false;
	return {
		isLogado
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	logar: async ({ request }) => {
		const dados = await request.formData();

		const email = dados.get('usuario');
		const senha = dados.get('senha');

		console.log(email, senha);
	}
};
