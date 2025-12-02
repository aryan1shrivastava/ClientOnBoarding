import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import Footer from '../components/Footer';
import '../styles/global.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/register', { email, password, name });
      // After registration, automatically log in
      const loginResponse = await api.post('/auth/login', { email, password });
      
      setAuth(loginResponse.data, loginResponse.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #F8F9FF 0%, #FFFFFF 100%)',
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Link to="/" style={{ 
              textDecoration: 'none', 
              color: '#6B4DFF', 
              fontSize: '1.75rem', 
              fontWeight: '600',
              letterSpacing: '-0.5px',
            }}>
              ClientOnboard
            </Link>
            <h2 style={{ 
              marginTop: '32px', 
              marginBottom: '12px',
              fontSize: '28px',
              fontWeight: '700',
              color: '#1A1D26',
              letterSpacing: '-0.5px',
            }}>
              Let's make onboarding easier.
            </h2>
            <p style={{ color: '#6F7482', fontSize: '1rem' }}>Create your account to get started.</p>
          </div>

          <form onSubmit={handleSubmit} style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(107, 77, 255, 0.1)',
            border: '1px solid #E5E7EB',
          }}>
            {error && (
              <div style={{
                padding: '14px',
                background: '#FEE2E2',
                color: '#EF4444',
                borderRadius: '12px',
                marginBottom: '24px',
                fontSize: '0.875rem',
                border: '1px solid #FECACA',
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '10px', 
                fontWeight: '600', 
                color: '#1A1D26',
                fontSize: '0.95rem',
              }}>
                Name (optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  background: 'white',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#6B4DFF';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107, 77, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '10px', 
                fontWeight: '600', 
                color: '#1A1D26',
                fontSize: '0.95rem',
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  background: 'white',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#6B4DFF';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107, 77, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '10px', 
                fontWeight: '600', 
                color: '#1A1D26',
                fontSize: '0.95rem',
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  background: 'white',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#6B4DFF';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107, 77, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #6B4DFF, #8C6CFF)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(107, 77, 255, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(107, 77, 255, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(107, 77, 255, 0.3)';
                }
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '24px', color: '#6F7482', fontSize: '0.95rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ 
                color: '#6B4DFF', 
                textDecoration: 'none', 
                fontWeight: '600',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8C6CFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B4DFF'}
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;

