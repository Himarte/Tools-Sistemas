<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData & { isLogado: boolean };
	// export let form: ActionData;
	console.log(data);
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<h1>Bem vindos!</h1>
	<h1>Aqui possui algumas das</h1>
	<h1>Ferramentas para o setor!!</h1>
</div>
