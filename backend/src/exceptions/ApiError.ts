export default class ApiError extends Error {
    status: number;
    message: string;
    errors: object;

    constructor(status: number, message: string, errors: object = {}) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static badRequest = (message: string = '', errors: object = {}) => {
        return new ApiError(400, 'Bad request. ' + message, errors);
    }
    static unauthorized = () => {
        return new ApiError(401, 'Unauthorized');
    }
    static forbidden = () => {
        return new ApiError(403, 'Forbidden');
    }
    static exists = (type: string, id: string) => {
        const prefix = type + ' id:' + id;
        return new ApiError(409, prefix + ' already exists');
    }
    static notFound = (type: string, id: string) => {
        const prefix = type + ' id:' + id;
        return new ApiError(404, prefix + ' not found');
    }
}