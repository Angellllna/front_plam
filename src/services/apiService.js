export const sendRequestToBackend = async (data) => {
    try {
        const formData = new FormData();

        if(data.text){
            formData.append('text', data.text);
        } else {
            formData.append('file', data.fileContent);
        }

        const response = await fetch('http://127.0.0.1:8000/detect_plagiarism/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};