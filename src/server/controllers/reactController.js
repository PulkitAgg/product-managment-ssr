import { matchPath } from "react-router-dom";
import routes from "../../react/routes";
import template from "../renderFunction/template";
import render from "../renderFunction/render";
import "@babel/polyfill";

exports.servePages = function (req, res, next) {
    const promises = routes.reduce((acc, route) => {
        if (matchPath(req.url, route) && route.component && route.component.initialAction) {
            acc.push(Promise.resolve(route.component.initialAction()));
        }
        return acc;
    }, []);

    Promise.all(promises)
        .then(() => {
            const response = template("Product Managment", render(req))
            res.send(response);
        })
        .catch(next);
}