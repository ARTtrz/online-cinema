import MovieEdit from '@/components/screens/admin/movie/MovieEdit'
import { NextPageAuth } from '@/shared/types/auth.types'

const MovieEditPage: NextPageAuth = () => {
   return <MovieEdit/>
}
MovieEditPage.isOnlyAdmin

export default MovieEditPage