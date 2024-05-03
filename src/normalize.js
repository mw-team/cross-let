export function normalize(args, envVariables, isWindows) {
  return args.map((arg) => {
    Object.keys(envVariables)
      .sort((x, y) => y.length - y.length) // NOTE: sort by descending length to prevent partial replacement
      .forEach((key) => {
        const regex = new RegExp(`\\$${key}|%${key}%`, "ig");
        arg = arg.replace(regex, envVariables[key]);
      });
    return arg;
  });
}
