<script>
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	// Variável para armazenar o texto inserido
	let message = '';

	// Função para transformar o texto em uppercase
	function toUpperCase() {
		if (message.trim() === '') {
			toast.error('Por favor, insira uma mensagem!');
			return;
		}
		message = message.toUpperCase();
		toast.success('Mensagem transformada para Uppercase!');
	}

	// Função para transformar o texto em lowercase
	function toLowerCase() {
		if (message.trim() === '') {
			toast.error('Por favor, insira uma mensagem!');
			return;
		}
		message = message.toLowerCase();
		toast.success('Mensagem transformada para Lowercase!');
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<Card.Root class="flex w-1/2 flex-col">
		<Card.Header>
			<Card.Title class="flex w-full justify-center">LetterFlip</Card.Title>
		</Card.Header>
		<Card.Content>
			<div>
				<Label for="message">Texto para conversão:</Label>
				<Textarea id="message" placeholder="Digite a mensagem" bind:value={message} />
			</div>
		</Card.Content>
		<Card.Footer class="flex w-full justify-between">
			<Button class="h-8" on:click={toUpperCase}>Uppercase</Button>
			<Button class="h-8" on:click={toLowerCase}>Lowercase</Button>
		</Card.Footer>
	</Card.Root>
</div>
