import { Category } from './category';

const accessCategories: { [key in Category]: any } = {
  [Category.A]: {
    name: 'A', colour: '#3cb44b', iconColour: 'green', t: 'Open to public', f: 'Closed to public',
  },
  [Category.B]: {
    name: 'B', colour: '#bfef45', iconColour: 'blue', t: 'Friendly', f: 'Hostile',
  },
  [Category.C]: {
    name: 'C', colour: '#ffe119', iconColour: 'yellow', t: 'Generally quiet', f: 'Generally busy',
  },
  [Category.D]: {
    name: 'D', colour: '#f58231', iconColour: 'orange', t: 'Groups welcome', f: 'Bad for groups',
  },
  [Category.E]: {
    name: 'E', colour: '#e6194B', iconColour: 'red', t: 'No pressure to spend', f: 'Pressure to spend',
  },
};
export default accessCategories;
