import { Express, json, Router } from 'express';
import { corsMw } from '../middlewares/corsMw';
import { allowedMethods } from '../middlewares/options';
import { notFound } from '../middlewares/notFound';

interface ServerConfigProps {
    app: Express;
    baseRouter: {
        url: string;
        router: Router;
    };
}

export default ({
    app,
    baseRouter: {
        url,
        router
    }
}: ServerConfigProps) => {
    app.disable('x-powered-by');
    app.use(json());
    app.use(corsMw());
    allowedMethods({
        router: app,
        route: url,
        methods: ["GET", "POST", "PATCH", "DELETE"]
    })
    app.get(url, (_, res) => res.json({ message: "Welcome to the API" }))
    app.use(url, router);
    app.use(notFound);
    return { app }
};