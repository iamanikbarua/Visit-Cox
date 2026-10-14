/**
 * 03-BACKEND-DEVELOPER: WhatsApp Concierge Booking Leadgen
 * Generates pre-formatted, conversion-optimized WhatsApp booking links
 */

const WHATSAPP_CONFIG = {
  conciergeNumber: "8801819012345", // Visit Cox concierge line
  brandName: "Visit Cox Concierge"
};

/**
 * Encodes planner state into a clean WhatsApp click-to-chat inquiry
 * @param {Object} state - Current planner state
 * @returns {string} Fully formed WhatsApp API link
 */
function buildWhatsAppPlannerPayload(state) {
  const days = state.days || 3;
  const nights = Math.max(1, days - 1);
  const adults = state.adults || 2;
  const children = state.children || 0;
  const vibe = state.vibe || "relaxing";
  const budgetTier = state.budgetTier || "comfort";
  const hotelName = state.selectedHotel?.name || "Recommended Hotel";
  const totalBDT = state.calculatedBudget?.totalBDT || "18500";
  const travelerName = state.travelerName || "My Coastal Journey";

  let message = `*🌊 Visit Cox — Custom Travel Inquiry*\n\n`;
  message += `Hello Concierge! I just generated my custom itinerary on *visitcox.com* and would like to check availability and special partner rates.\n\n`;
  message += `📋 *Trip Summary:*\n`;
  message += `• *Trip Name:* ${travelerName}\n`;
  message += `• *Duration:* ${days} Days / ${nights} Nights\n`;
  message += `• *Travelers:* ${adults} Adults${children > 0 ? `, ${children} Children` : ""}\n`;
  message += `• *Travel Style:* ${vibe.toUpperCase()} (${budgetTier.toUpperCase()} Tier)\n`;
  message += `• *Selected Hotel:* ${hotelName}\n`;
  message += `• *Estimated Budget:* ৳${Number(totalBDT).toLocaleString('en-IN')} BDT\n\n`;
  
  if (state.selectedActivities && state.selectedActivities.length > 0) {
    message += `🎯 *Key Requested Activities:*\n`;
    state.selectedActivities.forEach(act => {
      message += `• ${act}\n`;
    });
    message += `\n`;
  }

  message += `Please confirm if you can arrange verified hotel booking and airport/bus terminal transfers at these fair rates. Thank you!`;

  return `https://wa.me/${WHATSAPP_CONFIG.conciergeNumber}?text=${encodeURIComponent(message)}`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WHATSAPP_CONFIG, buildWhatsAppPlannerPayload };
}
