import React from 'react';
import PropTypes from 'prop-types';

import CodeEditor from '@uiw/react-textarea-code-editor';

const Editor = ({
  code, setCode, language, 
}) => {
  return (
    <CodeEditor
      value={code}
      language={language !== '' ? language : 'java'}
      onChange={(event) => setCode(event.target.value)}
      padding={15}
      style={{ 
        fontSize: '.8rem',
        lineHeight: '1.5',
        minHeight: '20rem',
        maxHeight: '30rem',
        overflow: 'auto',
        backgroundColor: '#f5f5f5',
      }}
    />
  );
};

Editor.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
};

export default Editor;
