import { writable } from 'svelte/store';

let stored;

//window는 csr에만 존재하기때문에 마운트 될 때까지 기대렸다가 localstorage에 접근한다.
if (typeof window !== 'undefined') {
	stored = localStorage.getItem('kakao_token');
}

export const yourAccessToken = writable(stored || '');
export const userName = writable('');
