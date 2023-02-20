<script>
	import { goto } from '$app/navigation';
	import { yourAccessToken } from '../../store/stores';

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
	<p>여긴 로그인 된 사람만 볼 수 있음</p>
	<button on:click={() => once('천재')}>한번만</button>
	<button on:click|once={() => once('천재')}>한번만</button>

	<button on:click={() => goto('/')}>going home</button>
{/if}

<dialog>하이</dialog>
