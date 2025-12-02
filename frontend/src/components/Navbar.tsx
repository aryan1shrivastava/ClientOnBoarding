import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import '../styles/global.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav style={{
      background: 'white',
      padding: '20px 0',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #E5E7EB',
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px',
      }}>
        <Link to="/dashboard" style={{ 
          textDecoration: 'none', 
          color: '#6B4DFF', 
          fontSize: '1.5rem', 
          fontWeight: '600',
          letterSpacing: '-0.5px',
        }}>
          ClientOnboard
        </Link>
        
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ 
            textDecoration: 'none', 
            color: '#1A1D26', 
            fontWeight: '500',
            fontSize: '0.95rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6B4DFF'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#1A1D26'}
          >
            Dashboard
          </Link>
          <Link to="/dashboard" style={{ 
            textDecoration: 'none', 
            color: '#1A1D26', 
            fontWeight: '500',
            fontSize: '0.95rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6B4DFF'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#1A1D26'}
          >
            Projects
          </Link>
          
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '10px',
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F3F4F6';
              e.currentTarget.style.borderColor = '#6B4DFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F9FAFB';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6B4DFF, #8C6CFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                boxShadow: '0 2px 8px rgba(107, 77, 255, 0.3)',
              }}>
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <span style={{ fontSize: '0.875rem', color: '#1A1D26', fontWeight: '500' }}>
                {user?.name || user?.email?.split('@')[0] || 'User'}
              </span>
            </div>
            
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
              padding: '8px',
              minWidth: '160px',
              border: '1px solid #E5E7EB',
              display: 'none',
            }} id="profile-dropdown">
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  color: '#EF4444',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FEF2F2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
