import { getAdminHomeUrl, getAdminUrl } from '@/config/url.config'
import { useAuth } from '@/hooks/useAuth'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {FC} from 'react' 
import MenuItem from '../MenuItem'
import Logoutbutton from './Logoutbutton'

const AuthItems: FC = () => {
	const {user} = useTypedSelector(state=> state.user)
	// const {user} = useAuth()
	return <>

		{user? <>
			<MenuItem item={{
				icon: 'MdSettings',
				link: '/profile',
				title:'Profile',
			}}
			/>
			<Logoutbutton/>

		</> : 
			<MenuItem item={{
				icon: 'MdLogin',
				link: '/auth',
				title: 'Login'
			}}
			/>}

		{user?.isAdmin && <MenuItem item={{
			icon: "MdOutlineLock",
			link: getAdminHomeUrl(),
			title: 'Admin Panel'
		}}/>}


	</>
}

export default AuthItems