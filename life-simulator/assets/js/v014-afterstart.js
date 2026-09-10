(() => {
  const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  function ensureRiskState() {
    if (typeof state === "undefined" || !state) return;
    state.version = 14;
    state.risks ??= {
      economyHeat: randomBetween(44, 68),
      jobMarket: randomBetween(46, 70),
      medicalDebt: 0,
      legalRisk: 8,
      lastShockTurn: -99,
      warnings: []
    };
    state.risks.economyHeat ??= randomBetween(44, 68);
    state.risks.jobMarket ??= randomBetween(46, 70);
    state.risks.medicalDebt ??= 0;
    state.risks.legalRisk ??= 8;
    state.risks.lastShockTurn ??= -99;
    state.risks.warnings ??= [];
    if (typeof saveGame === "function") saveGame();
  }
  function syncAfterStart() {
    setTimeout(() => {
      ensureRiskState();
      if (typeof renderGame === "function") renderGame();
    }, 0);
  }
  document.querySelector("#startButton")?.addEventListener("click", syncAfterStart);
  window.addEventListener("pageshow", () => {
    ensureRiskState();
    if (typeof renderGame === "function" && typeof state !== "undefined" && state) renderGame();
  });
})();
