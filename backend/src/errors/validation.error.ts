export class ValidationError extends Error {
    issues: string[];
    constructor(issues: string[]) {
        super("Validation failed");
        this.issues = issues
        this.name = "ValidationError"
    }
}