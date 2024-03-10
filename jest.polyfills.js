
const { TextDecoder, TextEncoder, ReadableStream} = require('node:util')
const {clearImmediate} = require('node:timers')

Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
    ReadableStream: { value: ReadableStream },
    clearImmediate: {value: clearImmediate},
})

const { Blob, File } = require('node:buffer')
const { fetch, Headers, FormData, Request, Response } = require('undici')

Object.defineProperties(globalThis, {
    fetch: { value: fetch, writable: true },
    Blob: { value: Blob },
    File: { value: File },
    Headers: { value: Headers },
    FormData: { value: FormData },
    Request: { value: Request },
    Response: { value: Response },
})