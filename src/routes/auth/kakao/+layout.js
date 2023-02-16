import { kakaoCode } from '../../../store/stores';

export const load = ({ url }) => {
	// $page와 같은 정보가 넘어옴
	// console.log('파람쓰', url);
	return { kakaoCode: url.searchParams.get('code') };
};
