import React from 'react';
import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Markdown = ({ review }) => {
  console.log(review);
  return (
    <ReactMarkdown
      children={review}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ 
          inline, className, children,
        }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              // style={coy}
              language={match[1]}
              PreTag="div"
              showLineNumbers
              wrapLines
            />
          ) : (
            <code className={className}>{children}</code>
          );
        },
      }}
    />
  );
};

Markdown.propTypes = {
  review: PropTypes.string.isRequired,
};

export default Markdown;

// import React, { useRef } from 'react';
// import PropTypes from 'prop-types';

// import ReactMarkdown from 'react-markdown';

// import CodeSnippet from './CodeSnippet';

// const Markdown = ({ review }) => {
//   const markdownRef = useRef();
//   return (
//     <ReactMarkdown
//       remarkPlugins={[remarkGfm]}
//       components={<CodeSnippet className="">{review}</CodeSnippet>}
//     >
//       {review}
//     </ReactMarkdown>
//   );
// };

// Markdown.propTypes = {
//   review: PropTypes.string.isRequired,
// };

// export default Markdown;
