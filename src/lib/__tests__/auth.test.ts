import { describe, it, expect } from "vitest";
import { hashPassword, comparePassword, signSession, verifySession } from "../auth";
import { Role } from "@/types";

describe("Authentication Utilities", () => {
  it("should securely hash and verify passwords", async () => {
    const rawPassword = "SuperSecret123!";
    const hashed = await hashPassword(rawPassword);

    expect(hashed).not.toBe(rawPassword);
    expect(hashed.startsWith("$2")).toBe(true);

    const isMatch = await comparePassword(rawPassword, hashed);
    expect(isMatch).toBe(true);

    const isWrongMatch = await comparePassword("WrongPassword123!", hashed);
    expect(isWrongMatch).toBe(false);
  });

  it("should sign and verify valid JWT sessions", async () => {
    const payload = {
      userId: "test-user-id-123",
      email: "test@brightloop.com",
      role: Role.ADMIN,
      name: "Abhinav Test",
    };

    const token = await signSession(payload);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(20);

    const decoded = await verifySession(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.email).toBe(payload.email);
    expect(decoded?.role).toBe(Role.ADMIN);
    expect(decoded?.name).toBe(payload.name);
  });

  it("should reject tampered or invalid JWT tokens", async () => {
    const invalidToken = "invalid.token.signature";
    const decoded = await verifySession(invalidToken);
    expect(decoded).toBeNull();
  });
});
