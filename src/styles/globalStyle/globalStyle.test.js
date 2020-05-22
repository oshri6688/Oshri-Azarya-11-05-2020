import { createGlobalStyle } from 'styled-components';
import { createModuleLoader } from 'utils/TestUtils/TestUtils';

jest.mock('styled-components');

const requireGlobalStyleModule = createModuleLoader(() => require('./globalStyle'));

const mockGlobalStyle = { test: 'test-global-style' };

createGlobalStyle.mockImplementation(() => mockGlobalStyle);

describe('globalStyle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create global style correctly', () => {
    const { default: globalStyle } = requireGlobalStyleModule();

    expect(createGlobalStyle).toBeCalledTimes(1);

    expect(globalStyle).toBe(mockGlobalStyle);
  });
});
