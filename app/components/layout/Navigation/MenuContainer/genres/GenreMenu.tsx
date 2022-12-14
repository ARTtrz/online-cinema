import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { FC } from 'react'
import Menu from '../Menu'
import { usePopularGenres } from './usePopularGenres'
import styles from './GenreMenu.module.scss';


const GenreMenu:FC = () => {

  const {isLoading, data} = usePopularGenres()

  return isLoading ? <div className="mx-11 mb-6 "><SkeletonLoader count={5} className={styles.loading}/></div> :
  <Menu menu={{title: 'Popular genres', items: data || []}}/>


}
export default GenreMenu;
