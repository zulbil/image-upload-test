import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      // Replace this URL with your API Gateway URL that triggers the Lambda function
      const apiUrl = 'https://your-api-gateway-url.com/upload';

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResultUrl(response.data.url);
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="App">
      <h1>Upload a file</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {resultUrl && (
        <div>
          <h2>Processed File:</h2>
          {/* Update this condition to check if the file is an image or a video */}
          {file.type.startsWith('image/') ? (
            <img src={resultUrl} alt="Processed" style={{ maxWidth: '100%' }} />
          ) : (
            <video src={resultUrl} controls style={{ maxWidth: '100%' }} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
