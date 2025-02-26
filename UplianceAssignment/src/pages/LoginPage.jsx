import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../components/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  
  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        onSuccess={credentialResponse => {
          login(credentialResponse);
        }}
        onError={() => console.log('Login Failed')}
      />
    </div>
  );
};

export default LoginPage;