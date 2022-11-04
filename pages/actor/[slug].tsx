import Catalog from '@/components/ui/catalog-movies/Catalog'
import { GenreService } from '@/services/genre.service'
import { ActorService } from '@/services/actor.service'
import { IActor, IGenre, IMovie } from '@/shared/types/movie.types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import {FC} from 'react' 
import Error404 from '../404'
import { MovieService } from '@/services/movie.service'


interface IActorPage {
	movies: IMovie[]
	actor: IActor | undefined
}

const ActorPage: NextPage<IActorPage> = ({movies, actor}) => {
   return actor ? <Catalog movies={ movies || []} title={actor.name} /> : <Error404/>
}


// export const getStaticProps: GetStaticProps = async ({params}) => {
// 	try {
// 		const {data: actor} = await ActorService.getBySlug(String(params?.slug))

// 		const {data: movies} = await MovieService.getByActor(actor._id)
// 		return {
// 			props: {
// 				movies,
// 				actor
// 			}
// 		}
// 	} catch (error) {
// 		return {
// 			notFound: true
// 		}
// 	}
// }
export const getStaticProps: GetStaticProps = async ({ params }) => {
	console.log(params)
	try {
		const { data: actor } = await ActorService.getBySlug(String(params?.slug))
		console.log(actor)
		const { data: movies } = await MovieService.getByActor(actor._id)
		console.log(movies)
		return {
			props: { 
				movies, 
				actor 
			},
			revalidate: 60
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
		const { data: actors } = await ActorService.getAll()
		const paths = actors.map((a) => ({
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
export default ActorPage



