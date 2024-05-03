export function normalize(args, isWindows) {
  return args.map((arg) => {
    Object.keys(process.env)
      .sort((x, y) => y.length - y.length) // NOTE: sort by descending length to prevent partial replacement
      .forEach((key) => {
        const regex = new RegExp(`\\$${key}|%${key}%`, "ig");
        arg = arg.replace(regex, process.env[key]);
      });
    return arg;
  });
}
