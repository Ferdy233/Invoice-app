import { describe, expect, test } from "vitest";
import formatNumber from "./formatNumber.ts";

describe("format number function", () => {
  test("should format a number with commas", () => {
    const formattedNumber = formatNumber(123456789);
    expect(formattedNumber).toBe("123,456,789");
  });

  test("should handle decimal numbers", () => {
    const formattedNumber = formatNumber(123456.789);
    expect(formattedNumber).toBe("123,456.789");
  });

  test("should handle negative numbers", () => {
    const formattedNumber = formatNumber(-123456.789);
    expect(formattedNumber).toBe("-123,456.789");
  });

  test("should handle zero", () => {
    const formattedNumber = formatNumber(0);
    expect(formattedNumber).toBe("0");
  });
});
