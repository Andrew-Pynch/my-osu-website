import w18 from './w18/';
import sp18 from './sp18/';
import f18 from './f18/';
import w19 from './w19/';
import sp19 from './sp19/';
import f19 from './f19/';
import w20 from './w20/';
import sp20 from './sp20/';
import f20 from './f20/';

const currentTerm = 'f20';

const courseData = {
  f20: f20,
  sp20: sp20,
  w20: w20,
  f19: f19,
  sp19: sp19,
  w19: w19,
  f18: f18,
  sp18: sp18,
  w18: w18
};

const currentTermData = courseData[currentTerm];

export { currentTerm, courseData, currentTermData };
