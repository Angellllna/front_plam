// Секція для коментування та анотацій.
import React, { useState } from 'react';


function CommentsSection() {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
      };
      
      return( <div>
        <h2>Коментарі</h2>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Залиште свій коментар"
        />
        <button onClick={handleSubmit}>Відправити</button>
      </div>
      )
     
  
}

export default CommentsSection;