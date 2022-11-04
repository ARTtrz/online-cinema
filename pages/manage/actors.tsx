import ActorList from '@/components/screens/admin/actors/ActorList'
import { NextPageAuth } from '@/shared/types/auth.types'

const ActorListPage: NextPageAuth = () => {
   return <ActorList/>
}
ActorListPage.isOnlyAdmin

export default ActorListPage