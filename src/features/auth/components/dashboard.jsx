import '../../../shared/styles/dashboard-login.css';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ProductsPage from './crudDashboard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content text-center">
        <h2 className="mb-4">Panel de Usuario</h2>
        <div className="user-avatar mx-auto">
          <img
            src={user?.avatar}
            alt={`Avatar de ${user?.name}`}
          />
        </div>
        <h4 className="mt-3 mb-2" style={{ color: '#0d6efd' }}>{user?.name}</h4>
        <p className="mb-1"><b>Email:</b> {user?.email}</p>
        <p className="mb-1"><b>ID:</b> {user?.id}</p>
        <p className="mb-4"><b>Rol:</b> {user?.role}</p>
        <button className="logout-button btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
        <ProductsPage />
      </div>
    </div>
  );
};

export default Dashboard;
