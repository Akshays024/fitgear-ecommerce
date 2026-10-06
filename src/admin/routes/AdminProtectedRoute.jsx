import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
const AdminProtectedRoute = ({children}) => {

    const isInitialized = useSelector(state => state.admin.isInitialized)
    const admin = useSelector(state => state.admin.admin)


    if(!isInitialized){
        return <p>Loading....</p>
    }

    if(admin){
        return children
    }

    return <Navigate to='/admin/login' />
}
export default AdminProtectedRoute