import React from 'react';
import { styled } from '@mui/system';
import { Typography, Paper }  from '@mui/material';

// Styled component for the output card
const StyledOutputCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    width: '80%',
    maxWidth: '500px',
    backgroundColor: '#D6E5E3',
    color: '#517664',
    fontSize: 16,
    textAlign: "center",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.12)"
}));
const UrlItem = styled('div')(({ theme }) => ({
    margin: theme.spacing(1, 0),
    textAlign: 'left',
    wordWrap: 'break-word',
}));
const PercentageText = styled('span')(({ theme }) => ({
    color: '#bd4946e0', //#D9534F
}));

const generateDescription = (percentage) => {
    if (percentage == 100) {
        return 'Це джерело містить точний збіг тексту з вашим документом. ';
    } else if (percentage > 50 && percentage < 100) {
        return 'Це джерело містить значну кількість тексту, схожого на ваш.';
    } else if(percentage == 0){
        return 'Ваш текст не містить плагіату.';
    } else if (percentage < 50 && percentage > 0){
        return 'Це джерело має часткові збіги з вашим текстом.';
    }
};


function OutputCard({ result, percentage }) {
    return (
        <StyledOutputCard>
            {result && (
                <>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Плагіат: <PercentageText>{percentage}%</PercentageText>
                        
                    </Typography>
                    {percentage == 0 && (
                        <Typography variant="body1" component="p" gutterBottom>
                            Ваш текст не містить плагіату.
                        </Typography>
                    )}

                    {percentage != 0 &&  percentage > 5  &&(
                        <>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Джерела:
                    </Typography>
                    {result.map((urlObj, index) => (
                        <UrlItem key={index}>
                            <Typography variant="body2" style={{ color: '#517664', marginTop: '5px' }}>
                                {generateDescription(urlObj.plagiarism_percent)}
                            </Typography>

                            <Typography variant="body1">
                            <PercentageText>{urlObj.plagiarism_percent}%:  </PercentageText>   
                                <a href={urlObj.url} target="_blank" rel="noopener noreferrer" style={{ color: '#517664', textDecoration: 'none' }}>
                                    {urlObj.url}
                                </a> 
                            </Typography>
                            
                        </UrlItem>
                    ))}
                    </>
                    )}
                </>
            )}
        </StyledOutputCard>
    );
}

export default OutputCard;