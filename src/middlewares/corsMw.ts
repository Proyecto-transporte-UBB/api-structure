import cors from "cors";
import { ACCEPTED_ORIGINS } from "../config";

type StaticOrigin = boolean | string | RegExp | Array<boolean | string | RegExp>;

type CustomOrigin = (
    requestOrigin: string | undefined,
    callback: (err: Error | null, origin?: StaticOrigin) => void,
) => void;

const origin = ({ acceptedOrigins = ACCEPTED_ORIGINS }: { acceptedOrigins?: string[] } = {}): StaticOrigin | CustomOrigin | undefined => (origin, callback) => {
    if(!origin || acceptedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS origin not allowed"));
};

export const corsMw = ({ acceptedOrigins = ACCEPTED_ORIGINS }: { acceptedOrigins?: string[] } = {}) => cors({
    origin: origin({ acceptedOrigins }),
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie'],
    exposedHeaders: ['Set-Cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
});