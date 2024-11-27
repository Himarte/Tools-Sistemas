<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { createQrSvgString } from '@svelte-put/qr';
	import { writable } from 'svelte/store';

	import { toast } from 'svelte-sonner';

	interface QrConfig {
		data: string;
	}

	const config = writable<QrConfig>({ data: '' });
	const svgString = writable<string>('');
	const pngDataURL = writable<string>('');

	// Campos adicionais para Wi-Fi
	let ssid = '';
	let password = '';
	let security = 'WPA'; // Valor padrão
	let isWifi = false; // Define se o QR Code é para Wi-Fi ou link

	async function generateQRCode(): Promise<void> {
		let data = '';

		if (isWifi) {
			if (!ssid) {
				toast.error('Por favor, insira o nome da rede Wi-Fi!');
				return;
			}
			// Gera o formato de Wi-Fi caso o SSID seja preenchido
			data = `WIFI:T:${security};S:${ssid};P:${password};;`;
			toast.success('QR-Code de Wi-Fi gerado com sucesso!');
		} else {
			data = $config.data;
			if (!data) {
				toast.error('Por favor, insira um link!');
				return;
			}
		}

		const svgStringResult = await createQrSvgString({ data });
		svgString.set(svgStringResult);

		const pngDataURLResult = await svgToPng(svgStringResult);
		pngDataURL.set(pngDataURLResult);
	}

	async function svgToPng(svgString: string): Promise<string> {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('Failed to get 2D context');
		}
		const v = new DOMParser().parseFromString(svgString, 'image/svg+xml');
		const svg = v.documentElement;

		// Set canvas size based on SVG size
		const width = parseInt(svg.getAttribute('width') || '1000', 10);
		const height = parseInt(svg.getAttribute('height') || '1000', 10);
		canvas.width = width;
		canvas.height = height;

		const img = new Image();
		img.src = 'data:image/svg+xml;base64,' + btoa(svgString);

		return new Promise((resolve) => {
			img.onload = () => {
				ctx.drawImage(img, 0, 0);
				resolve(canvas.toDataURL('image/png'));
			};
		});
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-10">
	<Card.Root class="flex w-1/2 flex-col">
		<Card.Header>
			<Card.Title class="flex w-full justify-center">Gerador de QR Code</Card.Title>
		</Card.Header>
		<Card.Content class="flex h-full flex-col gap-4">
			<div>
				<Label for="usage">Escolha o tipo de QR Code:</Label>
				<div class="flex items-center gap-4">
					<label class="flex items-center gap-2">
						<input type="radio" name="usage" bind:group={isWifi} value={false} />
						Link
					</label>
					<label class="flex items-center gap-2">
						<input type="radio" name="usage" bind:group={isWifi} value={true} />
						Wi-Fi
					</label>
				</div>
			</div>

			{#if !isWifi}
				<div>
					<Label for="link">Cole o Link:</Label>
					<Input
						id="link"
						type="text"
						placeholder="Link que deseja para o QR-Code"
						bind:value={$config.data}
					/>
				</div>
			{/if}

			{#if isWifi}
				<div>
					<Label for="ssid">Nome da Rede (SSID):</Label>
					<Input id="ssid" type="text" placeholder="Nome da rede Wi-Fi" bind:value={ssid} />
				</div>

				<div>
					<Label for="password">Senha:</Label>
					<Input
						id="password"
						type="password"
						placeholder="Senha da rede Wi-Fi"
						bind:value={password}
					/>
				</div>

				<div>
					<Label for="security">Tipo de Segurança:</Label>
					<select id="security" bind:value={security} class="input">
						<option value="WPA">WPA/WPA2</option>
						<option value="WEP">WEP</option>
						<option value="">Nenhum</option>
					</select>
				</div>
			{/if}
		</Card.Content>
		<Card.Footer class="flex w-full justify-center">
			<Button class="h-8" on:click={generateQRCode}>Gerar QR Code</Button>
		</Card.Footer>
	</Card.Root>

	<div class="flex flex-col items-center gap-2">
		{@html $svgString}
		{#if $pngDataURL}
			<Button href={$pngDataURL} download="qr.png">Download QR em PNG</Button>
		{/if}
	</div>
</div>
