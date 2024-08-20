<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import type { PageData, ActionData } from './$types';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	export let data: PageData & { isLogado: boolean };
	// export let form: ActionData;
	console.log(data);
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<h1>Bem vindos!</h1>
	<h1>Aqui possui algumas das</h1>
	<h1>Ferramentas para o setor!!</h1>
</div>
<!-- {#if !data.isLogado}
	<form
		action="?/logar"
		method="post"
		class="absolute z-10 flex h-[99%] w-[99%] flex-col items-center justify-center gap-2 bg-background/[97%]"
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			// `formElement` is this `<form>` element
			// `formData` is its `FormData` object that's about to be submitted
			// `action` is the URL to which the form is posted
			// calling `cancel()` will prevent the submission
			// `submitter` is the `HTMLElement` that caused the form to be submitted

			return async ({ result, update }) => {
				// `result` is an `ActionResult` object

				console.log('AAAAAAAAAAAAAAAA', result); // logs the result of the form submission
				console.log(form); // logs the result of the form submission

				// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
			};
		}}
	>
		<div class="flex w-64 flex-col gap-2">
			<Label for="usuario">Usuario:</Label>
			<Input type="text" id="usuario" name="usuario" />
		</div>
		<div class="flex w-64 flex-col gap-2">
			<Label for="senha">Senha:</Label>
			<Input type="password" id="senha" name="senha" />
		</div>
		<div class="flex w-64 justify-end">
			<Button type="submit" formaction="?/logar">Logar</Button>
		</div>
	</form>
{/if} -->
