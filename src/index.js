#!/usr/bin/env node --harmony

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

import { exec } from 'child_process';
import { spawn } from 'cross-spawn';
import exit from 'exit';
import { normalize } from './normalize';

let args = process.argv.slice(2);
if (args.length === 1) {
  const [command] = normalize(args, process.env);
  const proc = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error:`, error);
      return;
    }
    process.stdout.write(stdout);
    process.stderr.write(stderr);
    exit(proc.code);
  });
} else {
  args = normalize(args);
  const command = args.shift();
  const proc = spawn.sync(command, args, { stdio: 'inherit' });
  exit(proc.status);
}
