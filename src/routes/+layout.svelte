<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import QrCode from 'lucide-svelte/icons/qr-code';
	import WhatsLogo from '$lib/img/whats.png';
	import { Toaster } from '$lib/components/ui/sonner';
	import { page } from '$app/stores';
</script>

<ModeWatcher defaultMode="dark" />
<Toaster richColors />

<main class="relative flex h-screen w-full gap-5 p-2">
	<nav
		class="flex h-full w-[5%] flex-col items-center justify-start gap-8 rounded-xl bg-secondary pt-10"
	>
		<Button
			href="/criar-link"
			variant="secondary"
			class="h-16 w-16 p-2 {$page.url.pathname === '/criar-link'
				? 'bg-background hover:bg-background'
				: ''}"><img src={WhatsLogo} alt="Logo do whatsapp" /></Button
		>
		<Button
			href="/criar-qrcode"
			variant="secondary"
			class="h-16 w-16 p-2 {$page.url.pathname === '/criar-qrcode'
				? 'bg-background hover:bg-background'
				: ''}"><QrCode size={40} /></Button
		>
	</nav>
	<slot />
</main>
