import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
    }
  }

  namespace NodeJS {
    interface Global {
      Date: {
        now(): number;
        prototype: Date;
        new (): Date;
        new (value: number | string | Date): Date;
        new (
          year: number,
          month: number,
          date?: number,
          hours?: number,
          minutes?: number,
          seconds?: number,
          ms?: number
        ): Date;
        UTC(
          year: number,
          month: number,
          date?: number,
          hours?: number,
          minutes?: number,
          seconds?: number,
          ms?: number
        ): number;
        parse(s: string): number;
      };
      console: {
        error: jest.Mock;
        warn: jest.Mock;
      };
    }
  }

  interface Date {
    now(): number;
    new (): Date;
    UTC(
      year: number,
      month: number,
      date?: number,
      hours?: number,
      minutes?: number,
      seconds?: number,
      ms?: number
    ): number;
    parse(s: string): number;
  }
}

declare module "@testing-library/jest-dom" {
  export interface JestAssertion<T = any> extends jest.Matchers<void, T> {}
  export interface AsymmetricMatchersContaining
    extends jest.Matchers<void, any> {}
}
