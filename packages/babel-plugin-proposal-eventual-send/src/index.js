import { declare } from "@babel/helper-plugin-utils";
import syntaxEventualSend from "babel-plugin-syntax-eventual-send";
import makeVisitor from "./makeVisitor";

const targetGlobals = ['Promise', 'HandledPromise'];

export default declare((api, options) => {
  api.assertVersion(7);
  const { targetGlobal } = options;

  if (typeof targetGlobal !== "string" || !targetGlobals.includes(targetGlobal)) {
    throw new Error(
      "The eventual send plugin requires a 'targetGlobal' option." +
        "'targetGlobal' must be one of: " +
        targetGlobals.join(", ") +
        ".",
    );
  }

  return {
    name: "proposal-eventual-send",
    inherits: syntaxEventualSend,
    visitor: makeVisitor(targetGlobal),
  };
});