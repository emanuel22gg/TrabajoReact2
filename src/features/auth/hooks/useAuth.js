import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { loginUser } from '../slices/authThunks';

export function useAuth() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  const login = (credentials) => {
    dispatch(loginUser(credentials));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout: logoutUser,
  };
}