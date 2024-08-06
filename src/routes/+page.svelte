<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import type { PageData } from './$types';

	export let data: PageData & { isLogado: boolean };
	console.log(data);
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<h1>Bem vindos!</h1>
	<h1>Aqui possui algumas das</h1>
	<h1>Ferramentas para o setor!!</h1>
</div>
{#if !data.isLogado}
	<form
		action="logar"
		method="post"
		class="absolute z-10 flex h-[99%] w-[99%] flex-col items-center justify-center gap-2 bg-background/[97%]"
	>
		<div class="flex w-64 flex-col gap-2">
			<Label for="usuario">Usuario:</Label>
			<Input type="text" id="usuario" name="usuario" />
		</div>
		<div class="flex w-64 flex-col gap-2">
			<Label for="senha">Senha:</Label>
			<Input type="password" id="senha" name="senha" />
		</div>
		<div class="flex w-64 justify-end"><Button type="submit">Logar</Button></div>
	</form>
{/if}
