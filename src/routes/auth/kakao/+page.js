import { env } from '$env/dynamic/public';
import { yourAccessToken } from '../../../store/stores';

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
		return await res.json();
	} catch (error) {
		alert('로그인 인증 오류');
		console.error(error);
	}
};

// export const load = ({ url }) => {
// 	// $page와 같은 정보가 넘어옴
// 	// console.log('파람쓰', url);
// 	return { kakaoCode: url.searchParams.get('code') };
// };

export const load = async ({ url }) => {
	const kakaoToken = await getKakaoTokenHandler(url.searchParams.get('code'));
	return { kakaoToken };
};
