export class MockResponse {
  private statusCode: number | undefined;
  private responseData: any;

  constructor() {
    this.statusCode = undefined;
    this.responseData = undefined;
  }

  status(code: number) {
    this.statusCode = code;
    return this;
  }

  json(data: any) {
    this.responseData = data;
    return this;
  }
}