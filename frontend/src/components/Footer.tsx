import '../styles/global.css';

const Footer = () => {
  return (
    <footer style={{
      background: 'white',
      borderTop: '1px solid #E5E7EB',
    }}>
      {/* Upper Footer */}
      <div style={{
        padding: '60px 32px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          {/* Product Links */}
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1A1D26',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Product
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#features" style={{ textDecoration: 'none', color: '#6F7482', fontSize: '0.95rem' }}>Features</a>
              <a href="#pricing" style={{ textDecoration: 'none', color: '#6F7482', fontSize: '0.95rem' }}>Pricing</a>
              <a href="#integrations" style={{ textDecoration: 'none', color: '#6F7482', fontSize: '0.95rem' }}>Integrations</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1A1D26',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#about" style={{ textDecoration: 'none', color: '#6F7482', fontSize: '0.95rem' }}>About</a>
              <a href="#blog" style={{ textDecoration: 'none', color: '#6F7482', fontSize: '0.95rem' }}>Blog</a>
              <a href="#careers" style={{ textDecoration: 'none', color: '#6F7482', fontSize: '0.95rem' }}>Careers</a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1A1D26',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Resources
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#docs" style={{ textDecoration: 'none', color: '#6F7482', fontSize: '0.95rem' }}>Documentation</a>
              <a href="#support" style={{ textDecoration: 'none', color: '#6F7482', fontSize: '0.95rem' }}>Support</a>
              <a href="#contact" style={{ textDecoration: 'none', color: '#6F7482', fontSize: '0.95rem' }}>Contact</a>
            </div>
          </div>

          {/* Social Icons */}
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1A1D26',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Connect
            </h4>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '8px', 
                background: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: '#6F7482',
                fontSize: '18px',
              }}>
                𝕏
              </a>
              <a href="#" style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '8px', 
                background: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: '#6F7482',
                fontSize: '18px',
              }}>
                in
              </a>
              <a href="#" style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '8px', 
                background: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: '#6F7482',
                fontSize: '18px',
              }}>
                f
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{
        padding: '24px 32px',
        borderTop: '1px solid #E5E7EB',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.875rem',
          color: '#6F7482',
          margin: 0,
        }}>
          Made by Aryan Shrivastava — Your all-in-one workflow system for agencies, teams, and workplaces.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
