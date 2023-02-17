<script>
	import { env } from '$env/dynamic/public';
	import { yourAccessToken } from '../../../store/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	onMount(() => {
		const initToken = localStorage.getItem('token');
		if (initToken) {
			yourAccessToken.set(initToken);
			alert('로그인 성공');
			goto('/once');
		} else {
			getKakaoTokenHandler(data.kakaoCode);
		}
	});

	const getKakaoTokenHandler = async (code) => {
		const data = {
			grant_type: 'authorization_code',
			client_id: env.PUBLIC_CLIENT_ID,
			redirect_uri: 'http://localhost:5173/auth/kakao',
			code: code
		};
		const queryString = Object.keys(data)
			.map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
			.join('&');

		const res = await fetch('https://kauth.kakao.com/oauth/token', {
			method: 'POST',
			body: queryString,
			headers: {
				'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
			}
		});
		const { access_token } = await res.json();
		console.log(access_token);
		yourAccessToken.set(access_token);
		localStorage.setItem('token', access_token);
		goto('/once');
	};
</script>

<h1>callback kakao</h1>
<h2>로그인중입니닷^^</h2>
