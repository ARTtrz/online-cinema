import { IOption } from '@/components/ui/select/select.interface'
import { ActorService } from '@/services/actor.service'
import { useQuery } from 'react-query'

export const useAdminActors = () => {
	const queryData = useQuery('List of actor', () => ActorService.getAll(), {
		select: ({data}) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id
				})
			)
	})

	return queryData
}