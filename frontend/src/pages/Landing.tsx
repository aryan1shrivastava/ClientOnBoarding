import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/global.css';

const Landing = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
      {/* SECTION 1: Navigation Bar */}
      <nav style={{
        padding: '28px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Left: Logo */}
        <Link to="/" style={{ 
          textDecoration: 'none', 
          color: '#1A1D26', 
          fontSize: '1.5rem', 
          fontWeight: '600',
          letterSpacing: '-0.5px',
        }}>
          ClientOnboard
        </Link>

          {/* Middle: Links */}
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <a href="#features" style={{ textDecoration: 'none', color: '#1A1D26', fontSize: '0.95rem', fontWeight: '400' }}>
              Features
            </a>
            <a href="#pricing" style={{ textDecoration: 'none', color: '#1A1D26', fontSize: '0.95rem', fontWeight: '400' }}>
              Pricing
            </a>
            <a href="#blog" style={{ textDecoration: 'none', color: '#1A1D26', fontSize: '0.95rem', fontWeight: '400' }}>
              Blog
            </a>
            <a href="#contact" style={{ textDecoration: 'none', color: '#1A1D26', fontSize: '0.95rem', fontWeight: '400' }}>
              Contact
            </a>
          </div>

        {/* Right: Buttons */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button style={{
            padding: '10px 20px',
            background: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            color: '#1A1D26',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#6B4DFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB';
          }}
          >
            Contact Sales
          </button>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #6B4DFF, #8C6CFF)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(107, 77, 255, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(107, 77, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(107, 77, 255, 0.3)';
            }}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* SECTION 2: Hero Section */}
      <section style={{
        padding: '80px 32px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FF 50%, #FFFFFF 100%)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Left Column */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-block',
              padding: '6px 12px',
              background: '#FFF4E6',
              borderRadius: '20px',
              marginBottom: '24px',
              fontSize: '0.875rem',
              color: '#D97706',
              fontWeight: '500',
            }}>
              Trusted by agencies & teams worldwide
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: '42px',
              fontWeight: '700',
              lineHeight: '1.2',
              color: '#1A1D26',
              marginBottom: '20px',
              letterSpacing: '-1px',
            }}>
              Streamline Client Onboarding. Maximize Productivity.
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: '18px',
              color: '#6F7482',
              lineHeight: '1.6',
              marginBottom: '40px',
            }}>
              Centralize forms, files, communication, and project setup in one clean workspace.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #6B4DFF, #8C6CFF)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(107, 77, 255, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(107, 77, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(107, 77, 255, 0.3)';
                }}
                >
                  Get Started
                </button>
              </Link>
              <button style={{
                padding: '14px 28px',
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '10px',
                color: '#1A1D26',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6B4DFF';
                e.currentTarget.style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.background = 'white';
              }}
              >
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Column: Hero Imagery */}
          <div style={{ position: 'relative', height: '500px' }}>
            {/* Dashboard Preview Card */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '320px',
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
              zIndex: 3,
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
              </div>
              <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', marginBottom: '12px' }}></div>
              <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', width: '60%', marginBottom: '16px' }}></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ height: '60px', background: '#F3F4F6', borderRadius: '8px' }}></div>
                <div style={{ height: '60px', background: '#F3F4F6', borderRadius: '8px' }}></div>
              </div>
            </div>

            {/* Form Mock */}
            <div style={{
              position: 'absolute',
              top: '120px',
              right: '0',
              width: '280px',
              background: 'white',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
              zIndex: 2,
            }}>
              <div style={{ height: '10px', background: '#E5E7EB', borderRadius: '4px', marginBottom: '16px' }}></div>
              <div style={{ height: '40px', background: '#F3F4F6', borderRadius: '8px', marginBottom: '12px' }}></div>
              <div style={{ height: '40px', background: '#F3F4F6', borderRadius: '8px', marginBottom: '12px' }}></div>
              <div style={{ height: '60px', background: '#F3F4F6', borderRadius: '8px', marginBottom: '12px' }}></div>
              <div style={{ height: '36px', background: 'linear-gradient(135deg, #6B4DFF, #8C6CFF)', borderRadius: '8px' }}></div>
            </div>

            {/* Floating Icons */}
            <div style={{
              position: 'absolute',
              top: '200px',
              left: '240px',
              width: '60px',
              height: '60px',
              background: 'white',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
              zIndex: 4,
              fontSize: '24px',
            }}>
              📁
            </div>
            <div style={{
              position: 'absolute',
              top: '300px',
              right: '80px',
              width: '50px',
              height: '50px',
              background: 'white',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
              zIndex: 4,
              fontSize: '20px',
            }}>
              ✓
            </div>
            <div style={{
              position: 'absolute',
              bottom: '80px',
              left: '100px',
              width: '56px',
              height: '56px',
              background: 'white',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
              zIndex: 4,
              fontSize: '22px',
            }}>
              📝
            </div>

            {/* Avatar Badge */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              right: '120px',
              background: 'white',
              borderRadius: '12px',
              padding: '12px 16px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 3,
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6B4DFF, #8C6CFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
              }}>
                A
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1A1D26' }}>Client submitted</div>
                <div style={{ fontSize: '0.75rem', color: '#6F7482' }}>Just now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Social Proof Bar */}
      <section style={{
        padding: '60px 32px',
        background: '#F9FAFB',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#6F7482',
            marginBottom: '32px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            Trusted by leading agencies
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '60px',
            flexWrap: 'wrap',
            filter: 'grayscale(100%)',
            opacity: 0.6,
          }}>
            {['Agency One', 'Studio Two', 'Team Three', 'Company Four', 'Agency Five'].map((name, i) => (
              <div key={i} style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1A1D26',
              }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: "What Sets Us Apart" */}
      <section style={{
        padding: '100px 32px',
        background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '36px',
            fontWeight: '700',
            color: '#1A1D26',
            marginBottom: '60px',
            letterSpacing: '-0.5px',
          }}>
            Why Teams Choose Our Onboarding Portal
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
          }}>
            {/* Card 1 */}
            <div style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FF 100%)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 12px 32px rgba(107, 77, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
              position: 'relative',
              border: '1px solid rgba(107, 77, 255, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(107, 77, 255, 0.2), 0 6px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(107, 77, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)';
            }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #6B4DFF, #8C6CFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '24px',
                boxShadow: '0 4px 12px rgba(107, 77, 255, 0.3)',
              }}>
                📋
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1A1D26',
                marginBottom: '12px',
              }}>
                Customizable Intake Forms
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6F7482',
                lineHeight: '1.6',
              }}>
                Create clean, guided forms for your clients to submit everything you need.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 12px 32px rgba(245, 158, 11, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(245, 158, 11, 0.2), 0 6px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(245, 158, 11, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)';
            }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '24px',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
              }}>
                ⚡
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1A1D26',
                marginBottom: '12px',
              }}>
                Real-Time Status Tracking
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6F7482',
                lineHeight: '1.6',
              }}>
                Know the moment a client completes onboarding.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 12px 32px rgba(16, 185, 129, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(16, 185, 129, 0.2), 0 6px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(16, 185, 129, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)';
            }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #10B981, #34D399)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '24px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}>
                🔒
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1A1D26',
                marginBottom: '12px',
              }}>
                Secure File Uploads
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6F7482',
                lineHeight: '1.6',
              }}>
                All assets stored safely with frictionless uploading.
              </p>
            </div>

            {/* Card 4 */}
            <div style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FDF4FF 100%)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 12px 32px rgba(168, 85, 247, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(168, 85, 247, 0.2), 0 6px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(168, 85, 247, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)';
            }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #A855F7, #C084FC)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '24px',
                boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)',
              }}>
                ✨
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1A1D26',
                marginBottom: '12px',
              }}>
                Simple + Friendly UI
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6F7482',
                lineHeight: '1.6',
              }}>
                Onboarding that clients actually enjoy using.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Secondary CTA Section */}
      <section style={{
        padding: '100px 32px',
        background: 'linear-gradient(135deg, #6B4DFF 0%, #8C6CFF 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(60px)',
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-50%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(60px)',
        }}></div>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '16px',
            letterSpacing: '-0.5px',
          }}>
            Stop chasing assets and messy emails.
          </h2>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '40px',
          }}>
            Start every project with clarity.
          </p>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '16px 32px',
              background: 'white',
              border: 'none',
              borderRadius: '10px',
              color: '#6B4DFF',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            }}
            >
              Create Your First Project
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
