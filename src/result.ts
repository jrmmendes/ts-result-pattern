type ResultParams<T> = {
  isSuccess: boolean,
  reason?: string,
  value?: T,
};

export class Result<T> {
  isSuccess : boolean;
  isFailure: boolean;
  reason?: string;
  private _value?: T;

  private constructor({ isSuccess, reason, value }: ResultParams<T>) {
    if (isSuccess && reason) throw new Error(
      'InvalidOperation: a result cannot be sucessful and contain an error'
    );

    if (!isSuccess && !reason) throw new Error(
      'InvalidOperation: a failing result must have an error message'
    );

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    
    this.reason = reason;
    this._value = value;

    Object.freeze(this);
  }

  get value(): T {
    if (this.isFailure) throw new Error(
      'InvalidOperation: cannot get value from failing result'
    )
    return <T>this._value;
  }

  public static ok<U>(value?: U) {
    return new Result<U>({ isSuccess: true, value });
  }

  public static fail<U>(reason: string) {
    return new Result<U>({ isSuccess: false, reason });
  }

  onSuccess(fn: (value: T) => unknown) {
    if (this._value) fn(this._value);
    return this;
  }

  onFailure(fn: (reason: string) => unknown) {
    if (this.reason) fn(this.reason);
    return this;
  }

  public static all(results: Result<unknown>[]) {
    const overallSuccess = results
      .reduce((prev, acc) => prev && acc.isSuccess, true);

    return overallSuccess ? Result.ok() : results.find(r => r.isFailure);
  }
}