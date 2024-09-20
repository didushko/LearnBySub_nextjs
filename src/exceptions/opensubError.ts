export default class OpensubError extends Error {
    status: number | undefined;
    error: Error | undefined;

    constructor(status: number | undefined, message: string, error?: Error) {
        super(message);
        this.status = status;
        this.error = error;
    }

    static unexpectError(message: any | undefined) {
        return new OpensubError(500, message || "Unexpected error with opensub.com", undefined);
    }

    static downloadError(e: Error) {
        return new OpensubError(500, `Error when download from OpenSub: ${e.message}`, e);
    }
}
