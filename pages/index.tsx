import Home from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'
import { getActorUrl, getMovieUrl } from '@/config/url.config'
import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'
import { getGenresList } from '@/utils/movie/getGenresList'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const HomePage: NextPage<IHome> = ({slides, actors, trendingMovies}) => {
  return (
    <>
      <Home slides={slides} actors={actors} trendingMovies={trendingMovies}/>
    </>

  )
}

export const getStaticProps: GetStaticProps = async () => {
  try{
    const {data: movies} = await MovieService.getAll()

    const slides: ISlide[] = movies.slice(0,3).map((m) => ({
      _id: m._id,
      link: getMovieUrl(m.slug),
      bigPoster: m.bigPoster,
      subTitle: getGenresList(m.genres),
      title: m.title
    }))

    const {data: dataActors} = await ActorService.getAll()


    const actors: IGalleryItem[] = dataActors.slice(0,7).map(a=> ({
      name: a.name,
      posterPath: a.photo,
      link: getActorUrl(a.slug),
      content: {
        title: a.name,
        subTitle: `+${a.countMovies} movies`
      }
    }))

    const dataTrendingMovies = await MovieService.getMostPopularMovies()

    const trendingMovies: IGalleryItem[] = dataTrendingMovies.slice(0,7).map(t => ({
      name: t.title,
      posterPath: t.poster,
      link: getMovieUrl(t.slug)
    }))


  return {
      props: {
        slides,
        actors,
        trendingMovies
      } as IHome,

      revalidate: 60,
    }
  }
  catch( error){
    return {
      props: {
        slides: [],
        actors: [],
        trendingMovies: []
      }
    }
  }
}




export default HomePage
