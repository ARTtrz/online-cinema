import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { useAuth } from '@/hooks/useAuth';
import Meta from '@/utils/meta/Meta';
import {FC} from 'react' 

import styles from './Favorites.module.scss';
import FavoritesItem from './FavoritesItem';
import { useFavorites } from './useFavorites';
const Favorites: FC = () => {


	const {favorites, isLoading} = useFavorites()

	const {user} = useAuth()

	if(!user) return null
	
   	return (
		<Meta title="Favorites">
			<Heading title="Favorites"/>
			<section className={styles.favorites}>
				{isLoading ? ( 
					<SkeletonLoader
					 	count={3} 
					 	className={styles.skeletonLoader} 
					 	containerClassName={styles.containerLoader} 
					
					/>
				): (
					favorites?.map(movie => (
						<FavoritesItem
						
							key={movie._id}
							movie={movie}
						/>
					))
				) }
			</section>
		</Meta>
   	)	
}

export default Favorites