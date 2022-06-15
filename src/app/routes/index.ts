import * as Hapi from "@hapi/hapi";
import { jobRoutes } from "./v1/JobRoutes";

export function registerRoutes(server: Hapi.Server) {
  server.route(jobRoutes);
  server.route({
    method: "*",
    path: "/{any*}",
    handler: (request, h) =>
      h
        .response({
          success: false,
          message: "Url not found!",
        })
        .code(404),
  });
}
