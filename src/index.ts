#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { QueryArgs, queryTool } from "./plausible/query.js";
import { plausibleClient } from "./plausible/client.js";

const server = new Server(
  {
    name: "plausible-model-context-protocol-server",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [queryTool],
  };
});

server.setRequestHandler(
  CallToolRequestSchema,
  async (request: CallToolRequest) => {
    try {
      if (!request.params.arguments) {
        throw new Error("Arguments are required");
      }

      switch (request.params.name) {
        case "plausible_query": {
          const args = request.params.arguments as unknown as QueryArgs;
          if (!args.site_id || !args.metrics || !args.date_range) {
            throw new Error(
              "Missing required arguments: site_id, metrics, and date_range"
            );
          }
          const response = await plausibleClient.query(
            args.site_id,
            args.metrics,
            args.date_range
          );
          return {
            content: [{ type: "text", text: JSON.stringify(response) }],
          };
        }

        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    } catch (error) {
      console.error("Error executing tool:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error instanceof Error ? error.message : String(error),
            }),
          },
        ],
      };
    }
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Plausible MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
