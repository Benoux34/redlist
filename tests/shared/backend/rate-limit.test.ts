import { resolveClientIp, UNKNOWN_IP } from "@api/lib/rate-limit/utils";
import { describe, expect, it } from "bun:test";

describe("Backend Shared - Rate limit client identity", () => {
  describe("without a trusted proxy", () => {
    it("uses the socket address", () => {
      expect(
        resolveClientIp({
          trustProxy: false,
          realIpHeader: undefined,
          remoteAddress: "203.0.113.7",
        }),
      ).toBe("203.0.113.7");
    });

    it("ignores a client-supplied X-Real-IP", () => {
      expect(
        resolveClientIp({
          trustProxy: false,
          realIpHeader: "1.2.3.4",
          remoteAddress: "203.0.113.7",
        }),
      ).toBe("203.0.113.7");
    });

    it("falls back to a constant when there is no socket address", () => {
      expect(
        resolveClientIp({
          trustProxy: false,
          realIpHeader: undefined,
          remoteAddress: undefined,
        }),
      ).toBe(UNKNOWN_IP);
    });
  });

  describe("behind a trusted proxy", () => {
    it("uses X-Real-IP", () => {
      expect(
        resolveClientIp({
          trustProxy: true,
          realIpHeader: "203.0.113.7",
          remoteAddress: "172.18.0.1",
        }),
      ).toBe("203.0.113.7");
    });

    it("trims surrounding whitespace", () => {
      expect(
        resolveClientIp({
          trustProxy: true,
          realIpHeader: "  203.0.113.7  ",
          remoteAddress: "172.18.0.1",
        }),
      ).toBe("203.0.113.7");
    });

    it("falls back to the socket address when the proxy sets no header", () => {
      expect(
        resolveClientIp({
          trustProxy: true,
          realIpHeader: undefined,
          remoteAddress: "172.18.0.1",
        }),
      ).toBe("172.18.0.1");
    });

    it("falls back to the socket address on an empty header", () => {
      expect(
        resolveClientIp({
          trustProxy: true,
          realIpHeader: "   ",
          remoteAddress: "172.18.0.1",
        }),
      ).toBe("172.18.0.1");
    });
  });
});
