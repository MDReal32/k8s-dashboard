export type FixName<T extends string> = T extends `${infer F}-${infer R}`
  ? `${F}${Capitalize<R>}`
  : T;
export const fixName = <T extends string>(name: T): FixName<T> =>
  name.replace(/-(\w)/g, (_, c) => c.toUpperCase()) as FixName<T>;
