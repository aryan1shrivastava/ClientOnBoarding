import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import FileUpload from '../components/FileUpload';
import Footer from '../components/Footer';
import '../styles/global.css';

interface Project {
  id: string;
  projectName: string;
  projectDesc?: string;
  shareableLink: string;
  status: string;
}

const ClientForm = () => {
  const { shareableLink } = useParams<{ shareableLink: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [formFields, setFormFields] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ id: string; originalName: string; fileName: string }>>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (shareableLink) {
      fetchProject();
    }
  }, [shareableLink]);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/link/${shareableLink}`);
      setProject(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Project not found');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    if (!shareableLink || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await api.post(`/files/${shareableLink}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setUploadedFiles([...uploadedFiles, ...response.data.files]);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const addFormField = () => {
    const fieldName = prompt('Enter field name:');
    if (fieldName && fieldName.trim()) {
      setFormFields({ ...formFields, [fieldName.trim()]: '' });
    }
  };

  const removeFormField = (key: string) => {
    const newFields = { ...formFields };
    delete newFields[key];
    setFormFields(newFields);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // Submit form data
      await api.post(`/onboarding/${shareableLink}/submit`, {
        clientName: clientName || null,
        clientEmail: clientEmail || null,
        formData: formFields,
      });

      navigate(`/onboard/${shareableLink}/thank-you`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit form');
    } finally {
      setSubmitting(false);
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
          <p style={{ color: '#EF4444' }}>{error || 'Project not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '48px 24px' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ color: '#6A38F5', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              ClientOnboard
            </div>
            <h1 style={{ marginBottom: '8px' }}>{project.projectName}</h1>
            {project.projectDesc && (
              <p style={{ color: '#666666' }}>{project.projectDesc}</p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card">
            {error && (
              <div style={{
                padding: '12px',
                background: '#FEE2E2',
                color: '#EF4444',
                borderRadius: '8px',
                marginBottom: '24px',
                fontSize: '0.875rem',
              }}>
                {error}
              </div>
            )}

            {/* Client Info */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '16px' }}>Your Information</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1A1A1A' }}>
                  Name (optional)
                </label>
                <input
                  type="text"
                  className="input"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1A1A1A' }}>
                  Email (optional)
                </label>
                <input
                  type="email"
                  className="input"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Dynamic Form Fields */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3>Additional Information</h3>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={addFormField}
                  style={{ fontSize: '0.875rem', padding: '8px 16px' }}
                >
                  + Add Field
                </button>
              </div>

              {Object.keys(formFields).length === 0 ? (
                <p style={{ color: '#666666', fontStyle: 'italic' }}>
                  No additional fields. Click "Add Field" to add custom questions.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.entries(formFields).map(([key, value]) => (
                    <div key={key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ fontWeight: '500', color: '#1A1A1A' }}>{key}</label>
                        <button
                          type="button"
                          onClick={() => removeFormField(key)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        className="input"
                        value={value}
                        onChange={(e) => setFormFields({ ...formFields, [key]: e.target.value })}
                        placeholder={`Enter ${key.toLowerCase()}...`}
                        rows={3}
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* File Upload */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '16px' }}>Upload Files</h3>
              {uploading && (
                <p style={{ color: '#666666', marginBottom: '16px' }}>Uploading files...</p>
              )}
              <FileUpload
                onFilesSelected={handleFileUpload}
                uploadedFiles={uploadedFiles}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Onboarding'}
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientForm;

