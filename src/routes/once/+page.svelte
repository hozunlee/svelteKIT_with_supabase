<script>
	import { goto } from '$app/navigation';
	import { yourAccessToken } from '../../store/stores';

	$: console.log($yourAccessToken);
	const runOnce = (fn) => {
		let isDone = false;

		return (...args) => {
			// console.log(args);
			// console.log('hello');
			// if (isDone) {
			// 	return console.log('이미 호출함');
			// } else {
			// 	fn(args);
			// 	isDone = true;
			// }

			isDone ? undefined : ((isDone = true), fn.apply(this, args));
		};
	};
	const fnfn = (input) => {
		console.log('나만 실행해', input);
	};
	const once = runOnce(fnfn);
</script>

{#if !$yourAccessToken}
	<h2>로그인필요</h2>
	<button on:click={() => goto('/')}>로그인</button>
{:else}
	<h1>once / memorize</h1>

	<button on:click={() => once('천재')}>한번만</button>
	<button on:click|once={() => once('천재')}>한번만</button>
{/if}
