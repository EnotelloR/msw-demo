import {mockPosts} from "./handlers/mockPosts/mockPosts";
import {setupWorker} from "msw/browser";
// @ts-expect-error Known issue
import {UnhandledRequestPrint} from "msw/lib/core/utils/request/onUnhandledRequest";

const handlers = [...mockPosts]
export const worker = setupWorker(...handlers);

export const onUnhandledRequest = (request: Request, print: UnhandledRequestPrint) => {
  const excludedExtensions = ['.woff2', '.css', '.tsx', '.ts']
  const isExcluded = excludedExtensions.some((extension: string) => request.url.endsWith(extension))
  if (isExcluded) {
    return
  }
  print.warning()
};

worker.start({
  onUnhandledRequest
})
