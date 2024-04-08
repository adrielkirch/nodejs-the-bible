export class MockRequest {
  body: {
    _id: string;
    title: string;
    text: string;
    assignTo: string;
    expirationDate: string;
    remindDate: string;
  };
  params?: any;

  constructor(
    body: {
      _id: string;
      title: string;
      text: string;
      assignTo: string;
      expirationDate: string;
      remindDate: string;
    },
    id?: string
  ) {
    this.body = {
      ...body,
      _id: id,
    };
    this.params = {};
  }
}
