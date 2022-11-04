import { UserService } from '@/services/user.service'
import { toastError } from '@/utils/toast-error'
import {FC, useEffect, useState} from 'react' 
import { useMutation } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { useFavorites } from '../../favorites/useFavorites'
import cn from 'classnames'
import styles from './FavoriteButton.module.scss';
import HearImge from '../../../../../public/heart-animation.png'
import { useAuth } from '@/hooks/useAuth'


const FavoriteButton: FC<{movieId: string}> = ({movieId}) => {


	const [isSmashed, setIsSmashed] = useState(false)

	const {favorites, refetch} = useFavorites()

	useEffect(() => {
		if(!favorites) return

		const isHasMovie = favorites.some(f => f._id == movieId)

		if(isSmashed !=isHasMovie) setIsSmashed(isHasMovie)


	}, [favorites, isSmashed, movieId])

	const {mutateAsync} = useMutation('update favorites', () => UserService.toggleFavorites(movieId), {
		onError: (error) => {
			toastError(error, 'Update favorite list')
		},

		onSuccess: () => {
			setIsSmashed(!isSmashed)
			refetch()

		}

	})

	return <button onClick={() => mutateAsync()} className={cn(styles.button, {
		[styles.animate]: isSmashed
	})} style={{backgroundImage: `url('/heart-animation.png')`}}></button>


}

export default FavoriteButton