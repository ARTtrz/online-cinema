import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface';
import { getAdminUrl } from '@/config/url.config';
import { useDebounce } from '@/hooks/useDebounce'
import { UserService } from '@/services/user.service';
import { ConvertMongoDate } from '@/utils/date/converMongoDbDate';
import { toastError } from '@/utils/toast-error';
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

export const useUsers = () => {

	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);
	const queryData = useQuery(['user list', debouncedSearch], () => UserService.getAll(debouncedSearch), {
		select: ({data}) => data.map((user): ITableItem => ({
			_id: user._id,
			editUrl: getAdminUrl(`user/edit/${user._id}`),
			items: [user.email, ConvertMongoDate(user.createdAt)]
		})),

		onError: (error) => {
			toastError(error, 'User List')
		}
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		console.log(queryData.data);
	}

	const {mutateAsync: deleteAsync} = useMutation('delete user', (userId: string) => UserService.deleteUser(userId), 
	{
		onError: (error) => {
			toastError(error, 'Delete user')
		},

		onSuccess: () => {
			toastr.success('Delete User', 'delete was successfull')
			queryData.refetch()
		}
	}

	)
	
	return useMemo(() => ({
		handleSearch, ...queryData, searchTerm, deleteAsync,
	}), [queryData, searchTerm, deleteAsync, ])





}