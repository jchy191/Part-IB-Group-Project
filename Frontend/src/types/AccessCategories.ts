import { Category } from './category';

const accessCategories: { [key in Category]: any } = {
  [Category.Open]: {
    name: 'open', colour: '#3cb44b', iconColour: 'green', t: 'Open to public', f: 'Closed to public',
  },
  [Category.Friendly]: {
    name: 'friendly', colour: '#bfef45', iconColour: 'blue', t: 'Friendly', f: 'Hostile',
  },
  [Category.Quiet]: {
    name: 'quiet', colour: '#ffe119', iconColour: 'yellow', t: 'Generally quiet', f: 'Generally busy',
  },
  [Category.Groups]: {
    name: 'groups', colour: '#f58231', iconColour: 'orange', t: 'Groups welcome', f: 'Bad for groups',
  },
  [Category.Spend]: {
    name: 'spend', colour: '#e6194B', iconColour: 'red', t: 'No pressure to spend', f: 'Pressure to spend',
  },
};
export default accessCategories;
