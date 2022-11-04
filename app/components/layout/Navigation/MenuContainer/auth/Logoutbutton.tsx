import MaterialIcon from '@/components/ui/MaterialIcon';
import { UseActions } from '@/hooks/useActions'
import { FC, MouseEvent } from 'react'


const Logoutbutton: FC = () => {

	const {logout} = UseActions();

	const handleLogOut = (e:MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		logout();
	}
	return (
		<li>
			<a onClick={handleLogOut}>
				<MaterialIcon name='MdLogout'/>
				<span>Logout</span>
			</a>
		</li>
	)
}
export default Logoutbutton