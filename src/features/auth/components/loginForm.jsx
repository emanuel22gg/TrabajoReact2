import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../../../shared/styles/dashboard-login.css';


const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
  return password.length >= 4;
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Ingresa un email válido');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError('La contraseña debe tener al menos 4 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Ingresa un email válido');
      valid = false;
    }
    if (!validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 4 caracteres');
      valid = false;
    }
    if (!valid) return;
    await login({ email, password });
  };

  const handleGoLanding = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <form className="login-form shadow" onSubmit={handleSubmit} noValidate>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            className={`form-control ${emailError ? 'is-invalid' : ''}`}
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="usuario@ejemplo.com"
          />
          {emailError && <div className="invalid-feedback">{emailError}</div>}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Contraseña</label>
          <input
            className={`form-control ${passwordError ? 'is-invalid' : ''}`}
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Tu contraseña"
          />
          {passwordError && <div className="invalid-feedback">{passwordError}</div>}
        </div>

        <button type="submit" disabled={isLoading} className="login-button btn btn-primary">
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary w-100 mt-3"
          onClick={handleGoLanding}
        >
          Volver a la página principal
        </button>

        <div className="login-info mt-4">
          <p>ejemplo:</p>
          <p><b>Email:</b> john@mail.com</p>
          <p><b>Contraseña:</b> changeme</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

