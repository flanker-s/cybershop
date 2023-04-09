export default class ApiError extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static badRequest = (message: string = '') => {
        return new ApiError(400, 'Bad request. ' + message);
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