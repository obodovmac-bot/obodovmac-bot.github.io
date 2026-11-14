import fs from "node:fs";

const file = "node_modules/@capacitor/android/capacitor/src/main/java/com/getcapacitor/WebViewLocalServer.java";
const source = fs.readFileSync(file, "utf8");

if (source.includes("private InputStream openIndex(")) {
  console.log("Capacitor route patch already applied");
  process.exit(0);
}

const oldBlock = `        if (path.equals("/") || (!request.getUrl().getLastPathSegment().contains(".") && html5mode)) {
            InputStream responseStream;
            try {
                String startPath = this.basePath + "/index.html";
                if (bridge.getRouteProcessor() != null) {
                    ProcessedRoute processedRoute = bridge.getRouteProcessor().process(this.basePath, "/index.html");
                    startPath = processedRoute.getPath();
                    isAsset = processedRoute.isAsset();
                }

                if (isAsset) {
                    responseStream = protocolHandler.openAsset(startPath);
                } else {
                    responseStream = protocolHandler.openFile(startPath);
                }
            } catch (IOException e) {
                Logger.error("Unable to open index.html", e);
                return null;
            }`;

const newBlock = `        if (path.equals("/") || (!request.getUrl().getLastPathSegment().contains(".") && html5mode)) {
            InputStream responseStream;
            try {
                String relative = path;
                if (relative == null || relative.isEmpty() || "/".equals(relative)) {
                    relative = "/index.html";
                } else if (relative.endsWith("/")) {
                    relative = relative + "index.html";
                } else {
                    relative = relative + "/index.html";
                }
                responseStream = openIndex(relative);
                if (responseStream == null && !"/index.html".equals(relative)) {
                    responseStream = openIndex("/index.html");
                }
                if (responseStream == null) {
                    Logger.error("Unable to open index.html");
                    return null;
                }
            } catch (IOException e) {
                Logger.error("Unable to open index.html", e);
                return null;
            }`;

const helper = `    private InputStream openIndex(String relative) throws IOException {
        String startPath = this.basePath + relative;
        boolean asset = isAsset;
        if (bridge.getRouteProcessor() != null) {
            ProcessedRoute processedRoute = bridge.getRouteProcessor().process(this.basePath, relative);
            startPath = processedRoute.getPath();
            asset = processedRoute.isAsset();
            isAsset = asset;
        }
        try {
            if (asset) {
                return protocolHandler.openAsset(startPath);
            }
            return protocolHandler.openFile(startPath);
        } catch (IOException ignored) {
            return null;
        }
    }

    private void createHostingDetails() {`;

if (!source.includes(oldBlock) || !source.includes("    private void createHostingDetails() {")) {
  console.error("Capacitor Android sources changed; route patch was not applied.");
  process.exit(1);
}

const patched = source.replace(oldBlock, newBlock).replace("    private void createHostingDetails() {", helper);
fs.writeFileSync(file, patched);
console.log("Capacitor route patch applied");
