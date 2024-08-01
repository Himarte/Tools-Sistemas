<script>
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	let nomeroCelular = '';
	let message = '';
	let whatsappLink = '';

	function gerarLink() {
		const encodedMessage = encodeURIComponent(message);
		const sanitizedNumber = nomeroCelular.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
		if (sanitizedNumber.length < 13) {
			toast.error('Número de telefone inválido');
			return;
		}
		whatsappLink = `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;

		toast.success('Link gerado com sucesso!');
	}
	// @ts-ignore
	function aplicarMascaraTelefone(event) {
		let valor = event.target.value.replace(/\D/g, '');
		valor = valor.replace(/^(\d{2})(\d)/, '+$1 ($2');
		valor = valor.replace(/(\d{2})(\d)/, '$1) $2');
		valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
		if (valor.length > 19) {
			valor = valor.slice(0, 19);
		}
		event.target.value = valor;
		nomeroCelular = valor;
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<Card.Root class="flex h-3/5 w-1/2 flex-col">
		<Card.Header>
			<Card.Title>Gerador de Link para WhatsApp</Card.Title>
		</Card.Header>
		<Card.Content class="h-full">
			<div>
				<div>
					<Label for="phone">Número de Telefone:</Label>
					<Input
						id="phone"
						type="text"
						value={nomeroCelular}
						placeholder="Inclua o código do país e DDD"
						on:input={aplicarMascaraTelefone}
					/>
				</div>
				<div>
					<Label for="message">Mensagem:</Label>
					<Textarea id="message" bind:value={message} placeholder="Digite a mensagem" />
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex w-full justify-between">
			<Button class="h-8" on:click={gerarLink}>Gerar Link</Button>
			{#if whatsappLink}
				<Button class="h-8" on:click={() => navigator.clipboard.writeText(whatsappLink)}
					>Copiar Link</Button
				>
			{/if}
		</Card.Footer>
	</Card.Root>
</div>
