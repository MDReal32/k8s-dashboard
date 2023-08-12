export class CommandBuilder {
  private args: string[] = [];
  private separator = " ";

  constructor(private rootCommand: string) {
    this.args.push(rootCommand);
  }

  setSeparator(separator: string) {
    this.separator = separator;
    return this;
  }

  addCommand(command: string) {
    this.args.push(command);
    return this;
  }

  addFlag(name: string) {
    return this.addArgument(name);
  }

  addArgv(value: string) {
    this.args.push(value);
    return this;
  }

  addArgument(name: string, value?: string) {
    const dash = name.length > 1 ? "--" : "-";
    let arg = `${dash}${name}`;
    if (value) {
      arg += `${this.separator}${value}`;
    }
    this.args.push(...arg.split(" "));
    return this;
  }

  and() {
    this.args.push("&&");
    this.args.push(this.rootCommand);
    return this;
  }

  or() {
    this.args.push("||");
    this.args.push(this.rootCommand);
    return this;
  }

  toString() {
    return this.args.join(" ");
  }
}
