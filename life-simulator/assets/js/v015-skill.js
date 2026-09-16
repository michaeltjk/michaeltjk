(() => {
  const SKILL_META = {
    craft: { name: "专业技术", icon: "🛠️", color: "#8dc8ff" },
    business: { name: "经营管理", icon: "🧮", color: "#ffbc63" },
    communication: { name: "沟通协作", icon: "🤝", color: "#ff91ad" },
    finance: { name: "财务判断", icon: "💹", color: "#e5c24d" },
    resilience: { name: "身心韧性", icon: "🌱", color: "#75d19a" }
  };
  const ACTION_GAINS = {
    work: { craft: 2, resilience: 1 }, skill: { craft: 5 }, network: { communication: 4 }, "job-search": { communication: 2, craft: 1 },
    finances: { finance: 4 }, assets: { finance: 3 }, operate: { business: 4, finance: 1 }, customers: { communication: 4, business: 1 },
    product: { craft: 4, business: 1 }, cashflow: { finance: 4, business: 1 }, expand: { business: 3, communication: 2 },
    rest: { resilience: 3 }, leisure: { resilience: 2 }, family: { communication: 1, resilience: 1 }
  };
  const SPECS = {
    craft: ["高级技师", "解决方案负责人"], business: ["运营负责人", "增长经营者"], communication: ["关系协调者", "小团队负责人"],
    finance: ["现金流规划者", "资产配置者"], resilience: ["可持续工作者", "危机处理者"]
  };
  const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
  const html = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));

  function createSkillState() {
    return { points: Object.fromEntries(Object.keys(SKILL_META).map((key) => [key, 0])), unlocked: [], specialization: null, lastBreakthroughTurn: -99 };
  }
  function ensureSkills() {
    if (typeof state === "undefined" || !state) return null;
    state.version = 15;
    state.skills ??= createSkillState();
    state.skills.points ??= {};
    Object.keys(SKILL_META).forEach((key) => state.skills.points[key] ??= 0);
    state.skills.unlocked ??= [];
    state.skills.lastBreakthroughTurn ??= -99;
    state.lifeStats ??= { propertiesOwned: 0, careerLevel: 0, familySupport: 0, primarySkill: 0 };
    const primary = primarySkill();
    state.lifeStats.primarySkill = Math.max(state.lifeStats.primarySkill ?? 0, primary.value);
    return state.skills;
  }
  function primarySkill() {
    const points = state?.skills?.points ?? {};
    return Object.keys(SKILL_META).reduce((best, key) => {
      const value = points[key] ?? 0;
      return value > best.value ? { key, value, meta: SKILL_META[key] } : best;
    }, { key: "craft", value: points.craft ?? 0, meta: SKILL_META.craft });
  }
  function skillLabel() {
    ensureSkills();
    const primary = primarySkill();
    return state.skills.specialization ? `${state.skills.specialization.name} · ${primary.value}` : `${primary.meta.name} ${primary.value}`;
  }
  function skillBonus() {
    ensureSkills();
    return Math.min(8, Math.floor(primarySkill().value / 25) + (state.skills.specialization ? 2 : 0));
  }
  function renderSkills() {
    if (!state || !["dropout", "work"].includes(state.education?.track)) return;
    ensureSkills();
    const tags = document.querySelector("#backgroundTags");
    if (tags && typeof makeTag === "function") {
      const text = `技能 · ${skillLabel()}`;
      const old = [...tags.querySelectorAll(".tag")].find((tag) => tag.textContent.startsWith("技能"));
      if (old) old.textContent = text; else tags.append(makeTag(text));
    }
    const panel = document.querySelector("#goalProgress");
    if (!panel) return;
    const rows = Object.entries(SKILL_META).map(([key, meta]) => ({ key, meta, value: state.skills.points[key] ?? 0 })).sort((a, b) => b.value - a.value).slice(0, 3)
      .map(({ meta, value }) => `<div class="skill-row"><span>${meta.icon} ${html(meta.name)}</span><strong>${value}</strong><div class="skill-bar"><i style="width:${Math.min(100, value)}%;--skill-color:${meta.color}"></i></div></div>`).join("");
    const spec = state.skills.specialization ? `专精 · ${html(state.skills.specialization.name)}` : "尚未选择职业专精";
    const old = panel.querySelector(".skill-panel");
    if (old) old.remove();
    panel.insertAdjacentHTML("beforeend", `<section class="skill-panel"><div class="skill-title">职业技能</div>${rows}<div class="skill-specialization">${spec}</div></section>`);
  }
  function makeScene(skillKey, threshold) {
    const meta = SKILL_META[skillKey];
    if (threshold === "first") return { id: typeof createId === "function" ? createId() : String(Date.now()), icon: meta.icon, title: `${meta.name}开始成形`, story: `连续几个月的选择没有白费。你在“${meta.name}”上已经不只是临时应付，而是能看出方法、节奏和自己的短板。`, choices: [
      { label: "继续把经验整理成自己的方法", effects: { study: 4, mood: 2 }, special: { type: "gainSkill", skill: skillKey, amount: 6 }, result: "你把最近踩过的坑写成清单，下次遇到类似问题时不再完全从零开始。" },
      { label: "请更有经验的人给一次反馈", effects: { social: 3, study: 3, mood: -1 }, special: { type: "gainSkill", skill: skillKey, amount: 5 }, result: "反馈里有些话不太好听，但它们指出了真正能继续进步的地方。" }
    ] };
    return { id: typeof createId === "function" ? createId() : String(Date.now()), icon: "🏅", title: "选择一个职业专精", story: `“${meta.name}”已经成为你职业道路上最可靠的能力。接下来它可以往不同方向发展。`, choices: (SPECS[skillKey] ?? SPECS.craft).map((name, index) => ({ label: name, effects: { study: 3, mood: 2 }, special: { type: "chooseSpecialization", skill: skillKey, name, index }, result: `${name}成为你接下来几年最明确的职业标签。` })) };
  }
  function gain(action) {
    const skills = ensureSkills();
    if (!skills || !["dropout", "work"].includes(state.education?.track)) return [];
    const gains = { ...(ACTION_GAINS[action?.id] ?? {}) };
    if (state.career?.path === "business" && ["operate", "product", "cashflow", "customers", "expand"].includes(action?.id)) gains.business = (gains.business ?? 0) + 1;
    if (state.career?.path === "job" && ["work", "skill", "network", "job-search"].includes(action?.id)) gains.craft = (gains.craft ?? 0) + 1;
    Object.entries(gains).forEach(([key, value]) => skills.points[key] = Math.min(100, (skills.points[key] ?? 0) + value));
    const primary = primarySkill();
    state.lifeStats.primarySkill = Math.max(state.lifeStats.primarySkill ?? 0, primary.value);
    const threshold = primary.value >= 50 ? "special" : primary.value >= 25 ? "first" : null;
    if (threshold && !skills.unlocked.includes(`${primary.key}:${threshold}`) && state.turn - skills.lastBreakthroughTurn >= 6) {
      skills.unlocked.push(`${primary.key}:${threshold}`); skills.lastBreakthroughTurn = state.turn; return [makeScene(primary.key, threshold)];
    }
    return [];
  }

  const style = document.createElement("style");
  style.textContent = `.skill-panel{margin-top:12px;padding-top:10px;border-top:1px solid var(--line)}.skill-title{margin-bottom:8px;font-size:11px;font-weight:900}.skill-row{display:grid;grid-template-columns:minmax(0,1fr)30px;gap:6px;align-items:center;margin-top:7px;font-size:10px}.skill-row strong{text-align:right}.skill-bar{grid-column:1/-1;height:5px;overflow:hidden;background:#eceae3;border-radius:99px}.skill-bar i{display:block;height:100%;background:var(--skill-color,var(--lime));border-radius:inherit}.skill-specialization{margin-top:8px;font-size:10px;font-weight:800}`;
  document.head.append(style);

  const oldRenderGame = renderGame;
  renderGame = function patchedRenderGame() { oldRenderGame(); ensureSkills(); renderSkills(); };
  const oldStartLife = startLife;
  startLife = function patchedStartLife() { oldStartLife(); ensureSkills(); if (typeof saveGame === "function") saveGame(); renderSkills(); };
  const oldTakeAction = takeAction;
  takeAction = function patchedTakeAction(action) { oldTakeAction(action); const scenes = gain(action); if (state?.pendingScenes) state.pendingScenes.push(...scenes); if (state.career && skillBonus()) { const bonus = Math.min(4, skillBonus()); state.stats.money = Math.min(999, (state.stats.money ?? 0) + bonus); if (typeof recordMoneyChange === "function") recordMoneyChange(bonus, "职业技能带来的额外收入"); } if (typeof saveGame === "function") saveGame(); renderSkills(); };
  const oldApplySpecialChoice = applySpecialChoice;
  applySpecialChoice = function patchedApplySpecialChoice(special) {
    if (special?.type === "gainSkill") { ensureSkills(); state.skills.points[special.skill] = Math.min(100, (state.skills.points[special.skill] ?? 0) + (special.amount ?? 0)); state.lifeStats.primarySkill = Math.max(state.lifeStats.primarySkill ?? 0, primarySkill().value); return; }
    if (special?.type === "chooseSpecialization") { ensureSkills(); state.skills.specialization = { id: `${special.skill}-${special.index}`, name: special.name, skill: special.skill, chosenAt: typeof getStage === "function" ? getStage(state.turn).label : "现在" }; state.skills.points[special.skill] = Math.min(100, (state.skills.points[special.skill] ?? 0) + 6); if (state.career) { state.career.baseIncome = Math.max(0, state.career.baseIncome + 3); state.career.title = state.career.path === "business" ? special.name : `${state.career.title}（${special.name}）`; } state.lifeStats.primarySkill = Math.max(state.lifeStats.primarySkill ?? 0, primarySkill().value); return; }
    oldApplySpecialChoice(special);
  };

  ensureSkills();
  if (typeof saveGame === "function") saveGame();
  if (state && typeof renderGame === "function") renderGame();
})();