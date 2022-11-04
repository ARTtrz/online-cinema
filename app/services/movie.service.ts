import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface';
import { getMoviesUrl } from '@/config/api.config'

import { IMovie } from '@/shared/types/movie.types'
import { axiosClassic } from 'api/interceptors'
import axios from '../api/interceptors';
export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl('') ,{
			params: searchTerm 
				? {
					searchTerm,
				}
				: {},
		})
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},

	async getBySlug(slug: string){
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},

	async getMostPopularMovies(){
		const {data: movies} = await axiosClassic.get<IMovie[]>(getMoviesUrl('/most-popular'))
		return movies;
	},

	// async getByGenres(genreIds: string[]){
	// 	return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), genreIds)	
	// },
	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
			genreIds,
		})
	},

	async getByActor(actorId: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`))
		
	},

	async deleteMovie(_id:string){
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	},

	async update(_id:string, data: IMovieEditInput){
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},

	async create (){
		return axios.post<string>(getMoviesUrl('/'))
	},

	async updateCountOpenedMovie(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl('/update-count-opened'), { slug })
	}




}