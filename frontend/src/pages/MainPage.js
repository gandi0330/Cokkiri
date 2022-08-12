import Timer from '../images/Timer.jpg';
import Siren from '../images/Siren.jpg';
import Codereview from '../images/Codereview.jpg';
import classses from './MainPage.module.css';

const MainPage = () => {
  return (
    <>
      <header className={classses.header}>
        <div>
          <h2>우리 코드 끼리 끼리</h2>
          <h2>Co:kkiri</h2>
        </div>
      </header>
      <button type="button" className={classses.link__btn}>
        <a style={{ color: 'white', fontSize: '30px' }} href="https://forms.gle/CLV2mYCFgQzriH9GA" target="_blank" rel="noreferrer">
          구글폼 링크 : 추첨을 통해 소정의 선물을 드립니다!
        </a>
      </button>
      <main className={classses.main}>
        <section className={classses.section}>
          <img src={Timer} alt="타이머 기능 소개 이미지" />
          <div>
            <h3>타이머 기능</h3>
            <p>그동안 일일이 타이머 찾기 귀찮으셨죠?</p>
            <p>
              코끼리에서는 알고리즘 문제를 같이<br />
              시간을 재며 풀 수 있어요!
            </p>
          </div>
        </section>
        <section className={classses.section}>
          <img src={Siren} alt="사이렌 기능 소개 이미지" />
          <div>
            <h3>사이렌 기능</h3>
            <p>
              친구가 코드 짜다가 사라져 버렸다고요?
            </p>
            <p>
              사이렌 기능을 이용해 친구를 불러오세요!
            </p>
          </div>
        </section>
        <section className={classses.section}>
          <img src={Codereview} alt="코드리뷰 기능 소개 이미지" />
          <div>
            <h3>코드 리뷰 기능</h3>
            <p>
              코딩하다가 모르는 게 생기셨다고요?
            </p>
            <p>
              질문 게시판의 코드 리뷰 기능을 이용해 친구들에게 물어보세요!
            </p>
          </div>
        </section>
      </main>
      <footer className={classses.footer}>
        <hr />
        <div>
          <span>Developers</span>
          <p>코린이</p>
        </div>
        <div>
          <span>Contact</span>
          <p>cokkiri@naver.com</p>
        </div>
        <div>
          <span>Company</span>
          <p>&copy;SSAFY</p>
        </div>
      </footer>
    </>
  );
};

export default MainPage;
