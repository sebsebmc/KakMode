import { ModeName } from '../../src/mode/mode';
import { getTestingFunctions } from '../testSimplifier';
import { cleanUpWorkspace, setupWorkspace } from './../testUtils';

suite('comment operator', () => {
  const { newTest, newTestOnly, newTestSkip } = getTestingFunctions();

  setup(async () => {
    await setupWorkspace(undefined, '.js');
  });

  teardown(cleanUpWorkspace);

  newTest({
    title: 'gcc comments out current line',
    start: ['first line', '|second line'],
    keysPressed: 'gcc',
    end: ['first line', '|// second line'],
  });

  newTest({
    title: 'gcj comments in current and next line',
    start: ['// first| line', '// second line', 'third line'],
    keysPressed: 'gcj',
    end: ['|first line', 'second line', 'third line'],
  });

  newTest({
    title: 'block comment with motion',
    start: ['function test(arg|1, arg2, arg3) {'],
    keysPressed: 'gCi)',
    end: ['function test(|/* arg1, arg2, arg3 */) {'],
  });

  newTest({
    title: 'block comment in Visual Mode',
    start: ['blah |blah blah'],
    keysPressed: 'vlllgC',
    end: ['blah |/* blah */ blah'],
    endMode: ModeName.Normal,
  });

  newTest({
    title: 'comment in visual line mode',
    start: ['one', '|two', 'three', 'four'],
    keysPressed: 'Vjgc',
    end: ['one', '|// two', '// three', 'four'],
    endMode: ModeName.Normal,
  });

  newTest({
    title: 'comment in visual block mode',
    start: ['one', '|two', 'three', 'four'],
    keysPressed: '<C-v>lljgc',
    end: ['one', '|// two', '// three', 'four'],
    endMode: ModeName.Normal,
  });
});
