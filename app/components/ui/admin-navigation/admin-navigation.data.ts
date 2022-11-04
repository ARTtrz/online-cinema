import { getAdminHomeUrl, getAdminUrl } from '@/config/url.config';
import { INavItem } from './admin-navigation.data.interface';

export const NavItems:INavItem[] = [
	{
		title: 'Statistics',
		link: getAdminHomeUrl()
	},
	{
		title: 'Users',
		link: getAdminUrl('users'),
	},
	{
		title: 'Movies',
		link: getAdminUrl('movies')
	},
	{
		title: 'Actors',
		link: getAdminUrl('actors')
	},
	{
		title: 'Genres',
		link: getAdminUrl('genres')
	},
	
]