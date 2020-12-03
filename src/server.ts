import express from "express";
import next from "next";

import { createProxyMiddleware } from "http-proxy-middleware";

const devProxy = {
  "/v1": {
    target: "https://api.500px.com",
    changeOrigin: true,
    pathRewrite: {
      "^/v1": "/v1",
    },
  },
};

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    if (dev && devProxy) {
      Object.keys(devProxy).forEach((api: string) => {
        // @ts-ignore
        server.use(api, createProxyMiddleware(devProxy[api]));
      });
    }

    server.all("*", (req, res) => {
      handle(req, res);
    });
    // @ts-ignore
    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("An error occurred, unable to start the server");
    console.log(err);
  });
