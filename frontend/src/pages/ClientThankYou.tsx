import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/global.css';

const ClientThankYou = () => {
  const { shareableLink } = useParams<{ shareableLink: string }>();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <div style={{ fontSize: '5rem', marginBottom: '24px' }}>✓</div>
          <h1 style={{ marginBottom: '16px' }}>Thanks! Your onboarding is complete.</h1>
          <p style={{ color: '#666666', fontSize: '1.125rem', marginBottom: '32px' }}>
            We've received all your information and files. The project owner will review everything and get back to you soon.
          </p>
          <div style={{
            padding: '24px',
            background: '#F5F5F7',
            borderRadius: '12px',
            marginTop: '32px',
          }}>
            <p style={{ color: '#666666', fontSize: '0.875rem' }}>
              You can close this page now. If you need to make changes, contact the project owner.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientThankYou;

