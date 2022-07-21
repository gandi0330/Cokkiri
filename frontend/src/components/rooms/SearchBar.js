import { useCallback } from 'react';
import useInput from '../../hooks/useInput';

const SearchBar = () => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(searchInput, '검색 결과 디스페치, 가져와!');
  }, [searchInput]);

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="스터디를 검색해보세요." value={searchInput} onChange={onChangeSearchInput} />
    </form>
  );
};

export default SearchBar;
