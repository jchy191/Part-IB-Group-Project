import { Category } from './category';

const accessCategories: { [key in Category]: any } = {
  [Category.Open]: {
    name: 'open', true_colour: '#ffb8bb', false_colour: '#ff2504', iconColour: 'green', t: 'Open to public', f: 'Closed to public',
  },
  [Category.Friendly]: {
    name: 'friendly', true_colour: '#ffeccc', false_colour: '#ffbe4f', iconColour: 'blue', t: 'Friendly', f: 'Hostile',
  },
  [Category.Quiet]: {
    name: 'quiet', true_colour: '#c7fbbb', false_colour: '#08f071', iconColour: 'yellow', t: 'Generally quiet', f: 'Generally busy',
  },
  [Category.Groups]: {
    name: 'groups', true_colour: '#b1dffd', false_colour: '#648dff', iconColour: 'orange', t: 'Groups welcome', f: 'Bad for groups',
  },
  [Category.Spend]: {
    name: 'spend', true_colour: '#cdbcf7', false_colour: '#8f64ff', iconColour: 'red', t: 'No pressure to spend', f: 'Pressure to spend',
  },
};
export default accessCategories;
