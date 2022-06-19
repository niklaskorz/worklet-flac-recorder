(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/libflacjs/dist/libflac.wasm.js
  var require_libflac_wasm = __commonJS({
    "node_modules/libflacjs/dist/libflac.wasm.js"(exports, module) {
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define(["module", "require"], factory.bind(null, root));
        } else if (typeof module === "object" && module.exports) {
          var env = typeof process !== "undefined" && process && process.env ? process.env : root;
          factory(env, module, module.require);
        } else {
          root.Flac = factory(root);
        }
      })(typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : exports, function(global, expLib, require2) {
        "use strict";
        var Module2 = Module2 || {};
        var _flac_ready = false;
        Module2["onRuntimeInitialized"] = function() {
          _flac_ready = true;
          if (!_exported) {
            setTimeout(function() {
              do_fire_event("ready", [{ type: "ready", target: _exported }], true);
            }, 0);
          } else {
            do_fire_event("ready", [{ type: "ready", target: _exported }], true);
          }
        };
        if (global && global.FLAC_SCRIPT_LOCATION) {
          Module2["locateFile"] = function(fileName) {
            var path = global.FLAC_SCRIPT_LOCATION || "";
            if (path[fileName]) {
              return path[fileName];
            }
            path += path && !/\/$/.test(path) ? "/" : "";
            return path + fileName;
          };
          var readBinary = function(filePath) {
            if (ENVIRONMENT_IS_NODE) {
              var ret = read_(filePath, true);
              if (!ret.buffer) {
                ret = new Uint8Array(ret);
              }
              assert2(ret.buffer);
              return ret;
            }
            return new Promise(function(resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.responseType = "arraybuffer";
              xhr.addEventListener("load", function(evt) {
                resolve(xhr.response);
              });
              xhr.addEventListener("error", function(err2) {
                reject(err2);
              });
              xhr.open("GET", filePath);
              xhr.send();
            });
          };
        }
        if (global && typeof global.fetch === "function") {
          var _fetch = global.fetch;
          global.fetch = function(url) {
            return _fetch.apply(null, arguments).catch(function(err2) {
              try {
                var result = readBinary(url);
                if (result && result.catch) {
                  result.catch(function(_err) {
                    throw err2;
                  });
                }
                return result;
              } catch (_err) {
                throw err2;
              }
            });
          };
        }
        var moduleOverrides = {};
        var key;
        for (key in Module2) {
          if (Module2.hasOwnProperty(key)) {
            moduleOverrides[key] = Module2[key];
          }
        }
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = function(status, toThrow) {
          throw toThrow;
        };
        var ENVIRONMENT_IS_WEB = false;
        var ENVIRONMENT_IS_WORKER = false;
        var ENVIRONMENT_IS_NODE = false;
        var ENVIRONMENT_IS_SHELL = false;
        ENVIRONMENT_IS_WEB = typeof window === "object";
        ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
        ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
        ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
        var scriptDirectory = "";
        function locateFile(path) {
          if (Module2["locateFile"]) {
            return Module2["locateFile"](path, scriptDirectory);
          }
          return scriptDirectory + path;
        }
        var read_, readAsync, readBinary, setWindowTitle;
        var nodeFS;
        var nodePath;
        if (ENVIRONMENT_IS_NODE) {
          if (ENVIRONMENT_IS_WORKER) {
            scriptDirectory = require2("path").dirname(scriptDirectory) + "/";
          } else {
            scriptDirectory = __dirname + "/";
          }
          read_ = function shell_read(filename, binary) {
            if (!nodeFS)
              nodeFS = require2("fs");
            if (!nodePath)
              nodePath = require2("path");
            filename = nodePath["normalize"](filename);
            return nodeFS["readFileSync"](filename, binary ? null : "utf8");
          };
          readBinary = function readBinary2(filename) {
            var ret = read_(filename, true);
            if (!ret.buffer) {
              ret = new Uint8Array(ret);
            }
            assert2(ret.buffer);
            return ret;
          };
          if (process["argv"].length > 1) {
            thisProgram = process["argv"][1].replace(/\\/g, "/");
          }
          arguments_ = process["argv"].slice(2);
          if (typeof module !== "undefined") {
            module["exports"] = Module2;
          }
          quit_ = function(status) {
            process["exit"](status);
          };
          Module2["inspect"] = function() {
            return "[Emscripten Module object]";
          };
        } else if (ENVIRONMENT_IS_SHELL) {
          if (typeof read != "undefined") {
            read_ = function shell_read(f) {
              return read(f);
            };
          }
          readBinary = function readBinary2(f) {
            var data;
            if (typeof readbuffer === "function") {
              return new Uint8Array(readbuffer(f));
            }
            data = read(f, "binary");
            assert2(typeof data === "object");
            return data;
          };
          if (typeof scriptArgs != "undefined") {
            arguments_ = scriptArgs;
          } else if (typeof arguments != "undefined") {
            arguments_ = arguments;
          }
          if (typeof quit === "function") {
            quit_ = function(status) {
              quit(status);
            };
          }
          if (typeof print !== "undefined") {
            if (typeof console === "undefined")
              console = {};
            console.log = print;
            console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
          }
        } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
          if (ENVIRONMENT_IS_WORKER) {
            scriptDirectory = self.location.href;
          } else if (document.currentScript) {
            scriptDirectory = document.currentScript.src;
          }
          if (scriptDirectory.indexOf("blob:") !== 0) {
            scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
          } else {
            scriptDirectory = "";
          }
          {
            read_ = function shell_read(url) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.send(null);
              return xhr.responseText;
            };
            if (ENVIRONMENT_IS_WORKER) {
              readBinary = function readBinary2(url) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(xhr.response);
              };
            }
            readAsync = function readAsync2(url, onload, onerror) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, true);
              xhr.responseType = "arraybuffer";
              xhr.onload = function xhr_onload() {
                if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                  onload(xhr.response);
                  return;
                }
                onerror();
              };
              xhr.onerror = onerror;
              xhr.send(null);
            };
          }
          setWindowTitle = function(title) {
            document.title = title;
          };
        } else {
        }
        var out = Module2["print"] || console.log.bind(console);
        var err = Module2["printErr"] || console.warn.bind(console);
        for (key in moduleOverrides) {
          if (moduleOverrides.hasOwnProperty(key)) {
            Module2[key] = moduleOverrides[key];
          }
        }
        moduleOverrides = null;
        if (Module2["arguments"])
          arguments_ = Module2["arguments"];
        if (Module2["thisProgram"])
          thisProgram = Module2["thisProgram"];
        if (Module2["quit"])
          quit_ = Module2["quit"];
        var STACK_ALIGN = 16;
        function dynamicAlloc(size) {
          var ret = HEAP32[DYNAMICTOP_PTR >> 2];
          var end = ret + size + 15 & -16;
          HEAP32[DYNAMICTOP_PTR >> 2] = end;
          return ret;
        }
        function alignMemory(size, factor) {
          if (!factor)
            factor = STACK_ALIGN;
          return Math.ceil(size / factor) * factor;
        }
        function getNativeTypeSize(type) {
          switch (type) {
            case "i1":
            case "i8":
              return 1;
            case "i16":
              return 2;
            case "i32":
              return 4;
            case "i64":
              return 8;
            case "float":
              return 4;
            case "double":
              return 8;
            default: {
              if (type[type.length - 1] === "*") {
                return 4;
              } else if (type[0] === "i") {
                var bits = Number(type.substr(1));
                assert2(bits % 8 === 0, "getNativeTypeSize invalid bits " + bits + ", type " + type);
                return bits / 8;
              } else {
                return 0;
              }
            }
          }
        }
        function warnOnce(text) {
          if (!warnOnce.shown)
            warnOnce.shown = {};
          if (!warnOnce.shown[text]) {
            warnOnce.shown[text] = 1;
            err(text);
          }
        }
        function convertJsFunctionToWasm(func, sig) {
          if (typeof WebAssembly.Function === "function") {
            var typeNames = {
              "i": "i32",
              "j": "i64",
              "f": "f32",
              "d": "f64"
            };
            var type = {
              parameters: [],
              results: sig[0] == "v" ? [] : [typeNames[sig[0]]]
            };
            for (var i = 1; i < sig.length; ++i) {
              type.parameters.push(typeNames[sig[i]]);
            }
            return new WebAssembly.Function(type, func);
          }
          var typeSection = [
            1,
            0,
            1,
            96
          ];
          var sigRet = sig.slice(0, 1);
          var sigParam = sig.slice(1);
          var typeCodes = {
            "i": 127,
            "j": 126,
            "f": 125,
            "d": 124
          };
          typeSection.push(sigParam.length);
          for (var i = 0; i < sigParam.length; ++i) {
            typeSection.push(typeCodes[sigParam[i]]);
          }
          if (sigRet == "v") {
            typeSection.push(0);
          } else {
            typeSection = typeSection.concat([1, typeCodes[sigRet]]);
          }
          typeSection[1] = typeSection.length - 2;
          var bytes = new Uint8Array([
            0,
            97,
            115,
            109,
            1,
            0,
            0,
            0
          ].concat(typeSection, [
            2,
            7,
            1,
            1,
            101,
            1,
            102,
            0,
            0,
            7,
            5,
            1,
            1,
            102,
            0,
            0
          ]));
          var module2 = new WebAssembly.Module(bytes);
          var instance = new WebAssembly.Instance(module2, {
            "e": {
              "f": func
            }
          });
          var wrappedFunc = instance.exports["f"];
          return wrappedFunc;
        }
        var freeTableIndexes = [];
        var functionsInTableMap;
        function addFunctionWasm(func, sig) {
          var table = wasmTable;
          if (!functionsInTableMap) {
            functionsInTableMap = /* @__PURE__ */ new WeakMap();
            for (var i = 0; i < table.length; i++) {
              var item = table.get(i);
              if (item) {
                functionsInTableMap.set(item, i);
              }
            }
          }
          if (functionsInTableMap.has(func)) {
            return functionsInTableMap.get(func);
          }
          var ret;
          if (freeTableIndexes.length) {
            ret = freeTableIndexes.pop();
          } else {
            ret = table.length;
            try {
              table.grow(1);
            } catch (err2) {
              if (!(err2 instanceof RangeError)) {
                throw err2;
              }
              throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
            }
          }
          try {
            table.set(ret, func);
          } catch (err2) {
            if (!(err2 instanceof TypeError)) {
              throw err2;
            }
            var wrapped = convertJsFunctionToWasm(func, sig);
            table.set(ret, wrapped);
          }
          functionsInTableMap.set(func, ret);
          return ret;
        }
        function removeFunctionWasm(index) {
          functionsInTableMap.delete(wasmTable.get(index));
          freeTableIndexes.push(index);
        }
        function addFunction(func, sig) {
          return addFunctionWasm(func, sig);
        }
        function removeFunction(index) {
          removeFunctionWasm(index);
        }
        var funcWrappers = {};
        function getFuncWrapper(func, sig) {
          if (!func)
            return;
          assert2(sig);
          if (!funcWrappers[sig]) {
            funcWrappers[sig] = {};
          }
          var sigCache = funcWrappers[sig];
          if (!sigCache[func]) {
            if (sig.length === 1) {
              sigCache[func] = function dynCall_wrapper() {
                return dynCall(sig, func);
              };
            } else if (sig.length === 2) {
              sigCache[func] = function dynCall_wrapper(arg) {
                return dynCall(sig, func, [arg]);
              };
            } else {
              sigCache[func] = function dynCall_wrapper() {
                return dynCall(sig, func, Array.prototype.slice.call(arguments));
              };
            }
          }
          return sigCache[func];
        }
        function makeBigInt(low, high, unsigned) {
          return unsigned ? +(low >>> 0) + +(high >>> 0) * 4294967296 : +(low >>> 0) + +(high | 0) * 4294967296;
        }
        function dynCall(sig, ptr, args) {
          if (args && args.length) {
            return Module2["dynCall_" + sig].apply(null, [ptr].concat(args));
          } else {
            return Module2["dynCall_" + sig].call(null, ptr);
          }
        }
        var tempRet0 = 0;
        var setTempRet0 = function(value) {
          tempRet0 = value;
        };
        var getTempRet0 = function() {
          return tempRet0;
        };
        var GLOBAL_BASE = 1024;
        var wasmBinary;
        if (Module2["wasmBinary"])
          wasmBinary = Module2["wasmBinary"];
        var noExitRuntime;
        if (Module2["noExitRuntime"])
          noExitRuntime = Module2["noExitRuntime"];
        if (typeof WebAssembly !== "object") {
          abort("no native wasm support detected");
        }
        function setValue(ptr, value, type, noSafe) {
          type = type || "i8";
          if (type.charAt(type.length - 1) === "*")
            type = "i32";
          switch (type) {
            case "i1":
              HEAP8[ptr >> 0] = value;
              break;
            case "i8":
              HEAP8[ptr >> 0] = value;
              break;
            case "i16":
              HEAP16[ptr >> 1] = value;
              break;
            case "i32":
              HEAP32[ptr >> 2] = value;
              break;
            case "i64":
              tempI64 = [value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
              break;
            case "float":
              HEAPF32[ptr >> 2] = value;
              break;
            case "double":
              HEAPF64[ptr >> 3] = value;
              break;
            default:
              abort("invalid type for setValue: " + type);
          }
        }
        function getValue(ptr, type, noSafe) {
          type = type || "i8";
          if (type.charAt(type.length - 1) === "*")
            type = "i32";
          switch (type) {
            case "i1":
              return HEAP8[ptr >> 0];
            case "i8":
              return HEAP8[ptr >> 0];
            case "i16":
              return HEAP16[ptr >> 1];
            case "i32":
              return HEAP32[ptr >> 2];
            case "i64":
              return HEAP32[ptr >> 2];
            case "float":
              return HEAPF32[ptr >> 2];
            case "double":
              return HEAPF64[ptr >> 3];
            default:
              abort("invalid type for getValue: " + type);
          }
          return null;
        }
        var wasmMemory;
        var wasmTable = new WebAssembly.Table({
          "initial": 22,
          "maximum": 22 + 5,
          "element": "anyfunc"
        });
        var ABORT = false;
        var EXITSTATUS = 0;
        function assert2(condition, text) {
          if (!condition) {
            abort("Assertion failed: " + text);
          }
        }
        function getCFunc(ident) {
          var func = Module2["_" + ident];
          assert2(func, "Cannot call unknown function " + ident + ", make sure it is exported");
          return func;
        }
        function ccall(ident, returnType, argTypes, args, opts) {
          var toC = {
            "string": function(str) {
              var ret2 = 0;
              if (str !== null && str !== void 0 && str !== 0) {
                var len = (str.length << 2) + 1;
                ret2 = stackAlloc(len);
                stringToUTF8(str, ret2, len);
              }
              return ret2;
            },
            "array": function(arr) {
              var ret2 = stackAlloc(arr.length);
              writeArrayToMemory(arr, ret2);
              return ret2;
            }
          };
          function convertReturnValue(ret2) {
            if (returnType === "string")
              return UTF8ToString(ret2);
            if (returnType === "boolean")
              return Boolean(ret2);
            return ret2;
          }
          var func = getCFunc(ident);
          var cArgs = [];
          var stack = 0;
          if (args) {
            for (var i = 0; i < args.length; i++) {
              var converter = toC[argTypes[i]];
              if (converter) {
                if (stack === 0)
                  stack = stackSave();
                cArgs[i] = converter(args[i]);
              } else {
                cArgs[i] = args[i];
              }
            }
          }
          var ret = func.apply(null, cArgs);
          ret = convertReturnValue(ret);
          if (stack !== 0)
            stackRestore(stack);
          return ret;
        }
        function cwrap(ident, returnType, argTypes, opts) {
          argTypes = argTypes || [];
          var numericArgs = argTypes.every(function(type) {
            return type === "number";
          });
          var numericRet = returnType !== "string";
          if (numericRet && numericArgs && !opts) {
            return getCFunc(ident);
          }
          return function() {
            return ccall(ident, returnType, argTypes, arguments, opts);
          };
        }
        var ALLOC_NORMAL = 0;
        var ALLOC_STACK = 1;
        var ALLOC_DYNAMIC = 2;
        var ALLOC_NONE = 3;
        function allocate(slab, types, allocator, ptr) {
          var zeroinit, size;
          if (typeof slab === "number") {
            zeroinit = true;
            size = slab;
          } else {
            zeroinit = false;
            size = slab.length;
          }
          var singleType = typeof types === "string" ? types : null;
          var ret;
          if (allocator == ALLOC_NONE) {
            ret = ptr;
          } else {
            ret = [
              _malloc,
              stackAlloc,
              dynamicAlloc
            ][allocator](Math.max(size, singleType ? 1 : types.length));
          }
          if (zeroinit) {
            var stop;
            ptr = ret;
            assert2((ret & 3) == 0);
            stop = ret + (size & ~3);
            for (; ptr < stop; ptr += 4) {
              HEAP32[ptr >> 2] = 0;
            }
            stop = ret + size;
            while (ptr < stop) {
              HEAP8[ptr++ >> 0] = 0;
            }
            return ret;
          }
          if (singleType === "i8") {
            if (slab.subarray || slab.slice) {
              HEAPU8.set(slab, ret);
            } else {
              HEAPU8.set(new Uint8Array(slab), ret);
            }
            return ret;
          }
          var i = 0, type, typeSize, previousType;
          while (i < size) {
            var curr = slab[i];
            type = singleType || types[i];
            if (type === 0) {
              i++;
              continue;
            }
            if (type == "i64")
              type = "i32";
            setValue(ret + i, curr, type);
            if (previousType !== type) {
              typeSize = getNativeTypeSize(type);
              previousType = type;
            }
            i += typeSize;
          }
          return ret;
        }
        function getMemory(size) {
          if (!runtimeInitialized)
            return dynamicAlloc(size);
          return _malloc(size);
        }
        var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
        function UTF8ArrayToString(heap, idx, maxBytesToRead) {
          var endIdx = idx + maxBytesToRead;
          var endPtr = idx;
          while (heap[endPtr] && !(endPtr >= endIdx))
            ++endPtr;
          if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
            return UTF8Decoder.decode(heap.subarray(idx, endPtr));
          } else {
            var str = "";
            while (idx < endPtr) {
              var u0 = heap[idx++];
              if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue;
              }
              var u1 = heap[idx++] & 63;
              if ((u0 & 224) == 192) {
                str += String.fromCharCode((u0 & 31) << 6 | u1);
                continue;
              }
              var u2 = heap[idx++] & 63;
              if ((u0 & 240) == 224) {
                u0 = (u0 & 15) << 12 | u1 << 6 | u2;
              } else {
                u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
              }
              if (u0 < 65536) {
                str += String.fromCharCode(u0);
              } else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
              }
            }
          }
          return str;
        }
        function UTF8ToString(ptr, maxBytesToRead) {
          return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
        }
        function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
          if (!(maxBytesToWrite > 0))
            return 0;
          var startIdx = outIdx;
          var endIdx = outIdx + maxBytesToWrite - 1;
          for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
              var u1 = str.charCodeAt(++i);
              u = 65536 + ((u & 1023) << 10) | u1 & 1023;
            }
            if (u <= 127) {
              if (outIdx >= endIdx)
                break;
              heap[outIdx++] = u;
            } else if (u <= 2047) {
              if (outIdx + 1 >= endIdx)
                break;
              heap[outIdx++] = 192 | u >> 6;
              heap[outIdx++] = 128 | u & 63;
            } else if (u <= 65535) {
              if (outIdx + 2 >= endIdx)
                break;
              heap[outIdx++] = 224 | u >> 12;
              heap[outIdx++] = 128 | u >> 6 & 63;
              heap[outIdx++] = 128 | u & 63;
            } else {
              if (outIdx + 3 >= endIdx)
                break;
              heap[outIdx++] = 240 | u >> 18;
              heap[outIdx++] = 128 | u >> 12 & 63;
              heap[outIdx++] = 128 | u >> 6 & 63;
              heap[outIdx++] = 128 | u & 63;
            }
          }
          heap[outIdx] = 0;
          return outIdx - startIdx;
        }
        function stringToUTF8(str, outPtr, maxBytesToWrite) {
          return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
        }
        function lengthBytesUTF8(str) {
          var len = 0;
          for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);
            if (u >= 55296 && u <= 57343)
              u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
            if (u <= 127)
              ++len;
            else if (u <= 2047)
              len += 2;
            else if (u <= 65535)
              len += 3;
            else
              len += 4;
          }
          return len;
        }
        function AsciiToString(ptr) {
          var str = "";
          while (1) {
            var ch = HEAPU8[ptr++ >> 0];
            if (!ch)
              return str;
            str += String.fromCharCode(ch);
          }
        }
        function stringToAscii(str, outPtr) {
          return writeAsciiToMemory(str, outPtr, false);
        }
        var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : void 0;
        function UTF16ToString(ptr, maxBytesToRead) {
          var endPtr = ptr;
          var idx = endPtr >> 1;
          var maxIdx = idx + maxBytesToRead / 2;
          while (!(idx >= maxIdx) && HEAPU16[idx])
            ++idx;
          endPtr = idx << 1;
          if (endPtr - ptr > 32 && UTF16Decoder) {
            return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
          } else {
            var i = 0;
            var str = "";
            while (1) {
              var codeUnit = HEAP16[ptr + i * 2 >> 1];
              if (codeUnit == 0 || i == maxBytesToRead / 2)
                return str;
              ++i;
              str += String.fromCharCode(codeUnit);
            }
          }
        }
        function stringToUTF16(str, outPtr, maxBytesToWrite) {
          if (maxBytesToWrite === void 0) {
            maxBytesToWrite = 2147483647;
          }
          if (maxBytesToWrite < 2)
            return 0;
          maxBytesToWrite -= 2;
          var startPtr = outPtr;
          var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
          for (var i = 0; i < numCharsToWrite; ++i) {
            var codeUnit = str.charCodeAt(i);
            HEAP16[outPtr >> 1] = codeUnit;
            outPtr += 2;
          }
          HEAP16[outPtr >> 1] = 0;
          return outPtr - startPtr;
        }
        function lengthBytesUTF16(str) {
          return str.length * 2;
        }
        function UTF32ToString(ptr, maxBytesToRead) {
          var i = 0;
          var str = "";
          while (!(i >= maxBytesToRead / 4)) {
            var utf32 = HEAP32[ptr + i * 4 >> 2];
            if (utf32 == 0)
              break;
            ++i;
            if (utf32 >= 65536) {
              var ch = utf32 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            } else {
              str += String.fromCharCode(utf32);
            }
          }
          return str;
        }
        function stringToUTF32(str, outPtr, maxBytesToWrite) {
          if (maxBytesToWrite === void 0) {
            maxBytesToWrite = 2147483647;
          }
          if (maxBytesToWrite < 4)
            return 0;
          var startPtr = outPtr;
          var endPtr = startPtr + maxBytesToWrite - 4;
          for (var i = 0; i < str.length; ++i) {
            var codeUnit = str.charCodeAt(i);
            if (codeUnit >= 55296 && codeUnit <= 57343) {
              var trailSurrogate = str.charCodeAt(++i);
              codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
            }
            HEAP32[outPtr >> 2] = codeUnit;
            outPtr += 4;
            if (outPtr + 4 > endPtr)
              break;
          }
          HEAP32[outPtr >> 2] = 0;
          return outPtr - startPtr;
        }
        function lengthBytesUTF32(str) {
          var len = 0;
          for (var i = 0; i < str.length; ++i) {
            var codeUnit = str.charCodeAt(i);
            if (codeUnit >= 55296 && codeUnit <= 57343)
              ++i;
            len += 4;
          }
          return len;
        }
        function allocateUTF8(str) {
          var size = lengthBytesUTF8(str) + 1;
          var ret = _malloc(size);
          if (ret)
            stringToUTF8Array(str, HEAP8, ret, size);
          return ret;
        }
        function allocateUTF8OnStack(str) {
          var size = lengthBytesUTF8(str) + 1;
          var ret = stackAlloc(size);
          stringToUTF8Array(str, HEAP8, ret, size);
          return ret;
        }
        function writeStringToMemory(string, buffer2, dontAddNull) {
          warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");
          var lastChar, end;
          if (dontAddNull) {
            end = buffer2 + lengthBytesUTF8(string);
            lastChar = HEAP8[end];
          }
          stringToUTF8(string, buffer2, Infinity);
          if (dontAddNull)
            HEAP8[end] = lastChar;
        }
        function writeArrayToMemory(array, buffer2) {
          HEAP8.set(array, buffer2);
        }
        function writeAsciiToMemory(str, buffer2, dontAddNull) {
          for (var i = 0; i < str.length; ++i) {
            HEAP8[buffer2++ >> 0] = str.charCodeAt(i);
          }
          if (!dontAddNull)
            HEAP8[buffer2 >> 0] = 0;
        }
        var PAGE_SIZE = 16384;
        var WASM_PAGE_SIZE = 65536;
        var ASMJS_PAGE_SIZE = 16777216;
        function alignUp(x, multiple) {
          if (x % multiple > 0) {
            x += multiple - x % multiple;
          }
          return x;
        }
        var HEAP, buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateGlobalBufferAndViews(buf) {
          buffer = buf;
          Module2["HEAP8"] = HEAP8 = new Int8Array(buf);
          Module2["HEAP16"] = HEAP16 = new Int16Array(buf);
          Module2["HEAP32"] = HEAP32 = new Int32Array(buf);
          Module2["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
          Module2["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
          Module2["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
          Module2["HEAPF32"] = HEAPF32 = new Float32Array(buf);
          Module2["HEAPF64"] = HEAPF64 = new Float64Array(buf);
        }
        var STATIC_BASE = 1024, STACK_BASE = 5257216, STACKTOP = STACK_BASE, STACK_MAX = 14336, DYNAMIC_BASE = 5257216, DYNAMICTOP_PTR = 14176;
        var TOTAL_STACK = 5242880;
        var INITIAL_INITIAL_MEMORY = Module2["INITIAL_MEMORY"] || 16777216;
        if (Module2["wasmMemory"]) {
          wasmMemory = Module2["wasmMemory"];
        } else {
          wasmMemory = new WebAssembly.Memory({
            "initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
            "maximum": 2147483648 / WASM_PAGE_SIZE
          });
        }
        if (wasmMemory) {
          buffer = wasmMemory.buffer;
        }
        INITIAL_INITIAL_MEMORY = buffer.byteLength;
        updateGlobalBufferAndViews(buffer);
        HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
        function callRuntimeCallbacks(callbacks) {
          while (callbacks.length > 0) {
            var callback = callbacks.shift();
            if (typeof callback == "function") {
              callback(Module2);
              continue;
            }
            var func = callback.func;
            if (typeof func === "number") {
              if (callback.arg === void 0) {
                Module2["dynCall_v"](func);
              } else {
                Module2["dynCall_vi"](func, callback.arg);
              }
            } else {
              func(callback.arg === void 0 ? null : callback.arg);
            }
          }
        }
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATEXIT__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeExited = false;
        function preRun() {
          if (Module2["preRun"]) {
            if (typeof Module2["preRun"] == "function")
              Module2["preRun"] = [Module2["preRun"]];
            while (Module2["preRun"].length) {
              addOnPreRun(Module2["preRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPRERUN__);
        }
        function initRuntime() {
          runtimeInitialized = true;
          if (!Module2["noFSInit"] && !FS.init.initialized)
            FS.init();
          TTY.init();
          callRuntimeCallbacks(__ATINIT__);
        }
        function preMain() {
          FS.ignorePermissions = false;
          callRuntimeCallbacks(__ATMAIN__);
        }
        function exitRuntime() {
          runtimeExited = true;
        }
        function postRun() {
          if (Module2["postRun"]) {
            if (typeof Module2["postRun"] == "function")
              Module2["postRun"] = [Module2["postRun"]];
            while (Module2["postRun"].length) {
              addOnPostRun(Module2["postRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPOSTRUN__);
        }
        function addOnPreRun(cb) {
          __ATPRERUN__.unshift(cb);
        }
        function addOnInit(cb) {
          __ATINIT__.unshift(cb);
        }
        function addOnPreMain(cb) {
          __ATMAIN__.unshift(cb);
        }
        function addOnExit(cb) {
        }
        function addOnPostRun(cb) {
          __ATPOSTRUN__.unshift(cb);
        }
        function unSign(value, bits, ignore) {
          if (value >= 0) {
            return value;
          }
          return bits <= 32 ? 2 * Math.abs(1 << bits - 1) + value : Math.pow(2, bits) + value;
        }
        function reSign(value, bits, ignore) {
          if (value <= 0) {
            return value;
          }
          var half = bits <= 32 ? Math.abs(1 << bits - 1) : Math.pow(2, bits - 1);
          if (value >= half && (bits <= 32 || value > half)) {
            value = -2 * half + value;
          }
          return value;
        }
        var Math_abs = Math.abs;
        var Math_cos = Math.cos;
        var Math_sin = Math.sin;
        var Math_tan = Math.tan;
        var Math_acos = Math.acos;
        var Math_asin = Math.asin;
        var Math_atan = Math.atan;
        var Math_atan2 = Math.atan2;
        var Math_exp = Math.exp;
        var Math_log = Math.log;
        var Math_sqrt = Math.sqrt;
        var Math_ceil = Math.ceil;
        var Math_floor = Math.floor;
        var Math_pow = Math.pow;
        var Math_imul = Math.imul;
        var Math_fround = Math.fround;
        var Math_round = Math.round;
        var Math_min = Math.min;
        var Math_max = Math.max;
        var Math_clz32 = Math.clz32;
        var Math_trunc = Math.trunc;
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function getUniqueRunDependency(id) {
          return id;
        }
        function addRunDependency(id) {
          runDependencies++;
          if (Module2["monitorRunDependencies"]) {
            Module2["monitorRunDependencies"](runDependencies);
          }
        }
        function removeRunDependency(id) {
          runDependencies--;
          if (Module2["monitorRunDependencies"]) {
            Module2["monitorRunDependencies"](runDependencies);
          }
          if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
              clearInterval(runDependencyWatcher);
              runDependencyWatcher = null;
            }
            if (dependenciesFulfilled) {
              var callback = dependenciesFulfilled;
              dependenciesFulfilled = null;
              callback();
            }
          }
        }
        Module2["preloadedImages"] = {};
        Module2["preloadedAudios"] = {};
        function abort(what) {
          if (Module2["onAbort"]) {
            Module2["onAbort"](what);
          }
          what += "";
          out(what);
          err(what);
          ABORT = true;
          EXITSTATUS = 1;
          what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
          throw new WebAssembly.RuntimeError(what);
        }
        var memoryInitializer = null;
        function hasPrefix(str, prefix) {
          return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0;
        }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) {
          return hasPrefix(filename, dataURIPrefix);
        }
        var fileURIPrefix = "file://";
        function isFileURI(filename) {
          return hasPrefix(filename, fileURIPrefix);
        }
        var wasmBinaryFile = "libflac.wasm.wasm";
        if (!isDataURI(wasmBinaryFile)) {
          wasmBinaryFile = locateFile(wasmBinaryFile);
        }
        function getBinary() {
          try {
            if (wasmBinary) {
              return new Uint8Array(wasmBinary);
            }
            if (readBinary) {
              return readBinary(wasmBinaryFile);
            } else {
              throw "both async and sync fetching of the wasm failed";
            }
          } catch (err2) {
            abort(err2);
          }
        }
        function getBinaryPromise() {
          if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
            return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
              if (!response["ok"]) {
                throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
              }
              return response["arrayBuffer"]();
            }).catch(function() {
              return getBinary();
            });
          }
          return new Promise(function(resolve, reject) {
            resolve(getBinary());
          });
        }
        function createWasm() {
          var info = {
            "env": asmLibraryArg,
            "wasi_snapshot_preview1": asmLibraryArg
          };
          function receiveInstance(instance, module2) {
            var exports3 = instance.exports;
            Module2["asm"] = exports3;
            removeRunDependency("wasm-instantiate");
          }
          addRunDependency("wasm-instantiate");
          function receiveInstantiatedSource(output) {
            receiveInstance(output["instance"]);
          }
          function instantiateArrayBuffer(receiver) {
            return getBinaryPromise().then(function(binary) {
              return WebAssembly.instantiate(binary, info);
            }).then(receiver, function(reason) {
              err("failed to asynchronously prepare wasm: " + reason);
              abort(reason);
            });
          }
          function instantiateAsync() {
            if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && typeof fetch === "function") {
              fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
                var result = WebAssembly.instantiateStreaming(response, info);
                return result.then(receiveInstantiatedSource, function(reason) {
                  err("wasm streaming compile failed: " + reason);
                  err("falling back to ArrayBuffer instantiation");
                  return instantiateArrayBuffer(receiveInstantiatedSource);
                });
              });
            } else {
              return instantiateArrayBuffer(receiveInstantiatedSource);
            }
          }
          if (Module2["instantiateWasm"]) {
            try {
              var exports2 = Module2["instantiateWasm"](info, receiveInstance);
              return exports2;
            } catch (e) {
              err("Module.instantiateWasm callback failed with error: " + e);
              return false;
            }
          }
          instantiateAsync();
          return {};
        }
        var tempDouble;
        var tempI64;
        var ASM_CONSTS = {};
        __ATINIT__.push({ func: function() {
          ___wasm_call_ctors();
        } });
        function demangle(func) {
          return func;
        }
        function demangleAll(text) {
          var regex = /\b_Z[\w\d_]+/g;
          return text.replace(regex, function(x) {
            var y = demangle(x);
            return x === y ? x : y + " [" + x + "]";
          });
        }
        function jsStackTrace() {
          var err2 = new Error();
          if (!err2.stack) {
            try {
              throw new Error();
            } catch (e) {
              err2 = e;
            }
            if (!err2.stack) {
              return "(no stack trace available)";
            }
          }
          return err2.stack.toString();
        }
        function stackTrace() {
          var js = jsStackTrace();
          if (Module2["extraStackTrace"])
            js += "\n" + Module2["extraStackTrace"]();
          return demangleAll(js);
        }
        function _emscripten_get_sbrk_ptr() {
          return 14176;
        }
        function _emscripten_memcpy_big(dest, src, num) {
          HEAPU8.copyWithin(dest, src, src + num);
        }
        function _emscripten_get_heap_size() {
          return HEAPU8.length;
        }
        function emscripten_realloc_buffer(size) {
          try {
            wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
            updateGlobalBufferAndViews(wasmMemory.buffer);
            return 1;
          } catch (e) {
          }
        }
        function _emscripten_resize_heap(requestedSize) {
          requestedSize = requestedSize >>> 0;
          var oldSize = _emscripten_get_heap_size();
          var PAGE_MULTIPLE = 65536;
          var maxHeapSize = 2147483648;
          if (requestedSize > maxHeapSize) {
            return false;
          }
          var minHeapSize = 16777216;
          for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
            var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
            overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
            var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), PAGE_MULTIPLE));
            var replacement = emscripten_realloc_buffer(newSize);
            if (replacement) {
              return true;
            }
          }
          return false;
        }
        var PATH = { splitPath: function(filename) {
          var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return splitPathRe.exec(filename).slice(1);
        }, normalizeArray: function(parts, allowAboveRoot) {
          var up = 0;
          for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === ".") {
              parts.splice(i, 1);
            } else if (last === "..") {
              parts.splice(i, 1);
              up++;
            } else if (up) {
              parts.splice(i, 1);
              up--;
            }
          }
          if (allowAboveRoot) {
            for (; up; up--) {
              parts.unshift("..");
            }
          }
          return parts;
        }, normalize: function(path) {
          var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
          path = PATH.normalizeArray(path.split("/").filter(function(p) {
            return !!p;
          }), !isAbsolute).join("/");
          if (!path && !isAbsolute) {
            path = ".";
          }
          if (path && trailingSlash) {
            path += "/";
          }
          return (isAbsolute ? "/" : "") + path;
        }, dirname: function(path) {
          var result = PATH.splitPath(path), root = result[0], dir = result[1];
          if (!root && !dir) {
            return ".";
          }
          if (dir) {
            dir = dir.substr(0, dir.length - 1);
          }
          return root + dir;
        }, basename: function(path) {
          if (path === "/")
            return "/";
          var lastSlash = path.lastIndexOf("/");
          if (lastSlash === -1)
            return path;
          return path.substr(lastSlash + 1);
        }, extname: function(path) {
          return PATH.splitPath(path)[3];
        }, join: function() {
          var paths = Array.prototype.slice.call(arguments, 0);
          return PATH.normalize(paths.join("/"));
        }, join2: function(l, r) {
          return PATH.normalize(l + "/" + r);
        } };
        function setErrNo(value) {
          HEAP32[___errno_location() >> 2] = value;
          return value;
        }
        var PATH_FS = { resolve: function() {
          var resolvedPath = "", resolvedAbsolute = false;
          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = i >= 0 ? arguments[i] : FS.cwd();
            if (typeof path !== "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              return "";
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = path.charAt(0) === "/";
          }
          resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
            return !!p;
          }), !resolvedAbsolute).join("/");
          return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        }, relative: function(from, to) {
          from = PATH_FS.resolve(from).substr(1);
          to = PATH_FS.resolve(to).substr(1);
          function trim(arr) {
            var start2 = 0;
            for (; start2 < arr.length; start2++) {
              if (arr[start2] !== "")
                break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== "")
                break;
            }
            if (start2 > end)
              return [];
            return arr.slice(start2, end - start2 + 1);
          }
          var fromParts = trim(from.split("/"));
          var toParts = trim(to.split("/"));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }
          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push("..");
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join("/");
        } };
        var TTY = { ttys: [], init: function() {
        }, shutdown: function() {
        }, register: function(dev, ops) {
          TTY.ttys[dev] = { input: [], output: [], ops };
          FS.registerDevice(dev, TTY.stream_ops);
        }, stream_ops: { open: function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        }, close: function(stream) {
          stream.tty.ops.flush(stream.tty);
        }, flush: function(stream) {
          stream.tty.ops.flush(stream.tty);
        }, read: function(stream, buffer2, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === void 0 && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === void 0)
              break;
            bytesRead++;
            buffer2[offset + i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        }, write: function(stream, buffer2, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer2[offset + i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        } }, default_tty_ops: { get_char: function(tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              var BUFSIZE = 256;
              var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
              var bytesRead = 0;
              try {
                bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
              } catch (e) {
                if (e.toString().indexOf("EOF") != -1)
                  bytesRead = 0;
                else
                  throw e;
              }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString("utf-8");
              } else {
                result = null;
              }
            } else if (typeof window != "undefined" && typeof window.prompt == "function") {
              result = window.prompt("Input: ");
              if (result !== null) {
                result += "\n";
              }
            } else if (typeof readline == "function") {
              result = readline();
              if (result !== null) {
                result += "\n";
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        }, put_char: function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0)
              tty.output.push(val);
          }
        }, flush: function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        } }, default_tty1_ops: { put_char: function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0)
              tty.output.push(val);
          }
        }, flush: function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        } } };
        var MEMFS = { ops_table: null, mount: function(mount) {
          return MEMFS.createNode(null, "/", 16384 | 511, 0);
        }, createNode: function(parent, name, mode, dev) {
          if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
            throw new FS.ErrnoError(63);
          }
          if (!MEMFS.ops_table) {
            MEMFS.ops_table = {
              dir: {
                node: {
                  getattr: MEMFS.node_ops.getattr,
                  setattr: MEMFS.node_ops.setattr,
                  lookup: MEMFS.node_ops.lookup,
                  mknod: MEMFS.node_ops.mknod,
                  rename: MEMFS.node_ops.rename,
                  unlink: MEMFS.node_ops.unlink,
                  rmdir: MEMFS.node_ops.rmdir,
                  readdir: MEMFS.node_ops.readdir,
                  symlink: MEMFS.node_ops.symlink
                },
                stream: {
                  llseek: MEMFS.stream_ops.llseek
                }
              },
              file: {
                node: {
                  getattr: MEMFS.node_ops.getattr,
                  setattr: MEMFS.node_ops.setattr
                },
                stream: {
                  llseek: MEMFS.stream_ops.llseek,
                  read: MEMFS.stream_ops.read,
                  write: MEMFS.stream_ops.write,
                  allocate: MEMFS.stream_ops.allocate,
                  mmap: MEMFS.stream_ops.mmap,
                  msync: MEMFS.stream_ops.msync
                }
              },
              link: {
                node: {
                  getattr: MEMFS.node_ops.getattr,
                  setattr: MEMFS.node_ops.setattr,
                  readlink: MEMFS.node_ops.readlink
                },
                stream: {}
              },
              chrdev: {
                node: {
                  getattr: MEMFS.node_ops.getattr,
                  setattr: MEMFS.node_ops.setattr
                },
                stream: FS.chrdev_stream_ops
              }
            };
          }
          var node = FS.createNode(parent, name, mode, dev);
          if (FS.isDir(node.mode)) {
            node.node_ops = MEMFS.ops_table.dir.node;
            node.stream_ops = MEMFS.ops_table.dir.stream;
            node.contents = {};
          } else if (FS.isFile(node.mode)) {
            node.node_ops = MEMFS.ops_table.file.node;
            node.stream_ops = MEMFS.ops_table.file.stream;
            node.usedBytes = 0;
            node.contents = null;
          } else if (FS.isLink(node.mode)) {
            node.node_ops = MEMFS.ops_table.link.node;
            node.stream_ops = MEMFS.ops_table.link.stream;
          } else if (FS.isChrdev(node.mode)) {
            node.node_ops = MEMFS.ops_table.chrdev.node;
            node.stream_ops = MEMFS.ops_table.chrdev.stream;
          }
          node.timestamp = Date.now();
          if (parent) {
            parent.contents[name] = node;
          }
          return node;
        }, getFileDataAsRegularArray: function(node) {
          if (node.contents && node.contents.subarray) {
            var arr = [];
            for (var i = 0; i < node.usedBytes; ++i)
              arr.push(node.contents[i]);
            return arr;
          }
          return node.contents;
        }, getFileDataAsTypedArray: function(node) {
          if (!node.contents)
            return new Uint8Array(0);
          if (node.contents.subarray)
            return node.contents.subarray(0, node.usedBytes);
          return new Uint8Array(node.contents);
        }, expandFileStorage: function(node, newCapacity) {
          var prevCapacity = node.contents ? node.contents.length : 0;
          if (prevCapacity >= newCapacity)
            return;
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
          if (prevCapacity != 0)
            newCapacity = Math.max(newCapacity, 256);
          var oldContents = node.contents;
          node.contents = new Uint8Array(newCapacity);
          if (node.usedBytes > 0)
            node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
          return;
        }, resizeFileStorage: function(node, newSize) {
          if (node.usedBytes == newSize)
            return;
          if (newSize == 0) {
            node.contents = null;
            node.usedBytes = 0;
            return;
          }
          if (!node.contents || node.contents.subarray) {
            var oldContents = node.contents;
            node.contents = new Uint8Array(newSize);
            if (oldContents) {
              node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
            }
            node.usedBytes = newSize;
            return;
          }
          if (!node.contents)
            node.contents = [];
          if (node.contents.length > newSize)
            node.contents.length = newSize;
          else
            while (node.contents.length < newSize)
              node.contents.push(0);
          node.usedBytes = newSize;
        }, node_ops: { getattr: function(node) {
          var attr = {};
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        }, setattr: function(node, attr) {
          if (attr.mode !== void 0) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== void 0) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== void 0) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        }, lookup: function(parent, name) {
          throw FS.genericErrors[44];
        }, mknod: function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        }, rename: function(old_node, new_dir, new_name) {
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        }, unlink: function(parent, name) {
          delete parent.contents[name];
        }, rmdir: function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
        }, readdir: function(node) {
          var entries = [".", ".."];
          for (var key2 in node.contents) {
            if (!node.contents.hasOwnProperty(key2)) {
              continue;
            }
            entries.push(key2);
          }
          return entries;
        }, symlink: function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
          node.link = oldpath;
          return node;
        }, readlink: function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        } }, stream_ops: { read: function(stream, buffer2, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes)
            return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) {
            buffer2.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++)
              buffer2[offset + i] = contents[position + i];
          }
          return size;
        }, write: function(stream, buffer2, offset, length, position, canOwn) {
          if (buffer2.buffer === HEAP8.buffer) {
            canOwn = false;
          }
          if (!length)
            return 0;
          var node = stream.node;
          node.timestamp = Date.now();
          if (buffer2.subarray && (!node.contents || node.contents.subarray)) {
            if (canOwn) {
              node.contents = buffer2.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) {
              node.contents = buffer2.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) {
              node.contents.set(buffer2.subarray(offset, offset + length), position);
              return length;
            }
          }
          MEMFS.expandFileStorage(node, position + length);
          if (node.contents.subarray && buffer2.subarray)
            node.contents.set(buffer2.subarray(offset, offset + length), position);
          else {
            for (var i = 0; i < length; i++) {
              node.contents[position + i] = buffer2[offset + i];
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        }, llseek: function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        }, allocate: function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        }, mmap: function(stream, address, length, position, prot, flags) {
          assert2(address === 0);
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          if (!(flags & 2) && contents.buffer === buffer) {
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr, allocated };
        }, msync: function(stream, buffer2, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (mmapFlags & 2) {
            return 0;
          }
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer2, 0, length, offset, false);
          return 0;
        } } };
        var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, trackingDelegate: {}, tracking: { openFlags: { READ: 1, WRITE: 2 } }, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, handleFSError: function(e) {
          if (!(e instanceof FS.ErrnoError))
            throw e + " : " + stackTrace();
          return setErrNo(e.errno);
        }, lookupPath: function(path, opts) {
          path = PATH_FS.resolve(FS.cwd(), path);
          opts = opts || {};
          if (!path)
            return { path: "", node: null };
          var defaults = {
            follow_mount: true,
            recurse_count: 0
          };
          for (var key2 in defaults) {
            if (opts[key2] === void 0) {
              opts[key2] = defaults[key2];
            }
          }
          if (opts.recurse_count > 8) {
            throw new FS.ErrnoError(32);
          }
          var parts = PATH.normalizeArray(path.split("/").filter(function(p) {
            return !!p;
          }), false);
          var current = FS.root;
          var current_path = "/";
          for (var i = 0; i < parts.length; i++) {
            var islast = i === parts.length - 1;
            if (islast && opts.parent) {
              break;
            }
            current = FS.lookupNode(current, parts[i]);
            current_path = PATH.join2(current_path, parts[i]);
            if (FS.isMountpoint(current)) {
              if (!islast || islast && opts.follow_mount) {
                current = current.mounted.root;
              }
            }
            if (!islast || opts.follow) {
              var count = 0;
              while (FS.isLink(current.mode)) {
                var link = FS.readlink(current_path);
                current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
                var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
                current = lookup.node;
                if (count++ > 40) {
                  throw new FS.ErrnoError(32);
                }
              }
            }
          }
          return { path: current_path, node: current };
        }, getPath: function(node) {
          var path;
          while (true) {
            if (FS.isRoot(node)) {
              var mount = node.mount.mountpoint;
              if (!path)
                return mount;
              return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
            }
            path = path ? node.name + "/" + path : node.name;
            node = node.parent;
          }
        }, hashName: function(parentid, name) {
          var hash = 0;
          for (var i = 0; i < name.length; i++) {
            hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
          }
          return (parentid + hash >>> 0) % FS.nameTable.length;
        }, hashAddNode: function(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          node.name_next = FS.nameTable[hash];
          FS.nameTable[hash] = node;
        }, hashRemoveNode: function(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          if (FS.nameTable[hash] === node) {
            FS.nameTable[hash] = node.name_next;
          } else {
            var current = FS.nameTable[hash];
            while (current) {
              if (current.name_next === node) {
                current.name_next = node.name_next;
                break;
              }
              current = current.name_next;
            }
          }
        }, lookupNode: function(parent, name) {
          var errCode = FS.mayLookup(parent);
          if (errCode) {
            throw new FS.ErrnoError(errCode, parent);
          }
          var hash = FS.hashName(parent.id, name);
          for (var node = FS.nameTable[hash]; node; node = node.name_next) {
            var nodeName = node.name;
            if (node.parent.id === parent.id && nodeName === name) {
              return node;
            }
          }
          return FS.lookup(parent, name);
        }, createNode: function(parent, name, mode, rdev) {
          var node = new FS.FSNode(parent, name, mode, rdev);
          FS.hashAddNode(node);
          return node;
        }, destroyNode: function(node) {
          FS.hashRemoveNode(node);
        }, isRoot: function(node) {
          return node === node.parent;
        }, isMountpoint: function(node) {
          return !!node.mounted;
        }, isFile: function(mode) {
          return (mode & 61440) === 32768;
        }, isDir: function(mode) {
          return (mode & 61440) === 16384;
        }, isLink: function(mode) {
          return (mode & 61440) === 40960;
        }, isChrdev: function(mode) {
          return (mode & 61440) === 8192;
        }, isBlkdev: function(mode) {
          return (mode & 61440) === 24576;
        }, isFIFO: function(mode) {
          return (mode & 61440) === 4096;
        }, isSocket: function(mode) {
          return (mode & 49152) === 49152;
        }, flagModes: { "r": 0, "rs": 1052672, "r+": 2, "w": 577, "wx": 705, "xw": 705, "w+": 578, "wx+": 706, "xw+": 706, "a": 1089, "ax": 1217, "xa": 1217, "a+": 1090, "ax+": 1218, "xa+": 1218 }, modeStringToFlags: function(str) {
          var flags = FS.flagModes[str];
          if (typeof flags === "undefined") {
            throw new Error("Unknown file open mode: " + str);
          }
          return flags;
        }, flagsToPermissionString: function(flag) {
          var perms = ["r", "w", "rw"][flag & 3];
          if (flag & 512) {
            perms += "w";
          }
          return perms;
        }, nodePermissions: function(node, perms) {
          if (FS.ignorePermissions) {
            return 0;
          }
          if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
            return 2;
          } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
            return 2;
          } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
            return 2;
          }
          return 0;
        }, mayLookup: function(dir) {
          var errCode = FS.nodePermissions(dir, "x");
          if (errCode)
            return errCode;
          if (!dir.node_ops.lookup)
            return 2;
          return 0;
        }, mayCreate: function(dir, name) {
          try {
            var node = FS.lookupNode(dir, name);
            return 20;
          } catch (e) {
          }
          return FS.nodePermissions(dir, "wx");
        }, mayDelete: function(dir, name, isdir) {
          var node;
          try {
            node = FS.lookupNode(dir, name);
          } catch (e) {
            return e.errno;
          }
          var errCode = FS.nodePermissions(dir, "wx");
          if (errCode) {
            return errCode;
          }
          if (isdir) {
            if (!FS.isDir(node.mode)) {
              return 54;
            }
            if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
              return 10;
            }
          } else {
            if (FS.isDir(node.mode)) {
              return 31;
            }
          }
          return 0;
        }, mayOpen: function(node, flags) {
          if (!node) {
            return 44;
          }
          if (FS.isLink(node.mode)) {
            return 32;
          } else if (FS.isDir(node.mode)) {
            if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
              return 31;
            }
          }
          return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
        }, MAX_OPEN_FDS: 4096, nextfd: function(fd_start, fd_end) {
          fd_start = fd_start || 0;
          fd_end = fd_end || FS.MAX_OPEN_FDS;
          for (var fd = fd_start; fd <= fd_end; fd++) {
            if (!FS.streams[fd]) {
              return fd;
            }
          }
          throw new FS.ErrnoError(33);
        }, getStream: function(fd) {
          return FS.streams[fd];
        }, createStream: function(stream, fd_start, fd_end) {
          if (!FS.FSStream) {
            FS.FSStream = function() {
            };
            FS.FSStream.prototype = {
              object: {
                get: function() {
                  return this.node;
                },
                set: function(val) {
                  this.node = val;
                }
              },
              isRead: {
                get: function() {
                  return (this.flags & 2097155) !== 1;
                }
              },
              isWrite: {
                get: function() {
                  return (this.flags & 2097155) !== 0;
                }
              },
              isAppend: {
                get: function() {
                  return this.flags & 1024;
                }
              }
            };
          }
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
          var fd = FS.nextfd(fd_start, fd_end);
          stream.fd = fd;
          FS.streams[fd] = stream;
          return stream;
        }, closeStream: function(fd) {
          FS.streams[fd] = null;
        }, chrdev_stream_ops: { open: function(stream) {
          var device = FS.getDevice(stream.node.rdev);
          stream.stream_ops = device.stream_ops;
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        }, llseek: function() {
          throw new FS.ErrnoError(70);
        } }, major: function(dev) {
          return dev >> 8;
        }, minor: function(dev) {
          return dev & 255;
        }, makedev: function(ma, mi) {
          return ma << 8 | mi;
        }, registerDevice: function(dev, ops) {
          FS.devices[dev] = { stream_ops: ops };
        }, getDevice: function(dev) {
          return FS.devices[dev];
        }, getMounts: function(mount) {
          var mounts = [];
          var check = [mount];
          while (check.length) {
            var m = check.pop();
            mounts.push(m);
            check.push.apply(check, m.mounts);
          }
          return mounts;
        }, syncfs: function(populate, callback) {
          if (typeof populate === "function") {
            callback = populate;
            populate = false;
          }
          FS.syncFSRequests++;
          if (FS.syncFSRequests > 1) {
            err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
          }
          var mounts = FS.getMounts(FS.root.mount);
          var completed = 0;
          function doCallback(errCode) {
            FS.syncFSRequests--;
            return callback(errCode);
          }
          function done(errCode) {
            if (errCode) {
              if (!done.errored) {
                done.errored = true;
                return doCallback(errCode);
              }
              return;
            }
            if (++completed >= mounts.length) {
              doCallback(null);
            }
          }
          ;
          mounts.forEach(function(mount) {
            if (!mount.type.syncfs) {
              return done(null);
            }
            mount.type.syncfs(mount, populate, done);
          });
        }, mount: function(type, opts, mountpoint) {
          var root = mountpoint === "/";
          var pseudo = !mountpoint;
          var node;
          if (root && FS.root) {
            throw new FS.ErrnoError(10);
          } else if (!root && !pseudo) {
            var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
            mountpoint = lookup.path;
            node = lookup.node;
            if (FS.isMountpoint(node)) {
              throw new FS.ErrnoError(10);
            }
            if (!FS.isDir(node.mode)) {
              throw new FS.ErrnoError(54);
            }
          }
          var mount = {
            type,
            opts,
            mountpoint,
            mounts: []
          };
          var mountRoot = type.mount(mount);
          mountRoot.mount = mount;
          mount.root = mountRoot;
          if (root) {
            FS.root = mountRoot;
          } else if (node) {
            node.mounted = mount;
            if (node.mount) {
              node.mount.mounts.push(mount);
            }
          }
          return mountRoot;
        }, unmount: function(mountpoint) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
          if (!FS.isMountpoint(lookup.node)) {
            throw new FS.ErrnoError(28);
          }
          var node = lookup.node;
          var mount = node.mounted;
          var mounts = FS.getMounts(mount);
          Object.keys(FS.nameTable).forEach(function(hash) {
            var current = FS.nameTable[hash];
            while (current) {
              var next = current.name_next;
              if (mounts.indexOf(current.mount) !== -1) {
                FS.destroyNode(current);
              }
              current = next;
            }
          });
          node.mounted = null;
          var idx = node.mount.mounts.indexOf(mount);
          node.mount.mounts.splice(idx, 1);
        }, lookup: function(parent, name) {
          return parent.node_ops.lookup(parent, name);
        }, mknod: function(path, mode, dev) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          if (!name || name === "." || name === "..") {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.mayCreate(parent, name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.mknod) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.mknod(parent, name, mode, dev);
        }, create: function(path, mode) {
          mode = mode !== void 0 ? mode : 438;
          mode &= 4095;
          mode |= 32768;
          return FS.mknod(path, mode, 0);
        }, mkdir: function(path, mode) {
          mode = mode !== void 0 ? mode : 511;
          mode &= 511 | 512;
          mode |= 16384;
          return FS.mknod(path, mode, 0);
        }, mkdirTree: function(path, mode) {
          var dirs = path.split("/");
          var d = "";
          for (var i = 0; i < dirs.length; ++i) {
            if (!dirs[i])
              continue;
            d += "/" + dirs[i];
            try {
              FS.mkdir(d, mode);
            } catch (e) {
              if (e.errno != 20)
                throw e;
            }
          }
        }, mkdev: function(path, mode, dev) {
          if (typeof dev === "undefined") {
            dev = mode;
            mode = 438;
          }
          mode |= 8192;
          return FS.mknod(path, mode, dev);
        }, symlink: function(oldpath, newpath) {
          if (!PATH_FS.resolve(oldpath)) {
            throw new FS.ErrnoError(44);
          }
          var lookup = FS.lookupPath(newpath, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var newname = PATH.basename(newpath);
          var errCode = FS.mayCreate(parent, newname);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.symlink) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.symlink(parent, newname, oldpath);
        }, rename: function(old_path, new_path) {
          var old_dirname = PATH.dirname(old_path);
          var new_dirname = PATH.dirname(new_path);
          var old_name = PATH.basename(old_path);
          var new_name = PATH.basename(new_path);
          var lookup, old_dir, new_dir;
          try {
            lookup = FS.lookupPath(old_path, { parent: true });
            old_dir = lookup.node;
            lookup = FS.lookupPath(new_path, { parent: true });
            new_dir = lookup.node;
          } catch (e) {
            throw new FS.ErrnoError(10);
          }
          if (!old_dir || !new_dir)
            throw new FS.ErrnoError(44);
          if (old_dir.mount !== new_dir.mount) {
            throw new FS.ErrnoError(75);
          }
          var old_node = FS.lookupNode(old_dir, old_name);
          var relative = PATH_FS.relative(old_path, new_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(28);
          }
          relative = PATH_FS.relative(new_path, old_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(55);
          }
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
          }
          if (old_node === new_node) {
            return;
          }
          var isdir = FS.isDir(old_node.mode);
          var errCode = FS.mayDelete(old_dir, old_name, isdir);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!old_dir.node_ops.rename) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
            throw new FS.ErrnoError(10);
          }
          if (new_dir !== old_dir) {
            errCode = FS.nodePermissions(old_dir, "w");
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          try {
            if (FS.trackingDelegate["willMovePath"]) {
              FS.trackingDelegate["willMovePath"](old_path, new_path);
            }
          } catch (e) {
            err("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
          }
          FS.hashRemoveNode(old_node);
          try {
            old_dir.node_ops.rename(old_node, new_dir, new_name);
          } catch (e) {
            throw e;
          } finally {
            FS.hashAddNode(old_node);
          }
          try {
            if (FS.trackingDelegate["onMovePath"])
              FS.trackingDelegate["onMovePath"](old_path, new_path);
          } catch (e) {
            err("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
          }
        }, rmdir: function(path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, true);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.rmdir) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          try {
            if (FS.trackingDelegate["willDeletePath"]) {
              FS.trackingDelegate["willDeletePath"](path);
            }
          } catch (e) {
            err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
          }
          parent.node_ops.rmdir(parent, name);
          FS.destroyNode(node);
          try {
            if (FS.trackingDelegate["onDeletePath"])
              FS.trackingDelegate["onDeletePath"](path);
          } catch (e) {
            err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
          }
        }, readdir: function(path) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          if (!node.node_ops.readdir) {
            throw new FS.ErrnoError(54);
          }
          return node.node_ops.readdir(node);
        }, unlink: function(path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, false);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.unlink) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          try {
            if (FS.trackingDelegate["willDeletePath"]) {
              FS.trackingDelegate["willDeletePath"](path);
            }
          } catch (e) {
            err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
          }
          parent.node_ops.unlink(parent, name);
          FS.destroyNode(node);
          try {
            if (FS.trackingDelegate["onDeletePath"])
              FS.trackingDelegate["onDeletePath"](path);
          } catch (e) {
            err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
          }
        }, readlink: function(path) {
          var lookup = FS.lookupPath(path);
          var link = lookup.node;
          if (!link) {
            throw new FS.ErrnoError(44);
          }
          if (!link.node_ops.readlink) {
            throw new FS.ErrnoError(28);
          }
          return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
        }, stat: function(path, dontFollow) {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          var node = lookup.node;
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          if (!node.node_ops.getattr) {
            throw new FS.ErrnoError(63);
          }
          return node.node_ops.getattr(node);
        }, lstat: function(path) {
          return FS.stat(path, true);
        }, chmod: function(path, mode, dontFollow) {
          var node;
          if (typeof path === "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(63);
          }
          node.node_ops.setattr(node, {
            mode: mode & 4095 | node.mode & ~4095,
            timestamp: Date.now()
          });
        }, lchmod: function(path, mode) {
          FS.chmod(path, mode, true);
        }, fchmod: function(fd, mode) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          FS.chmod(stream.node, mode);
        }, chown: function(path, uid, gid, dontFollow) {
          var node;
          if (typeof path === "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(63);
          }
          node.node_ops.setattr(node, {
            timestamp: Date.now()
          });
        }, lchown: function(path, uid, gid) {
          FS.chown(path, uid, gid, true);
        }, fchown: function(fd, uid, gid) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          FS.chown(stream.node, uid, gid);
        }, truncate: function(path, len) {
          if (len < 0) {
            throw new FS.ErrnoError(28);
          }
          var node;
          if (typeof path === "string") {
            var lookup = FS.lookupPath(path, { follow: true });
            node = lookup.node;
          } else {
            node = path;
          }
          if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isDir(node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!FS.isFile(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.nodePermissions(node, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          node.node_ops.setattr(node, {
            size: len,
            timestamp: Date.now()
          });
        }, ftruncate: function(fd, len) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28);
          }
          FS.truncate(stream.node, len);
        }, utime: function(path, atime, mtime) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          node.node_ops.setattr(node, {
            timestamp: Math.max(atime, mtime)
          });
        }, open: function(path, flags, mode, fd_start, fd_end) {
          if (path === "") {
            throw new FS.ErrnoError(44);
          }
          flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
          mode = typeof mode === "undefined" ? 438 : mode;
          if (flags & 64) {
            mode = mode & 4095 | 32768;
          } else {
            mode = 0;
          }
          var node;
          if (typeof path === "object") {
            node = path;
          } else {
            path = PATH.normalize(path);
            try {
              var lookup = FS.lookupPath(path, {
                follow: !(flags & 131072)
              });
              node = lookup.node;
            } catch (e) {
            }
          }
          var created = false;
          if (flags & 64) {
            if (node) {
              if (flags & 128) {
                throw new FS.ErrnoError(20);
              }
            } else {
              node = FS.mknod(path, mode, 0);
              created = true;
            }
          }
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          if (FS.isChrdev(node.mode)) {
            flags &= ~512;
          }
          if (flags & 65536 && !FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
          if (!created) {
            var errCode = FS.mayOpen(node, flags);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          if (flags & 512) {
            FS.truncate(node, 0);
          }
          flags &= ~(128 | 512 | 131072);
          var stream = FS.createStream({
            node,
            path: FS.getPath(node),
            flags,
            seekable: true,
            position: 0,
            stream_ops: node.stream_ops,
            ungotten: [],
            error: false
          }, fd_start, fd_end);
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
          if (Module2["logReadFiles"] && !(flags & 1)) {
            if (!FS.readFiles)
              FS.readFiles = {};
            if (!(path in FS.readFiles)) {
              FS.readFiles[path] = 1;
              err("FS.trackingDelegate error on read file: " + path);
            }
          }
          try {
            if (FS.trackingDelegate["onOpenFile"]) {
              var trackingFlags = 0;
              if ((flags & 2097155) !== 1) {
                trackingFlags |= FS.tracking.openFlags.READ;
              }
              if ((flags & 2097155) !== 0) {
                trackingFlags |= FS.tracking.openFlags.WRITE;
              }
              FS.trackingDelegate["onOpenFile"](path, trackingFlags);
            }
          } catch (e) {
            err("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
          }
          return stream;
        }, close: function(stream) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (stream.getdents)
            stream.getdents = null;
          try {
            if (stream.stream_ops.close) {
              stream.stream_ops.close(stream);
            }
          } catch (e) {
            throw e;
          } finally {
            FS.closeStream(stream.fd);
          }
          stream.fd = null;
        }, isClosed: function(stream) {
          return stream.fd === null;
        }, llseek: function(stream, offset, whence) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (!stream.seekable || !stream.stream_ops.llseek) {
            throw new FS.ErrnoError(70);
          }
          if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28);
          }
          stream.position = stream.stream_ops.llseek(stream, offset, whence);
          stream.ungotten = [];
          return stream.position;
        }, read: function(stream, buffer2, offset, length, position) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.read) {
            throw new FS.ErrnoError(28);
          }
          var seeking = typeof position !== "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesRead = stream.stream_ops.read(stream, buffer2, offset, length, position);
          if (!seeking)
            stream.position += bytesRead;
          return bytesRead;
        }, write: function(stream, buffer2, offset, length, position, canOwn) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.write) {
            throw new FS.ErrnoError(28);
          }
          if (stream.seekable && stream.flags & 1024) {
            FS.llseek(stream, 0, 2);
          }
          var seeking = typeof position !== "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesWritten = stream.stream_ops.write(stream, buffer2, offset, length, position, canOwn);
          if (!seeking)
            stream.position += bytesWritten;
          try {
            if (stream.path && FS.trackingDelegate["onWriteToFile"])
              FS.trackingDelegate["onWriteToFile"](stream.path);
          } catch (e) {
            err("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
          }
          return bytesWritten;
        }, allocate: function(stream, offset, length) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (offset < 0 || length <= 0) {
            throw new FS.ErrnoError(28);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (!stream.stream_ops.allocate) {
            throw new FS.ErrnoError(138);
          }
          stream.stream_ops.allocate(stream, offset, length);
        }, mmap: function(stream, address, length, position, prot, flags) {
          if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2);
          }
          if (!stream.stream_ops.mmap) {
            throw new FS.ErrnoError(43);
          }
          return stream.stream_ops.mmap(stream, address, length, position, prot, flags);
        }, msync: function(stream, buffer2, offset, length, mmapFlags) {
          if (!stream || !stream.stream_ops.msync) {
            return 0;
          }
          return stream.stream_ops.msync(stream, buffer2, offset, length, mmapFlags);
        }, munmap: function(stream) {
          return 0;
        }, ioctl: function(stream, cmd, arg) {
          if (!stream.stream_ops.ioctl) {
            throw new FS.ErrnoError(59);
          }
          return stream.stream_ops.ioctl(stream, cmd, arg);
        }, readFile: function(path, opts) {
          opts = opts || {};
          opts.flags = opts.flags || "r";
          opts.encoding = opts.encoding || "binary";
          if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            throw new Error('Invalid encoding type "' + opts.encoding + '"');
          }
          var ret;
          var stream = FS.open(path, opts.flags);
          var stat = FS.stat(path);
          var length = stat.size;
          var buf = new Uint8Array(length);
          FS.read(stream, buf, 0, length, 0);
          if (opts.encoding === "utf8") {
            ret = UTF8ArrayToString(buf, 0);
          } else if (opts.encoding === "binary") {
            ret = buf;
          }
          FS.close(stream);
          return ret;
        }, writeFile: function(path, data, opts) {
          opts = opts || {};
          opts.flags = opts.flags || "w";
          var stream = FS.open(path, opts.flags, opts.mode);
          if (typeof data === "string") {
            var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
            var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
            FS.write(stream, buf, 0, actualNumBytes, void 0, opts.canOwn);
          } else if (ArrayBuffer.isView(data)) {
            FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
          } else {
            throw new Error("Unsupported data type");
          }
          FS.close(stream);
        }, cwd: function() {
          return FS.currentPath;
        }, chdir: function(path) {
          var lookup = FS.lookupPath(path, { follow: true });
          if (lookup.node === null) {
            throw new FS.ErrnoError(44);
          }
          if (!FS.isDir(lookup.node.mode)) {
            throw new FS.ErrnoError(54);
          }
          var errCode = FS.nodePermissions(lookup.node, "x");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.currentPath = lookup.path;
        }, createDefaultDirectories: function() {
          FS.mkdir("/tmp");
          FS.mkdir("/home");
          FS.mkdir("/home/web_user");
        }, createDefaultDevices: function() {
          FS.mkdir("/dev");
          FS.registerDevice(FS.makedev(1, 3), {
            read: function() {
              return 0;
            },
            write: function(stream, buffer2, offset, length, pos) {
              return length;
            }
          });
          FS.mkdev("/dev/null", FS.makedev(1, 3));
          TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
          TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
          FS.mkdev("/dev/tty", FS.makedev(5, 0));
          FS.mkdev("/dev/tty1", FS.makedev(6, 0));
          var random_device;
          if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
            var randomBuffer = new Uint8Array(1);
            random_device = function() {
              crypto.getRandomValues(randomBuffer);
              return randomBuffer[0];
            };
          } else if (ENVIRONMENT_IS_NODE) {
            try {
              var crypto_module = require2("crypto");
              random_device = function() {
                return crypto_module["randomBytes"](1)[0];
              };
            } catch (e) {
            }
          } else {
          }
          if (!random_device) {
            random_device = function() {
              abort("random_device");
            };
          }
          FS.createDevice("/dev", "random", random_device);
          FS.createDevice("/dev", "urandom", random_device);
          FS.mkdir("/dev/shm");
          FS.mkdir("/dev/shm/tmp");
        }, createSpecialDirectories: function() {
          FS.mkdir("/proc");
          FS.mkdir("/proc/self");
          FS.mkdir("/proc/self/fd");
          FS.mount({
            mount: function() {
              var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
              node.node_ops = {
                lookup: function(parent, name) {
                  var fd = +name;
                  var stream = FS.getStream(fd);
                  if (!stream)
                    throw new FS.ErrnoError(8);
                  var ret = {
                    parent: null,
                    mount: { mountpoint: "fake" },
                    node_ops: { readlink: function() {
                      return stream.path;
                    } }
                  };
                  ret.parent = ret;
                  return ret;
                }
              };
              return node;
            }
          }, {}, "/proc/self/fd");
        }, createStandardStreams: function() {
          if (Module2["stdin"]) {
            FS.createDevice("/dev", "stdin", Module2["stdin"]);
          } else {
            FS.symlink("/dev/tty", "/dev/stdin");
          }
          if (Module2["stdout"]) {
            FS.createDevice("/dev", "stdout", null, Module2["stdout"]);
          } else {
            FS.symlink("/dev/tty", "/dev/stdout");
          }
          if (Module2["stderr"]) {
            FS.createDevice("/dev", "stderr", null, Module2["stderr"]);
          } else {
            FS.symlink("/dev/tty1", "/dev/stderr");
          }
          var stdin = FS.open("/dev/stdin", "r");
          var stdout = FS.open("/dev/stdout", "w");
          var stderr = FS.open("/dev/stderr", "w");
        }, ensureErrnoError: function() {
          if (FS.ErrnoError)
            return;
          FS.ErrnoError = function ErrnoError(errno, node) {
            this.node = node;
            this.setErrno = function(errno2) {
              this.errno = errno2;
            };
            this.setErrno(errno);
            this.message = "FS error";
          };
          FS.ErrnoError.prototype = new Error();
          FS.ErrnoError.prototype.constructor = FS.ErrnoError;
          [44].forEach(function(code) {
            FS.genericErrors[code] = new FS.ErrnoError(code);
            FS.genericErrors[code].stack = "<generic error, no stack>";
          });
        }, staticInit: function() {
          FS.ensureErrnoError();
          FS.nameTable = new Array(4096);
          FS.mount(MEMFS, {}, "/");
          FS.createDefaultDirectories();
          FS.createDefaultDevices();
          FS.createSpecialDirectories();
          FS.filesystems = {
            "MEMFS": MEMFS
          };
        }, init: function(input, output, error) {
          FS.init.initialized = true;
          FS.ensureErrnoError();
          Module2["stdin"] = input || Module2["stdin"];
          Module2["stdout"] = output || Module2["stdout"];
          Module2["stderr"] = error || Module2["stderr"];
          FS.createStandardStreams();
        }, quit: function() {
          FS.init.initialized = false;
          var fflush = Module2["_fflush"];
          if (fflush)
            fflush(0);
          for (var i = 0; i < FS.streams.length; i++) {
            var stream = FS.streams[i];
            if (!stream) {
              continue;
            }
            FS.close(stream);
          }
        }, getMode: function(canRead, canWrite) {
          var mode = 0;
          if (canRead)
            mode |= 292 | 73;
          if (canWrite)
            mode |= 146;
          return mode;
        }, joinPath: function(parts, forceRelative) {
          var path = PATH.join.apply(null, parts);
          if (forceRelative && path[0] == "/")
            path = path.substr(1);
          return path;
        }, absolutePath: function(relative, base) {
          return PATH_FS.resolve(base, relative);
        }, standardizePath: function(path) {
          return PATH.normalize(path);
        }, findObject: function(path, dontResolveLastLink) {
          var ret = FS.analyzePath(path, dontResolveLastLink);
          if (ret.exists) {
            return ret.object;
          } else {
            setErrNo(ret.error);
            return null;
          }
        }, analyzePath: function(path, dontResolveLastLink) {
          try {
            var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            path = lookup.path;
          } catch (e) {
          }
          var ret = {
            isRoot: false,
            exists: false,
            error: 0,
            name: null,
            path: null,
            object: null,
            parentExists: false,
            parentPath: null,
            parentObject: null
          };
          try {
            var lookup = FS.lookupPath(path, { parent: true });
            ret.parentExists = true;
            ret.parentPath = lookup.path;
            ret.parentObject = lookup.node;
            ret.name = PATH.basename(path);
            lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            ret.exists = true;
            ret.path = lookup.path;
            ret.object = lookup.node;
            ret.name = lookup.node.name;
            ret.isRoot = lookup.path === "/";
          } catch (e) {
            ret.error = e.errno;
          }
          ;
          return ret;
        }, createFolder: function(parent, name, canRead, canWrite) {
          var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
          var mode = FS.getMode(canRead, canWrite);
          return FS.mkdir(path, mode);
        }, createPath: function(parent, path, canRead, canWrite) {
          parent = typeof parent === "string" ? parent : FS.getPath(parent);
          var parts = path.split("/").reverse();
          while (parts.length) {
            var part = parts.pop();
            if (!part)
              continue;
            var current = PATH.join2(parent, part);
            try {
              FS.mkdir(current);
            } catch (e) {
            }
            parent = current;
          }
          return current;
        }, createFile: function(parent, name, properties, canRead, canWrite) {
          var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
          var mode = FS.getMode(canRead, canWrite);
          return FS.create(path, mode);
        }, createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
          var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
          var mode = FS.getMode(canRead, canWrite);
          var node = FS.create(path, mode);
          if (data) {
            if (typeof data === "string") {
              var arr = new Array(data.length);
              for (var i = 0, len = data.length; i < len; ++i)
                arr[i] = data.charCodeAt(i);
              data = arr;
            }
            FS.chmod(node, mode | 146);
            var stream = FS.open(node, "w");
            FS.write(stream, data, 0, data.length, 0, canOwn);
            FS.close(stream);
            FS.chmod(node, mode);
          }
          return node;
        }, createDevice: function(parent, name, input, output) {
          var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
          var mode = FS.getMode(!!input, !!output);
          if (!FS.createDevice.major)
            FS.createDevice.major = 64;
          var dev = FS.makedev(FS.createDevice.major++, 0);
          FS.registerDevice(dev, {
            open: function(stream) {
              stream.seekable = false;
            },
            close: function(stream) {
              if (output && output.buffer && output.buffer.length) {
                output(10);
              }
            },
            read: function(stream, buffer2, offset, length, pos) {
              var bytesRead = 0;
              for (var i = 0; i < length; i++) {
                var result;
                try {
                  result = input();
                } catch (e) {
                  throw new FS.ErrnoError(29);
                }
                if (result === void 0 && bytesRead === 0) {
                  throw new FS.ErrnoError(6);
                }
                if (result === null || result === void 0)
                  break;
                bytesRead++;
                buffer2[offset + i] = result;
              }
              if (bytesRead) {
                stream.node.timestamp = Date.now();
              }
              return bytesRead;
            },
            write: function(stream, buffer2, offset, length, pos) {
              for (var i = 0; i < length; i++) {
                try {
                  output(buffer2[offset + i]);
                } catch (e) {
                  throw new FS.ErrnoError(29);
                }
              }
              if (length) {
                stream.node.timestamp = Date.now();
              }
              return i;
            }
          });
          return FS.mkdev(path, mode, dev);
        }, createLink: function(parent, name, target, canRead, canWrite) {
          var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
          return FS.symlink(target, path);
        }, forceLoadFile: function(obj) {
          if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
            return true;
          var success = true;
          if (typeof XMLHttpRequest !== "undefined") {
            throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          } else if (read_) {
            try {
              obj.contents = intArrayFromString(read_(obj.url), true);
              obj.usedBytes = obj.contents.length;
            } catch (e) {
              success = false;
            }
          } else {
            throw new Error("Cannot load without read() or XMLHttpRequest.");
          }
          if (!success)
            setErrNo(29);
          return success;
        }, createLazyFile: function(parent, name, url, canRead, canWrite) {
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = [];
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length - 1 || idx < 0) {
              return void 0;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = idx / this.chunkSize | 0;
            return this.getter(chunkNum)[chunkOffset];
          };
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          };
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
            var xhr = new XMLHttpRequest();
            xhr.open("HEAD", url, false);
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
              throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
            var chunkSize = 1024 * 1024;
            if (!hasByteServing)
              chunkSize = datalength;
            var doXHR = function(from, to) {
              if (from > to)
                throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
              if (to > datalength - 1)
                throw new Error("only " + datalength + " bytes available! programmer error!");
              var xhr2 = new XMLHttpRequest();
              xhr2.open("GET", url, false);
              if (datalength !== chunkSize)
                xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
              if (typeof Uint8Array != "undefined")
                xhr2.responseType = "arraybuffer";
              if (xhr2.overrideMimeType) {
                xhr2.overrideMimeType("text/plain; charset=x-user-defined");
              }
              xhr2.send(null);
              if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304))
                throw new Error("Couldn't load " + url + ". Status: " + xhr2.status);
              if (xhr2.response !== void 0) {
                return new Uint8Array(xhr2.response || []);
              } else {
                return intArrayFromString(xhr2.responseText || "", true);
              }
            };
            var lazyArray2 = this;
            lazyArray2.setDataGetter(function(chunkNum) {
              var start2 = chunkNum * chunkSize;
              var end = (chunkNum + 1) * chunkSize - 1;
              end = Math.min(end, datalength - 1);
              if (typeof lazyArray2.chunks[chunkNum] === "undefined") {
                lazyArray2.chunks[chunkNum] = doXHR(start2, end);
              }
              if (typeof lazyArray2.chunks[chunkNum] === "undefined")
                throw new Error("doXHR failed!");
              return lazyArray2.chunks[chunkNum];
            });
            if (usesGzip || !datalength) {
              chunkSize = datalength = 1;
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out("LazyFiles on gzip forces download of the whole file when length is accessed");
            }
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          };
          if (typeof XMLHttpRequest !== "undefined") {
            if (!ENVIRONMENT_IS_WORKER)
              throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var lazyArray = new LazyUint8Array();
            Object.defineProperties(lazyArray, {
              length: {
                get: function() {
                  if (!this.lengthKnown) {
                    this.cacheLength();
                  }
                  return this._length;
                }
              },
              chunkSize: {
                get: function() {
                  if (!this.lengthKnown) {
                    this.cacheLength();
                  }
                  return this._chunkSize;
                }
              }
            });
            var properties = { isDevice: false, contents: lazyArray };
          } else {
            var properties = { isDevice: false, url };
          }
          var node = FS.createFile(parent, name, properties, canRead, canWrite);
          if (properties.contents) {
            node.contents = properties.contents;
          } else if (properties.url) {
            node.contents = null;
            node.url = properties.url;
          }
          Object.defineProperties(node, {
            usedBytes: {
              get: function() {
                return this.contents.length;
              }
            }
          });
          var stream_ops = {};
          var keys = Object.keys(node.stream_ops);
          keys.forEach(function(key2) {
            var fn = node.stream_ops[key2];
            stream_ops[key2] = function forceLoadLazyFile() {
              if (!FS.forceLoadFile(node)) {
                throw new FS.ErrnoError(29);
              }
              return fn.apply(null, arguments);
            };
          });
          stream_ops.read = function stream_ops_read(stream, buffer2, offset, length, position) {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(29);
            }
            var contents = stream.node.contents;
            if (position >= contents.length)
              return 0;
            var size = Math.min(contents.length - position, length);
            if (contents.slice) {
              for (var i = 0; i < size; i++) {
                buffer2[offset + i] = contents[position + i];
              }
            } else {
              for (var i = 0; i < size; i++) {
                buffer2[offset + i] = contents.get(position + i);
              }
            }
            return size;
          };
          node.stream_ops = stream_ops;
          return node;
        }, createPreloadedFile: function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
          Browser.init();
          var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
          var dep = getUniqueRunDependency("cp " + fullname);
          function processData(byteArray) {
            function finish(byteArray2) {
              if (preFinish)
                preFinish();
              if (!dontCreateFile) {
                FS.createDataFile(parent, name, byteArray2, canRead, canWrite, canOwn);
              }
              if (onload)
                onload();
              removeRunDependency(dep);
            }
            var handled = false;
            Module2["preloadPlugins"].forEach(function(plugin) {
              if (handled)
                return;
              if (plugin["canHandle"](fullname)) {
                plugin["handle"](byteArray, fullname, finish, function() {
                  if (onerror)
                    onerror();
                  removeRunDependency(dep);
                });
                handled = true;
              }
            });
            if (!handled)
              finish(byteArray);
          }
          addRunDependency(dep);
          if (typeof url == "string") {
            Browser.asyncLoad(url, function(byteArray) {
              processData(byteArray);
            }, onerror);
          } else {
            processData(url);
          }
        }, indexedDB: function() {
          return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        }, DB_NAME: function() {
          return "EM_FS_" + window.location.pathname;
        }, DB_VERSION: 20, DB_STORE_NAME: "FILE_DATA", saveFilesToDB: function(paths, onload, onerror) {
          onload = onload || function() {
          };
          onerror = onerror || function() {
          };
          var indexedDB = FS.indexedDB();
          try {
            var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
          } catch (e) {
            return onerror(e);
          }
          openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
            out("creating db");
            var db = openRequest.result;
            db.createObjectStore(FS.DB_STORE_NAME);
          };
          openRequest.onsuccess = function openRequest_onsuccess() {
            var db = openRequest.result;
            var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
            var files = transaction.objectStore(FS.DB_STORE_NAME);
            var ok = 0, fail = 0, total = paths.length;
            function finish() {
              if (fail == 0)
                onload();
              else
                onerror();
            }
            paths.forEach(function(path) {
              var putRequest = files.put(FS.analyzePath(path).object.contents, path);
              putRequest.onsuccess = function putRequest_onsuccess() {
                ok++;
                if (ok + fail == total)
                  finish();
              };
              putRequest.onerror = function putRequest_onerror() {
                fail++;
                if (ok + fail == total)
                  finish();
              };
            });
            transaction.onerror = onerror;
          };
          openRequest.onerror = onerror;
        }, loadFilesFromDB: function(paths, onload, onerror) {
          onload = onload || function() {
          };
          onerror = onerror || function() {
          };
          var indexedDB = FS.indexedDB();
          try {
            var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
          } catch (e) {
            return onerror(e);
          }
          openRequest.onupgradeneeded = onerror;
          openRequest.onsuccess = function openRequest_onsuccess() {
            var db = openRequest.result;
            try {
              var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
            } catch (e) {
              onerror(e);
              return;
            }
            var files = transaction.objectStore(FS.DB_STORE_NAME);
            var ok = 0, fail = 0, total = paths.length;
            function finish() {
              if (fail == 0)
                onload();
              else
                onerror();
            }
            paths.forEach(function(path) {
              var getRequest = files.get(path);
              getRequest.onsuccess = function getRequest_onsuccess() {
                if (FS.analyzePath(path).exists) {
                  FS.unlink(path);
                }
                FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
                ok++;
                if (ok + fail == total)
                  finish();
              };
              getRequest.onerror = function getRequest_onerror() {
                fail++;
                if (ok + fail == total)
                  finish();
              };
            });
            transaction.onerror = onerror;
          };
          openRequest.onerror = onerror;
        } };
        var SYSCALLS = { mappings: {}, DEFAULT_POLLMASK: 5, umask: 511, calculateAt: function(dirfd, path) {
          if (path[0] !== "/") {
            var dir;
            if (dirfd === -100) {
              dir = FS.cwd();
            } else {
              var dirstream = FS.getStream(dirfd);
              if (!dirstream)
                throw new FS.ErrnoError(8);
              dir = dirstream.path;
            }
            path = PATH.join2(dir, path);
          }
          return path;
        }, doStat: function(func, path, buf) {
          try {
            var stat = func(path);
          } catch (e) {
            if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
              return -54;
            }
            throw e;
          }
          HEAP32[buf >> 2] = stat.dev;
          HEAP32[buf + 4 >> 2] = 0;
          HEAP32[buf + 8 >> 2] = stat.ino;
          HEAP32[buf + 12 >> 2] = stat.mode;
          HEAP32[buf + 16 >> 2] = stat.nlink;
          HEAP32[buf + 20 >> 2] = stat.uid;
          HEAP32[buf + 24 >> 2] = stat.gid;
          HEAP32[buf + 28 >> 2] = stat.rdev;
          HEAP32[buf + 32 >> 2] = 0;
          tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
          HEAP32[buf + 48 >> 2] = 4096;
          HEAP32[buf + 52 >> 2] = stat.blocks;
          HEAP32[buf + 56 >> 2] = stat.atime.getTime() / 1e3 | 0;
          HEAP32[buf + 60 >> 2] = 0;
          HEAP32[buf + 64 >> 2] = stat.mtime.getTime() / 1e3 | 0;
          HEAP32[buf + 68 >> 2] = 0;
          HEAP32[buf + 72 >> 2] = stat.ctime.getTime() / 1e3 | 0;
          HEAP32[buf + 76 >> 2] = 0;
          tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 80 >> 2] = tempI64[0], HEAP32[buf + 84 >> 2] = tempI64[1];
          return 0;
        }, doMsync: function(addr, stream, len, flags, offset) {
          var buffer2 = HEAPU8.slice(addr, addr + len);
          FS.msync(stream, buffer2, offset, len, flags);
        }, doMkdir: function(path, mode) {
          path = PATH.normalize(path);
          if (path[path.length - 1] === "/")
            path = path.substr(0, path.length - 1);
          FS.mkdir(path, mode, 0);
          return 0;
        }, doMknod: function(path, mode, dev) {
          switch (mode & 61440) {
            case 32768:
            case 8192:
            case 24576:
            case 4096:
            case 49152:
              break;
            default:
              return -28;
          }
          FS.mknod(path, mode, dev);
          return 0;
        }, doReadlink: function(path, buf, bufsize) {
          if (bufsize <= 0)
            return -28;
          var ret = FS.readlink(path);
          var len = Math.min(bufsize, lengthBytesUTF8(ret));
          var endChar = HEAP8[buf + len];
          stringToUTF8(ret, buf, bufsize + 1);
          HEAP8[buf + len] = endChar;
          return len;
        }, doAccess: function(path, amode) {
          if (amode & ~7) {
            return -28;
          }
          var node;
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
          if (!node) {
            return -44;
          }
          var perms = "";
          if (amode & 4)
            perms += "r";
          if (amode & 2)
            perms += "w";
          if (amode & 1)
            perms += "x";
          if (perms && FS.nodePermissions(node, perms)) {
            return -2;
          }
          return 0;
        }, doDup: function(path, flags, suggestFD) {
          var suggest = FS.getStream(suggestFD);
          if (suggest)
            FS.close(suggest);
          return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
        }, doReadv: function(stream, iov, iovcnt, offset) {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[iov + i * 8 >> 2];
            var len = HEAP32[iov + (i * 8 + 4) >> 2];
            var curr = FS.read(stream, HEAP8, ptr, len, offset);
            if (curr < 0)
              return -1;
            ret += curr;
            if (curr < len)
              break;
          }
          return ret;
        }, doWritev: function(stream, iov, iovcnt, offset) {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[iov + i * 8 >> 2];
            var len = HEAP32[iov + (i * 8 + 4) >> 2];
            var curr = FS.write(stream, HEAP8, ptr, len, offset);
            if (curr < 0)
              return -1;
            ret += curr;
          }
          return ret;
        }, varargs: void 0, get: function() {
          SYSCALLS.varargs += 4;
          var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
          return ret;
        }, getStr: function(ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        }, getStreamFromFD: function(fd) {
          var stream = FS.getStream(fd);
          if (!stream)
            throw new FS.ErrnoError(8);
          return stream;
        }, get64: function(low, high) {
          return low;
        } };
        function _fd_close(fd) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.close(stream);
            return 0;
          } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
              abort(e);
            return e.errno;
          }
        }
        function _fd_read(fd, iov, iovcnt, pnum) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = SYSCALLS.doReadv(stream, iov, iovcnt);
            HEAP32[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
              abort(e);
            return e.errno;
          }
        }
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var HIGH_OFFSET = 4294967296;
            var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
            var DOUBLE_LIMIT = 9007199254740992;
            if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
              return -61;
            }
            FS.llseek(stream, offset, whence);
            tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
            if (stream.getdents && offset === 0 && whence === 0)
              stream.getdents = null;
            return 0;
          } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
              abort(e);
            return e.errno;
          }
        }
        function _fd_write(fd, iov, iovcnt, pnum) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = SYSCALLS.doWritev(stream, iov, iovcnt);
            HEAP32[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
              abort(e);
            return e.errno;
          }
        }
        function _round(d) {
          d = +d;
          return d >= 0 ? +Math_floor(d + 0.5) : +Math_ceil(d - 0.5);
        }
        function _setTempRet0($i) {
          setTempRet0($i | 0);
        }
        var FSNode = function(parent, name, mode, rdev) {
          if (!parent) {
            parent = this;
          }
          this.parent = parent;
          this.mount = parent.mount;
          this.mounted = null;
          this.id = FS.nextInode++;
          this.name = name;
          this.mode = mode;
          this.node_ops = {};
          this.stream_ops = {};
          this.rdev = rdev;
        };
        var readMode = 292 | 73;
        var writeMode = 146;
        Object.defineProperties(FSNode.prototype, {
          read: {
            get: function() {
              return (this.mode & readMode) === readMode;
            },
            set: function(val) {
              val ? this.mode |= readMode : this.mode &= ~readMode;
            }
          },
          write: {
            get: function() {
              return (this.mode & writeMode) === writeMode;
            },
            set: function(val) {
              val ? this.mode |= writeMode : this.mode &= ~writeMode;
            }
          },
          isFolder: {
            get: function() {
              return FS.isDir(this.mode);
            }
          },
          isDevice: {
            get: function() {
              return FS.isChrdev(this.mode);
            }
          }
        });
        FS.FSNode = FSNode;
        FS.staticInit();
        ;
        var ASSERTIONS = false;
        function intArrayFromString(stringy, dontAddNull, length) {
          var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
          var u8array = new Array(len);
          var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
          if (dontAddNull)
            u8array.length = numBytesWritten;
          return u8array;
        }
        function intArrayToString(array) {
          var ret = [];
          for (var i = 0; i < array.length; i++) {
            var chr = array[i];
            if (chr > 255) {
              if (ASSERTIONS) {
                assert2(false, "Character code " + chr + " (" + String.fromCharCode(chr) + ")  at offset " + i + " not in 0x00-0xFF.");
              }
              chr &= 255;
            }
            ret.push(String.fromCharCode(chr));
          }
          return ret.join("");
        }
        var asmGlobalArg = {};
        var asmLibraryArg = { "emscripten_get_sbrk_ptr": _emscripten_get_sbrk_ptr, "emscripten_memcpy_big": _emscripten_memcpy_big, "emscripten_resize_heap": _emscripten_resize_heap, "fd_close": _fd_close, "fd_read": _fd_read, "fd_seek": _fd_seek, "fd_write": _fd_write, "memory": wasmMemory, "round": _round, "setTempRet0": _setTempRet0, "table": wasmTable };
        var asm = createWasm();
        var ___wasm_call_ctors = Module2["___wasm_call_ctors"] = function() {
          return (___wasm_call_ctors = Module2["___wasm_call_ctors"] = Module2["asm"]["__wasm_call_ctors"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_new = Module2["_FLAC__stream_decoder_new"] = function() {
          return (_FLAC__stream_decoder_new = Module2["_FLAC__stream_decoder_new"] = Module2["asm"]["FLAC__stream_decoder_new"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_delete = Module2["_FLAC__stream_decoder_delete"] = function() {
          return (_FLAC__stream_decoder_delete = Module2["_FLAC__stream_decoder_delete"] = Module2["asm"]["FLAC__stream_decoder_delete"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_finish = Module2["_FLAC__stream_decoder_finish"] = function() {
          return (_FLAC__stream_decoder_finish = Module2["_FLAC__stream_decoder_finish"] = Module2["asm"]["FLAC__stream_decoder_finish"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_init_stream = Module2["_FLAC__stream_decoder_init_stream"] = function() {
          return (_FLAC__stream_decoder_init_stream = Module2["_FLAC__stream_decoder_init_stream"] = Module2["asm"]["FLAC__stream_decoder_init_stream"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_reset = Module2["_FLAC__stream_decoder_reset"] = function() {
          return (_FLAC__stream_decoder_reset = Module2["_FLAC__stream_decoder_reset"] = Module2["asm"]["FLAC__stream_decoder_reset"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_init_ogg_stream = Module2["_FLAC__stream_decoder_init_ogg_stream"] = function() {
          return (_FLAC__stream_decoder_init_ogg_stream = Module2["_FLAC__stream_decoder_init_ogg_stream"] = Module2["asm"]["FLAC__stream_decoder_init_ogg_stream"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_set_ogg_serial_number = Module2["_FLAC__stream_decoder_set_ogg_serial_number"] = function() {
          return (_FLAC__stream_decoder_set_ogg_serial_number = Module2["_FLAC__stream_decoder_set_ogg_serial_number"] = Module2["asm"]["FLAC__stream_decoder_set_ogg_serial_number"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_set_md5_checking = Module2["_FLAC__stream_decoder_set_md5_checking"] = function() {
          return (_FLAC__stream_decoder_set_md5_checking = Module2["_FLAC__stream_decoder_set_md5_checking"] = Module2["asm"]["FLAC__stream_decoder_set_md5_checking"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_set_metadata_respond = Module2["_FLAC__stream_decoder_set_metadata_respond"] = function() {
          return (_FLAC__stream_decoder_set_metadata_respond = Module2["_FLAC__stream_decoder_set_metadata_respond"] = Module2["asm"]["FLAC__stream_decoder_set_metadata_respond"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_set_metadata_respond_application = Module2["_FLAC__stream_decoder_set_metadata_respond_application"] = function() {
          return (_FLAC__stream_decoder_set_metadata_respond_application = Module2["_FLAC__stream_decoder_set_metadata_respond_application"] = Module2["asm"]["FLAC__stream_decoder_set_metadata_respond_application"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_set_metadata_respond_all = Module2["_FLAC__stream_decoder_set_metadata_respond_all"] = function() {
          return (_FLAC__stream_decoder_set_metadata_respond_all = Module2["_FLAC__stream_decoder_set_metadata_respond_all"] = Module2["asm"]["FLAC__stream_decoder_set_metadata_respond_all"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_set_metadata_ignore = Module2["_FLAC__stream_decoder_set_metadata_ignore"] = function() {
          return (_FLAC__stream_decoder_set_metadata_ignore = Module2["_FLAC__stream_decoder_set_metadata_ignore"] = Module2["asm"]["FLAC__stream_decoder_set_metadata_ignore"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_set_metadata_ignore_application = Module2["_FLAC__stream_decoder_set_metadata_ignore_application"] = function() {
          return (_FLAC__stream_decoder_set_metadata_ignore_application = Module2["_FLAC__stream_decoder_set_metadata_ignore_application"] = Module2["asm"]["FLAC__stream_decoder_set_metadata_ignore_application"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_set_metadata_ignore_all = Module2["_FLAC__stream_decoder_set_metadata_ignore_all"] = function() {
          return (_FLAC__stream_decoder_set_metadata_ignore_all = Module2["_FLAC__stream_decoder_set_metadata_ignore_all"] = Module2["asm"]["FLAC__stream_decoder_set_metadata_ignore_all"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_get_state = Module2["_FLAC__stream_decoder_get_state"] = function() {
          return (_FLAC__stream_decoder_get_state = Module2["_FLAC__stream_decoder_get_state"] = Module2["asm"]["FLAC__stream_decoder_get_state"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_get_md5_checking = Module2["_FLAC__stream_decoder_get_md5_checking"] = function() {
          return (_FLAC__stream_decoder_get_md5_checking = Module2["_FLAC__stream_decoder_get_md5_checking"] = Module2["asm"]["FLAC__stream_decoder_get_md5_checking"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_process_single = Module2["_FLAC__stream_decoder_process_single"] = function() {
          return (_FLAC__stream_decoder_process_single = Module2["_FLAC__stream_decoder_process_single"] = Module2["asm"]["FLAC__stream_decoder_process_single"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_process_until_end_of_metadata = Module2["_FLAC__stream_decoder_process_until_end_of_metadata"] = function() {
          return (_FLAC__stream_decoder_process_until_end_of_metadata = Module2["_FLAC__stream_decoder_process_until_end_of_metadata"] = Module2["asm"]["FLAC__stream_decoder_process_until_end_of_metadata"]).apply(null, arguments);
        };
        var _FLAC__stream_decoder_process_until_end_of_stream = Module2["_FLAC__stream_decoder_process_until_end_of_stream"] = function() {
          return (_FLAC__stream_decoder_process_until_end_of_stream = Module2["_FLAC__stream_decoder_process_until_end_of_stream"] = Module2["asm"]["FLAC__stream_decoder_process_until_end_of_stream"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_new = Module2["_FLAC__stream_encoder_new"] = function() {
          return (_FLAC__stream_encoder_new = Module2["_FLAC__stream_encoder_new"] = Module2["asm"]["FLAC__stream_encoder_new"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_delete = Module2["_FLAC__stream_encoder_delete"] = function() {
          return (_FLAC__stream_encoder_delete = Module2["_FLAC__stream_encoder_delete"] = Module2["asm"]["FLAC__stream_encoder_delete"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_finish = Module2["_FLAC__stream_encoder_finish"] = function() {
          return (_FLAC__stream_encoder_finish = Module2["_FLAC__stream_encoder_finish"] = Module2["asm"]["FLAC__stream_encoder_finish"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_init_stream = Module2["_FLAC__stream_encoder_init_stream"] = function() {
          return (_FLAC__stream_encoder_init_stream = Module2["_FLAC__stream_encoder_init_stream"] = Module2["asm"]["FLAC__stream_encoder_init_stream"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_init_ogg_stream = Module2["_FLAC__stream_encoder_init_ogg_stream"] = function() {
          return (_FLAC__stream_encoder_init_ogg_stream = Module2["_FLAC__stream_encoder_init_ogg_stream"] = Module2["asm"]["FLAC__stream_encoder_init_ogg_stream"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_set_ogg_serial_number = Module2["_FLAC__stream_encoder_set_ogg_serial_number"] = function() {
          return (_FLAC__stream_encoder_set_ogg_serial_number = Module2["_FLAC__stream_encoder_set_ogg_serial_number"] = Module2["asm"]["FLAC__stream_encoder_set_ogg_serial_number"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_set_verify = Module2["_FLAC__stream_encoder_set_verify"] = function() {
          return (_FLAC__stream_encoder_set_verify = Module2["_FLAC__stream_encoder_set_verify"] = Module2["asm"]["FLAC__stream_encoder_set_verify"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_set_channels = Module2["_FLAC__stream_encoder_set_channels"] = function() {
          return (_FLAC__stream_encoder_set_channels = Module2["_FLAC__stream_encoder_set_channels"] = Module2["asm"]["FLAC__stream_encoder_set_channels"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_set_bits_per_sample = Module2["_FLAC__stream_encoder_set_bits_per_sample"] = function() {
          return (_FLAC__stream_encoder_set_bits_per_sample = Module2["_FLAC__stream_encoder_set_bits_per_sample"] = Module2["asm"]["FLAC__stream_encoder_set_bits_per_sample"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_set_sample_rate = Module2["_FLAC__stream_encoder_set_sample_rate"] = function() {
          return (_FLAC__stream_encoder_set_sample_rate = Module2["_FLAC__stream_encoder_set_sample_rate"] = Module2["asm"]["FLAC__stream_encoder_set_sample_rate"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_set_compression_level = Module2["_FLAC__stream_encoder_set_compression_level"] = function() {
          return (_FLAC__stream_encoder_set_compression_level = Module2["_FLAC__stream_encoder_set_compression_level"] = Module2["asm"]["FLAC__stream_encoder_set_compression_level"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_set_blocksize = Module2["_FLAC__stream_encoder_set_blocksize"] = function() {
          return (_FLAC__stream_encoder_set_blocksize = Module2["_FLAC__stream_encoder_set_blocksize"] = Module2["asm"]["FLAC__stream_encoder_set_blocksize"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_set_total_samples_estimate = Module2["_FLAC__stream_encoder_set_total_samples_estimate"] = function() {
          return (_FLAC__stream_encoder_set_total_samples_estimate = Module2["_FLAC__stream_encoder_set_total_samples_estimate"] = Module2["asm"]["FLAC__stream_encoder_set_total_samples_estimate"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_set_metadata = Module2["_FLAC__stream_encoder_set_metadata"] = function() {
          return (_FLAC__stream_encoder_set_metadata = Module2["_FLAC__stream_encoder_set_metadata"] = Module2["asm"]["FLAC__stream_encoder_set_metadata"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_get_state = Module2["_FLAC__stream_encoder_get_state"] = function() {
          return (_FLAC__stream_encoder_get_state = Module2["_FLAC__stream_encoder_get_state"] = Module2["asm"]["FLAC__stream_encoder_get_state"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_get_verify_decoder_state = Module2["_FLAC__stream_encoder_get_verify_decoder_state"] = function() {
          return (_FLAC__stream_encoder_get_verify_decoder_state = Module2["_FLAC__stream_encoder_get_verify_decoder_state"] = Module2["asm"]["FLAC__stream_encoder_get_verify_decoder_state"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_get_verify = Module2["_FLAC__stream_encoder_get_verify"] = function() {
          return (_FLAC__stream_encoder_get_verify = Module2["_FLAC__stream_encoder_get_verify"] = Module2["asm"]["FLAC__stream_encoder_get_verify"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_process = Module2["_FLAC__stream_encoder_process"] = function() {
          return (_FLAC__stream_encoder_process = Module2["_FLAC__stream_encoder_process"] = Module2["asm"]["FLAC__stream_encoder_process"]).apply(null, arguments);
        };
        var _FLAC__stream_encoder_process_interleaved = Module2["_FLAC__stream_encoder_process_interleaved"] = function() {
          return (_FLAC__stream_encoder_process_interleaved = Module2["_FLAC__stream_encoder_process_interleaved"] = Module2["asm"]["FLAC__stream_encoder_process_interleaved"]).apply(null, arguments);
        };
        var ___errno_location = Module2["___errno_location"] = function() {
          return (___errno_location = Module2["___errno_location"] = Module2["asm"]["__errno_location"]).apply(null, arguments);
        };
        var stackSave = Module2["stackSave"] = function() {
          return (stackSave = Module2["stackSave"] = Module2["asm"]["stackSave"]).apply(null, arguments);
        };
        var stackRestore = Module2["stackRestore"] = function() {
          return (stackRestore = Module2["stackRestore"] = Module2["asm"]["stackRestore"]).apply(null, arguments);
        };
        var stackAlloc = Module2["stackAlloc"] = function() {
          return (stackAlloc = Module2["stackAlloc"] = Module2["asm"]["stackAlloc"]).apply(null, arguments);
        };
        var _malloc = Module2["_malloc"] = function() {
          return (_malloc = Module2["_malloc"] = Module2["asm"]["malloc"]).apply(null, arguments);
        };
        var _free = Module2["_free"] = function() {
          return (_free = Module2["_free"] = Module2["asm"]["free"]).apply(null, arguments);
        };
        var __growWasmMemory = Module2["__growWasmMemory"] = function() {
          return (__growWasmMemory = Module2["__growWasmMemory"] = Module2["asm"]["__growWasmMemory"]).apply(null, arguments);
        };
        var dynCall_iii = Module2["dynCall_iii"] = function() {
          return (dynCall_iii = Module2["dynCall_iii"] = Module2["asm"]["dynCall_iii"]).apply(null, arguments);
        };
        var dynCall_ii = Module2["dynCall_ii"] = function() {
          return (dynCall_ii = Module2["dynCall_ii"] = Module2["asm"]["dynCall_ii"]).apply(null, arguments);
        };
        var dynCall_iiii = Module2["dynCall_iiii"] = function() {
          return (dynCall_iiii = Module2["dynCall_iiii"] = Module2["asm"]["dynCall_iiii"]).apply(null, arguments);
        };
        var dynCall_jiji = Module2["dynCall_jiji"] = function() {
          return (dynCall_jiji = Module2["dynCall_jiji"] = Module2["asm"]["dynCall_jiji"]).apply(null, arguments);
        };
        var dynCall_viiiiii = Module2["dynCall_viiiiii"] = function() {
          return (dynCall_viiiiii = Module2["dynCall_viiiiii"] = Module2["asm"]["dynCall_viiiiii"]).apply(null, arguments);
        };
        var dynCall_iiiii = Module2["dynCall_iiiii"] = function() {
          return (dynCall_iiiii = Module2["dynCall_iiiii"] = Module2["asm"]["dynCall_iiiii"]).apply(null, arguments);
        };
        var dynCall_viiiiiii = Module2["dynCall_viiiiiii"] = function() {
          return (dynCall_viiiiiii = Module2["dynCall_viiiiiii"] = Module2["asm"]["dynCall_viiiiiii"]).apply(null, arguments);
        };
        var dynCall_viiii = Module2["dynCall_viiii"] = function() {
          return (dynCall_viiii = Module2["dynCall_viiii"] = Module2["asm"]["dynCall_viiii"]).apply(null, arguments);
        };
        var dynCall_viii = Module2["dynCall_viii"] = function() {
          return (dynCall_viii = Module2["dynCall_viii"] = Module2["asm"]["dynCall_viii"]).apply(null, arguments);
        };
        Module2["ccall"] = ccall;
        Module2["cwrap"] = cwrap;
        Module2["setValue"] = setValue;
        Module2["getValue"] = getValue;
        var calledRun;
        function ExitStatus(status) {
          this.name = "ExitStatus";
          this.message = "Program terminated with exit(" + status + ")";
          this.status = status;
        }
        var calledMain = false;
        dependenciesFulfilled = function runCaller() {
          if (!calledRun)
            run();
          if (!calledRun)
            dependenciesFulfilled = runCaller;
        };
        function run(args) {
          args = args || arguments_;
          if (runDependencies > 0) {
            return;
          }
          preRun();
          if (runDependencies > 0)
            return;
          function doRun() {
            if (calledRun)
              return;
            calledRun = true;
            Module2["calledRun"] = true;
            if (ABORT)
              return;
            initRuntime();
            preMain();
            if (Module2["onRuntimeInitialized"])
              Module2["onRuntimeInitialized"]();
            postRun();
          }
          if (Module2["setStatus"]) {
            Module2["setStatus"]("Running...");
            setTimeout(function() {
              setTimeout(function() {
                Module2["setStatus"]("");
              }, 1);
              doRun();
            }, 1);
          } else {
            doRun();
          }
        }
        Module2["run"] = run;
        function exit(status, implicit) {
          if (implicit && noExitRuntime && status === 0) {
            return;
          }
          if (noExitRuntime) {
          } else {
            ABORT = true;
            EXITSTATUS = status;
            exitRuntime();
            if (Module2["onExit"])
              Module2["onExit"](status);
          }
          quit_(status, new ExitStatus(status));
        }
        if (Module2["preInit"]) {
          if (typeof Module2["preInit"] == "function")
            Module2["preInit"] = [Module2["preInit"]];
          while (Module2["preInit"].length > 0) {
            Module2["preInit"].pop()();
          }
        }
        noExitRuntime = true;
        run();
        function _readStreamInfo(p_streaminfo) {
          var min_blocksize = Module2.getValue(p_streaminfo, "i32");
          var max_blocksize = Module2.getValue(p_streaminfo + 4, "i32");
          var min_framesize = Module2.getValue(p_streaminfo + 8, "i32");
          var max_framesize = Module2.getValue(p_streaminfo + 12, "i32");
          var sample_rate = Module2.getValue(p_streaminfo + 16, "i32");
          var channels = Module2.getValue(p_streaminfo + 20, "i32");
          var bits_per_sample = Module2.getValue(p_streaminfo + 24, "i32");
          var total_samples = Module2.getValue(p_streaminfo + 32, "i64");
          var md5sum = _readMd5(p_streaminfo + 40);
          return {
            min_blocksize,
            max_blocksize,
            min_framesize,
            max_framesize,
            sampleRate: sample_rate,
            channels,
            bitsPerSample: bits_per_sample,
            total_samples,
            md5sum
          };
        }
        function _readMd5(p_md5) {
          var sb = [], v, str;
          for (var i = 0, len = 16; i < len; ++i) {
            v = Module2.getValue(p_md5 + i, "i8");
            if (v < 0)
              v = 256 + v;
            str = v.toString(16);
            if (str.length < 2)
              str = "0" + str;
            sb.push(str);
          }
          return sb.join("");
        }
        function _readFrameHdr(p_frame, enc_opt) {
          var blocksize = Module2.getValue(p_frame, "i32");
          var sample_rate = Module2.getValue(p_frame + 4, "i32");
          var channels = Module2.getValue(p_frame + 8, "i32");
          var channel_assignment = Module2.getValue(p_frame + 12, "i32");
          var bits_per_sample = Module2.getValue(p_frame + 16, "i32");
          var number_type = Module2.getValue(p_frame + 20, "i32");
          var frame_number = Module2.getValue(p_frame + 24, "i32");
          var sample_number = Module2.getValue(p_frame + 24, "i64");
          var number = number_type === 0 ? frame_number : sample_number;
          var numberType = number_type === 0 ? "frames" : "samples";
          var crc = Module2.getValue(p_frame + 36, "i8");
          var subframes;
          if (enc_opt && enc_opt.analyseSubframes) {
            var subOffset = { offset: 40 };
            subframes = [];
            for (var i = 0; i < channels; ++i) {
              subframes.push(_readSubFrameHdr(p_frame, subOffset, blocksize, enc_opt));
            }
          }
          return {
            blocksize,
            sampleRate: sample_rate,
            channels,
            channelAssignment: channel_assignment,
            bitsPerSample: bits_per_sample,
            number,
            numberType,
            crc,
            subframes
          };
        }
        function _readSubFrameHdr(p_subframe, subOffset, block_size, enc_opt) {
          var type = Module2.getValue(p_subframe + subOffset.offset, "i32");
          subOffset.offset += 4;
          var data;
          switch (type) {
            case 0:
              data = { value: Module2.getValue(p_subframe + subOffset.offset, "i32") };
              subOffset.offset += 284;
              break;
            case 1:
              data = Module2.getValue(p_subframe + subOffset.offset, "i32");
              subOffset.offset += 284;
              break;
            case 2:
              data = _readSubFrameHdrFixedData(p_subframe, subOffset, block_size, false, enc_opt);
              break;
            case 3:
              data = _readSubFrameHdrFixedData(p_subframe, subOffset, block_size, true, enc_opt);
              break;
          }
          var offset = subOffset.offset;
          var wasted_bits = Module2.getValue(p_subframe + offset, "i32");
          subOffset.offset += 4;
          return {
            type,
            data,
            wastedBits: wasted_bits
          };
        }
        function _readSubFrameHdrFixedData(p_subframe_data, subOffset, block_size, is_lpc, enc_opt) {
          var offset = subOffset.offset;
          var data = { order: -1, contents: { parameters: [], rawBits: [] } };
          var entropyType = Module2.getValue(p_subframe_data, "i32");
          offset += 4;
          var entropyOrder = Module2.getValue(p_subframe_data + offset, "i32");
          data.order = entropyOrder;
          offset += 4;
          var partitions = 1 << entropyOrder, params = data.contents.parameters, raws = data.contents.rawBits;
          var ppart = Module2.getValue(p_subframe_data + offset, "i32");
          var pparams = Module2.getValue(ppart, "i32");
          var praw = Module2.getValue(ppart + 4, "i32");
          data.contents.capacityByOrder = Module2.getValue(ppart + 8, "i32");
          for (var i = 0; i < partitions; ++i) {
            params.push(Module2.getValue(pparams + i * 4, "i32"));
            raws.push(Module2.getValue(praw + i * 4, "i32"));
          }
          offset += 4;
          var order = Module2.getValue(p_subframe_data + offset, "i32");
          offset += 4;
          var warmup = [], res;
          if (is_lpc) {
            var qlp_coeff_precision = Module2.getValue(p_subframe_data + offset, "i32");
            offset += 4;
            var quantization_level = Module2.getValue(p_subframe_data + offset, "i32");
            offset += 4;
            var qlp_coeff = [];
            for (var i = 0; i < order; ++i) {
              qlp_coeff.push(Module2.getValue(p_subframe_data + offset, "i32"));
              offset += 4;
            }
            data.qlp_coeff = qlp_coeff;
            data.qlp_coeff_precision = qlp_coeff_precision;
            data.quantization_level = quantization_level;
            offset = subOffset.offset + 152;
            offset = _readSubFrameHdrWarmup(p_subframe_data, offset, warmup, order);
            if (enc_opt && enc_opt.analyseResiduals) {
              offset = subOffset.offset + 280;
              res = _readSubFrameHdrResidual(p_subframe_data + offset, block_size, order);
            }
          } else {
            offset = _readSubFrameHdrWarmup(p_subframe_data, offset, warmup, order);
            offset = subOffset.offset + 32;
            if (enc_opt && enc_opt.analyseResiduals) {
              res = _readSubFrameHdrResidual(p_subframe_data + offset, block_size, order);
            }
          }
          subOffset.offset += 284;
          return {
            partition: {
              type: entropyType,
              data
            },
            order,
            warmup,
            residual: res
          };
        }
        function _readSubFrameHdrWarmup(p_subframe_data, offset, warmup, order) {
          for (var i = 0; i < order; ++i) {
            warmup.push(Module2.getValue(p_subframe_data + offset, "i32"));
            offset += 4;
          }
          return offset;
        }
        function _readSubFrameHdrResidual(p_subframe_data_res, block_size, order) {
          var pres = Module2.getValue(p_subframe_data_res, "i32");
          var res = [];
          for (var i = 0, size = block_size - order; i < size; ++i) {
            res.push(Module2.getValue(pres + i * 4, "i32"));
          }
          return res;
        }
        function _readConstChar(ptr, length, sb) {
          sb.splice(0);
          var ch;
          for (var i = 0; i < length; ++i) {
            ch = Module2.getValue(ptr + i, "i8");
            if (ch === 0) {
              break;
            }
            sb.push(String.fromCodePoint(ch));
          }
          return sb.join("");
        }
        function _readNullTerminatedChar(ptr, sb) {
          sb.splice(0);
          var ch = 1, i = 0;
          while (ch > 0) {
            ch = Module2.getValue(ptr + i++, "i8");
            if (ch === 0) {
              break;
            }
            sb.push(String.fromCodePoint(ch));
          }
          return sb.join("");
        }
        function _readPaddingMetadata(p_padding_metadata) {
          return {
            dummy: Module2.getValue(p_padding_metadata, "i32")
          };
        }
        function _readApplicationMetadata(p_application_metadata) {
          return {
            id: Module2.getValue(p_application_metadata, "i32"),
            data: Module2.getValue(p_application_metadata + 4, "i32")
          };
        }
        function _readSeekTableMetadata(p_seek_table_metadata) {
          var num_points = Module2.getValue(p_seek_table_metadata, "i32");
          var ptrPoints = Module2.getValue(p_seek_table_metadata + 4, "i32");
          var points = [];
          for (var i = 0; i < num_points; ++i) {
            points.push({
              sample_number: Module2.getValue(ptrPoints + i * 24, "i64"),
              stream_offset: Module2.getValue(ptrPoints + i * 24 + 8, "i64"),
              frame_samples: Module2.getValue(ptrPoints + i * 24 + 16, "i32")
            });
          }
          return {
            num_points,
            points
          };
        }
        function _readVorbisComment(p_vorbiscomment) {
          var length = Module2.getValue(p_vorbiscomment, "i32");
          var entry = Module2.getValue(p_vorbiscomment + 4, "i32");
          var sb = [];
          var strEntry = _readConstChar(entry, length, sb);
          var num_comments = Module2.getValue(p_vorbiscomment + 8, "i32");
          var comments = [], clen, centry;
          var pc = Module2.getValue(p_vorbiscomment + 12, "i32");
          for (var i = 0; i < num_comments; ++i) {
            clen = Module2.getValue(pc + i * 8, "i32");
            if (clen === 0) {
              continue;
            }
            centry = Module2.getValue(pc + i * 8 + 4, "i32");
            comments.push(_readConstChar(centry, clen, sb));
          }
          return {
            vendor_string: strEntry,
            num_comments,
            comments
          };
        }
        function _readCueSheetMetadata(p_cue_sheet) {
          var sb = [];
          var media_catalog_number = _readConstChar(p_cue_sheet, 129, sb);
          var lead_in = Module2.getValue(p_cue_sheet + 136, "i64");
          var is_cd = Module2.getValue(p_cue_sheet + 144, "i8");
          var num_tracks = Module2.getValue(p_cue_sheet + 148, "i32");
          var ptrTrack = Module2.getValue(p_cue_sheet + 152, "i32");
          var tracks = [], trackOffset = ptrTrack;
          if (ptrTrack !== 0) {
            for (var i = 0; i < num_tracks; ++i) {
              var tr = _readCueSheetMetadata_track(trackOffset, sb);
              tracks.push(tr);
              trackOffset += 32;
            }
          }
          return {
            media_catalog_number,
            lead_in,
            is_cd,
            num_tracks,
            tracks
          };
        }
        function _readCueSheetMetadata_track(p_cue_sheet_track, sb) {
          var typePremph = Module2.getValue(p_cue_sheet_track + 22, "i8");
          var num_indices = Module2.getValue(p_cue_sheet_track + 23, "i8");
          var indices = [];
          var track = {
            offset: Module2.getValue(p_cue_sheet_track, "i64"),
            number: Module2.getValue(p_cue_sheet_track + 8, "i8") & 255,
            isrc: _readConstChar(p_cue_sheet_track + 9, 13, sb),
            type: typePremph & 1 ? "NON_AUDIO" : "AUDIO",
            pre_emphasis: !!(typePremph & 2),
            num_indices,
            indices
          };
          var idx;
          if (num_indices > 0) {
            idx = Module2.getValue(p_cue_sheet_track + 24, "i32");
            for (var i = 0; i < num_indices; ++i) {
              indices.push({
                offset: Module2.getValue(idx + i * 16, "i64"),
                number: Module2.getValue(idx + i * 16 + 8, "i8")
              });
            }
          }
          return track;
        }
        function _readPictureMetadata(p_picture_metadata) {
          var type = Module2.getValue(p_picture_metadata, "i32");
          var mime = Module2.getValue(p_picture_metadata + 4, "i32");
          var sb = [];
          var mime_type = _readNullTerminatedChar(mime, sb);
          var desc = Module2.getValue(p_picture_metadata + 8, "i32");
          var description = _readNullTerminatedChar(desc, sb);
          var width = Module2.getValue(p_picture_metadata + 12, "i32");
          var height = Module2.getValue(p_picture_metadata + 16, "i32");
          var depth = Module2.getValue(p_picture_metadata + 20, "i32");
          var colors = Module2.getValue(p_picture_metadata + 24, "i32");
          var data_length = Module2.getValue(p_picture_metadata + 28, "i32");
          var data = Module2.getValue(p_picture_metadata + 32, "i32");
          var buffer2 = Uint8Array.from(Module2.HEAPU8.subarray(data, data + data_length));
          return {
            type,
            mime_type,
            description,
            width,
            height,
            depth,
            colors,
            data_length,
            data: buffer2
          };
        }
        function __fix_write_buffer(heapOffset, newBuffer, applyFix) {
          var dv = new DataView(newBuffer.buffer);
          var targetSize = newBuffer.length;
          var increase = !applyFix ? 1 : 2;
          var buffer2 = HEAPU8.subarray(heapOffset, heapOffset + targetSize * increase);
          var jump, isPrint;
          for (var i = 0, j = 0, size = buffer2.length; i < size && j < targetSize; ++i, ++j) {
            if (i === size - 1 && j < targetSize - 1) {
              buffer2 = HEAPU8.subarray(heapOffset, size + targetSize);
              size = buffer2.length;
            }
            if (applyFix && (buffer2[i] === 0 || buffer2[i] === 255)) {
              jump = 0;
              isPrint = true;
              if (i + 1 < size && buffer2[i] === buffer2[i + 1]) {
                ++jump;
                if (i + 2 < size) {
                  if (buffer2[i] === buffer2[i + 2]) {
                    ++jump;
                  } else {
                    isPrint = false;
                  }
                }
              }
              if (isPrint) {
                dv.setUint8(j, buffer2[i]);
                if (jump === 2 && i + 3 < size && buffer2[i] === buffer2[i + 3]) {
                  ++jump;
                  dv.setUint8(++j, buffer2[i]);
                }
              } else {
                --j;
              }
              i += jump;
            } else {
              dv.setUint8(j, buffer2[i]);
            }
          }
        }
        var FLAC__STREAM_DECODER_READ_STATUS_CONTINUE = 0;
        var FLAC__STREAM_DECODER_READ_STATUS_END_OF_STREAM = 1;
        var FLAC__STREAM_DECODER_READ_STATUS_ABORT = 2;
        var FLAC__STREAM_DECODER_WRITE_STATUS_CONTINUE = 0;
        var FLAC__STREAM_DECODER_WRITE_STATUS_ABORT = 1;
        var FLAC__STREAM_DECODER_INIT_STATUS_OK = 0;
        var FLAC__STREAM_DECODER_INIT_STATUS_UNSUPPORTED_CONTAINER = 1;
        var FLAC__STREAM_DECODER_INIT_STATUS_INVALID_CALLBACKS = 2;
        var FLAC__STREAM_DECODER_INIT_STATUS_MEMORY_ALLOCATION_ERROR = 3;
        var FLAC__STREAM_DECODER_INIT_STATUS_ERROR_OPENING_FILE = 4;
        var FLAC__STREAM_DECODER_INIT_STATUS_ALREADY_INITIALIZED = 5;
        var FLAC__STREAM_ENCODER_INIT_STATUS_OK = 0;
        var FLAC__STREAM_ENCODER_INIT_STATUS_ENCODER_ERROR = 1;
        var FLAC__STREAM_ENCODER_INIT_STATUS_UNSUPPORTED_CONTAINER = 2;
        var FLAC__STREAM_ENCODER_INIT_STATUS_INVALID_CALLBACKS = 3;
        var FLAC__STREAM_ENCODER_INIT_STATUS_INVALID_NUMBER_OF_CHANNELS = 4;
        var FLAC__STREAM_ENCODER_INIT_STATUS_INVALID_BITS_PER_SAMPLE = 5;
        var FLAC__STREAM_ENCODER_INIT_STATUS_INVALID_SAMPLE_RATE = 6;
        var FLAC__STREAM_ENCODER_INIT_STATUS_INVALID_BLOCK_SIZE = 7;
        var FLAC__STREAM_ENCODER_INIT_STATUS_INVALID_MAX_LPC_ORDER = 8;
        var FLAC__STREAM_ENCODER_INIT_STATUS_INVALID_QLP_COEFF_PRECISION = 9;
        var FLAC__STREAM_ENCODER_INIT_STATUS_BLOCK_SIZE_TOO_SMALL_FOR_LPC_ORDER = 10;
        var FLAC__STREAM_ENCODER_INIT_STATUS_NOT_STREAMABLE = 11;
        var FLAC__STREAM_ENCODER_INIT_STATUS_INVALID_METADATA = 12;
        var FLAC__STREAM_ENCODER_INIT_STATUS_ALREADY_INITIALIZED = 13;
        var FLAC__STREAM_ENCODER_WRITE_STATUS_OK = 0;
        var FLAC__STREAM_ENCODER_WRITE_STATUS_FATAL_ERROR = 1;
        var coders = {};
        function getCallback(p_coder, func_type) {
          if (coders[p_coder]) {
            return coders[p_coder][func_type];
          }
        }
        function setCallback(p_coder, func_type, callback) {
          if (!coders[p_coder]) {
            coders[p_coder] = {};
          }
          coders[p_coder][func_type] = callback;
        }
        function _getOptions(p_coder) {
          if (coders[p_coder]) {
            return coders[p_coder]["options"];
          }
        }
        function _setOptions(p_coder, options) {
          if (!coders[p_coder]) {
            coders[p_coder] = {};
          }
          coders[p_coder]["options"] = options;
        }
        var enc_write_fn_ptr = addFunction(function(p_encoder, buffer2, bytes, samples, current_frame, p_client_data) {
          var retdata = new Uint8Array(bytes);
          retdata.set(HEAPU8.subarray(buffer2, buffer2 + bytes));
          var write_callback_fn = getCallback(p_encoder, "write");
          try {
            write_callback_fn(retdata, bytes, samples, current_frame, p_client_data);
          } catch (err2) {
            console.error(err2);
            return FLAC__STREAM_ENCODER_WRITE_STATUS_FATAL_ERROR;
          }
          return FLAC__STREAM_ENCODER_WRITE_STATUS_OK;
        }, "iiiiiii");
        var dec_read_fn_ptr = addFunction(function(p_decoder, buffer2, bytes, p_client_data) {
          var len = Module2.getValue(bytes, "i32");
          if (len === 0) {
            return FLAC__STREAM_DECODER_READ_STATUS_ABORT;
          }
          var read_callback_fn = getCallback(p_decoder, "read");
          var readResult = read_callback_fn(len, p_client_data);
          var readLen = readResult.readDataLength;
          Module2.setValue(bytes, readLen, "i32");
          if (readResult.error) {
            return FLAC__STREAM_DECODER_READ_STATUS_ABORT;
          }
          if (readLen === 0) {
            return FLAC__STREAM_DECODER_READ_STATUS_END_OF_STREAM;
          }
          var readBuf = readResult.buffer;
          var dataHeap = new Uint8Array(Module2.HEAPU8.buffer, buffer2, readLen);
          dataHeap.set(new Uint8Array(readBuf));
          return FLAC__STREAM_DECODER_READ_STATUS_CONTINUE;
        }, "iiiii");
        var dec_write_fn_ptr = addFunction(function(p_decoder, p_frame, p_buffer, p_client_data) {
          var dec_opts = _getOptions(p_decoder);
          var frameInfo = _readFrameHdr(p_frame, dec_opts);
          var channels = frameInfo.channels;
          var block_size = frameInfo.blocksize * (frameInfo.bitsPerSample / 8);
          var isFix = frameInfo.bitsPerSample !== 24;
          var padding = frameInfo.bitsPerSample / 8 % 2;
          if (padding > 0) {
            block_size += frameInfo.blocksize * padding;
          }
          var data = [];
          var bufferOffset, _buffer;
          for (var i = 0; i < channels; ++i) {
            bufferOffset = Module2.getValue(p_buffer + i * 4, "i32");
            _buffer = new Uint8Array(block_size);
            __fix_write_buffer(bufferOffset, _buffer, isFix);
            data.push(_buffer.subarray(0, block_size));
          }
          var write_callback_fn = getCallback(p_decoder, "write");
          var res = write_callback_fn(data, frameInfo);
          return res !== false ? FLAC__STREAM_DECODER_WRITE_STATUS_CONTINUE : FLAC__STREAM_DECODER_WRITE_STATUS_ABORT;
        }, "iiiii");
        var DecoderErrorCode = {
          0: "FLAC__STREAM_DECODER_ERROR_STATUS_LOST_SYNC",
          1: "FLAC__STREAM_DECODER_ERROR_STATUS_BAD_HEADER",
          2: "FLAC__STREAM_DECODER_ERROR_STATUS_FRAME_CRC_MISMATCH",
          3: "FLAC__STREAM_DECODER_ERROR_STATUS_UNPARSEABLE_STREAM"
        };
        var dec_error_fn_ptr = addFunction(function(p_decoder, err2, p_client_data) {
          var msg = DecoderErrorCode[err2] || "FLAC__STREAM_DECODER_ERROR__UNKNOWN__";
          var error_callback_fn = getCallback(p_decoder, "error");
          error_callback_fn(err2, msg, p_client_data);
        }, "viii");
        var metadata_fn_ptr = addFunction(function(p_coder, p_metadata, p_client_data) {
          var type = Module2.getValue(p_metadata, "i32");
          var is_last = Module2.getValue(p_metadata + 4, "i32");
          var length = Module2.getValue(p_metadata + 8, "i64");
          var meta_data = {
            type,
            isLast: is_last,
            length,
            data: void 0
          };
          var metadata_callback_fn = getCallback(p_coder, "metadata");
          if (type === 0) {
            meta_data.data = _readStreamInfo(p_metadata + 16);
            metadata_callback_fn(meta_data.data, meta_data);
          } else {
            var data;
            switch (type) {
              case 1:
                data = _readPaddingMetadata(p_metadata + 16);
                break;
              case 2:
                data = readApplicationMetadata(p_metadata + 16);
                break;
              case 3:
                data = _readSeekTableMetadata(p_metadata + 16);
                break;
              case 4:
                data = _readVorbisComment(p_metadata + 16);
                break;
              case 5:
                data = _readCueSheetMetadata(p_metadata + 16);
                break;
              case 6:
                data = _readPictureMetadata(p_metadata + 16);
                break;
              default: {
                var cod_opts = _getOptions(p_coder);
                if (cod_opts && cod_opts.enableRawMetadata) {
                  var buffer2 = Uint8Array.from(HEAPU8.subarray(p_metadata + 16, p_metadata + 16 + length));
                  meta_data.raw = buffer2;
                }
              }
            }
            meta_data.data = data;
            metadata_callback_fn(void 0, meta_data);
          }
        }, "viii");
        var listeners = {};
        var persistedEvents = [];
        var add_event_listener = function(eventName, listener) {
          var list = listeners[eventName];
          if (!list) {
            list = [listener];
            listeners[eventName] = list;
          } else {
            list.push(listener);
          }
          check_and_trigger_persisted_event(eventName, listener);
        };
        var check_and_trigger_persisted_event = function(eventName, listener) {
          var activated;
          for (var i = persistedEvents.length - 1; i >= 0; --i) {
            activated = persistedEvents[i];
            if (activated && activated.event === eventName) {
              listener.apply(null, activated.args);
              break;
            }
          }
        };
        var remove_event_listener = function(eventName, listener) {
          var list = listeners[eventName];
          if (list) {
            for (var i = list.length - 1; i >= 0; --i) {
              if (list[i] === listener) {
                list.splice(i, 1);
              }
            }
          }
        };
        var do_fire_event = function(eventName, args, isPersist) {
          if (_exported["on" + eventName]) {
            _exported["on" + eventName].apply(null, args);
          }
          var list = listeners[eventName];
          if (list) {
            for (var i = 0, size = list.length; i < size; ++i) {
              list[i].apply(null, args);
            }
          }
          if (isPersist) {
            persistedEvents.push({ event: eventName, args });
          }
        };
        var _exported = {
          _module: Module2,
          _clear_enc_cb: function(enc_ptr) {
            delete coders[enc_ptr];
          },
          _clear_dec_cb: function(dec_ptr) {
            delete coders[dec_ptr];
          },
          setOptions: _setOptions,
          getOptions: _getOptions,
          isReady: function() {
            return _flac_ready;
          },
          onready: void 0,
          on: add_event_listener,
          off: remove_event_listener,
          FLAC__stream_encoder_set_verify: function(encoder, is_verify) {
            is_verify = is_verify ? 1 : 0;
            Module2.ccall("FLAC__stream_encoder_set_verify", "number", ["number", "number"], [encoder, is_verify]);
          },
          FLAC__stream_encoder_set_compression_level: Module2.cwrap("FLAC__stream_encoder_set_compression_level", "number", ["number", "number"]),
          FLAC__stream_encoder_set_blocksize: Module2.cwrap("FLAC__stream_encoder_set_blocksize", "number", ["number", "number"]),
          FLAC__stream_encoder_get_verify_decoder_state: Module2.cwrap("FLAC__stream_encoder_get_verify_decoder_state", "number", ["number"]),
          FLAC__stream_encoder_get_verify: Module2.cwrap("FLAC__stream_encoder_get_verify", "number", ["number"]),
          create_libflac_encoder: function(sample_rate, channels, bps, compression_level, total_samples, is_verify, block_size) {
            is_verify = typeof is_verify === "undefined" ? 1 : is_verify + 0;
            total_samples = typeof total_samples === "number" ? total_samples : 0;
            block_size = typeof block_size === "number" ? block_size : 0;
            var ok = true;
            var encoder = Module2.ccall("FLAC__stream_encoder_new", "number", [], []);
            ok &= Module2.ccall("FLAC__stream_encoder_set_verify", "number", ["number", "number"], [encoder, is_verify]);
            ok &= Module2.ccall("FLAC__stream_encoder_set_compression_level", "number", ["number", "number"], [encoder, compression_level]);
            ok &= Module2.ccall("FLAC__stream_encoder_set_channels", "number", ["number", "number"], [encoder, channels]);
            ok &= Module2.ccall("FLAC__stream_encoder_set_bits_per_sample", "number", ["number", "number"], [encoder, bps]);
            ok &= Module2.ccall("FLAC__stream_encoder_set_sample_rate", "number", ["number", "number"], [encoder, sample_rate]);
            ok &= Module2.ccall("FLAC__stream_encoder_set_blocksize", "number", ["number", "number"], [encoder, block_size]);
            ok &= Module2.ccall("FLAC__stream_encoder_set_total_samples_estimate", "number", ["number", "number"], [encoder, total_samples]);
            if (ok) {
              do_fire_event("created", [{ type: "created", target: { id: encoder, type: "encoder" } }], false);
              return encoder;
            }
            return 0;
          },
          init_libflac_encoder: function() {
            console.warn("Flac.init_libflac_encoder() is deprecated, use Flac.create_libflac_encoder() instead!");
            return this.create_libflac_encoder.apply(this, arguments);
          },
          create_libflac_decoder: function(is_verify) {
            is_verify = typeof is_verify === "undefined" ? 1 : is_verify + 0;
            var ok = true;
            var decoder = Module2.ccall("FLAC__stream_decoder_new", "number", [], []);
            ok &= Module2.ccall("FLAC__stream_decoder_set_md5_checking", "number", ["number", "number"], [decoder, is_verify]);
            if (ok) {
              do_fire_event("created", [{ type: "created", target: { id: decoder, type: "decoder" } }], false);
              return decoder;
            }
            return 0;
          },
          init_libflac_decoder: function() {
            console.warn("Flac.init_libflac_decoder() is deprecated, use Flac.create_libflac_decoder() instead!");
            return this.create_libflac_decoder.apply(this, arguments);
          },
          init_encoder_stream: function(encoder, write_callback_fn, metadata_callback_fn, ogg_serial_number, client_data) {
            var is_ogg = ogg_serial_number === true;
            client_data = client_data | 0;
            if (typeof write_callback_fn !== "function") {
              return FLAC__STREAM_ENCODER_INIT_STATUS_INVALID_CALLBACKS;
            }
            setCallback(encoder, "write", write_callback_fn);
            var __metadata_callback_fn_ptr = 0;
            if (typeof metadata_callback_fn === "function") {
              setCallback(encoder, "metadata", metadata_callback_fn);
              __metadata_callback_fn_ptr = metadata_fn_ptr;
            }
            var func_name = "FLAC__stream_encoder_init_stream";
            var args_types = ["number", "number", "number", "number", "number", "number"];
            var args = [
              encoder,
              enc_write_fn_ptr,
              0,
              0,
              __metadata_callback_fn_ptr,
              client_data
            ];
            if (typeof ogg_serial_number === "number") {
              is_ogg = true;
            } else if (is_ogg) {
              ogg_serial_number = 1;
            }
            if (is_ogg) {
              func_name = "FLAC__stream_encoder_init_ogg_stream";
              args.unshift(args[0]);
              args[1] = 0;
              args_types.unshift(args_types[0]);
              args_types[1] = "number";
              Module2.ccall("FLAC__stream_encoder_set_ogg_serial_number", "number", ["number", "number"], [encoder, ogg_serial_number]);
            }
            var init_status = Module2.ccall(func_name, "number", args_types, args);
            return init_status;
          },
          init_encoder_ogg_stream: function(encoder, write_callback_fn, metadata_callback_fn, ogg_serial_number, client_data) {
            if (typeof ogg_serial_number !== "number") {
              ogg_serial_number = true;
            }
            return this.init_encoder_stream(encoder, write_callback_fn, metadata_callback_fn, ogg_serial_number, client_data);
          },
          init_decoder_stream: function(decoder, read_callback_fn, write_callback_fn, error_callback_fn, metadata_callback_fn, ogg_serial_number, client_data) {
            client_data = client_data | 0;
            if (typeof read_callback_fn !== "function") {
              return FLAC__STREAM_DECODER_INIT_STATUS_INVALID_CALLBACKS;
            }
            setCallback(decoder, "read", read_callback_fn);
            if (typeof write_callback_fn !== "function") {
              return FLAC__STREAM_DECODER_INIT_STATUS_INVALID_CALLBACKS;
            }
            setCallback(decoder, "write", write_callback_fn);
            var __error_callback_fn_ptr = 0;
            if (typeof error_callback_fn === "function") {
              setCallback(decoder, "error", error_callback_fn);
              __error_callback_fn_ptr = dec_error_fn_ptr;
            }
            var __metadata_callback_fn_ptr = 0;
            if (typeof metadata_callback_fn === "function") {
              setCallback(decoder, "metadata", metadata_callback_fn);
              __metadata_callback_fn_ptr = metadata_fn_ptr;
            }
            var is_ogg = ogg_serial_number === true;
            if (typeof ogg_serial_number === "number") {
              is_ogg = true;
              Module2.ccall("FLAC__stream_decoder_set_ogg_serial_number", "number", ["number", "number"], [decoder, ogg_serial_number]);
            }
            var init_func_name = !is_ogg ? "FLAC__stream_decoder_init_stream" : "FLAC__stream_decoder_init_ogg_stream";
            var init_status = Module2.ccall(init_func_name, "number", ["number", "number", "number", "number", "number", "number", "number", "number", "number", "number"], [
              decoder,
              dec_read_fn_ptr,
              0,
              0,
              0,
              0,
              dec_write_fn_ptr,
              __metadata_callback_fn_ptr,
              __error_callback_fn_ptr,
              client_data
            ]);
            return init_status;
          },
          init_decoder_ogg_stream: function(decoder, read_callback_fn, write_callback_fn, error_callback_fn, metadata_callback_fn, ogg_serial_number, client_data) {
            if (typeof ogg_serial_number !== "number") {
              ogg_serial_number = true;
            }
            return this.init_decoder_stream(decoder, read_callback_fn, write_callback_fn, error_callback_fn, metadata_callback_fn, ogg_serial_number, client_data);
          },
          FLAC__stream_encoder_process_interleaved: function(encoder, buffer2, num_of_samples) {
            var numBytes = buffer2.length * buffer2.BYTES_PER_ELEMENT;
            var ptr = Module2._malloc(numBytes);
            var heapBytes = new Uint8Array(Module2.HEAPU8.buffer, ptr, numBytes);
            heapBytes.set(new Uint8Array(buffer2.buffer, buffer2.byteOffset, buffer2.byteLength));
            var status = Module2.ccall("FLAC__stream_encoder_process_interleaved", "number", ["number", "number", "number"], [encoder, heapBytes.byteOffset, num_of_samples]);
            Module2._free(ptr);
            return status;
          },
          FLAC__stream_encoder_process: function(encoder, channelBuffers, num_of_samples) {
            var ptrInfo = this._create_pointer_array(channelBuffers);
            var pointerPtr = ptrInfo.pointerPointer;
            var status = Module2.ccall("FLAC__stream_encoder_process", "number", ["number", "number", "number"], [encoder, pointerPtr, num_of_samples]);
            this._destroy_pointer_array(ptrInfo);
            return status;
          },
          FLAC__stream_decoder_process_single: Module2.cwrap("FLAC__stream_decoder_process_single", "number", ["number"]),
          FLAC__stream_decoder_process_until_end_of_stream: Module2.cwrap("FLAC__stream_decoder_process_until_end_of_stream", "number", ["number"]),
          FLAC__stream_decoder_process_until_end_of_metadata: Module2.cwrap("FLAC__stream_decoder_process_until_end_of_metadata", "number", ["number"]),
          FLAC__stream_decoder_get_state: Module2.cwrap("FLAC__stream_decoder_get_state", "number", ["number"]),
          FLAC__stream_encoder_get_state: Module2.cwrap("FLAC__stream_encoder_get_state", "number", ["number"]),
          FLAC__stream_decoder_set_metadata_respond: Module2.cwrap("FLAC__stream_decoder_set_metadata_respond", "number", ["number", "number"]),
          FLAC__stream_decoder_set_metadata_respond_application: Module2.cwrap("FLAC__stream_decoder_set_metadata_respond_application", "number", ["number", "number"]),
          FLAC__stream_decoder_set_metadata_respond_all: Module2.cwrap("FLAC__stream_decoder_set_metadata_respond_all", "number", ["number"]),
          FLAC__stream_decoder_set_metadata_ignore: Module2.cwrap("FLAC__stream_decoder_set_metadata_ignore", "number", ["number", "number"]),
          FLAC__stream_decoder_set_metadata_ignore_application: Module2.cwrap("FLAC__stream_decoder_set_metadata_ignore_application", "number", ["number", "number"]),
          FLAC__stream_decoder_set_metadata_ignore_all: Module2.cwrap("FLAC__stream_decoder_set_metadata_ignore_all", "number", ["number"]),
          FLAC__stream_encoder_set_metadata: function(encoder, metadataBuffersPointer, num_blocks) {
            var status = Module2.ccall("FLAC__stream_encoder_set_metadata", "number", ["number", "number", "number"], [encoder, metadataBuffersPointer.pointerPointer, num_blocks]);
            return status;
          },
          _create_pointer_array: function(bufferArray) {
            var size = bufferArray.length;
            var ptrs = [], ptrData = new Uint32Array(size);
            var ptrOffsets = new DataView(ptrData.buffer);
            var buffer2, numBytes, heapBytes, ptr;
            for (var i = 0, size; i < size; ++i) {
              buffer2 = bufferArray[i];
              numBytes = buffer2.length * buffer2.BYTES_PER_ELEMENT;
              ptr = Module2._malloc(numBytes);
              ptrs.push(ptr);
              heapBytes = new Uint8Array(Module2.HEAPU8.buffer, ptr, numBytes);
              heapBytes.set(new Uint8Array(buffer2.buffer, buffer2.byteOffset, buffer2.byteLength));
              ptrOffsets.setUint32(i * 4, ptr, true);
            }
            var nPointerBytes = ptrData.length * ptrData.BYTES_PER_ELEMENT;
            var pointerPtr = Module2._malloc(nPointerBytes);
            var pointerHeap = new Uint8Array(Module2.HEAPU8.buffer, pointerPtr, nPointerBytes);
            pointerHeap.set(new Uint8Array(ptrData.buffer));
            return {
              dataPointer: ptrs,
              pointerPointer: pointerPtr
            };
          },
          _destroy_pointer_array: function(pointerInfo) {
            var pointerArray = pointerInfo.dataPointer;
            for (var i = 0, size = pointerArray.length; i < size; ++i) {
              Module2._free(pointerArray[i]);
            }
            Module2._free(pointerInfo.pointerPointer);
          },
          FLAC__stream_decoder_get_md5_checking: Module2.cwrap("FLAC__stream_decoder_get_md5_checking", "number", ["number"]),
          FLAC__stream_decoder_set_md5_checking: function(decoder, is_verify) {
            is_verify = is_verify ? 1 : 0;
            return Module2.ccall("FLAC__stream_decoder_set_md5_checking", "number", ["number", "number"], [decoder, is_verify]);
          },
          FLAC__stream_encoder_finish: Module2.cwrap("FLAC__stream_encoder_finish", "number", ["number"]),
          FLAC__stream_decoder_finish: Module2.cwrap("FLAC__stream_decoder_finish", "number", ["number"]),
          FLAC__stream_decoder_reset: Module2.cwrap("FLAC__stream_decoder_reset", "number", ["number"]),
          FLAC__stream_encoder_delete: function(encoder) {
            this._clear_enc_cb(encoder);
            Module2.ccall("FLAC__stream_encoder_delete", "number", ["number"], [encoder]);
            do_fire_event("destroyed", [{ type: "destroyed", target: { id: encoder, type: "encoder" } }], false);
          },
          FLAC__stream_decoder_delete: function(decoder) {
            this._clear_dec_cb(decoder);
            Module2.ccall("FLAC__stream_decoder_delete", "number", ["number"], [decoder]);
            do_fire_event("destroyed", [{ type: "destroyed", target: { id: decoder, type: "decoder" } }], false);
          }
        };
        if (typeof Object.defineProperty === "function") {
          _exported._onready = void 0;
          Object.defineProperty(_exported, "onready", {
            get() {
              return this._onready;
            },
            set(newValue) {
              this._onready = newValue;
              if (newValue && this.isReady()) {
                check_and_trigger_persisted_event("ready", newValue);
              }
            }
          });
        } else {
          console.warn("WARN: note that setting Flac.onready handler after Flac.isReady() is already true, will have no effect, that is, the handler function will not be triggered!");
        }
        if (expLib && expLib.exports) {
          expLib.exports = _exported;
        }
        return _exported;
      });
    }
  });

  // workers/encoder.ts
  var Flac = __toESM(require_libflac_wasm(), 1);

  // node_modules/libflacjs/src/utils/data-utils.ts
  function getLength(recBuffers) {
    var recLength = 0;
    for (var i = recBuffers.length - 1; i >= 0; --i) {
      recLength += recBuffers[i].byteLength;
    }
    return recLength;
  }
  function mergeBuffers(channelBuffer, recordingLength) {
    var result = new Uint8Array(recordingLength);
    var offset = 0;
    var lng = channelBuffer.length;
    for (var i = 0; i < lng; i++) {
      var buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
    }
    return result;
  }

  // node_modules/libflacjs/src/encoder.ts
  var Encoder = class {
    constructor(Flac2, _options) {
      this.Flac = Flac2;
      this._options = _options;
      this._isError = false;
      this._isInitialized = false;
      this._isFinished = false;
      this.data = [];
      this._id = Flac2.create_libflac_encoder(_options.sampleRate, _options.channels, _options.bitsPerSample, _options.compression, _options.totalSamples, _options.verify);
      this._onDestroyed = (evt) => {
        if (evt.target.id === this._id) {
          this._id = void 0;
          this._isInitialized = false;
          this._isFinished = false;
          Flac2.off("destroyed", this._onDestroyed);
          if (this._beforeReadyHandler?.enabled) {
            this._beforeReadyHandler.enabled = false;
          }
        }
      };
      Flac2.on("destroyed", this._onDestroyed);
      this._onWrite = (data) => {
        this.addData(data);
      };
      this._onMetaData = (m) => {
        if (m) {
          this._metadata = m;
        }
      };
      if (this._id === 0) {
        this._isError = true;
      } else {
        this._init(this._options.isOgg);
      }
    }
    get initialized() {
      return this._isInitialized;
    }
    get finished() {
      return this._isFinished;
    }
    get metadata() {
      return this._metadata;
    }
    get rawData() {
      return this.data;
    }
    get isWaitOnReady() {
      return this._beforeReadyHandler?.isWaitOnReady || false;
    }
    _init(isEncodeOgg) {
      if (this._id) {
        const state = isEncodeOgg ? this.Flac.init_encoder_ogg_stream(this._id, this._onWrite, this._onMetaData) : this.Flac.init_encoder_stream(this._id, this._onWrite, this._onMetaData);
        this._isError = state !== 0;
        if (state === 0) {
          this._isInitialized = true;
          this._isFinished = false;
        }
      } else {
        this._handleBeforeReady("_init", arguments);
      }
    }
    reset(options) {
      if (this._id) {
        let state = this.Flac.FLAC__stream_encoder_get_state(this._id);
        if (state === 0) {
          this.Flac.FLAC__stream_encoder_finish(this._id);
          state = this.Flac.FLAC__stream_encoder_get_state(this._id);
        }
        if (state === 1) {
          if (options) {
            Object.assign(this._options, options);
            if (typeof options.verify !== "undefined" && this.Flac.FLAC__stream_encoder_get_verify(this._id) != this._options.verify) {
              this.Flac.FLAC__stream_encoder_set_verify(this._id, !!this._options.verify);
            }
            if (typeof options.compression !== "number") {
              this.Flac.FLAC__stream_encoder_set_compression_level(this._id, this._options.compression);
            }
          }
          this.clearData();
          this._metadata = void 0;
          this._isInitialized = false;
          this._isFinished = false;
          this._init(this._options.isOgg);
          return this._isError;
        }
      }
      return this._handleBeforeReady("reset", arguments);
    }
    encode(pcmData, numberOfSamples, isInterleaved) {
      if (this._id && this._isInitialized && !this._isFinished) {
        if (typeof pcmData === "undefined") {
          return this._finish();
        }
        if (typeof isInterleaved === "undefined") {
          isInterleaved = !(Array.isArray(pcmData) && pcmData[0] instanceof Int32Array);
        }
        if (typeof numberOfSamples === "undefined") {
          const buff = isInterleaved ? pcmData : pcmData[0];
          numberOfSamples = (buff.byteLength - buff.byteOffset) / ((isInterleaved ? this._options.channels : 1) * buff.BYTES_PER_ELEMENT);
        }
        if (isInterleaved) {
          return !!this.Flac.FLAC__stream_encoder_process_interleaved(this._id, pcmData, numberOfSamples);
        }
        if (this._options.channels !== pcmData.length) {
          throw new Error(`Wrong number of channels: expected ${this._options.channels} but got ${pcmData.length}`);
        }
        return !!this.Flac.FLAC__stream_encoder_process(this._id, pcmData, numberOfSamples);
      }
      return this._handleBeforeReady("encode", arguments);
    }
    getSamples() {
      return mergeBuffers(this.data, getLength(this.data));
    }
    getState() {
      if (this._id) {
        return this.Flac.FLAC__stream_encoder_get_state(this._id);
      }
      return -1;
    }
    destroy() {
      if (this._id) {
        this.Flac.FLAC__stream_encoder_delete(this._id);
      }
      this._beforeReadyHandler && (this._beforeReadyHandler.enabled = false);
      this._metadata = void 0;
      this.clearData();
    }
    addData(decData) {
      this.data.push(decData);
    }
    clearData() {
      this.data.splice(0);
    }
    _finish() {
      if (this._id && this._isInitialized && !this._isFinished) {
        if (!!this.Flac.FLAC__stream_encoder_finish(this._id)) {
          this._isFinished = true;
          return true;
        }
        ;
      }
      return false;
    }
    _handleBeforeReady(funcName, args) {
      if (this._beforeReadyHandler) {
        return this._beforeReadyHandler.handleBeforeReady(funcName, args);
      }
      return false;
    }
  };

  // node_modules/libflacjs/src/utils/flac-utils.ts
  function addFLACMetaData(chunks, metadata, isOgg) {
    var offset = 4;
    var dataIndex = 0;
    var data = chunks[0];
    if (isOgg) {
      offset = 13;
      dataIndex = 1;
      if (data.length < 4 || String.fromCharCode.apply(null, data.subarray(0, 4)) != "OggS") {
        console.error("Unknown data format: cannot add additional FLAC meta data to OGG header");
        return;
      }
    }
    data = chunks[dataIndex];
    if (data.length < 4 || String.fromCharCode.apply(null, data.subarray(offset - 4, offset)) != "fLaC") {
      console.error("Unknown data format: cannot add additional FLAC meta data to header");
      return;
    }
    if (isOgg) {
      console.info("OGG Container: cannot add additional FLAC meta data to header due to OGG format's header checksum!");
      return;
    }
    if (data.length == 4) {
      data = chunks[dataIndex + 1];
      offset = 0;
    }
    var view = new DataView(data.buffer);
    view.setUint8(8 + offset, metadata.min_framesize >> 16);
    view.setUint8(9 + offset, metadata.min_framesize >> 8);
    view.setUint8(10 + offset, metadata.min_framesize);
    view.setUint8(11 + offset, metadata.max_framesize >> 16);
    view.setUint8(12 + offset, metadata.max_framesize >> 8);
    view.setUint8(13 + offset, metadata.max_framesize);
    view.setUint8(18 + offset, metadata.total_samples >> 24);
    view.setUint8(19 + offset, metadata.total_samples >> 16);
    view.setUint8(20 + offset, metadata.total_samples >> 8);
    view.setUint8(21 + offset, metadata.total_samples);
    writeMd5(view, 22 + offset, metadata.md5sum);
  }
  function writeMd5(view, offset, str) {
    var index;
    for (var i = 0; i < str.length / 2; ++i) {
      index = i * 2;
      view.setUint8(i + offset, parseInt(str.substring(index, index + 2), 16));
    }
  }
  function exportFlacFile(recBuffers, metaData, isOgg) {
    const recLength = getLength(recBuffers);
    if (metaData) {
      addFLACMetaData(recBuffers, metaData, isOgg);
    }
    const samples = mergeBuffers(recBuffers, recLength);
    return new Blob([samples], { type: isOgg ? "audio/ogg" : "audio/flac" });
  }

  // workers/encoder.ts
  var flacReady = new Promise((resolve, reject) => Flac.on("ready", resolve));
  console.log("Worker loaded, waiting for recording to start");
  function assert(cond) {
    if (!cond) {
      throw new Error("assertion failed");
    }
  }
  async function start({ sampleRate, bitsPerSample, channels, compression }, dataPort) {
    console.log("Waiting on Flac");
    await flacReady;
    console.log("Encoder running");
    let encoder;
    dataPort.onmessage = (e) => {
      const msg = e.data;
      switch (msg.type) {
        case "data":
          if (!encoder) {
            encoder = new Encoder(Flac, {
              sampleRate,
              channels: msg.data.length,
              bitsPerSample,
              compression,
              verify: true,
              isOgg: false
            });
          }
          assert(encoder.encode(msg.data));
          break;
        case "end":
          assert(encoder);
          if (msg.data[0].length) {
            assert(encoder.encode(msg.data));
          }
          assert(encoder.encode());
          const samples = encoder.getSamples();
          const metadata = encoder.metadata;
          assert(metadata);
          encoder.destroy();
          const blob = exportFlacFile([samples], metadata, false);
          postMessage({ type: "done", blob });
          break;
      }
    };
  }
  addEventListener("message", (e) => {
    if (e.data.type === "start") {
      start(e.data, e.ports[0]);
    }
  });
})();