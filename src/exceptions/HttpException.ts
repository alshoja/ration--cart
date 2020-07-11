
class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string, res) {
    super(message);
    this.status = status;
    this.message = message;
    res.status(this.status).json({ message: this.message });
  }
}

export default HttpException;