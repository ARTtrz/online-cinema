import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { MovieService } from '@/services/movie.service'
import { FC } from 'react'
import { useQuery } from 'react-query'
import MovieList from './MovieList'

const PopularMovies:FC = () => {
	const {isLoading, data: popularMovies} = useQuery('Popular movies in sidebar', () => MovieService.getMostPopularMovies(), {
		select: (data) => data.slice(0,3)
	})
	return (
		isLoading? <div className='mt-11'>
			<SkeletonLoader count={3} className='h-28 mb-4'/>
		</div> : <MovieList link='/trending' title='Popular Movies' movies={popularMovies || []}/>
	)
} 

export default PopularMovies