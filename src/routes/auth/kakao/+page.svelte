<script>
	import { env } from '$env/dynamic/public';
	import { yourAccessToken } from '../../../store/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	onMount(() => {
		const initToken = localStorage.getItem('kakao_token');
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
			redirect_uri: env.PUBLIC_REDIRECT_URI,
			code: code
		};

		const queryString = Object.keys(data)
			.map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
			.join('&');

		try {
			const res = await fetch('https://kauth.kakao.com/oauth/token', {
				method: 'POST',
				body: queryString,
				headers: {
					'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
			});
			const result = await res.json();
			console.log('받아온', result);
			yourAccessToken.set(result.access_token);
			localStorage.setItem('kakao_token', result.access_token);
			alert('로그인 성공 🐯');
			goto('/once');
		} catch (error) {
			alert('로그인에 문제가 있어요');
			console.error(error);
		}
	};
</script>

<h1>callback kakao</h1>
<h2>로그인중입니닷^^</h2>
