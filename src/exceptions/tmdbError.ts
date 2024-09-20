export default class TmdbError extends Error {
    status: number | undefined;
    error: Error | undefined;

    constructor(status: number | undefined, message: string, error?: Error) {
        super(message);
        this.status = status;
        this.error = error;
    }

    static unexpectError(message?: any) {
        return new TmdbError(
          500,
          message || "Unexpected error with tbdb",
          undefined
        );
    }
}
