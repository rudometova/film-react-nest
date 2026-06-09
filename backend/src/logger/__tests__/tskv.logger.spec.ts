import { TskvLogger } from '../tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log message in TSKV format', () => {
    logger.log('Test message');
    const output = consoleLogSpy.mock.calls[0][0];
    expect(output).toContain('level=log');
    expect(output).toContain('message=Test message');
    expect(output).toContain('timestamp=');
    expect(output).toMatch(/\t/);
  });

  it('should include context in TSKV format', () => {
    logger.log('Context message', 'MyContext');
    const output = consoleLogSpy.mock.calls[0][0];
    expect(output).toContain('context=');
    expect(output).toContain('MyContext');
  });
});