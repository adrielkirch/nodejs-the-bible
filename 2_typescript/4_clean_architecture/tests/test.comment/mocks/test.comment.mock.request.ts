export class MockRequest {
  body: {
    _id: string;
    title: string;
    text: string;
    taskId: string;
  };
  params?: any;

  constructor(
    body: {
      _id: string;
      title: string;
      text: string;
      taskId: string;
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
