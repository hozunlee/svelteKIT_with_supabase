<script>
	import { supabase } from '$lib/supabaseClient';
	import { createEventDispatcher } from 'svelte';

	export let size = 10;
	export let url;

	let avatarUrl;
	let uploading;
	let files;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}
			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image', error.message);
			}
		}
	};
	const uploadAvatar = async () => {
		try {
			uploading = true;
			if (!files || files.length === 0) {
				throw new Error('You must select on image to upload');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			let { error } = await supabase.storage.from('avatars').upload(filePath, file);

			if (error) throw error;

			url = filePath;
			dispatch('upload');
		} catch (error) {
			if (error instanceof Error) alert(error.message);
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div>
	{#if avatarUrl}
		<img
			src={avatarUrl}
			alt={avatarUrl ? 'Avatar' : 'No image'}
			class="avatar image"
			style="height: {size}em; width: {size}em;"
		/>
	{:else}
		<div class="avatar no-image" style="height: {size}em; width: {size}em;" />
	{/if}
</div>

<div style="width: {size}em;">
	<label class="button primary block" for="single">
		{uploading ? 'Uploading ...' : 'Upload'}
	</label>
	<input
		type="file"
		style="visibility: hidden; position:absolute;"
		id="single"
		accept="image/*"
		bind:files
		on:change={uploadAvatar}
		disabled={uploading}
	/>
</div>
