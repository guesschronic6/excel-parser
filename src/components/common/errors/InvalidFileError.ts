class InvalidFileError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default InvalidFileError;
