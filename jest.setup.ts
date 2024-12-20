import "@testing-library/jest-dom"
import {TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder} from "util"

global.TextEncoder = NodeTextEncoder
global.TextDecoder = NodeTextDecoder as typeof TextDecoder

// disable mongoose warning
process.env.SUPPRESS_JEST_WARNINGS = 'true';


// matchMedia error (probebly for react hot toast)
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // قدیمی، اما ممکن است استفاده شده باشد
        removeListener: jest.fn(), // قدیمی، اما ممکن است استفاده شده باشد
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });