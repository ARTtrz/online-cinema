import { FC } from 'react'
import PopularMovies from './PopularMovies';
import FavoriteMovies from './FavoriteMovies/FavoriteMovies';
import dynamic from 'next/dynamic';

const DynamicFavoriteMovies = dynamic(
	() => import('./FavoriteMovies/FavoriteMovies'), {
		ssr: false
	}
)

const MoviesContainer:FC = () => {
  return (
	<div>
		<PopularMovies/>
		<DynamicFavoriteMovies />
	</div>
  )
}
export default MoviesContainer