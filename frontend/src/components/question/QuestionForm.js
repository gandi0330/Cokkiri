import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MdWarning } from 'react-icons/md';
import { createQuestion, updateQuestion, getQuestion } from '../../store/questionSlice';
import { getUserEmail } from '../../store/authSlice';
import useValidation from '../../hooks/useValidation';

import Editor from './Editor';
import YesNoModal from '../layout/YesNoModal';
import QuestionDropdown from './QuestionDropdown';
import ExcitingElephant from '../icons/ExcitingElephant';

import classes from './QuestionList.module.css';

const QuestionForm = ({ 
  type, qTitle, qContent, qCode, setQuestionRoute, questionId,
}) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
  const question = useSelector(getQuestion);
  const { roomId } = useParams();
  // let questionId;
  // if (type === '수정') {
  //   questionId = useParams().questionId;
  // }
  const [codeEditorOpen, setCodeEditorOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [code, setCode] = useState(qCode);
  const [language, setLanguage] = useState(type === '수정' ? question.language : 'java');

  const languageOptions = [
    'java',
    'python',
    'cpp',
    'javascript',
    'typescript',
    'css',
    'html',
    'json',
  ];

  const {
    value: title,
    setValue: setTitle,
    hasError: titleHasError,
    errorMsg: titleErrorMsg,
    reset: resetTitle,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useValidation([{ fn: (value) => value.trim() === '', msg: '제목을 입력해주세요.' }]);

  const {
    value: content,
    setValue: setContent,
    hasError: contentHasError,
    errorMsg: contentErrorMsg,
    reset: resetContent,
    valueChangeHandler: contentChangeHandler,
    inputBlurHandler: contentBlurHandler,
  } = useValidation([{ fn: (value) => value.trim() === '', msg: '내용을 입력해주세요.' }]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!languageOptions.includes(language)) return;
    if (titleHasError || contentHasError) return;

    setCode(code.trim());

    if (type === '작성') {
      dispatch(createQuestion({
        email, title, content, roomId, code, language,
      }))
        .unwrap()
        .then(() => {
          resetTitle('');
          resetContent('');
          setCode('');
          setLanguage('java');
          setCodeEditorOpen(false);
          setQuestionRoute('main');
          // navigate(`/room/${roomId}/questions`);
        })
        .catch((error) => console.error(error));
    }

    if (type === '수정') {
      dispatch(updateQuestion({
        email, title, content, questionId, code, language,
      }))
        .unwrap()
        .then(() => {
          resetTitle('');
          resetContent('');
          setCode('');
          setLanguage('java');
          setCodeEditorOpen(false);
          setQuestionRoute('main');
          // navigate(`/room/${roomId}/question/${questionId}`);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    setTitle(qTitle);
    setContent(qContent);

    if (type === '수정' && qCode) {
      setCodeEditorOpen(true);
    }
  }, []);

  return (
    <>
      <YesNoModal
        open={cancelModalOpen}
        yes="머무르기"
        no="나가기"
        // onNoClick={() =>navigate(-1) }
        onNoClick={() => setQuestionRoute('main')}
        onYesClick={() => setCancelModalOpen(false)}
        onClose={() => setCancelModalOpen(false)}
      >
        <ExcitingElephant />
        <p>정말 나가시겠어요?</p>
        <p>지금까지 작성된 내용이 사라집니다.</p>
      </YesNoModal>
      <form className={classes.question__form} onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">제목</label>
          {titleHasError && (
            <span className={classes.question__form__warning}>
              <MdWarning /> {titleErrorMsg}
            </span>
          )}
          <input
            id="title"
            type="text"
            value={title}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            required
          />
        </div>
        <div className={classes.question__form__content}>
          <label htmlFor="content">내용</label>
          <span>코끼리는 마크다운도 지원해요!</span>
          {contentHasError && (
            <span className={classes.question__form__warning}>
              <MdWarning /> {contentErrorMsg}
            </span>
          )}
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={contentChangeHandler}
            onBlur={contentBlurHandler}
            cols="30"
            rows="10"
            required
          />
        </div>
        {!codeEditorOpen && (
          <button
            type="button"
            className="question__btn"
            onClick={() => setCodeEditorOpen(true)}
          >
            + 코드 추가하기
          </button>
        )}
        {codeEditorOpen && (
          <div>
            <div className={classes.question__form__code}>
              <label htmlFor="content">코드</label>
              <QuestionDropdown
                selected={language}
                setSelected={setLanguage}
                options={languageOptions}
              />
            </div>
            <Editor code={code} setCode={setCode} language={language} />
          </div>
        )}
        <div className={classes.question__form__btn}>
          <button type="button" onClick={() => setCancelModalOpen(true)}>
            취소하기
          </button>
          <button type="submit">{type}하기</button>
        </div>
      </form>
    </>
  );
};

QuestionForm.propTypes = {
  type: PropTypes.string.isRequired,
  qTitle: PropTypes.string.isRequired,
  qContent: PropTypes.string.isRequired,
  qCode: PropTypes.string.isRequired,
  setQuestionRoute: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default QuestionForm;
