import { Server } from "npm:@modelcontextprotocol/sdk/server";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk/stdio";
import { basename, resolve, toFileUrl } from "https://deno.land/std/path/mod.ts";

function parseArgs(args: string[]): string {
  let filePath: string | undefined;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--file" || arg === "-f") {
      filePath = args[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith("--file=")) {
      filePath = arg.slice("--file=".length);
      continue;
    }
  }

  if (!filePath) {
    console.error("Missing required option: --file=/path/to/menu.txt");
    Deno.exit(1);
  }

  return filePath;
}

async function main() {
  const filePath = parseArgs([...Deno.args]);
  const absolutePath = resolve(filePath);
  const fileUri = toFileUrl(absolutePath).href;
  const resourceName = basename(absolutePath) || "menu.txt";

  const menuResource = {
    uri: fileUri,
    name: resourceName,
    description: `Text representation of ${resourceName}.`,
    mimeType: "text/plain",
  } as const;

  const server = new Server({
    name: "cocoichi-menu-deno",
    version: "0.1.0",
  });

  server.setRequestHandler("resources/list", async () => ({
    resources: [menuResource],
  }));

  server.setRequestHandler("resources/read", async ({ uri }) => {
    if (uri !== menuResource.uri) {
      throw new Error(`Unknown resource URI: ${uri}`);
    }

    const text = await Deno.readTextFile(absolutePath);

    return {
      contents: [
        {
          uri: menuResource.uri,
          mimeType: menuResource.mimeType,
          text,
        },
      ],
    };
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error);
    Deno.exit(1);
  });
}
