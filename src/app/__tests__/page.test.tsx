import { render } from '@/test-utils/render-with-providers';
import HomePage from '../page';

describe('HomePage', () => {
  it('should display a title', () => {
    render(<HomePage />);
  });
});
