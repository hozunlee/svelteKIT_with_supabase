<script>
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import './styles.css';

	import { getSupabase } from '@supabase/auth-helpers-sveltekit';

	// export const load = async (event) => {
	// 	console.log('hi');
	// 	const { session } = await getSupabase(event);
	// 	console.log('hi2');
	// 	return { session };
	// };

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});
		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="container" style="padding: 50px 0 100px 0">
	<slot />
</div>
