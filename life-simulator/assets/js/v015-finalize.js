(() => {
  const keys = ["craft", "business", "communication", "finance", "resilience"];
  function ensureV15() {
    if (typeof state === "undefined" || !state) return;
    state.version = 15;
    state.skills ??= { points: {}, unlocked: [], specialization: null, lastBreakthroughTurn: -99 };
    state.skills.points ??= {};
    keys.forEach((key) => state.skills.points[key] ??= 0);
    state.skills.unlocked ??= [];
    state.skills.lastBreakthroughTurn ??= -99;
    state.lifeStats ??= { propertiesOwned: 0, careerLevel: 0, familySupport: 0, primarySkill: 0 };
    state.lifeStats.primarySkill = Math.max(state.lifeStats.primarySkill ?? 0, ...keys.map((key) => state.skills.points[key] ?? 0));
    if (typeof saveGame === "function") saveGame();
  }
  function syncSoon() {
    setTimeout(() => {
      ensureV15();
      if (typeof renderGame === "function" && typeof state !== "undefined" && state) renderGame();
    }, 30);
  }
  document.querySelector("#startButton")?.addEventListener("click", syncSoon);
  window.addEventListener("pageshow", syncSoon);
  syncSoon();
})();