export class CustomError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
    };
};

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(404, message);
    };
};