import { Link } from 'react-router-dom';
import '../styles/global.css';

interface ProjectCardProps {
  id: string;
  projectName: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
  hasSubmission: boolean;
  submissionCount: number;
}

const ProjectCard = ({ id, projectName, status, hasSubmission, submissionCount }: ProjectCardProps) => {
  const getStatusTag = () => {
    if (hasSubmission) {
      return (
        <span style={{
          display: 'inline-block',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: 'linear-gradient(135deg, #10B981, #34D399)',
          color: 'white',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
        }}>
          Onboarding Completed
        </span>
      );
    }
    return (
      <span style={{
        display: 'inline-block',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: '600',
        background: 'linear-gradient(135deg, #6B4DFF, #8C6CFF)',
        color: 'white',
        boxShadow: '0 2px 8px rgba(107, 77, 255, 0.3)',
      }}>
        Waiting for client
      </span>
    );
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(107, 77, 255, 0.1)',
      border: '1px solid #E5E7EB',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(107, 77, 255, 0.15)';
      e.currentTarget.style.borderColor = '#6B4DFF';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(107, 77, 255, 0.1)';
      e.currentTarget.style.borderColor = '#E5E7EB';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h3 style={{ 
          margin: 0, 
          color: '#1A1D26',
          fontSize: '1.125rem',
          fontWeight: '600',
        }}>
          {projectName}
        </h3>
        {getStatusTag()}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ 
          margin: 0, 
          color: '#6F7482', 
          fontSize: '0.875rem' 
        }}>
          {submissionCount > 0 ? `${submissionCount} submission${submissionCount > 1 ? 's' : ''}` : 'No submissions yet'}
        </p>
        <Link
          to={`/projects/${id}`}
          style={{ 
            textDecoration: 'none',
            fontSize: '0.875rem',
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #6B4DFF, #8C6CFF)',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '500',
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(107, 77, 255, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(107, 77, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(107, 77, 255, 0.3)';
          }}
        >
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
