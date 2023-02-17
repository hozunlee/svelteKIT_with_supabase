<script>
	// import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URI } from '$env/static/public';
	import { env } from '$env/dynamic/public';

	// const CLIENT_ID = 'f29d5b7e96f17018f0de7ea641b14746';
	// const REDIRECT_URI = 'http://localhost:5173/auth/kakao';

	export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${env.PUBLIC_CLIENT_ID}&redirect_uri=${env.PUBLIC_REDIRECT_URI}&response_type=code`;
</script>

<button><a href={KAKAO_AUTH_URL}>Kakao</a></button>
