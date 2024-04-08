
export class MockRequest {
  body: { email: string; name: string; password: string; user: string };

  constructor(body: {
    email: string;
    name: string;
    password: string;
    user: string;
  }) {
    this.body = body;
  }
}
