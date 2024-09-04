export const checkPlagiarism = (text: string) => ({
    type: 'CHECK_PLAGIARISM',
    payload: text,
  });
  