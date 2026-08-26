import {
  LOADING,
  reducer,
} from "@web/hooks/use-async-data/utils";
import { describe, expect, it } from "bun:test";

describe("Frontend RedList - Async Data Reducer", () => {
  it("should have correct initial LOADING state", () => {
    expect(LOADING).toEqual({
      status: "loading",
      data: null,
      error: null,
    });
  });

  it("should transition to success state on resolved action", () => {
    const mockData = { items: ["Panthera uncia"], total: 1 };
    const nextState = reducer(LOADING, {
      type: "resolved",
      data: mockData,
    });

    expect(nextState).toEqual({
      status: "success",
      data: mockData,
      error: null,
    });
  });

  it("should transition to error state on rejected action", () => {
    const mockError = new Error("Network timeout");
    const nextState = reducer(LOADING, {
      type: "rejected",
      error: mockError,
    });

    expect(nextState).toEqual({
      status: "error",
      data: null,
      error: mockError,
    });
  });
});
