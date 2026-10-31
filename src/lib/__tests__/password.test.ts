import { describe, it, expect } from "vitest";
import { validatePassword } from "../password";

describe("Password Policy Validation", () => {
  it("should reject passwords shorter than 8 characters", () => {
    const result = validatePassword("Ab1!");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Password must be at least 8 characters long.");
  });

  it("should reject passwords without uppercase letters", () => {
    const result = validatePassword("password123!");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Password must contain at least one uppercase letter (A-Z).");
  });

  it("should reject passwords without lowercase letters", () => {
    const result = validatePassword("PASSWORD123!");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Password must contain at least one lowercase letter (a-z).");
  });

  it("should reject passwords without special characters", () => {
    const result = validatePassword("Password123");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Password must contain at least one special character.");
  });

  it("should accept valid passwords meeting all criteria", () => {
    const validPasswords = [
      "SecurePass123!",
      "Brightloop@2026",
      "Valid#Password99",
      "Complex$Secret1",
    ];

    validPasswords.forEach((pwd) => {
      const result = validatePassword(pwd);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });
});
