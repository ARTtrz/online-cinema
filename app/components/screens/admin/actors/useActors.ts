import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'

import { ActorService } from '@/services/actor.service'

import { useDebounce } from '@/hooks/useDebounce'

import { getAdminUrl } from '@/config/url.config'
import { ConvertMongoDate } from '@/utils/date/converMongoDbDate'
import { toastError } from '@/utils/toast-error'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
	const queryData = useQuery(
		['actor list', debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actors/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)]
					})
				),

			onError: (error) => {
				toastError(error, 'User List')
			}
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		console.log(queryData.data)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete actor',
		(actorId: string) => ActorService.deleteActor(actorId),
		{
			onError: (error) => {
				toastError(error, 'Delete actor')
			},

			onSuccess: () => {
				toastr.success('Delete actor', 'delete was successfull')
				queryData.refetch()
			}
		}
	)
	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create actor',
		() => ActorService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create actor')
			},

			onSuccess: ({ data: _id }) => {
				toastr.success('Create actor', 'Create was successfull')
				push(getAdminUrl(`actors/edit/${_id}`))
			}
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
