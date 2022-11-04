import { useAuth } from '@/hooks/useAuth'
import { UserService } from '@/services/user.service'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

export const useFavorites = () => {	
	const {user} = useAuth()
	const {isLoading, data: favorites, refetch} = useQuery(['favorite movies'], () => UserService.getFavorites(), {
		select: ({data}) => data, // чтобы не писать data.data
		enabled: !!user
	})
	
	return useMemo(() => ({
		isLoading, favorites, refetch
	}), [isLoading, refetch, favorites])
}