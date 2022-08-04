import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { diffLines, formatLines } from 'unidiff';

import Editor from './Editor';
import Markdown from './Markdown'; 

// set review도 내려옴
const CodeReview = ({ oldCode, language }) => {
  // const oldCodes = oldCode.match(/```[a-z]*\n[\s\S]*?\n```/g) || [];
  console.log('oldCodes', oldCode);

  const [newCode, setNewCode] = useState(oldCode);
  const diffCode = formatLines(diffLines(oldCode, newCode), { context: 2 });
  const regEx = /-{3} a\n\+{3} b\n@{2} -\d+,?\d? \+\d+,?\d? @{2}\n/g;

  const updatedCode = '```diff\n' + diffCode.replace(regEx, '') + '\n```';

  console.log('language', language); // 올려 보낼 때 ```language 붙여서 올려 보내기```

  return (
    <>
      <Markdown review={updatedCode} />
      {/* <textarea
        value={newCode}
        onChange={(event) => setNewCode(event.target.value)}
        rows="10"
      /> */}
      <Editor code={newCode} setCode={setNewCode} language={language} />
    </>
  );
};

CodeReview.propTypes = {
  oldCode: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default CodeReview;
