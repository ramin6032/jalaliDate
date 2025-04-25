import "@testing-library/jest-dom";

declare global {
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
        parse(dateString: string): number;
      };
      console: {
        error: jest.Mock;
        warn: jest.Mock;
      };
    }
  }

  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
    }
  }

  interface JestAssertion<T = any> extends jest.Matchers<void, T> {}
  interface AsymmetricMatchersContaining extends jest.Matchers<void, any> {}
}

declare module "@testing-library/jest-dom" {
  export interface JestAssertion<T = any> extends jest.Matchers<void, T> {}
  export interface AsymmetricMatchersContaining
    extends jest.Matchers<void, any> {}
}
