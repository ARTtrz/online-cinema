import { IMovie } from '@/shared/types/movie.types'
import { FC } from 'react'
import styles from './MovieList.module.scss'
import Link from 'next/link'
import { getGenreUrl, getMovieUrl } from '@/config/url.config'
import Image from 'next/image'
import { getGenresListEach } from '@/utils/movie/getGenresList'
import MaterialIcon from '@/components/ui/MaterialIcon'

const MovieItem:FC<{movie: IMovie}> = ({movie}) => {
  return (
	<div className={styles.item}>
		<Link href={getMovieUrl(movie.slug)}>
			<a>
				<Image alt={movie.title} src={movie.poster} draggable={false} width={65} height={97} priority/>
			</a>
		</Link>
		<div className={styles.info}>
			<div className={styles.title}>
				{movie.title}
			</div>
			<div className={styles.genres}>
				{movie.genres.map((genre, idx)=> <Link key={genre._id} href={getGenreUrl(genre.slug)}>
					<a>
						{getGenresListEach(idx, movie.genres.length, genre.name)}
					</a>
				</Link>)}
			</div>
			<div className={styles.rating}>
				<MaterialIcon name='MdStarRate'/>
				<span>{movie.rating.toFixed(1)}</span>
			</div>
		</div>
	</div>
  )
}
export default MovieItem