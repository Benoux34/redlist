import { describe, expect, it } from "bun:test";
import { resolveState } from "@web/hooks/use-async-data/utils";
import type { AsyncState } from "@web/hooks/use-async-data/entities";

const success: AsyncState<string[]> = {
  status: "success",
  data: ["Panthera pardus"],
  error: null,
};

const failure: AsyncState<string[]> = {
  status: "error",
  data: null,
  error: new Error("network"),
};

describe("Frontend RedList - Stale While Revalidate", () => {
  it("should keep the previous results on screen while new ones load", () => {
    const result = resolveState(success, true, true);

    expect(result.status).toBe("success");
    expect(result.data).toEqual(["Panthera pardus"]);
    expect(result.isRefreshing).toBe(true);
  });

  it("should fall back to loading on the very first request", () => {
    const first: AsyncState<string[]> = {
      status: "loading",
      data: null,
      error: null,
    };
    const result = resolveState(first, true, true);

    expect(result.status).toBe("loading");
    expect(result.data).toBeNull();
    expect(result.isRefreshing).toBe(true);
  });

  it("should not keep results of a request that failed", () => {
    const result = resolveState(failure, true, true);

    expect(result.status).toBe("loading");
    expect(result.data).toBeNull();
  });

  it("should empty the data when the option is off, as before", () => {
    const result = resolveState(success, true, false);

    expect(result.status).toBe("loading");
    expect(result.data).toBeNull();
    expect(result.isRefreshing).toBe(true);
  });

  it("should expose settled results with no refresh flag", () => {
    const result = resolveState(success, false, true);

    expect(result.status).toBe("success");
    expect(result.data).toEqual(["Panthera pardus"]);
    expect(result.isRefreshing).toBe(false);
  });

  it("should surface an error once the request has settled", () => {
    const result = resolveState(failure, false, true);

    expect(result.status).toBe("error");
    expect(result.error).toBeInstanceOf(Error);
    expect(result.isRefreshing).toBe(false);
  });
});
