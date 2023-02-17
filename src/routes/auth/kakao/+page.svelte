<script>
	import { env } from '$env/dynamic/public';
	import { yourAccessToken } from '../../../store/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;
	$: console.log(data);

	console.log($yourAccessToken);
	if ($yourAccessToken) {
		yourAccessToken.set(data.kakaoToken);
		goto('/once');
	}
</script>

<h1>callback kakao</h1>
<h2>로그인중입니닷^^</h2>
