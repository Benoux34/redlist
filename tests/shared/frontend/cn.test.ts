import { cn } from "@web/lib/utils";
import { describe, expect, it } from "bun:test";

describe("Shared Frontend - ClassName Utility (cn)", () => {
  it("should concatenate simple class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("should merge and resolve Tailwind CSS class conflicts", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("bg-red-500", "bg-blue-600")).toBe("bg-blue-600");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("should handle conditional and falsy class values cleanly", () => {
    expect(cn("base-btn", false && "hidden", null, undefined, "active")).toBe(
      "base-btn active",
    );
  });

  it("should handle arrays and objects format from clsx", () => {
    expect(cn(["flex", "items-center"], { "opacity-50": true, hidden: false })).toBe(
      "flex items-center opacity-50",
    );
  });
});
