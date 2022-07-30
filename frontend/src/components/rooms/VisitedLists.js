import React from 'react';
import { MdOutlineKeyboardArrowDown as Arrow } from 'react-icons/md';

import VisitiedListItem from './VisitedListItem';
import classes from './VisitedLists.module.css';

const visitedList = [
  { id: 1, title: 'SSAFY 8기 대비' },
  { id: 2, title: 'SSAFY' },
  { id: 3, title: 'room3' },
];

const VisitedList = () => {
  return (
    <section className={classes.section}>
      <div className={classes.studyListTitle}>
        <h5>자주 가는 스터디</h5>
      </div>
      <input type="checkbox" name="droptdown-toggle" id="droptdown-toggle" />
      <div className={classes.hideDropdown}>
        <div className={classes.studyDropdown}>
          {visitedList.length > 0 && visitedList.map((room) => (
            <VisitiedListItem key={room.id} id={room.id} title={room.title} />
          ))}
          {visitedList.length === 0 && <p className={classes.dropdownMsg}>방문하신 스터디가 없습니다.</p> }
        </div>
      </div>
      <label htmlFor="droptdown-toggle"><Arrow /></label>
    </section>
  );
};

export default VisitedList;
