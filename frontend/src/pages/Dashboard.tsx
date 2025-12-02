import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import '../styles/global.css';

interface Project {
  id: string;
  projectName: string;
  projectDesc?: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
  shareableLink: string;
  hasSubmission: boolean;
  submissionCount: number;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load projects');
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
      <Navbar />
      
      <div style={{ flex: 1, padding: '48px 32px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {/* Top Section */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div>
              <h1 style={{ 
                marginBottom: '12px',
                fontSize: '32px',
                fontWeight: '700',
                color: '#1A1D26',
                letterSpacing: '-0.5px',
              }}>
                Hey {user?.name || user?.email?.split('@')[0] || 'there'}, here's your workspace.
              </h1>
              <p style={{ color: '#6F7482', fontSize: '1rem' }}>Manage your client onboarding projects</p>
            </div>
            <Link to="/projects/new" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #6B4DFF, #8C6CFF)',
                border: 'none',
                borderRadius: '12px',
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
                Create New Project
              </button>
            </Link>
          </div>

          {/* Projects List */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px' }}>
              <p style={{ color: '#666666' }}>Loading projects...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '48px' }}>
              <p style={{ color: '#EF4444' }}>{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 24px',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
            }}>
              <div style={{ 
                fontSize: '5rem', 
                marginBottom: '24px',
                filter: 'grayscale(0.3)',
              }}>
                📁
              </div>
              <h3 style={{ 
                marginBottom: '12px',
                fontSize: '24px',
                fontWeight: '600',
                color: '#1A1D26',
              }}>
                No projects yet
              </h3>
              <p style={{ 
                color: '#6F7482', 
                marginBottom: '32px',
                fontSize: '1rem',
              }}>
                Create your first project to start onboarding clients
              </p>
              <Link to="/projects/new" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #6B4DFF, #8C6CFF)',
                  border: 'none',
                  borderRadius: '12px',
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
                  Create Your First Project
                </button>
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  projectName={project.projectName}
                  status={project.status}
                  hasSubmission={project.hasSubmission}
                  submissionCount={project.submissionCount}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

