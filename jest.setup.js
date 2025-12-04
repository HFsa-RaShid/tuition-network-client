import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
const fetch = require("node-fetch"); // node-fetch v2 uses require

// Polyfill globals
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.fetch = fetch;
global.Response = fetch.Response; // add Response
global.Request = fetch.Request;   // add Request
global.Headers = fetch.Headers;   // add Headers
