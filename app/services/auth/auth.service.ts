// import { API_URL, getAuthUrl } from '@/config/api.config'
// import { IAuthResponse } from '@/store/user/user.interface'
// import { axiosClassic } from 'api/interceptors'
// import { removeTokenStorage, saveToStorage } from './auth.helper'
// import Cookies from 'js-cookie'
// import { getContentType } from 'api/api.helpers'
// import axios from 'axios'


// export const AuthService = {
// 	async register(email: string, password: string){
// 		const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/register'), {email, password})
		
// 		if(response.data.accessToken){
// 			saveToStorage(response.data);
// 		}

// 		return response
// 	},

// 	async login(email: string, password: string){
// 		const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/login'), {email, password})
		
// 		if(response.data.accessToken){
// 			saveToStorage(response.data);
// 		}

// 		return response
// 	},
// 	logout(){
// 		removeTokenStorage()
// 		localStorage.removeItem('user')
// 	},

// 	// async getNewTokens() {
// 	// 	const refreshToken = Cookies.get('refreshToken');
// 	// 	const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/login/access-token')
// 	// 	, {refreshToken}, {headers: getContentType()})

// 	// 	if(response.data.accessToken) {
// 	// 		saveToStorage(response.data);
// 	// 	}
// 	// 	return response
// 	// }
// 	async getNewTokens() {
// 	const refreshToken = Cookies.get('refreshToken')
// 	const response = await axios.post<IAuthResponse>(
// 		`${API_URL}${getAuthUrl('/login/access-token')}`,
// 		{
// 			refreshToken,
// 		},
// 		{
// 			headers: getContentType(),
// 		}
// 	)

// 	if (response.data.accessToken) {
// 		saveToStorage(response.data)
// 	}

// 	return response
// 	},
// }
import { getContentType } from 'api/api.helpers'
import axios from 'axios'
import Cookies from 'js-cookie'

import { API_URL, getAuthUrl } from '@/config/api.config'

import { IAuthResponse } from '@/store/user/user.interface'

import { removeTokenStorage, saveToStorage } from './auth.helper'

export const AuthService = {
	async register(email: string, password: string) {
		const response = await axios.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('/register')}`,
			{
				email,
				password,
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	},
	async login(email: string, password: string) {
		const response = await axios.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('/login')}`,
			{
				email,
				password,
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
			console.log(response.data)
		}

		return response
	},
	logout() {
		removeTokenStorage()
		localStorage.removeItem('user')
	},
	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')

		const response = await axios.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('/login/access-token/')}`,
			{
				refreshToken
			},
			{
				headers: getContentType(),
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
			
		}

		return response
	},
}
