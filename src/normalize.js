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

const validEnvVarName = /[a-zA-Z_]+\w*/;
const missingArgs = /\$\w+|%\w+%|\$\{\w+\}/;

/**
 * NOTE: So while the names may be valid, your shell might not support anything besides letters, numbers, and underscores.
 * See details:
 *  https://stackoverflow.com/q/2821043/3047033
 *  https://pubs.opengroup.org/onlinepubs/000095399/basedefs/xbd_chap08.html
 *
 * NOTE:
 *    - sort by descending length to prevent partial replacement
 *    - skip not valid env variables
 *    - inline variable values
 *    - clean up at the end missing variables
 **/
const normalize = (commandArgs, envVariables) => {
  const envVars = Object.keys(envVariables)
    .filter((key) => validEnvVarName.test(key))
    .sort((x, y) => y.length - x.length)
    .map((key) => {
      const argPattern = new RegExp(`\\$${key}|%${key}%|\\$\\{${key}\\}`, 'gi');
      const argValue = envVariables[key];
      return (str) => str.replace(argPattern, argValue);
    });

  return commandArgs
    .map((commandArg) => envVars.reduce((arg, replacer) => replacer(arg), commandArg).replace(missingArgs, ''))
    .filter((commandArg) => commandArg);
};

export { normalize };
