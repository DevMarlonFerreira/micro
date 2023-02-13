import crypto from 'node:crypto';

interface AuthProps {
    username: string;
    password: string;
}

export class Auth {
    private _id: string;
    private props: AuthProps;

    get id(): string {
        return this._id;
    }

    get username(): string {
        return this.props.username;
    }

    get password(): string {
        return this.props.password;
    }

    constructor(props: AuthProps, id?: string) {
        this._id = id ?? crypto.randomUUID();
        this.props = props;
    }
}