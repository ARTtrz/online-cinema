import Banner from '@/components/ui/banner/Banner'
import Gallery from '@/components/ui/gallery/Gallery'
import Subheading from '@/components/ui/heading/Subheading'
import VideoPlayer from '@/components/ui/video-player/VideoPlayer'
import Meta from '@/utils/meta/Meta'
import dynamic from 'next/dynamic'
import {FC} from 'react' 
import { IMoviePage } from '../../../../pages/movie/[slug]'
import Content from './Content/Content'
import RateMovie from './RateMovie/RateMovie'
import { useUpdateCountMovie } from './useUpdateCountMovie'


const DynamicPlayer = dynamic(() => import('@ui/video-player/VideoPlayer'), {ssr: false})

const DynamicRateMovie = dynamic(() => import('./RateMovie/RateMovie'), {ssr: false})

const SingleMovie: FC<IMoviePage> = ({movie,similarMovies}) => {
	useUpdateCountMovie(movie.slug)


   	return <Meta title={movie?.title} description={`Watch ${movie?.title }`}>
	   <Banner image={movie.bigPoster} Detail={() => <Content movie={movie}/>} />

	   <DynamicPlayer slug={movie.slug} videoSource={movie.videoUrl}/>
		<div className='mt-12'>
			<Subheading title="Similar" />
			<Gallery items={similarMovies}/>
		</div>
		<DynamicRateMovie slug={movie.slug} id={movie._id}/>
   </Meta>
}

export default SingleMovie