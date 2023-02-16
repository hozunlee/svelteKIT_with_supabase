<script>
	import axios from 'axios';
	import { env } from '$env/dynamic/public';
	import { kakaoCode } from '../../../store/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		getKakaoTokenHandler($kakaoCode);
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

		//토큰 발급 REST API
		axios
			.post('https://kauth.kakao.com/oauth/token', queryString, {
				headers: {
					'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
			})
			.then((res) => {
				//서버에 토큰 전송
				// sendKakaoTokenToServer(res.data.access_token)
				console.log(res);
			});
	};
</script>

<h1>callback kakao</h1>
<h2>{$kakaoCode}</h2>
