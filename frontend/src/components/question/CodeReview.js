import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { diffLines, formatLines } from 'unidiff';

import Editor from './Editor';
import Markdown from './Markdown'; 

const CodeReview = ({ 
  type, prevReview, oldCode, language, setReview,
}) => {
  // const oldCodes = oldCode.match(/```[a-z]*\n[\s\S]*?\n```/g) || [];

  const [newCode, setNewCode] = useState(type === 'create' ? oldCode : (prevReview || oldCode));
  const diffCode = formatLines(diffLines(oldCode, newCode), { context: 2 });
  // const regEx = /-{3} a\n\+{3} b\n@{2} -\d+,?\d? \+\d+,?\d? @{2}\n/g;
  const regEx = /-{3} a\n\+{3} b\n@{2} -\d+,?\d* \+\d+,?\d* @{2}\n/g;

  const updatedCode = '```diff\n' + diffCode.replace(regEx, '') + '\n```';

  useEffect(() => {
    setReview(newCode);
  }, [newCode]);

  return (
    <>
      <Markdown review={updatedCode} />
      <Editor code={newCode} setCode={setNewCode} language={language} />
    </>
  );
};

CodeReview.propTypes = {
  type: PropTypes.string.isRequired,
  prevReview: PropTypes.string.isRequired,
  oldCode: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  setReview: PropTypes.func.isRequired,
};

export default React.memo(CodeReview);
