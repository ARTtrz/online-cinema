import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IMovie } from '@/shared/types/movie.types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import {FC} from 'react' 
import Error404 from '../404'
import { MovieService } from '@/services/movie.service'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import SingleMovie from '@/components/screens/single-movie/SingleMovie'
import { getMovieUrl } from '@/config/url.config'


export interface IMoviePage {
	similarMovies: IGalleryItem[]
	movie: IMovie 
}

const MoviePage: NextPage<IMoviePage> = ({similarMovies, movie}) => {
   return movie ? <SingleMovie similarMovies={similarMovies || []} movie={movie} /> : <Error404/>
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug))
	
		const {data: dataSimilarMovies} = await MovieService.getByGenres(movie.genres.map(genre => genre._id))

		const similarMovies: IGalleryItem[] =  dataSimilarMovies.filter(m=> m._id !== movie._id).map(m => ({
			name: m.title,
			posterPath: m.poster,
			link: getMovieUrl(m.slug)
		}))
		return {
			props: { 
				movie, 
				similarMovies 
			},
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			props: {},
			notFound: true,
		}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: Movies } = await MovieService.getAll()
		const paths = Movies.map((a) => ({
			params: { slug: a.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			paths: [],
			fallback: false,
		}
	}
}
export default MoviePage



