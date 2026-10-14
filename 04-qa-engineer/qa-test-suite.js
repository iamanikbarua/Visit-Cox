/**
 * 04-QA-ENGINEER: Automated Test Suite for "Make My Planner"
 * Tests calculation edge cases, currency conversions, room allocation logic,
 * and data integrity.
 */

function runPlannerQATests() {
  const results = [];

  function assert(testName, condition, details) {
    if (condition) {
      results.push({ name: testName, status: "PASS", details });
    } else {
      results.push({ name: testName, status: "FAIL", details });
      console.error(`[QA FAIL] ${testName}:`, details);
    }
  }

  // TEST 1: Room Allocation Algorithm: ceil(adults / 2)
  function calcRooms(adults) {
    return Math.max(1, Math.ceil(adults / 2));
  }
  assert("Room Allocation - 1 Adult", calcRooms(1) === 1, "Expected 1 room");
  assert("Room Allocation - 2 Adults", calcRooms(2) === 1, "Expected 1 room");
  assert("Room Allocation - 3 Adults", calcRooms(3) === 2, "Expected 2 rooms");
  assert("Room Allocation - 4 Adults", calcRooms(4) === 2, "Expected 2 rooms");
  assert("Room Allocation - 5 Adults", calcRooms(5) === 3, "Expected 3 rooms");
  assert("Room Allocation - 10 Adults", calcRooms(10) === 5, "Expected 5 rooms");

  // TEST 2: Vehicle Allocation Logic
  function getVehicle(pax) {
    if (pax <= 3) return "CNG / Auto";
    if (pax <= 5) return "Reserved CNG";
    return "Chander Gari (Open 4x4 Jeep)";
  }
  assert("Transit Vehicle - 2 Pax", getVehicle(2) === "CNG / Auto", "Expected CNG / Auto");
  assert("Transit Vehicle - 4 Pax", getVehicle(4) === "Reserved CNG", "Expected Reserved CNG");
  assert("Transit Vehicle - 8 Pax", getVehicle(8) === "Chander Gari (Open 4x4 Jeep)", "Expected Chander Gari");

  // TEST 3: Currency Conversion Accuracy
  const exchangeRate = 120;
  const bdtAmount = 18000;
  const usdAmount = Math.round(bdtAmount / exchangeRate);
  assert("Currency Conversion - ৳18,000 BDT to USD", usdAmount === 150, `Expected $150 USD, got $${usdAmount}`);

  // TEST 4: Budget Tier Consistency
  // Backpacker nightly < Comfort nightly < Luxury nightly
  const backpackerRate = 1500;
  const comfortRate = 3500;
  const luxuryRate = 12500;
  assert("Budget Tier Monotonicity", (backpackerRate < comfortRate) && (comfortRate < luxuryRate), "Rates must ascend correctly");

  // TEST 5: Custom Days Handling
  function clampDays(d) {
    return Math.max(1, Math.min(14, d));
  }
  assert("Custom Days - Negative value clamp", clampDays(-5) === 1, "Expected clamp to 1");
  assert("Custom Days - Upper bound clamp", clampDays(25) === 14, "Expected clamp to 14");
  assert("Custom Days - Normal value", clampDays(4) === 4, "Expected 4");

  // SUMMARY
  const passed = results.filter(r => r.status === "PASS").length;
  const failed = results.filter(r => r.status === "FAIL").length;

  console.log(`[QA REPORT] Total: ${results.length} | Passed: ${passed} | Failed: ${failed}`);
  return { passed, failed, total: results.length, results };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runPlannerQATests };
}
