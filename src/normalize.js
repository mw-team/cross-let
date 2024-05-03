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

const normalize = (args, envVariables) => {
  return args.map(arg => {
    Object.keys(envVariables)
      // NOTE: sort by descending length to prevent partial replacement
      .sort((x, y) => y.length - x.length)
      .forEach(key => {
        const regex = new RegExp(`\\$${key}|%${key}%`, 'ig');
        arg = arg.replace(regex, envVariables[key]);
      });
    return arg;
  });
};

export { normalize };
