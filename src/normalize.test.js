/*
 * SonarQube, open source software quality management tool.
 * Copyright (C) 2008-2013 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * SonarQube is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * SonarQube is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
'use strict';

import { describe, expect, test } from '@jest/globals';
import { normalize } from './normalize';

describe('normalize', () => {
  describe('replace different type of arguments', () => {
    it('should replace unix like argument', () => {
      const commandArgument = ['argument=$UNIX_ARG'];
      const env = { UNIX_ARG: 'unix_arg_value' };

      const [normalizedArgument] = normalize(commandArgument, env);
      expect(normalizedArgument).toBe('argument=unix_arg_value');
    });

    it('should replace windows like argument', () => {
      const commandArgument = ['argument=%WINDOWS_ARG%'];
      const env = { WINDOWS_ARG: 'windows_arg_value' };

      const [normalizedArgument] = normalize(commandArgument, env);
      expect(normalizedArgument).toBe('argument=windows_arg_value');
    });
  });

  it('should prevent partial replacement', () => {
    const commandArgument = ['aaa=$AAA', 'aa=$AA', 'a=$A'];
    const env = {
      A: 'a_arg_value',
      AA: 'aa_arg_value',
      AAA: 'aaa_arg_value',
    };

    const normalizedArguments = normalize(commandArgument, env);
    expect(normalizedArguments).toEqual(['aaa=aaa_arg_value', 'aa=aa_arg_value', 'a=a_arg_value']);
  });
});
