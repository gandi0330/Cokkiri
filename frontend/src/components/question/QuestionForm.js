import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

const QuestionForm = ({ 
  type,
}) => {
  const navigate = useNavigate();
  return (
    <form>
      <div>
        <label htmlFor="title">제목</label>
        <input id="title" type="text" />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea name="content" id="content" cols="30" rows="10" />
      </div>
      <button type="button" onClick={() => navigate(-1)}>취소하기</button>    
      <button type="submit">{type}하기</button>
    </form>
  );
};

QuestionForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default QuestionForm;
