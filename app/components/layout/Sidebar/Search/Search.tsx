import SearchField from '@/components/ui/searchField/SearchField';
import { FC } from 'react'
import styles from './Search.module.scss';
import SearchList from './SearchList/SearchList';
import { UseSearch } from './useSearch';


const Search:FC = () => {
	const {isSuccess, data, handleSearch, searchTerm} = UseSearch()
	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch}/>
			{isSuccess && <SearchList movies={data || []}/>}
		</div>
	)
}
export default Search