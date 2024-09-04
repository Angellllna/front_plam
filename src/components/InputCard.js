import React, { useState, useRef } from 'react';
import { styled } from '@mui/system';
import { Card, CardContent, TextField, Button, IconButton, Typography, Paper  } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Close as CloseIcon } from '@mui/icons-material';
import CardActions from '@mui/material/CardActions';
import cripstyGif from './cripsty.gif';

const StyledCard = styled(Card)`
  width: 75%;
  max-width: 1280px;
  margin: 20px auto;
  padding: 12px;
  background: linear-gradient(-135deg, #9FD8CB -90%, #FFFFFF 100%);
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;
  border-radius: 16px;

  // &:hover {
  //   transform: translateY(-5px);
  // }

  // @media (max-width: 599px) {
  //   width: 90%;
  // }
`;

const StyledCardAnimation = styled(Card)`
  
&:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 599px) {
    width: 90%;
  }

`;  



const StyledTextField = styled(TextField)`
  width: 100%;
  .MuiOutlinedInput-root {
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      border-color: #65A88C;
    }
  }
  .MuiOutlinedInput-inputMultiline {
    resize: both; // Allows resizing
    overflow: auto; // Keeps the overflow managed
  }
  .Mui-focused {
    .MuiOutlinedInput-notchedOutline {
      border-width: 2px;
      border-color: #517664 !important;
    }
  }
  .MuiInputAdornment-positionEnd {
    margin-left: -32px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 200px;
  background-color: #517664;
  transition: background-color 0.3s ease;
  margin: 0 auto;

  &:hover {
    background-color: #2D3319;
  }
`;

const UploadButtonContainer = styled('div')`
  display: grid;
  justify-content: flex-end;
`;

const FileInfo = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin-top: 8px;
`;

const FileName = styled(Typography)`
  margin-left: 8px;
`;

const LoaderContainer = styled('div')`
  position: fixed;  
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;  
  align-items: center;  
  background-color: rgba(255, 255, 255, 0.5); 
  z-index: 1000;  
`;



function InputCard({ onCheckText }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const characterLimit = 2000;
  const [fileContent, setFileContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    if (event.target.value.length <= characterLimit) {
      setText(event.target.value);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() && selectedFile === null) {
      setError('Please enter at least 20 characters.');
      return;
    }


    setLoading(true); 
    await onCheckText(text, selectedFile);
    setLoading(false); 
  };


  const uploadFileInChunks = async (file) => {
    const reader = new FileReader();
    const CHUNK_SIZE = 150000000; 
    const fileName = Math.random().toString(36).slice(-6) + file.name; // Generate a unique filename

    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      const content = reader.result;
      const totalChunks = Math.ceil(content.byteLength / CHUNK_SIZE);

      for (let chunk = 0; chunk < totalChunks; chunk++) {
        const start = chunk * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, content.byteLength);
        const CHUNK = content.slice(start, end);

        await fetch('http://127.0.0.1:8000/upload_chunk/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': CHUNK.byteLength,
            'X-File-Name': fileName,
            'X-Chunk-Index': chunk,
            'X-Total-Chunks': totalChunks,
          },
          body: CHUNK
        });
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
  };



  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setFileContent('');
  };

  return (
    <StyledCard>
      
      <CardContent>
      
        <StyledTextField
          variant="outlined"
          multiline
          rows={8}
          placeholder="Enter text to check for plagiarism..."
          helperText={`${text.length}/${characterLimit}`}
          value={text}
          onChange={handleChange}
          error={text.length > characterLimit}
        />

        <UploadButtonContainer>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt, .docx, .pdf, .doc, .xml"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <StyledButton variant="contained" onClick={handleUploadClick}>
            Upload File <ExpandMoreIcon />
          </StyledButton>
        </UploadButtonContainer>
        {selectedFile && (
          <FileInfo>
            <FileName variant="body1">{selectedFile.name}</FileName>
            <IconButton size="small" onClick={handleFileRemove}>
              <CloseIcon />
            </IconButton>
          </FileInfo>
        )}
      </CardContent>
      <CardActions>
      <StyledButton
          variant="contained"
          onClick={handleSubmit}
        >
          Check Plagiarism
        </StyledButton>
        
        {loading && (
        <LoaderContainer>
          <img src={cripstyGif} alt="Loading" style={{ margin: 'auto', display: 'block', width: '100px' }} />
        </LoaderContainer>
      )}
      </CardActions>
        
    </StyledCard>
  );
}

export default InputCard;

