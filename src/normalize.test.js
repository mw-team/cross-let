'use strict';

import { describe, expect, test } from '@jest/globals';
import { normalize } from './normalize';

describe('normalize arguments', () => {
  describe('correct replace', () => {
    test('simple unix like argument', () => {
      const commandArgument = ['argument=$UNIX_ARG'];
      const env = { UNIX_ARG: 'unix_arg_value' };

      const [normalizedArgument] = normalize(commandArgument, env);

      expect(normalizedArgument).toBe('argument=unix_arg_value');
    });

    test('simple windows like argument', () => {
      const commandArgument = ['argument=%WINDOWS_ARG%'];
      const env = { WINDOWS_ARG: 'windows_arg_value' };

      const [normalizedArgument] = normalize(commandArgument, env);

      expect(normalizedArgument).toBe('argument=windows_arg_value');
    });
  });

  test('prevent partial replacement', () => {
    const commandArgument = ['aaa=$AAA', 'aa=$AA', 'a=$A'];
    const env = {
      A: 'a_arg_value',
      AA: 'aa_arg_value',
      AAA: 'aaa_arg_value',
    };

    const [arg1, arg2, arg3] = normalize(commandArgument, env);

    expect(arg1).toBe('aaa=aaa_arg_value');
    expect(arg2).toBe('aa=aa_arg_value');
    expect(arg3).toBe('a=a_arg_value');
  });
});
