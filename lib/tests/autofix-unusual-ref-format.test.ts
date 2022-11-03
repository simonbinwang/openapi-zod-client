import { getZodiosEndpointDefinitionList } from "../src";
import { expect, test } from "vitest";

test("autofix-unusual-ref-format", () => {
    expect(
        getZodiosEndpointDefinitionList({
            openapi: "3.0.3",
            info: { version: "1", title: "Example API" },
            paths: {
                "/usual-ref-format": {
                    get: {
                        operationId: "getWithUsualRefFormat",
                        responses: {
                            "200": {
                                content: { "application/json": { schema: { $ref: "#/components/schemas/Basic" } } },
                            },
                        },
                    },
                },
                "/unusual-ref-format": {
                    get: {
                        operationId: "getWithUnusualRefFormat",
                        responses: {
                            "200": {
                                content: { "application/json": { schema: { $ref: "#components/schemas/Basic" } } },
                            },
                        },
                    },
                },
            },
            components: {
                schemas: {
                    Basic: { type: "string" },
                },
            },
        })
    ).toMatchInlineSnapshot(`
      {
          "deepDependencyGraph": {},
          "endpoints": [
              {
                  "alias": "getWithUsualRefFormat",
                  "description": undefined,
                  "errors": [],
                  "method": "get",
                  "parameters": [],
                  "path": "/usual-ref-format",
                  "requestFormat": "json",
                  "response": "z.string()",
              },
              {
                  "alias": "getWithUnusualRefFormat",
                  "description": undefined,
                  "errors": [],
                  "method": "get",
                  "parameters": [],
                  "path": "/unusual-ref-format",
                  "requestFormat": "json",
                  "response": "z.string()",
              },
          ],
          "getSchemaByRef": [Function],
          "refsDependencyGraph": {},
          "schemaByName": {},
          "zodSchemaByName": {
              "Basic": "z.string()",
          },
      }
    `);
});