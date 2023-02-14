<script>
	import { supabase } from '$lib/supabaseClient';

	let loading = false;
	let email;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('Check your email for the Login link');
		} catch (error) {
			if (error instanceof Error) alert(error.message);
		} finally {
			loading = false;
		}
	};
</script>

<form class="row flex-center flex" on:submit|preventDefault={handleLogin}>
	<div class="col-6 form-widget">
		<h1 class="header">수파베이스 + 스벨트킷</h1>
		<p class="description">Sign in vlia magin link with your email below</p>
		<div>
			<input class="inputField" type="email" placeholder="이메일 입력" bind:value={email} />
		</div>
		<div>
			<input
				type="submit"
				class="button block"
				value={loading ? 'Loading' : 'Send magic link'}
				disabled={loading}
			/>
		</div>
	</div>
</form>
