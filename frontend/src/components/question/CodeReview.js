import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CodeReview = ({
  content,
}) => {
  const [newCode, setNewCode] = useState(content); 

  return (
    <>
      CodeReview
      <textarea value={newCode} onChange={(event) => setNewCode(event.target.value)} />      
    </>
  );
};

CodeReview.propTypes = {
  content: PropTypes.string.isRequired,
};

export default CodeReview;
