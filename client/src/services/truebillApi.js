const DEFAULT_API_BASE_URL = 'http://localhost:5000';

const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_TRUECARE_API_URL;
  return (configuredUrl && configuredUrl.trim()) || DEFAULT_API_BASE_URL;
};

export const analyzeBillRequest = async ({ file, signal }) => {
  if (!file) {
    throw new Error('No file provided for analysis.');
  }

  const formData = new FormData();
  formData.append('billImage', file);

  const response = await fetch(`${getApiBaseUrl()}/analyze-bill`, {
    method: 'POST',
    body: formData,
    signal,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Server error (${response.status})`);
  }

  return response.json();
};
