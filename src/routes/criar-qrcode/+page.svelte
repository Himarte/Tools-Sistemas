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

	async function generateQRCode(): Promise<void> {
		const configValue = $config;
		if (configValue.data) {
			const svgStringResult = await createQrSvgString(configValue);
			svgString.set(svgStringResult);

			const pngDataURLResult = await svgToPng(svgStringResult);
			toast.success('QR-Code gerado com sucesso!');

			pngDataURL.set(pngDataURLResult);
		}
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
			<Card.Title>Gerador de QR Code</Card.Title>
		</Card.Header>
		<Card.Content class="flex h-full flex-col gap-2">
			<Label for="link">Cole o Link:</Label>
			<Input
				id="link"
				type="text"
				placeholder="Link que deseja para o QR-Code"
				bind:value={$config.data}
			/>
		</Card.Content>
		<Card.Footer class="flex w-full justify-center">
			<Button class="h-8" on:click={generateQRCode}>Gerar QR Code</Button>
		</Card.Footer>
	</Card.Root>

	<div class="flex flex-col items-center gap-2">
		{@html $svgString}
		{#if $pngDataURL}
			<Button href={$pngDataURL} download="qr.png">Download QR as PNG</Button>
		{/if}
	</div>
</div>
