<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import QrCode from 'lucide-svelte/icons/qr-code';
	import WhatsLogo from '$lib/img/whats.png';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<ModeWatcher defaultMode="dark" />
<Toaster richColors />

<main class="flex h-screen w-full gap-5 p-1">
	<Tabs.Root value="account" class="flex h-full w-[250px] gap-2 ">
		<Tabs.List class="flex h-full  flex-col items-center justify-start gap-5 pt-5">
			<Tabs.Trigger value="account" class="h-12 w-14 opacity-50 data-[state=active]:opacity-100"
				><img src={WhatsLogo} alt="Logo do whatsapp" /></Tabs.Trigger
			>
			<Tabs.Trigger value="password" class="w-14"><QrCode size={40} /></Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content
			value="account"
			class="mt-2 h-24 w-[70%] items-center justify-center rounded-lg bg-secondary "
			><Button
				variant="link"
				href="/criar-link"
				class="flex h-full w-full items-center justify-center">Criar link</Button
			></Tabs.Content
		>
		<Tabs.Content
			value="password"
			class="mt-2 h-24 w-[70%] items-center justify-center rounded-lg bg-secondary "
			><Button
				variant="link"
				class="flex h-full w-full items-center justify-center"
				href="/criar-qrcode">Criar QR-Code</Button
			></Tabs.Content
		>
	</Tabs.Root>
	<slot />
</main>
