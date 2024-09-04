import React, { useState } from 'react';
import InputCard from './InputCard';
import { styled } from '@mui/system';
import { sendRequestToBackend } from '../services/apiService';
import OutputCard from './OutputCard';

const MainContainer = styled('main')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    padding: '20px',
}));




function Main() {
    const [result, setResult] = useState(null);
    const [percentage, setPercentage] = useState(null);

    const handleCheckPlagiarism = async (text, fileContent) => {
        console.log('Checking text:', text);

        try {
            const data = { text, fileContent };
            const response = await sendRequestToBackend(data);
            console.log('Response from backend:', response);

            const filteredUrls = response.urls.filter(urlObj => parseFloat(urlObj.plagiarism_percent) >= 5);

            setResult(filteredUrls);
            setPercentage(response.plagiarism_percent);
        } catch (error) {
            console.error('Error checking plagiarism:', error);
        }
    };

    return (
        <MainContainer>
            <InputCard onCheckText={handleCheckPlagiarism} />
            {result && <OutputCard result={result} percentage={percentage} />}
        </MainContainer>
    );
}

export default Main;