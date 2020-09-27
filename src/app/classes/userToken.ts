export class UserToken {
    constructor(
        public userName: string,
        public lifetime: string,
        public token: string) { }
}