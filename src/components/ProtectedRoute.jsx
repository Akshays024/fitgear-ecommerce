import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({children}) => {
  const user = useSelector(state=>state.auth.user)
  const isInitialized = useSelector(state=>state.auth.isInitialized)
  console.log("ProtectedRoute:", {
  user,
  isInitialized
})
  if(!isInitialized){
    return <p>Loading.....</p>
  }
  if(user){
    return children
  }
  return <Navigate to='/login' />
}


export default ProtectedRoute