import {calculateExpireTime} from "@/utils/calculateExpireTime"

describe("calculateExpireTime", () => {
  it("should return infinit if expire at is null", () => {
    const result = calculateExpireTime(null)
    expect(result.isExpired).toBe(false)
    expect(result.hoursRemaining).toBe("infinite")
  })

  it("should return isExpired true if the the expire time is passed", () => {
    const result = calculateExpireTime(new Date(Date.now() - 1000 * 60 * 60))
    expect(result.isExpired).toBe(true)
    expect(result.hoursRemaining).toBe(0)

    const result2 = calculateExpireTime(new Date(Date.now() - 1000 * 60 * 60 * 25555))
    expect(result2.isExpired).toBe(true)
    expect(result2.hoursRemaining).toBe(0)
  })

  it("should return correct hoursRemaining if isExpiredTime is not passed", () => {
    const result = calculateExpireTime(new Date(Date.now() + 1000 * 60 * 60))
    expect(result.isExpired).toBe(false)
    expect(result.hoursRemaining).toBe(1)

    const result2 = calculateExpireTime(new Date(Date.now() + 1000 * 60 * 60 * 1.5214))
    expect(result2.isExpired).toBe(false)
    expect(result2.hoursRemaining).toBe(2)

    const result3 = calculateExpireTime(new Date(Date.now() + 1000 * 60 * 60 * 23.11))
    expect(result3.isExpired).toBe(false)
    expect(result3.hoursRemaining).toBe(24)
  })

  it("should return isExpired true if expireAt is equal to now", () => {
    const result = calculateExpireTime(new Date(Date.now()))
    expect(result.isExpired).toBe(true)
    expect(result.hoursRemaining).toBe(0)
  })
})
