import { describe, expect, test } from "vitest";
import formatDate from "./formatDate.ts";

describe("format date function", () => {
  test("should format a date in the format MM-DD-YYYY", () => {
    const formattedDate = formatDate("2022-01-31");
    expect(formattedDate).toBe("31 Jan 2022");
  });

  test("should handle dates from different years", () => {
    const formattedDate1 = formatDate("2021-01-31");
    const formattedDate2 = formatDate("2022-01-31");
    expect(formattedDate1).toBe("31 Jan 2021");
    expect(formattedDate2).toBe("31 Jan 2022");
  });

  test("should handle dates from different months", () => {
    const formattedDate1 = formatDate("2022-02-29");
    const formattedDate2 = formatDate("2022-04-30");
    expect(formattedDate1).toBe("29 Feb 2022");
    expect(formattedDate2).toBe("30 Apr 2022");
  });

  test("should handle dates from different days", () => {
    const formattedDate1 = formatDate("2022-01-01");
    const formattedDate2 = formatDate("2022-01-31");
    expect(formattedDate1).toBe("01 Jan 2022");
    expect(formattedDate2).toBe("31 Jan 2022");
  });

  test("should return an empty string for invalid date formats", () => {
    expect(formatDate("2022-13-01")).toBe("");
    expect(formatDate("2022-08-32")).toBe("");
    expect(formatDate("22-08-19")).toBe("");
    expect(formatDate("20220819")).toBe("");
    expect(formatDate("2022-08")).toBe("");
  });

  test("should return an empty string for non-date strings", () => {
    expect(formatDate("hello world")).toBe("");
    expect(formatDate("")).toBe("");
    expect(formatDate("2022")).toBe("");
    expect(formatDate("1234-56-78")).toBe("");
  });

  test("should return an empty string for non-string inputs", () => {
    // @ts-ignore: Ignoring type errors for testing invalid inputs
    expect(formatDate(20220819)).toBe("");
    // @ts-ignore
    expect(formatDate(null)).toBe("");
    // @ts-ignore
    expect(formatDate(undefined)).toBe("");
    // @ts-ignore
    expect(formatDate([])).toBe("");
    // @ts-ignore
    expect(formatDate({})).toBe("");
  });
});
