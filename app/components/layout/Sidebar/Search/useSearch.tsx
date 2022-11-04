import { useDebounce } from '@/hooks/useDebounce'
import { MovieService } from '@/services/movie.service'
import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

export const UseSearch = () => {
	const [searchTerm, setSearchTerm] = useState('')
	
	const debouncedSearch = useDebounce(searchTerm, 500)


	const {isSuccess, data} = useQuery(['search movie list', debouncedSearch], () => 
	MovieService.getAll(debouncedSearch), 
	{
		select: ({data}) => data, //все фильмы с searchTerm
		enabled: !!debouncedSearch
	});

	
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		console.log(data, debouncedSearch);
	}

	return {isSuccess, handleSearch, data, searchTerm}
}

