(() => {
  const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
  const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const createRiskState = () => ({ economyHeat: randomBetween(44, 68), jobMarket: randomBetween(46, 70), medicalDebt: 0, legalRisk: 8, lastShockTurn: -99, warnings: [] });

  function ensureRisks() {
    if (typeof state === "undefined" || !state) return null;
    state.version = 14;
    state.risks ??= createRiskState();
    state.risks.economyHeat ??= randomBetween(44, 68);
    state.risks.jobMarket ??= randomBetween(46, 70);
    state.risks.medicalDebt ??= 0;
    state.risks.legalRisk ??= 8;
    state.risks.lastShockTurn ??= -99;
    state.risks.warnings ??= [];
    return state.risks;
  }

  function riskLabel() {
    const risk = ensureRisks() ?? {};
    const labels = [];
    if ((risk.economyHeat ?? 50) <= 32) labels.push("经济偏冷");
    if ((risk.legalRisk ?? 0) >= 50) labels.push("合同偏险");
    if ((risk.medicalDebt ?? 0) >= 10) labels.push("健康透支");
    return labels.length ? labels.slice(0, 2).join("、") : "平稳";
  }

  function injectRiskTag() {
    const list = document.querySelector("#backgroundTags");
    if (!list) return;
    const text = `外部风险 · ${riskLabel()}`;
    const existing = [...list.querySelectorAll(".tag")].find((tag) => tag.textContent.startsWith("外部风险"));
    if (existing) existing.textContent = text;
    else if (typeof makeTag === "function") list.append(makeTag(text));
  }

  function makeEvent(icon, title, story, choices) {
    return { id: typeof createId === "function" ? createId() : String(Date.now()), icon, title, story, choices };
  }

  function createEconomicShockScene() {
    const career = state.career;
    const business = career?.path === "business";
    return makeEvent("📉", business ? "市场突然冷下来" : "公司开始收缩预算", business ? `${career.name}连续几周询价变多、成交变少。客户不是不需要，只是每一笔钱都批得更慢。` : `${career?.employer ?? "公司"}通知下个季度控制成本，绩效奖金和招聘计划都被重新评估。`, [
      { label: business ? "砍掉低利润业务，保住现金流" : "主动接一个能证明价值的核心任务", effects: business ? { money: 4, study: 3, mood: -2 } : { study: 4, social: 2, health: -2 }, special: { type: "absorbEconomicShock", incomeDelta: business ? -2 : 0, economy: 6 }, result: business ? "收入上限降低了一点，但账面风险变得更可控。" : "任务更重了，不过你在收缩期留下了可被看见的成果。" },
      { label: business ? "继续扩客户，赌下一批订单回来" : "先保守观望，减少额外投入", effects: business ? { social: 4, money: -5, mood: -1 } : { mood: 2, money: 2, social: -1 }, special: { type: "absorbEconomicShock", incomeDelta: business ? 1 : -1, economy: 3 }, result: business ? "你换来一些潜在客户，也承担了更紧的现金压力。" : "你没有逆势加码，但岗位收入预期也变得更保守。" }
    ]);
  }

  function createHealthCrisisScene() {
    return makeEvent("🚑", "身体终于发出硬警告", "连续疲惫之后，你在一个普通早晨明显撑不住了。问题不一定严重，但已经不是睡一觉就能假装过去。", [
      { label: "立刻检查并休息一段时间", effects: { health: 12, money: -10, mood: -1 }, special: { type: "resolveHealthCrisis", debt: -10 }, result: "检查和休息花掉了钱，也把更大的风险挡在了前面。" },
      { label: "先减少强度，观察一个月", effects: { health: 5, mood: 2, money: -3 }, special: { type: "resolveHealthCrisis", debt: -5 }, result: "你没有完全停下，但开始承认身体不是无限资源。" }
    ]);
  }

  function createContractRiskScene() {
    const business = state.career?.path === "business";
    return makeEvent("⚖️", business ? "一份模糊合同开始反咬" : "口头安排变成了责任争议", business ? "客户拿出聊天记录要求你按最初口头承诺补交额外内容，但报价里从没写清这部分边界。" : "一项临时任务出了问题，大家对谁答应过什么说法不一，你发现很多安排只停留在群聊里。", [
      { label: "整理证据，按书面边界重新谈", effects: { study: 4, social: -2, mood: -2 }, special: { type: "reduceLegalRisk", amount: 18 }, result: "过程不轻松，但你把模糊责任拉回了具体条款。" },
      { label: "花钱补救，尽快把关系保住", effects: { money: -9, social: 3, mood: -1 }, special: { type: "reduceLegalRisk", amount: 10 }, result: "关系暂时没有撕破，你也记住了下次必须提前写清楚。" }
    ]);
  }

  function createLivingCostShockScene() {
    return makeEvent("🏘️", "房东通知下季度涨租", `你现在住在${state.career.housing}。房东说周边租金都涨了，下季度要重新定价。`, [
      { label: "接受涨租，保住通勤和稳定", effects: { mood: -2, money: -4 }, special: { type: "adjustLivingCost", rentDelta: 2 }, result: "住处没有变，账单却从下个月开始更重。" },
      { label: "开始找更便宜的住处", effects: { study: 1, health: -2, money: -2 }, special: { type: "adjustLivingCost", rentDelta: -1, livingDelta: 1 }, result: "搬家要花精力，但你没有把每次涨价都默默吞下去。" }
    ]);
  }

  function updateRisks(action) {
    const risk = ensureRisks();
    if (!risk || !action) return [];
    risk.economyHeat = clamp(risk.economyHeat + randomBetween(-3, 2));
    risk.jobMarket = clamp(risk.jobMarket + randomBetween(-2, 2));
    if (state.career?.path === "business") risk.legalRisk = clamp(risk.legalRisk + (["cashflow", "product"].includes(action.id) ? -2 : 1));
    else if (state.career?.path === "job") risk.legalRisk = clamp(risk.legalRisk + (action.id === "work" ? 1 : action.id === "job-search" ? -1 : 0));
    if (state.stats.health <= 35) risk.medicalDebt = Math.min(999, risk.medicalDebt + 2);
    if (action.id === "rest" || action.id === "leisure") risk.medicalDebt = Math.max(0, risk.medicalDebt - 3);
    if (state.turn - risk.lastShockTurn < 8) return [];
    let scene = null;
    if (state.career && risk.economyHeat <= 28 && Math.random() < 0.32) scene = createEconomicShockScene();
    else if (["dropout", "work"].includes(state.education.track) && (state.stats.health <= 24 || risk.medicalDebt >= 12) && Math.random() < 0.45) scene = createHealthCrisisScene();
    else if (state.career && risk.legalRisk >= 55 && Math.random() < 0.34) scene = createContractRiskScene();
    else if (state.career?.location === "away" && Math.random() < 0.08) scene = createLivingCostShockScene();
    if (scene) risk.lastShockTurn = state.turn;
    return scene ? [scene] : [];
  }

  const oldRenderGame = renderGame;
  renderGame = function patchedRenderGame() {
    oldRenderGame();
    ensureRisks();
    injectRiskTag();
  };

  const oldStartLife = startLife;
  startLife = function patchedStartLife() {
    oldStartLife();
    ensureRisks();
    if (typeof saveGame === "function") saveGame();
    injectRiskTag();
  };

  const oldTakeAction = takeAction;
  takeAction = function patchedTakeAction(action) {
    oldTakeAction(action);
    if (state?.pendingScenes) state.pendingScenes.push(...updateRisks(action));
    if (typeof saveGame === "function") saveGame();
    injectRiskTag();
  };

  const oldApplySpecialChoice = applySpecialChoice;
  applySpecialChoice = function patchedApplySpecialChoice(special) {
    if (special?.type === "absorbEconomicShock") { const risk = ensureRisks(); if (state.career) state.career.baseIncome = Math.max(0, state.career.baseIncome + (special.incomeDelta ?? 0)); risk.economyHeat = clamp(risk.economyHeat + (special.economy ?? 0)); return; }
    if (special?.type === "resolveHealthCrisis") { const risk = ensureRisks(); risk.medicalDebt = Math.max(0, risk.medicalDebt + (special.debt ?? 0)); return; }
    if (special?.type === "reduceLegalRisk") { const risk = ensureRisks(); risk.legalRisk = Math.max(0, risk.legalRisk - (special.amount ?? 0)); return; }
    if (special?.type === "adjustLivingCost" && state.career) { state.career.rent = Math.max(0, state.career.rent + (special.rentDelta ?? 0)); state.career.livingCost = Math.max(2, state.career.livingCost + (special.livingDelta ?? 0)); return; }
    oldApplySpecialChoice(special);
  };

  ensureRisks();
  if (typeof saveGame === "function") saveGame();
  if (state && typeof renderGame === "function") renderGame();
})();
