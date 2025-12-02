import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';

interface Project {
  id: string;
  projectName: string;
  projectDesc?: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
  shareableLink: string;
  submissions: Array<{
    id: string;
    clientName?: string;
    clientEmail?: string;
    formData: any;
    submittedAt: string;
    files: Array<{
      id: string;
      originalName: string;
      fileName: string;
      size: number;
      mimeType: string;
      uploadedAt: string;
    }>;
  }>;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [status, setStatus] = useState<'NOT_STARTED' | 'IN_PROGRESS' | 'DONE'>('NOT_STARTED');

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
      setStatus(response.data.status);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (project) {
      const fullLink = `${window.location.origin}/onboard/${project.shareableLink}`;
      navigator.clipboard.writeText(fullLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleStatusChange = async (newStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE') => {
    try {
      await api.patch(`/projects/${id}/status`, { status: newStatus });
      setStatus(newStatus);
      if (project) {
        setProject({ ...project, status: newStatus });
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update status');
    }
  };

  const downloadFile = async (fileId: string, originalName: string) => {
    try {
      const response = await api.get(`/files/${fileId}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download file');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#EF4444', marginBottom: '16px' }}>{error || 'Project not found'}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const latestSubmission = project.submissions[0];
  const hasSubmission = project.submissions.length > 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, padding: '48px 24px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ marginBottom: '32px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
              style={{ marginBottom: '24px' }}
            >
              ← Back to Dashboard
            </button>
            <h1 style={{ marginBottom: '8px' }}>{project.projectName}</h1>
            {project.projectDesc && <p style={{ color: '#666666' }}>{project.projectDesc}</p>}
          </div>

          {/* Status Selector */}
          <div className="card" style={{ marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '16px' }}>Project Status</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {(['NOT_STARTED', 'IN_PROGRESS', 'DONE'] as const).map((s) => (
                <button
                  key={s}
                  className={`btn ${status === s ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleStatusChange(s)}
                  style={{ fontSize: '0.875rem' }}
                >
                  {s.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Shareable Link */}
          <div className="card" style={{ marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '12px' }}>Shareable Client Link</h3>
            <p style={{ color: '#666666', marginBottom: '16px', fontSize: '0.875rem' }}>
              Send this link to your client to start onboarding.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input"
                value={`${window.location.origin}/onboard/${project.shareableLink}`}
                readOnly
                style={{ flex: 1, background: '#F5F5F7' }}
              />
              <button
                className={`btn ${linkCopied ? 'btn-primary' : 'btn-secondary'}`}
                onClick={copyLink}
              >
                {linkCopied ? '✓ Copied' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Client Submission Status */}
          <div className="card">
            <h3 style={{ marginBottom: '16px' }}>Client Submission</h3>
            
            {!hasSubmission ? (
              <div style={{ textAlign: 'center', padding: '32px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏳</div>
                <p style={{ color: '#666666' }}>Client has not submitted the onboarding form yet.</p>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <span className="tag tag-completed">Completed</span>
                  <p style={{ marginTop: '8px', color: '#666666', fontSize: '0.875rem' }}>
                    Submitted on {new Date(latestSubmission.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Form Data */}
                {latestSubmission.formData && Object.keys(latestSubmission.formData).length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ marginBottom: '12px' }}>Form Responses</h4>
                    <div style={{ background: '#F5F5F7', padding: '16px', borderRadius: '8px' }}>
                      {Object.entries(latestSubmission.formData).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '12px' }}>
                          <strong style={{ color: '#1A1A1A' }}>{key}:</strong>
                          <p style={{ color: '#666666', marginTop: '4px' }}>{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Client Info */}
                {(latestSubmission.clientName || latestSubmission.clientEmail) && (
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ marginBottom: '12px' }}>Client Information</h4>
                    <div style={{ background: '#F5F5F7', padding: '16px', borderRadius: '8px' }}>
                      {latestSubmission.clientName && (
                        <p style={{ marginBottom: '8px' }}>
                          <strong>Name:</strong> {latestSubmission.clientName}
                        </p>
                      )}
                      {latestSubmission.clientEmail && (
                        <p>
                          <strong>Email:</strong> {latestSubmission.clientEmail}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Files */}
                {latestSubmission.files.length > 0 && (
                  <div>
                    <h4 style={{ marginBottom: '12px' }}>Uploaded Files</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {latestSubmission.files.map((file) => (
                        <div
                          key={file.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            background: '#F5F5F7',
                            borderRadius: '8px',
                          }}
                        >
                          <div>
                            <p style={{ margin: 0, fontWeight: '500' }}>{file.originalName}</p>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: '#666666' }}>
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                          <button
                            className="btn btn-secondary"
                            onClick={() => downloadFile(file.id, file.originalName)}
                            style={{ fontSize: '0.875rem', padding: '8px 16px' }}
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;

