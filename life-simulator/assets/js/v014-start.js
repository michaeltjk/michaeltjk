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
  const previousStartLife = startLife;
  startLife = function patchedV014StartLife() {
    previousStartLife();
    ensureRiskState();
    if (typeof renderGame === "function") renderGame();
  };
  ensureRiskState();
})();
