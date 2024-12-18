import "@testing-library/jest-dom"
import {TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder} from "util"

global.TextEncoder = NodeTextEncoder
global.TextDecoder = NodeTextDecoder as typeof TextDecoder

// disable mongoose warning
process.env.SUPPRESS_JEST_WARNINGS = 'true';

