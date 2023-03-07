import { Category } from './category';

const accessCategories: { [key in Category]: any } = {
  [Category.Open]: {
    name: 'open', colour: '#F26419', iconColour: 'green', t: 'Open to public', f: 'Closed to public',
  },
  [Category.Friendly]: {
    name: 'friendly', colour: '#FFE119', iconColour: 'blue', t: 'Friendly', f: 'Hostile',
  },
  [Category.Quiet]: {
    name: 'quiet', colour: '#3CB44B', iconColour: 'yellow', t: 'Generally quiet', f: 'Generally busy',
  },
  [Category.Groups]: {
    name: 'groups', colour: '#4363d8', iconColour: 'orange', t: 'Groups welcome', f: 'Bad for groups',
  },
  [Category.Spend]: {
    name: 'spend', colour: '#911EB4', iconColour: 'red', t: 'No pressure to spend', f: 'Pressure to spend',
  },
};
export default accessCategories;
