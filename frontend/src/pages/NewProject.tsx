import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';

const NewProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/projects', { projectName, projectDesc });
      navigate(`/projects/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Create New Project</h1>
          
          <form onSubmit={handleSubmit} className="card">
            {error && (
              <div style={{
                padding: '12px',
                background: '#FEE2E2',
                color: '#EF4444',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '0.875rem',
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1A1A1A' }}>
                Project Name *
              </label>
              <input
                type="text"
                className="input"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Website Redesign for Acme Corp"
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1A1A1A' }}>
                Description (optional)
              </label>
              <textarea
                className="input"
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                placeholder="Brief description of the project..."
                rows={4}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || !projectName.trim()}
                style={{ flex: 1 }}
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NewProject;

