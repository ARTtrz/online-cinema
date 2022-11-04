import { MovieService } from '@/services/movie.service'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

export const useUpdateCountMovie = (slug: string) => {
	const { mutateAsync } = useMutation('update count opened', () => MovieService.updateCountOpenedMovie(slug))
	
	useEffect(() => {
		mutateAsync()
	}, [])

}