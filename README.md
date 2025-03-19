# Plausible Model Context Protocol Server

MCP Interaction Server for Plausible Analytics

A Model Context Protocol (MCP) server implementation for interacting with the Plausible Analytics API. This server allows AI models to query analytics data from Plausible.

## Local Development

In order to run this client locally, add the following configuration to your Claude Desktop MCP Server config file: 

```
 {
  "mcpServers": {
    "mcp-plausible-local": {
      "command": "node",
      "args": ["/path/to/project/dist/index.js"], <---- replace this with your project path
      "env": {
        "PLAUSIBLE_API_URL": "https://plausible.io/api/v2", 
        "PLAUSIBLE_API_KEY": "test_api_key"
      }
    },
  }
}
```

After this, you should be able to test this implementation in your Claude Desktop App using example prompts like: 

- "Can you provide a daily overview of my analytics for avimbu.com?"
- "Can you generate relevant analytics reports from my Plausible account for the domain avimbu.com?"

Running the server locally: 

```
node dist/index.js
```

With the build in another terminal 

```
npm run watch
```

## Contact 

If you have questions, feel free to contact us via [AVIMBU](https://avimbu.com).