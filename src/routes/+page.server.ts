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

		const user = {
			email: 'sistema',
			senha: 'mudar123'
		};

		const email = dados.get('usuario');
		const senha = dados.get('senha');

		if (email === user.email && senha === user.senha) {
			console.log('Logado com sucesso');

			return {
				isLogado: true
			};
		} else {
			console.log('Usuário ou senha inválidos');
		}
	}
};
