import {log} from "./Log";

type Listener = (name: string, value: string) => void;

interface Changes {
  [key: string]: any;
}

interface FieldErrors {
  [key: string]: string[];
}

interface Originals {
  [key: string]: any;
}

export class Changeset {
  private originals: Originals = {};
  private changes: Changes = {};
  private responseError: string | null = null;
  private fieldErrors: FieldErrors = {};
  private listeners: Listener[] = [];

  constructor(originals: Originals = {}) {
    this.originals = originals || {};
  }

  // Values

  public getValue(name: string): any {
    if (this.changes.hasOwnProperty(name)) {
      return this.getChange(name);
    } else if (this.originals.hasOwnProperty(name)) {
      return this.getOriginal(name);
    } else {
      return null;
    }
  }

  public getValues(): Originals {
    return {...this.originals, ...this.changes};
  }

  // Originals

  public setOriginals(originals: Originals): void {
    this.originals = originals || {};
  }

  public getOriginal(name: string): any {
    if (this.originals.hasOwnProperty(name)) {
      return this.originals[name];
    } else {
      return null;
    }
  }

  public getOriginals(): Originals {
    return this.originals;
  }

  // Changes

  public change(name: string, value: any): void {
    this.changes[name] = value;
    this.listeners.forEach((listener: Listener) => {
      try {
        listener(name, value);
      } catch (error) {
        log("error", error);
      }
    });
  }

  public getChange(name: string): any {
    if (this.changes.hasOwnProperty(name)) {
      return this.changes[name];
    } else {
      return null;
    }
  }

  public getChanges(): Originals {
    return this.changes;
  }

  public hasAnyChanges(): boolean {
    for (const name in this.changes) {
      if (this.hasChange(name)) { return true; }
    }
    return false;
  }

  public hasChange(name: string): boolean {
    const change = this.getChange(name);
    return (
      this.changes.hasOwnProperty(name) &&
      this.changes[name] !== this.getOriginal(name)
    );
  }

  public clearChanges(): void {
    this.changes = {};
  }

  // Field Errors

  public setFieldErrors(fieldErrors: FieldErrors): void {
    this.fieldErrors = fieldErrors || {};
  }

  public setFieldError(name: string, errors: string[]): void {
    this.fieldErrors[name] = errors;
  }

  public getFieldError(name: string): string[] {
    return this.fieldErrors[name];
  }

  public hasFieldError(name: string): boolean {
    return this.getFieldError(name) ? true : false;
  }

  // Response Error

  public setResponseError(error: string | null): void {
    this.responseError = error;
  }

  public getResponseError(): string | null {
    return this.responseError;
  }

  public hasResponseError(): boolean {
    return this.getResponseError() ? true : false;
  }

  // Errors

  public clearErrors(): void {
    this.setFieldErrors({});
    this.setResponseError(null);
  }

  // Handlers

  public errorResponse(response?: {[key: string]: any}): void {
    if (!response) {
      this.setResponseError("something went wrong");
    } else if (response.error_type === "changeset") {
      this.setFieldErrors(response.errors);
      this.setResponseError("please fix the errors below");
    } else if (response.errors && response.errors.detail) {
      this.setResponseError(response.errors.detail);
    } else {
      log("error", "unknown response error", response);
      this.setResponseError("something went wrong");
    }
  }

  public validationErrors(errors: {[name: string]: string[]}): void {
    this.setFieldErrors(errors);
    this.setResponseError("please fix the errors below");
  }

  // Listeners

  public listen(listener: (name: string, value: any) => void): void {
    this.listeners.push(listener);
  }
}
