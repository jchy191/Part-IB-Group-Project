import { Category } from '../../types/category';

const accessCategories: { [key in Category]: any } = {
  [Category.A]: { name: 'A', colour: '#3cb44b', iconColour: 'green' },
  [Category.B]: { name: 'B', colour: '#bfef45', iconColour: 'blue' },
  [Category.C]: { name: 'C', colour: '#ffe119', iconColour: 'yellow' },
  [Category.D]: { name: 'D', colour: '#f58231', iconColour: 'orange' },
  [Category.E]: { name: 'E', colour: '#e6194B', iconColour: 'red' },
};
export default accessCategories;
