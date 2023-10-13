import { Observable } from "rxjs";

export type RxApiStream<T> = Observable<T> & {
  promisify: () => Promise<T>;
  abort: () => void;
};
