export class Command {
  protected cmd(...command: (string | string[])[]) {
    return (Array.isArray(command) ? command : [command])
      .reduce<string>((cmd, arg) => `${cmd} ${Array.isArray(arg) ? arg.join(" ") : arg}`, "")
      .trim();
  }

  protected getArgs(options: object): string[] {
    const args: string[] = [];

    for (const option in options) {
      const value = options[option];
      if (value) {
        args.push(`--${this.fixOption(option)}`);
        if (typeof value !== "boolean") {
          args.push(value.toString());
        }
      }
    }

    return args;
  }

  protected fixOption(option: string) {
    return option.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
}
