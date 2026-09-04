const STORAGE_KEY = "life-simulator-v1";

const IDENTITY_META = {
  boy: { label: "男生", symbol: "👦" },
  girl: { label: "女生", symbol: "👧" }
};

const STAT_META = {
  study: { name: "学业", icon: "📘", color: "#7ca8ff" },
  health: { name: "健康", icon: "💪", color: "#75d19a" },
  mood: { name: "心情", icon: "☀️", color: "#ffbc63" },
  social: { name: "人缘", icon: "🤝", color: "#ff91ad" },
  family: { name: "亲情", icon: "🏠", color: "#b29cff" },
  money: { name: "零花钱", icon: "🪙", color: "#e5c24d" }
};

const CORE_STATS = ["study", "health", "mood", "social", "family"];
const ACTION_CARE = {
  study: ["study"], exercise: ["health", "mood"], friends: ["social", "mood"], hobby: ["mood"],
  activity: ["study", "social"], family: ["family", "mood"], rest: ["health", "mood"], finances: ["money"],
  luck: ["mood"],
  language: ["study"], coursework: ["study"], work: ["money"], skill: ["study"],
  network: ["social"], "job-search": ["study", "social"]
};

const BACKGROUND_DATA = {
  surnames: ["林", "沈", "陈", "周", "许", "江", "顾", "苏", "陆", "叶", "唐", "温"],
  boyNames: ["星野", "子墨", "予辰", "景行", "亦舟", "嘉言", "明川", "屿安"],
  girlNames: ["知夏", "念安", "清禾", "雨桐", "书宁", "向晚", "若溪", "南乔"],
  cities: ["南方沿海小城", "北方工业城市", "省会老城区", "西南山城", "江南县城", "一线城市郊区"],
  families: [
    {
      id: "dual-income", name: "普通双职工家庭", resourceLevel: 3,
      detail: "生活稳定，但每一笔大支出都需要计划", effects: { family: 6, money: 6 },
      parents: ["父亲是公交司机，母亲是社区会计", "父亲在制造企业做技术员，母亲是商场职员", "父亲是厨师，母亲是护士"],
      schools: ["普通公立中学", "刚刚扩建的新学校", "区重点中学普通班"]
    },
    {
      id: "small-business", name: "经营小店的家庭", resourceLevel: 3,
      detail: "父母很忙，你从小就懂得帮忙", effects: { social: 5, family: 2, money: 3 },
      parents: ["父母经营一家早餐店", "父母经营社区便利店", "父母共同经营一家五金店"],
      schools: ["离家不远的普通公立中学", "刚刚扩建的新学校", "管理严格的寄宿学校"]
    },
    {
      id: "single-parent", name: "单亲家庭", resourceLevel: 2,
      detail: "家里不宽裕，但你和照顾者彼此依靠", effects: { family: 8, mood: -4, money: -5 },
      parents: ["由母亲独自照顾，母亲在社区工作", "由父亲独自照顾，父亲是一名货车司机", "由母亲和外婆共同照顾，母亲是超市收银员"],
      schools: ["普通公立中学", "刚刚扩建的新学校", "离家很远的重点班"]
    },
    {
      id: "intellectual", name: "知识分子家庭", resourceLevel: 4,
      detail: "家中重视阅读，也对成绩有较高期待", effects: { study: 9, mood: -3, money: 3 },
      parents: ["母亲是中学教师，父亲是工程师", "父亲在大学任教，母亲是出版社编辑", "父母都从事科研与技术工作"],
      schools: ["区重点中学", "管理严格的寄宿学校", "重点中学实验班"]
    },
    {
      id: "migrant-worker", name: "城郊务工家庭", resourceLevel: 1,
      detail: "父母用辛苦工作换来一家人的生活", effects: { health: 4, family: 5, money: -3 },
      parents: ["父母都在城郊工厂上班", "父亲在建筑工地工作，母亲做家政服务", "父亲送快递，母亲在餐馆后厨工作"],
      schools: ["城郊普通公立中学", "刚刚扩建的新学校", "管理严格的寄宿学校"]
    },
    {
      id: "affluent", name: "条件优渥的家庭", resourceLevel: 5,
      detail: "资源充足，但家人对你的未来已有设想", effects: { money: 14, study: 4, family: -2 },
      parents: ["父亲经营一家企业，母亲是医生", "父母都在大型企业担任管理人员", "母亲经营设计公司，父亲是投资顾问"],
      schools: ["民办双语学校", "重点中学实验班", "管理严格的寄宿学校"]
    }
  ],
  talents: [
    { name: "过目不忘", effect: "学习成长更快", stats: { study: 9 } },
    { name: "运动神经", effect: "体能出众", stats: { health: 10 } },
    { name: "天生乐观", effect: "容易恢复心情", stats: { mood: 10 } },
    { name: "善于倾听", effect: "更容易交到朋友", stats: { social: 9 } },
    { name: "手工达人", effect: "对创作充满兴趣", stats: { mood: 6, study: 3 } },
    { name: "普通但坚定", effect: "没有捷径，但更加均衡", stats: { study: 3, health: 3, mood: 3, social: 3 } }
  ],
  personalities: ["安静敏感", "外向直接", "谨慎认真", "好奇心旺盛", "有点叛逆", "温和随性"]
};

const SCHOOL_ACTIONS = [
  { id: "study", icon: "📚", name: "认真学习", note: "把主要精力放在功课上", color: "#dce8ff", effects: { study: 7, mood: -2, health: -1 } },
  { id: "exercise", icon: "🏃", name: "运动锻炼", note: "操场、球场或回家跑步", color: "#daf2df", effects: { health: 7, mood: 2, study: -1 } },
  { id: "friends", icon: "🫂", name: "经营友情", note: "主动和同学相处", color: "#ffe0e8", effects: { social: 7, mood: 3, study: -1 } },
  { id: "hobby", icon: "🎨", name: "发展爱好", note: "音乐、绘画、阅读或游戏", color: "#eee2ff", effects: { mood: 6, study: 1, money: -2 } },
  { id: "activity", icon: "🧩", name: "参加校园项目", note: "加入一件需要几个月完成的事", color: "#e8e2ff", effects: { social: 3, study: 2, mood: 1 } },
  { id: "finances", icon: "👛", name: "安排零花钱", note: "挣钱、存钱，也面对想买的东西", color: "#fff0bd", effects: { mood: 1 } },
  { id: "luck", icon: "🎲", name: "试试运气", note: "随机抽奖与小机会；成年后可能遇到彩票", color: "#ffe1c7", effects: { mood: 1 } },
  { id: "family", icon: "🍲", name: "陪伴家人", note: "帮忙做事，也聊聊学校", color: "#ffe6ce", effects: { family: 7, mood: 2 } },
  { id: "rest", icon: "🌙", name: "放松休息", note: "给疲惫的自己一点空间", color: "#dceced", effects: { health: 4, mood: 5, study: -2 } }
];

const INTERNATIONAL_ACTIONS = [
  { id: "language", icon: "🌍", name: "强化语言", note: "练习英语表达与标化考试", color: "#dce8ff", effects: { study: 6, mood: -1, money: -3 } },
  { id: "coursework", icon: "🧪", name: "完成国际课程", note: "适应讨论、论文和项目制学习", color: "#daf2df", effects: { study: 7, health: -1 } },
  { id: "activity", icon: "🎭", name: "参加课外活动", note: "积累经历，也寻找真正的兴趣", color: "#eee2ff", effects: { social: 4, mood: 3, money: -3 } },
  { id: "finances", icon: "👛", name: "安排零花钱", note: "规划开销并为目标储蓄", color: "#fff0bd", effects: { mood: 1 } },
  { id: "luck", icon: "🎲", name: "试试运气", note: "结果在选择后才会揭晓", color: "#ffe1c7", effects: { mood: 1 } },
  { id: "friends", icon: "🫂", name: "经营友情", note: "认识来自不同背景的同学", color: "#ffe0e8", effects: { social: 7, mood: 3 } },
  { id: "family", icon: "🍲", name: "陪伴家人", note: "升学压力之外，也听听家人的想法", color: "#ffe6ce", effects: { family: 7, mood: 2 } },
  { id: "rest", icon: "🌙", name: "放松休息", note: "给疲惫的自己一点空间", color: "#dceced", effects: { health: 4, mood: 5, study: -2 } }
];

const PROJECT_TEMPLATES = [
  {
    name: "校园环保周", icon: "♻️", goal: "让全校减少一次性用品",
    deliverable: "一场旧物交换会和一份减塑倡议",
    kickoff: "第一次会议上，大家发现口号很好想，真正困难的是说服食堂、学生会和各班配合。",
    conflict: "负责宣传的同学临时说海报来不及做，场地申请也被后勤退回。离活动只剩十天。",
    incident: "你们去食堂做访谈时，经理担心环保方案会增加成本，当场追问谁来承担损耗。"
  },
  {
    name: "社区口述史", icon: "🎙️", goal: "记录老街居民正在消失的生活记忆",
    deliverable: "一支十分钟纪录短片",
    kickoff: "指导老师只给了一台旧录音机。组员对采访谁、问什么都没有经验。",
    conflict: "剪辑做到一半，一位受访老人要求删掉最有感染力的一段家庭往事。截止日期只剩一周。",
    incident: "第二次采访时，老人一直答非所问，却突然拿出一本保存了四十年的相册。"
  },
  {
    name: "青少年科技展", icon: "🤖", goal: "做出能监测教室绿植湿度的装置",
    deliverable: "一台可现场演示的原型机",
    kickoff: "你们列完零件清单才发现预算只够买一套传感器，任何一次烧坏都可能让项目停摆。",
    conflict: "联调时数据突然乱跳。负责程序和负责电路的两个人都认为问题出在对方那里。",
    incident: "测试前夜，水泵误启动，桌面被浇湿，唯一的传感器也开始接触不良。"
  },
  {
    name: "校园戏剧节", icon: "🎭", goal: "排演一部关于校园生活的原创短剧",
    deliverable: "一场十五分钟正式演出",
    kickoff: "剧本只有一个结尾，演员却已经选好。有人想演喜剧，有人坚持保留沉重的主题。",
    conflict: "主演连续两次缺席排练，另一位同学提出临时换角，排练室里的气氛一下僵住。",
    incident: "联排时一件关键道具断了，台词最少的同学却拿出自己连夜做的替代品。"
  },
  {
    name: "公益义卖计划", icon: "🧺", goal: "为流浪动物救助站筹集物资",
    deliverable: "一次公开义卖和透明的收支记录",
    kickoff: "组员很快收来一堆旧物，但定价、卫生检查和钱款保管都没人愿意负责。",
    conflict: "义卖前有人质疑善款去向，群聊里的转发越来越多，原定合作商家也开始犹豫。",
    incident: "整理捐赠物时，你们发现一只旧玩偶里夹着捐赠者写给救助站的信。"
  }
];

const MONEY_GOALS = [
  { id: "headphones", name: "一副喜欢的耳机", cost: 45, icon: "🎧", reward: { mood: 7 } },
  { id: "camera", name: "一台二手相机", cost: 75, icon: "📷", reward: { mood: 6, study: 2 } },
  { id: "gift", name: "给家人的生日礼物", cost: 35, icon: "🎁", reward: { family: 8, mood: 3 } },
  { id: "course", name: "一套真正想学的课程", cost: 60, icon: "🧠", reward: { study: 7, mood: 2 } }
];

const WORK_ACTIONS = [
  { id: "work", icon: "🧰", name: "认真工作", note: "把眼前的工作做好并赚取收入", color: "#ffe6ce", effects: { money: 12, health: -3, mood: -2 } },
  { id: "skill", icon: "🛠️", name: "学习手艺", note: "利用空闲时间掌握一门技能", color: "#dce8ff", effects: { study: 5, money: -2, mood: 1 } },
  { id: "network", icon: "🤝", name: "经营人脉", note: "认识同行、师傅和新的机会", color: "#ffe0e8", effects: { social: 6, money: -1 } },
  { id: "job-search", icon: "📄", name: "寻找机会", note: "留意更稳定或更有前景的岗位", color: "#daf2df", effects: { study: 2, social: 3, mood: -1 } },
  { id: "family", icon: "🏠", name: "帮助家里", note: "承担开支，也维系家庭关系", color: "#eee2ff", effects: { family: 7, money: -5, mood: 2 } },
  { id: "rest", icon: "🌙", name: "休息恢复", note: "身体是继续生活的本钱", color: "#dceced", effects: { health: 6, mood: 4, money: -1 } },
  { id: "luck", icon: "🎲", name: "试试运气", note: "花一点钱，接受完全随机的结果", color: "#ffe1c7", effects: { mood: 1 } }
];

const EVENTS = [
  {
    id: "seatmate", icon: "✏️", title: "沉默的新同桌",
    story: "班主任把一位不爱说话的同学安排在你旁边。几天下来，对方总是独自吃午饭。",
    choices: [
      { label: "主动邀请一起吃饭", hint: "人缘 +6，心情 +2", effects: { social: 6, mood: 2 }, result: "你们聊得意外投机，一段新友情开始了。" },
      { label: "保持礼貌但不过多打扰", hint: "学业 +2", effects: { study: 2 }, result: "你们相安无事，各自保持着舒服的距离。" }
    ]
  },
  {
    id: "exam", icon: "📝", title: "突然的摸底考试",
    story: "老师宣布下周进行全年级摸底考试。你的复习还有不少漏洞。",
    choices: [
      { label: "制定一周冲刺计划", hint: "学业 +8，健康 -2", effects: { study: 8, health: -2 }, result: "过程很累，但成绩比预想中更好。" },
      { label: "正常发挥，不临时抱佛脚", hint: "心情 +3，学业 -2", effects: { mood: 3, study: -2 }, result: "你保持了轻松，也看清了自己的真实水平。" }
    ]
  },
  {
    id: "phone", icon: "📱", title: "同学群里的新游戏",
    story: "最近班里都在玩一款热门手游。朋友邀请你今晚一起组队，但作业还没有完成。",
    choices: [
      { label: "先写完作业再上线", hint: "学业 +4，人缘 +2", effects: { study: 4, social: 2 }, result: "你晚到了一会儿，但玩得没有负担。" },
      { label: "马上加入，作业明早再说", hint: "心情 +5，学业 -6", effects: { mood: 5, study: -6 }, result: "今晚很快乐，第二天早晨却手忙脚乱。" }
    ]
  },
  {
    id: "parents", icon: "🌧️", title: "家里的争吵",
    story: "晚上你听见家人为钱和工作争吵。第二天，餐桌上的气氛依旧沉重。",
    choices: [
      { label: "找机会说说自己的感受", hint: "亲情 +6，心情 -1", effects: { family: 6, mood: -1 }, result: "家人意识到争吵也影响了你，关系慢慢缓和。" },
      { label: "戴上耳机，当作没听见", hint: "心情 +1，亲情 -4", effects: { mood: 1, family: -4 }, result: "你暂时躲开了情绪，但隔阂留了下来。" }
    ]
  },
  {
    id: "competition", icon: "🏆", title: "一次竞赛机会",
    story: "老师认为你有潜力，邀请你参加校内竞赛，但准备过程会占用不少休息时间。",
    choices: [
      { label: "接受挑战", hint: "学业 +9，心情 -2", requires: { study: 50, health: 35 }, effects: { study: 9, mood: -2 }, result: "你没有拿到第一名，却第一次看见更大的世界。" },
      { label: "婉拒，把时间留给自己", hint: "心情 +5", effects: { mood: 5 }, result: "周末重新属于你，老师也尊重了你的选择。" }
    ]
  },
  {
    id: "lost-money", icon: "🪙", title: "走廊里的五十元",
    story: "你在放学后的走廊捡到五十元，周围一个人也没有。",
    choices: [
      { label: "交给老师", hint: "人缘 +4，亲情 +2", effects: { social: 4, family: 2 }, result: "失主第二天找到了钱，并认真向你道谢。" },
      { label: "先收起来，买想要的东西", hint: "零花钱 +50，心情 -3", effects: { money: 50, mood: -3 }, result: "你得到了想要的东西，却总觉得心里有点沉。" }
    ]
  },
  {
    id: "rain", icon: "☔", title: "放学后的大雨",
    story: "校门外下起大雨。你只有一把伞，旁边有位同学没带伞。",
    choices: [
      { label: "一起撑伞回家", hint: "人缘 +5，健康 -1", effects: { social: 5, health: -1 }, result: "一路有说有笑，裤脚湿了也没那么糟。" },
      { label: "把伞借给对方，自己跑回去", hint: "人缘 +7，健康 -4", effects: { social: 7, health: -4 }, result: "你淋得浑身湿透，却收获了一份牢牢记住的人情。" }
    ]
  }
];

const ACADEMIC_MONTHS = ["九月", "十月", "十一月", "十二月", "一月", "二月", "三月", "四月", "五月", "六月"];
const GRADES = ["初一", "初二", "初三", "高一", "高二", "高三", "大学一年级"];

let selectedIdentity = "random";
let pendingOrigin = generateOrigin(selectedIdentity);
let state = loadGame();

const setupScreen = document.querySelector("#setupScreen");
const gameScreen = document.querySelector("#gameScreen");
const originCard = document.querySelector("#originCard");
const eventModal = document.querySelector("#eventModal");
const eventOutcome = document.querySelector("#eventOutcome");

document.querySelectorAll(".identity-button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedIdentity = button.dataset.identity;
    document.querySelectorAll(".identity-button").forEach((item) => item.classList.toggle("active", item === button));
    pendingOrigin = generateOrigin(selectedIdentity);
    renderOrigin();
  });
});

document.querySelector("#rerollButton").addEventListener("click", () => {
  pendingOrigin = generateOrigin(selectedIdentity);
  renderOrigin();
});

document.querySelector("#startButton").addEventListener("click", startLife);
document.querySelector("#restartButton").addEventListener("click", () => {
  if (!confirm("确定放下当前人生，重新生成一个新背景吗？")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = null;
  pendingOrigin = generateOrigin(selectedIdentity);
  eventModal.classList.add("hidden");
  showSetup();
});

function generateOrigin(identityChoice) {
  const identity = identityChoice === "random" ? pick(["boy", "girl"]) : identityChoice;
  const family = pick(BACKGROUND_DATA.families);
  const talent = pick(BACKGROUND_DATA.talents);
  const stats = {
    study: randomBetween(42, 63), health: randomBetween(45, 68), mood: randomBetween(43, 67),
    social: randomBetween(38, 64), family: randomBetween(45, 70), money: randomBetween(8, 28)
  };
  applyToStats(stats, family.effects);
  applyToStats(stats, talent.stats);

  const origin = {
    id: createId(),
    identity,
    name: `${pick(BACKGROUND_DATA.surnames)}${pick(identity === "girl" ? BACKGROUND_DATA.girlNames : BACKGROUND_DATA.boyNames)}`,
    city: pick(BACKGROUND_DATA.cities), family, parent: pick(family.parents),
    school: pick(family.schools), talent, personality: pick(BACKGROUND_DATA.personalities), stats
  };
  origin.story = buildOriginStory(origin);
  return origin;
}

function startLife() {
  state = {
    version: 7,
    character: pendingOrigin,
    stats: { ...pendingOrigin.stats },
    turn: 0,
    education: { route: "undecided", track: "middle-school", exitTurn: null },
    friends: [],
    projects: [],
    economy: { savingsGoal: null, ledger: [], chanceHistory: [], lottery: { tickets: 0, spent: 0, won: 0, bestPrize: 0 } },
    balance: { lastActionId: null, repeatCount: 0, statBands: createStatBands(pendingOrigin.stats) },
    memories: [{ id: createId(), stage: "初一 · 九月", text: pendingOrigin.story, color: "#d9ff68" }],
    pendingScenes: [createOpeningScene(pendingOrigin)]
  };
  saveGame();
  showGame();
}

function takeAction(action) {
  if (state.pendingScenes.length) return;
  if (getActionLockReason(action)) return;
  const actionEffects = getAdjustedActionEffects(action);
  applyToStats(state.stats, actionEffects);
  if (actionEffects.money) recordMoneyChange(actionEffects.money, action.name);
  updateActionStreak(action.id);
  applyMonthlyPressure(action);
  const stageBeforeAdvance = getStage(state.turn);
  addMemory(`${action.icon} ${action.name}：${action.note}。`, stageBeforeAdvance.label, action.color);
  state.turn += 1;

  const scenes = [createActionScene(action)];
  const thresholdScene = detectThresholdScene();
  if (thresholdScene) scenes.push(thresholdScene);
  if (Math.random() < 0.35) scenes.push(createExtraScene());
  const milestone = createEducationMilestone();
  if (milestone) scenes.push(milestone);
  state.pendingScenes = scenes;
  saveGame();
  renderGame();
  showEvent(state.pendingScenes[0]);
}

function showEvent(event) {
  eventOutcome.classList.add("hidden");
  eventOutcome.replaceChildren();
  document.querySelector("#eventIcon").textContent = event.icon;
  document.querySelector("#eventTitle").textContent = event.title;
  document.querySelector("#eventStory").textContent = event.story;
  const choices = event.choices.map((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    const label = document.createElement("span");
    label.textContent = choice.label;
    const arrow = document.createElement("span");
    arrow.className = "choice-arrow";
    arrow.textContent = "→";
    button.append(label, arrow);
    const unmet = getUnmetRequirements(choice.requires);
    if (unmet.length) {
      button.disabled = true;
      button.title = `尚未满足：${formatRequirements(choice.requires)}`;
      label.textContent = `${choice.label}（需要 ${formatRequirements(choice.requires)}）`;
    }
    button.addEventListener("click", () => resolveEvent(event, choice));
    return button;
  });
  document.querySelector("#eventChoices").replaceChildren(...choices);
  eventModal.classList.remove("hidden");
}

function resolveEvent(event, choice) {
  applyToStats(state.stats, choice.effects);
  if (choice.effects.money) recordMoneyChange(choice.effects.money, `${event.title} · ${choice.label}`);
  applySpecialChoice(choice.special);
  addMemory(`${event.icon} ${event.title}：${choice.result}`, getStage(Math.max(0, state.turn - 1)).label, "#ffbc63");
  state.pendingScenes.shift();
  const followUps = choice.followUps ?? (choice.followUp ? [choice.followUp] : []);
  if (followUps.length) state.pendingScenes.unshift(...followUps);
  const thresholdScene = detectThresholdScene();
  if (thresholdScene) state.pendingScenes.unshift(thresholdScene);
  saveGame();
  renderGame();
  showOutcome(event, choice);
}

function showOutcome(event, choice) {
  document.querySelector("#eventTitle").textContent = "选择的回声";
  document.querySelector("#eventStory").textContent = choice.result;
  eventOutcome.classList.remove("hidden");

  const changes = Object.entries(choice.effects).filter(([, value]) => value !== 0);
  const chips = changes.length
    ? changes.map(([key, value]) => {
        const chip = document.createElement("span");
        chip.className = `effect-chip ${value > 0 ? "positive" : "negative"}`;
        chip.textContent = `${STAT_META[key].icon} ${STAT_META[key].name} ${value > 0 ? "+" : ""}${value}`;
        return chip;
      })
    : [createNeutralChip("这段故事悄悄留在了记忆里")];
  eventOutcome.replaceChildren(...chips);

  const continueButton = document.createElement("button");
  continueButton.type = "button";
  continueButton.className = "choice-button";
  continueButton.innerHTML = "<span>继续生活</span><span class=\"choice-arrow\">→</span>";
  continueButton.addEventListener("click", () => {
    eventModal.classList.add("hidden");
    if (state.pendingScenes.length) showEvent(state.pendingScenes[0]);
  });
  document.querySelector("#eventChoices").replaceChildren(continueButton);
}

function renderOrigin() {
  const origin = pendingOrigin;
  originCard.innerHTML = `
    <div class="origin-main">
      <div class="origin-avatar">${escapeHtml(origin.name[0])}</div>
      <div><h2>${escapeHtml(origin.name)}</h2><p>13 岁 · ${IDENTITY_META[origin.identity].label} · ${escapeHtml(origin.city)}</p></div>
    </div>
    <div class="origin-grid">
      ${originDetail("家庭", origin.family.name)}
      ${originDetail("监护人与职业", origin.parent)}
      ${originDetail("学校", origin.school)}
      ${originDetail("性格", origin.personality)}
      ${originDetail("天赋", origin.talent.name)}
      ${originDetail("天赋效果", origin.talent.effect)}
    </div>
    <p class="origin-story">${escapeHtml(origin.story)}</p>`;
}

function renderGame() {
  const character = state.character;
  const stage = getStage(state.turn);
  document.querySelector("#avatar").textContent = character.name[0];
  document.querySelector("#characterName").textContent = character.name;
  document.querySelector("#lifeStage").textContent = `${stage.grade} · ${stage.month} · ${stage.age} 岁`;
  document.querySelector("#characterLine").textContent = isWorkingLife()
    ? `${character.city}，已经进入社会，生活以工作、收入和独立生存为中心`
    : `${character.city}，就读于${character.school}`;
  document.querySelector("#familySummary").textContent = `${character.family.name}。${character.parent}。${character.family.detail}`;
  document.querySelector("#backgroundTags").replaceChildren(
    makeTag(`性格 · ${character.personality}`),
    makeTag(`天赋 · ${character.talent.name}`),
    makeTag(`朋友 · ${state.friends.length ? state.friends.slice(0, 2).map((friend) => friend.name).join("、") : "还没有"}`),
    makeTag(`路线 · ${getRouteLabel()}`),
    makeTag(`项目 · ${state.projects.find((project) => project.status === "active")?.name ?? "暂无"}`),
    makeTag(state.economy.savingsGoal
      ? `攒钱 · ${state.economy.savingsGoal.name} ${state.stats.money}/${state.economy.savingsGoal.cost}`
      : "攒钱 · 还没有目标"),
    makeTag(`状态 · ${getConditionLabel()}`),
    makeTag(state.economy.ledger[0]
      ? `最近收支 · ${state.economy.ledger[0].amount > 0 ? "+" : ""}${state.economy.ledger[0].amount}`
      : "最近收支 · 暂无"),
    makeTag(state.economy.chanceHistory[0]
      ? `最近手气 · ${state.economy.chanceHistory[0].prize > state.economy.chanceHistory[0].stake ? "赚到" : state.economy.chanceHistory[0].prize === state.economy.chanceHistory[0].stake ? "回本" : "没中"}`
      : "最近手气 · 尚未尝试")
  );
  document.querySelector("#turnCount").textContent = `已走过 ${state.turn} 个月`;
  document.querySelector("#monthHint").textContent = `${stage.grade}${stage.month}，选择一项行动推进时间`;

  const statElements = Object.entries(STAT_META).map(([key, meta]) => {
    const value = state.stats[key];
    const item = document.createElement("article");
    item.className = "stat";
    item.innerHTML = `<div class="stat-head"><span class="stat-name">${meta.icon} ${meta.name}</span></div><div class="stat-value">${value}</div><div class="stat-bar"><i style="width:${Math.min(100, value)}%;--stat-color:${meta.color}"></i></div>`;
    return item;
  });
  document.querySelector("#statsGrid").replaceChildren(...statElements);

  const actionElements = getAvailableActions().map((action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "action-card";
    const lockReason = getActionLockReason(action);
    const effects = getAdjustedActionEffects(action);
    button.innerHTML = `<span class="action-icon" style="--action-color:${action.color}">${action.icon}</span><span class="action-copy"><strong>${action.name}</strong><small>${lockReason ?? action.note}</small></span><span class="action-cost">${formatEffectSummary(effects)}<small>${lockReason ? "当前不可进行" : state.balance.lastActionId === action.id ? `连续第 ${state.balance.repeatCount + 1} 个月` : "推进 1 个月"}</small></span>`;
    button.disabled = Boolean(lockReason);
    button.addEventListener("click", () => takeAction(action));
    return button;
  });
  document.querySelector("#actionGrid").replaceChildren(...actionElements);

  const memoryElements = state.memories.slice(0, 8).map((memory) => {
    const item = document.createElement("li");
    item.className = "memory-item";
    item.style.setProperty("--item-color", memory.color);
    item.innerHTML = `<time>${escapeHtml(memory.stage)}</time><p>${escapeHtml(memory.text)}</p>`;
    return item;
  });
  document.querySelector("#memoryList").replaceChildren(...memoryElements);
  document.querySelector("#saveStatus").textContent = "已自动保存";
}

function showSetup() {
  gameScreen.classList.add("hidden");
  setupScreen.classList.remove("hidden");
  renderOrigin();
}

function showGame() {
  setupScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  renderGame();
  if (state.pendingScenes.length) showEvent(state.pendingScenes[0]);
}

function getStage(turn) {
  const month = ACADEMIC_MONTHS[turn % ACADEMIC_MONTHS.length];
  const education = state.education;
  if (education.track === "dropout" || education.track === "work") {
    const elapsed = Math.max(0, turn - (education.exitTurn ?? 20));
    const grade = `进入社会第 ${Math.floor(elapsed / 10) + 1} 年`;
    return { grade, month, age: 13 + Math.floor(turn / 10), label: `${grade} · ${month}` };
  }

  let grade;
  if (turn < 30) {
    grade = ["初一", "初二", "初三"][Math.floor(turn / 10)];
  } else if (turn < 60) {
    const year = Math.floor((turn - 30) / 10) + 1;
    grade = education.route === "international" ? `国际高中 ${year} 年级` : education.track === "vocational" ? `中职 ${year} 年级` : `高中 ${year} 年级`;
  } else {
    const year = Math.floor((turn - 60) / 10) + 1;
    grade = education.track === "university" ? `大学 ${year} 年级` : education.route === "international" ? `海外学习第 ${year} 年` : `毕业第 ${year} 年`;
  }
  return {
    grade, month,
    age: 13 + Math.floor(turn / 10),
    label: `${grade} · ${month}`
  };
}

function addMemory(text, stage, color) {
  state.memories.unshift({ id: createId(), text, stage, color });
  state.memories = state.memories.slice(0, 120);
}

function recordMoneyChange(amount, label) {
  if (!state.economy || !amount) return;
  state.economy.ledger.unshift({ id: createId(), amount, label, stage: getStage(state.turn).label });
  state.economy.ledger = state.economy.ledger.slice(0, 30);
}

function applyToStats(stats, effects) {
  Object.entries(effects).forEach(([key, change]) => {
    const current = stats[key] ?? 0;
    if (key === "money") {
      stats[key] = Math.max(0, Math.min(999, Math.round(current + change)));
      return;
    }
    let adjusted = change;
    if (change > 0) {
      const multiplier = current >= 90 ? 0.1 : current >= 80 ? 0.25 : current >= 70 ? 0.45 : current >= 60 ? 0.7 : 1;
      adjusted = Math.max(1, Math.round(change * multiplier));
    }
    stats[key] = Math.max(0, Math.min(95, Math.round(current + adjusted)));
  });
}

function getAdjustedActionEffects(action) {
  const repeated = state?.balance?.lastActionId === action.id ? state.balance.repeatCount : 0;
  const repeatMultiplier = repeated >= 2 ? 0.4 : repeated === 1 ? 0.7 : 1;
  return Object.fromEntries(Object.entries(action.effects).map(([key, value]) => [key, value > 0 ? Math.max(1, Math.round(value * repeatMultiplier)) : value]));
}

function updateActionStreak(actionId) {
  if (state.balance.lastActionId === actionId) state.balance.repeatCount += 1;
  else {
    state.balance.lastActionId = actionId;
    state.balance.repeatCount = 1;
  }
}

function applyMonthlyPressure(action) {
  const cared = new Set(ACTION_CARE[action.id] ?? []);
  const effects = {};
  CORE_STATS.forEach((key) => {
    if (!cared.has(key)) effects[key] = key === "study" || key === "health" || key === "mood" ? -2 : -1;
    if (state.stats[key] >= 78) effects[key] = (effects[key] ?? 0) - 1;
  });
  if (!cared.has("money") && state.stats.money > 0) {
    effects.money = -1;
    recordMoneyChange(-1, "本月日常小支出");
  }
  applyToStats(state.stats, effects);
}

function createStatBands(stats) {
  return Object.fromEntries(CORE_STATS.map((key) => [key, getStatBand(stats[key])]));
}

function getStatBand(value) {
  if (value <= 30) return "low";
  if (value >= 80) return "high";
  return "normal";
}

function detectThresholdScene() {
  const changed = [];
  CORE_STATS.forEach((key) => {
    const band = getStatBand(state.stats[key]);
    if (band !== state.balance.statBands[key]) changed.push({ key, band });
    state.balance.statBands[key] = band;
  });
  const threshold = changed.find((item) => item.band !== "normal");
  return threshold ? createThresholdScene(threshold.key, threshold.band) : null;
}

function createThresholdScene(key, band) {
  if (isWorkingLife()) return createWorkThresholdScene(key, band);
  const scenes = {
    study: {
      low: { icon: "📉", title: "功课开始跟不上", story: "连续几次作业和测验都出现大片空白。老师没有立刻批评，而是要求你这周必须决定怎么补救。", choices: [
        { label: "接受课后补习，先补最薄弱的一科", effects: { study: 7, mood: -2 }, result: "进度没有一夜追平，但你终于知道第一处漏洞在哪里。" },
        { label: "请同学帮忙整理错题和重点", effects: { study: 5, social: 2 }, result: "有人陪着重新梳理后，那些看不懂的红叉不再只是压力。" }
      ] },
      high: { icon: "🧠", title: "成绩进入年级前列", story: "老师开始把更难的题和竞赛信息单独交给你，但也提醒你：保持领先会持续占用休息时间。", choices: [
        { label: "接下挑战，争取更高的平台", effects: { study: 3, health: -3, mood: -1 }, result: "新的题目难得多，原来高分之后还有更陡的坡。" },
        { label: "维持课程进度，把时间分给生活", effects: { mood: 4, health: 2 }, result: "你没有继续加码，而是保住了一个仍能呼吸的日程。" }
      ] }
    },
    health: {
      low: { icon: "🏥", title: "身体发出警报", story: "早晨起床时头晕和心悸没有消失，校医明确要求你暂停高强度安排。健康恢复前，一些行动将无法进行。", choices: [
        { label: "请假检查，完整休息几天", effects: { health: 9, study: -3 }, result: "缺下的课需要以后补，但身体终于不再硬撑。" },
        { label: "减少任务，并请家人监督作息", effects: { health: 7, family: 3 }, result: "生活节奏慢下来，家里也开始认真看待你的疲惫。" }
      ] },
      high: { icon: "🏅", title: "体能成了明显优势", story: "体育老师发现你的耐力远高于同龄人，邀请你参加校队测试，但训练会固定占用每周时间。", choices: [
        { label: "参加校队测试", effects: { health: 2, social: 4, study: -2 }, result: "训练表贴上墙后，体能开始变成一份需要承担的承诺。" },
        { label: "暂不加入，把运动当作自己的节奏", effects: { mood: 3, health: 1 }, result: "你保留了运动的自由，也没有让日程再多一项硬指标。" }
      ] }
    },
    mood: {
      low: { icon: "🌧️", title: "什么都不太想做", story: "喜欢的事也失去了吸引力，早晨想到新的一天只觉得沉重。继续硬推计划只会让状态更差。", choices: [
        { label: "主动告诉家人最近真的很难受", effects: { mood: 8, family: 4 }, result: "问题没有立刻消失，但你不再独自装作一切正常。" },
        { label: "减少安排，给自己一个没有目标的周末", effects: { mood: 9, study: -3 }, result: "没有完成任务的一天，反而让你重新感到一点想做事的力气。" }
      ] },
      high: { icon: "🌤️", title: "最近很有生命力", story: "你连续一段时间状态很好，周围的人也更愿意靠近你。班里有人邀请你帮助策划一次集体活动。", choices: [
        { label: "把好状态分给身边的人", effects: { social: 5, mood: -2 }, result: "活动并不完美，但你的热情真的让几个人走到了一起。" },
        { label: "不接新任务，珍惜现在的轻松", effects: { health: 3, mood: 2 }, result: "你没有把每一份好状态都兑换成成果。" }
      ] }
    },
    social: {
      low: { icon: "🪑", title: "渐渐被落在圈子外", story: "小组名单和周末邀约里越来越少出现你的名字。再不主动建立联系，一些合作型机会会对你关闭。", choices: [
        { label: "从一个熟悉的同学开始主动联系", effects: { social: 7, mood: 2 }, result: "一句普通的问候没有立刻改变关系，却打开了一条可以继续走的路。" },
        { label: "参加一次有明确任务的小组活动", effects: { social: 6, study: 2 }, result: "有具体事情可做时，开口比纯粹聊天容易得多。" }
      ] },
      high: { icon: "🤝", title: "大家开始信任你", story: "同学遇到争执或需要组织事情时会先来找你。被信任很珍贵，也意味着别人的麻烦会占用你的时间。", choices: [
        { label: "承担一次协调工作", effects: { social: 3, mood: -2, study: -1 }, result: "你处理了分歧，也发现受欢迎和讨好所有人不是一回事。" },
        { label: "只帮助真正紧急的事", effects: { mood: 3, social: 1 }, result: "你开始给关系设边界，信任没有因此消失。" }
      ] }
    },
    family: {
      low: { icon: "🚪", title: "家里开始像陌生人的住处", story: "饭桌上的交流只剩提醒和回应。一次很小的误会引发争吵，暴露出已经积累很久的疏远。", choices: [
        { label: "先承认自己最近一直在躲避交流", effects: { family: 8, mood: -2 }, result: "谈话并不轻松，但争吵终于触碰到真正的问题。" },
        { label: "从一起完成一件家务开始", effects: { family: 6, health: 1 }, result: "没有长篇谈心，关系先在具体的小事里松动。" }
      ] },
      high: { icon: "🏠", title: "家成了稳定的后盾", story: "最近无论学校顺利还是失控，你都愿意回家说出来。家人也开始认真询问你的想法，而不是只替你决定。", choices: [
        { label: "和家人一起讨论下一阶段计划", effects: { family: 2, study: 3 }, result: "意见仍有不同，但计划第一次同时写进了你和家人的考虑。" },
        { label: "安排一次不谈成绩的家庭活动", effects: { family: 3, mood: 4, money: -4 }, result: "这一天没有解决未来，却留下了一段以后会想起的普通记忆。" }
      ] }
    }
  };
  return { id: createId(), ...scenes[key][band] };
}

function getActionLockReason(action) {
  if (state.stats.health < 25 && ["study", "language", "coursework", "activity", "work", "skill", "job-search"].includes(action.id)) return "健康过低，必须先恢复身体";
  if (state.stats.mood < 25 && ["study", "language", "coursework", "activity", "work"].includes(action.id)) return "心情过低，暂时无法承担高压行动";
  if (state.stats.social < 25 && action.id === "activity") return "人缘过低，暂时无法加入合作项目";
  return null;
}

function isWorkingLife() {
  return ["dropout", "work"].includes(state.education.track);
}

function createWorkThresholdScene(key, band) {
  const scenes = {
    study: {
      low: { icon: "🧾", title: "工作里的错误开始变多", story: "最近你经常记错流程和数字，主管已经提醒了两次。没有考试分数，但工作会直接用返工和收入评价能力。", choices: [
        { label: "下班后重新学习岗位流程", effects: { study: 7, health: -2 }, result: "你把容易出错的步骤写成清单，下一班终于没有再返工。" },
        { label: "请经验丰富的同事现场带一遍", effects: { study: 5, social: 3 }, result: "有人愿意教你，但也明确说以后要自己记住。" }
      ] },
      high: { icon: "📈", title: "你比同批新人上手更快", story: "复杂任务开始优先交给你，主管也提到内部技能考核。能力能带来机会，也可能只带来更多工作。", choices: [
        { label: "报名技能考核，争取岗位升级", effects: { study: 3, money: 6, health: -2 }, result: "你拿到更难的任务和一小笔补贴，责任也随之增加。" },
        { label: "先稳定当前岗位，不急着加码", effects: { mood: 3, health: 2 }, result: "你没有把每一份能力都立刻换成工作量。" }
      ] }
    },
    health: {
      low: { icon: "🏥", title: "身体撑不住排班了", story: "连续站立、夜班和通勤积累成明显的不适。继续硬撑可能意味着更长时间无法工作。", choices: [
        { label: "请假检查并完整休息", effects: { health: 9, money: -5 }, result: "少了一部分收入，但身体终于获得真正的恢复时间。" },
        { label: "申请调班，暂时减少高强度工作", effects: { health: 7, social: -1 }, result: "同事替你分担了班次，你也欠下了一份以后要还的人情。" }
      ] },
      high: { icon: "💪", title: "你的体力在岗位上很突出", story: "主管开始默认你能接更多重活和加班。体能是优势，但不是无限供应的免费资源。", choices: [
        { label: "接一次高补贴班次", effects: { money: 10, health: -4 }, result: "收入增加了，疲惫也真实地留在身体里。" },
        { label: "拒绝固定加班，保持当前节奏", effects: { health: 2, mood: 3 }, result: "你没有让一次优势变成永久义务。" }
      ] }
    },
    mood: {
      low: { icon: "🌧️", title: "下班后只剩麻木", story: "工作、通勤和账单挤掉了期待。你开始在闹钟响起前就感到疲惫。", choices: [
        { label: "请一天假，把状态告诉家人", effects: { mood: 8, family: 3, money: -3 }, result: "现实压力还在，但你没有继续假装毫无感觉。" },
        { label: "暂时减少额外班次，恢复生活节奏", effects: { mood: 9, money: -5 }, result: "收入少了一点，晚上的时间却重新属于你。" }
      ] },
      high: { icon: "🌤️", title: "最近的生活有了盼头", story: "你不再只是熬过每一个班次，也开始能规划工资之外的时间。好状态让同事更愿意与你合作。", choices: [
        { label: "组织一次下班后的简单聚餐", effects: { social: 4, mood: 2, money: -5 }, result: "一顿普通的饭让几张工位旁的脸变成了具体的人。" },
        { label: "把时间留给自己的兴趣", effects: { mood: 3, health: 2 }, result: "工作没有占满整个人生，这种感觉难得而清楚。" }
      ] }
    },
    social: {
      low: { icon: "🧍", title: "你在工作里越来越孤立", story: "换班消息、岗位机会和同事互助很少再有人主动告诉你。社会关系不足会直接限制下一份工作的入口。", choices: [
        { label: "从主动帮一次忙开始修复关系", effects: { social: 7, health: -1 }, result: "一次具体的配合比勉强寒暄更有效。" },
        { label: "联系以前认识的人，重新建立往来", effects: { social: 6, mood: 2 }, result: "几条消息没有立刻带来机会，却让关系重新流动起来。" }
      ] },
      high: { icon: "🤝", title: "同行开始愿意给你机会", story: "有人主动把临时项目和招聘消息发给你。人脉开始产生价值，也会带来需要判断真假的邀请。", choices: [
        { label: "接触一个更好的岗位机会", effects: { social: 2, study: 3, mood: -1 }, result: "你拿到一次面谈，不保证成功，但职业道路多了一个出口。" },
        { label: "维持关系，不急着跳槽", effects: { social: 2, mood: 2 }, result: "你留下了联系，也避免在准备不足时贸然改变。" }
      ] }
    },
    family: {
      low: { icon: "🚪", title: "工资和家事变成争吵", story: "你很少解释工作的疲惫，家人也只看见你越来越晚回去。一次关于钱的小事引爆了积累已久的误解。", choices: [
        { label: "把收入、压力和真实安排讲清楚", effects: { family: 8, mood: -2 }, result: "谈话并不温柔，但家里终于知道你正在面对什么。" },
        { label: "先承担一件具体家事", effects: { family: 6, health: -1 }, result: "关系没有靠道理修好，而是先从一件做完的小事开始。" }
      ] },
      high: { icon: "🏠", title: "家人成了社会生活的后盾", story: "换工作、收入波动或被批评时，你愿意回家说出来。家人未必能解决问题，却能让你不必独自承担。", choices: [
        { label: "一起讨论下一年的收入和计划", effects: { family: 3, study: 2 }, result: "计划第一次同时考虑了现实收入和你真正想走的方向。" },
        { label: "用一部分收入安排家庭活动", effects: { family: 4, mood: 3, money: -6 }, result: "钱花掉了，却留下了一段不围绕工作展开的时间。" }
      ] }
    }
  };
  return { id: createId(), ...scenes[key][band] };
}

function getConditionLabel() {
  const critical = CORE_STATS.filter((key) => state.stats[key] <= 30).map((key) => `${STAT_META[key].name}低迷`);
  const strong = CORE_STATS.filter((key) => state.stats[key] >= 80).map((key) => `${STAT_META[key].name}突出`);
  return critical[0] ?? strong[0] ?? "整体平稳";
}

function getUnmetRequirements(requirements) {
  if (!requirements) return [];
  return Object.entries(requirements).filter(([key, value]) => (state.stats[key] ?? 0) < value);
}

function formatRequirements(requirements) {
  return Object.entries(requirements ?? {}).map(([key, value]) => `${STAT_META[key].name}≥${value}`).join("、");
}

function saveGame() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !saved.character || !saved.stats || !Array.isArray(saved.memories)) return null;
    if (!saved.character.identity) saved.character.identity = "boy";
    const previousStory = saved.character.story;
    let backgroundRepaired = false;
    const familyProfile = BACKGROUND_DATA.families.find((family) => family.name === saved.character.family?.name);
    if (familyProfile) {
      saved.character.family = { ...familyProfile };
      if (!familyProfile.parents.includes(saved.character.parent)) {
        saved.character.parent = pick(familyProfile.parents);
        backgroundRepaired = true;
      }
      if (!familyProfile.schools.includes(saved.character.school)) {
        saved.character.school = pick(familyProfile.schools);
        backgroundRepaired = true;
      }
    }
    if (!saved.character.story || backgroundRepaired || (saved.version ?? 1) < 4) saved.character.story = buildOriginStory(saved.character);
    if (backgroundRepaired && previousStory) {
      saved.memories = saved.memories.map((memory) => memory.text === previousStory ? { ...memory, text: saved.character.story } : memory);
    }
    saved.version = 7;
    saved.education ??= { route: "undecided", track: saved.turn < 30 ? "middle-school" : "academic", exitTurn: null };
    saved.friends ??= [];
    saved.projects ??= [];
    saved.projects = saved.projects.map((project) => ({ phase: 1, quality: 0, status: "active", notes: [], ...project }));
    saved.economy ??= { savingsGoal: null, ledger: [] };
    saved.economy.ledger ??= [];
    saved.economy.chanceHistory ??= [];
    saved.economy.lottery ??= { tickets: 0, spent: 0, won: 0, bestPrize: 0 };
    saved.balance ??= { lastActionId: null, repeatCount: 0, statBands: createStatBands(saved.stats) };
    saved.balance.statBands ??= createStatBands(saved.stats);
    saved.pendingScenes ??= saved.pendingScene ? [saved.pendingScene] : [];
    delete saved.pendingScene;
    if (backgroundRepaired && saved.pendingScenes[0]?.title === "开学前夜") {
      saved.pendingScenes[0] = createOpeningScene(saved.character);
    }
    if (saved.pendingEventId) {
      const oldEvent = EVENTS.find((event) => event.id === saved.pendingEventId);
      if (oldEvent) saved.pendingScenes.push(oldEvent);
      delete saved.pendingEventId;
    }
    return saved;
  } catch {
    return null;
  }
}

function getAvailableActions() {
  let actions;
  if (["dropout", "work"].includes(state.education.track)) actions = WORK_ACTIONS;
  else if (state.education.route === "international" && state.turn >= 20) actions = INTERNATIONAL_ACTIONS;
  else actions = SCHOOL_ACTIONS;
  const activeProject = state.projects.find((project) => project.status === "active");
  return actions.map((action) => action.id === "activity" && activeProject
    ? { ...action, name: `推进「${activeProject.name}」`, note: getProjectPhaseLabel(activeProject.phase) }
    : action);
}

function getRouteLabel() {
  const { route, track } = state.education;
  if (["dropout", "work"].includes(track)) return "社会生存";
  if (route === "international") return "国际升学";
  if (track === "vocational") return "职业教育";
  if (track === "university") return "大学";
  if (route === "domestic") return "国内升学";
  return "尚未决定";
}

function formatEffectSummary(effects) {
  return Object.entries(effects)
    .map(([key, value]) => `${STAT_META[key].name}${value > 0 ? "+" : ""}${value}`)
    .join(" · ");
}

function createActionScene(action) {
  if (action.id === "friends") return createFriendshipScene();
  if (action.id === "activity") return createProjectActionScene();
  if (action.id === "finances") return createMoneyScene();
  if (action.id === "luck") return createLuckScene();
  if (isWorkingLife() && action.id === "family") return createWorkFamilyScene();
  if (isWorkingLife() && action.id === "rest") return createWorkRestScene();

  const scenesByAction = {
    study: [
      { icon: "📐", title: "一道没人解出的题", story: "数学课快结束时，黑板上还留着一道难题。老师问有没有人愿意试试。", choices: [
        { label: "举手讲出自己的思路", effects: { study: 5, social: 2 }, result: "答案并不完美，但老师肯定了你的推理过程。" },
        { label: "记下来，放学后独自研究", effects: { study: 4, mood: 1 }, result: "傍晚终于解出来时，那份成就感只属于你。" }
      ] },
      { icon: "📖", title: "晚自习的最后十分钟", story: "教室里只剩翻书声。你还有一章没有复习，但脑袋已经发沉。", choices: [
        { label: "集中精神完成最后一章", effects: { study: 4, health: -1 }, result: "你带着完整的笔记离开教室，虽然有些疲惫。" },
        { label: "收拾书包，保证今晚睡眠", effects: { health: 3, mood: 2 }, result: "休息让第二天的课堂变得清晰许多。" }
      ] }
    ],
    exercise: [
      { icon: "🏀", title: "球场还缺一个人", story: "体育课自由活动时，隔壁班正在组队比赛，正好还缺最后一个位置。", choices: [
        { label: "加入比赛，全力打一场", effects: { health: 5, social: 3 }, result: "你们输了一分，却记住了彼此的名字。" },
        { label: "在操场慢跑，按自己的节奏来", effects: { health: 4, mood: 2 }, result: "没有观众，也没有输赢，呼吸慢慢变得平稳。" }
      ] }
    ],
    hobby: [
      { icon: "🎸", title: "被看见的作品", story: "你随手完成的作品被同学发现，对方建议你报名学校的展示活动。", choices: [
        { label: "报名，让更多人看到", effects: { mood: 4, social: 3 }, result: "站在作品旁接受目光时，你紧张，也第一次感到骄傲。" },
        { label: "暂时不报名，继续为自己创作", effects: { mood: 4, study: 1 }, result: "没有掌声，但你保留了不被打扰的快乐。" }
      ] }
    ],
    family: [
      { icon: "🍜", title: "回家时亮着的灯", story: `${state.character.parent}。今晚回家后，厨房里还留着一碗热汤。`, choices: [
        { label: "坐下来聊聊最近的学校生活", effects: { family: 5, mood: 2 }, result: "家人没有给出完美答案，但认真听完了你的话。" },
        { label: "默默吃完，再把厨房收拾好", effects: { family: 4, health: 1 }, result: "第二天桌上多了一份你爱吃的早餐。" }
      ] }
    ],
    rest: [
      { icon: "🌙", title: "没有安排的晚上", story: "作业已经完成，消息也暂时安静下来。今晚难得没有任何人催促你。", choices: [
        { label: "早点睡，让身体真正休息", effects: { health: 5, mood: 2 }, result: "第二天醒来时，窗外的光显得格外清楚。" },
        { label: "看喜欢的内容到深夜", effects: { mood: 4, health: -3 }, result: "夜晚很自由，清晨却来得太快。" }
      ] }
    ],
    language: [
      { icon: "🗣️", title: "第一次全英文展示", story: "老师要求你独自完成五分钟英文演讲，台下坐着全班同学。", choices: [
        { label: "脱稿完成，即使可能说错", effects: { study: 5, social: 3 }, result: "你卡顿了几次，却真的靠自己讲完了。" },
        { label: "准备完整讲稿，稳妥完成", effects: { study: 4, mood: 1 }, result: "演讲很顺利，你也记下了下次想突破的地方。" }
      ] }
    ],
    coursework: [
      { icon: "🔬", title: "小组项目失去方向", story: "国际课程的小组项目临近截止，成员们却对主题争执不下。", choices: [
        { label: "主动整理意见并推进分工", effects: { study: 4, social: 4 }, result: "项目终于向前走，你也第一次体会到领导的压力。" },
        { label: "做好自己负责的部分", effects: { study: 5, social: -1 }, result: "你的部分很扎实，但小组合作留下了一点遗憾。" }
      ] }
    ],
    activity: [
      { icon: "🎭", title: "活动名单上的空位", story: "学校正在招募活动负责人，这段经历可能写进未来的申请材料。", choices: [
        { label: "报名负责人", effects: { social: 5, study: 2, mood: -1 }, result: "事情比想象中琐碎，但你真正组织成了一次活动。" },
        { label: "只做普通参与者", effects: { mood: 4, social: 2 }, result: "少一些压力，也有足够空间享受过程。" }
      ] }
    ],
    work: [
      { icon: "🧰", title: "临时增加的夜班", story: "主管问你能不能留下来加班。工资会多一些，但明早还要继续上工。", choices: [
        { label: "留下加班", effects: { money: 15, health: -5 }, result: "钱装进口袋时很踏实，回家路上却几乎睁不开眼。" },
        { label: "拒绝，保住今晚的休息", effects: { health: 4, mood: 2, social: -1 }, result: "你按时回家，也开始学习为自己划清边界。" }
      ] }
    ],
    skill: [
      { icon: "🛠️", title: "师傅愿意多教一点", story: "一位经验丰富的师傅看出你肯学，愿意在下班后教你更难的技术。", choices: [
        { label: "留下认真学", effects: { study: 6, health: -2 }, result: "手上的茧多了一点，能做的事情也多了一点。" },
        { label: "先把基础工作做好", effects: { money: 4, mood: 1 }, result: "你没有冒进，但把当前岗位做得更稳。" }
      ] }
    ],
    network: [
      { icon: "🤝", title: "同行聚餐", story: "同事邀请你参加一次同行聚餐，据说会有几位能介绍工作机会的人。", choices: [
        { label: "去认识一些人", effects: { social: 6, money: -3 }, result: "你记下了几个名字，也让别人记住了你。" },
        { label: "不去，把钱和时间省下来", effects: { money: 3, health: 2 }, result: "这是一个安静的晚上，机会也许还会再来。" }
      ] }
    ],
    "job-search": [
      { icon: "📄", title: "一份要求更高的招聘", story: "你看到一份待遇更好的招聘，但其中几项要求并不完全符合。", choices: [
        { label: "仍然投递并认真准备", effects: { study: 3, mood: 2 }, result: "你得到了面试机会，第一次认真讲述自己的工作经历。" },
        { label: "先补足能力再考虑", effects: { study: 4, money: -1 }, result: "机会暂时过去，但你明确了下一步要学什么。" }
      ] }
    ]
  };
  return pick(scenesByAction[action.id] ?? scenesByAction.rest);
}

function createExtraScene() {
  if (["dropout", "work"].includes(state.education.track)) return generateLifeScene(state.character);
  return Math.random() < 0.5 ? pick(EVENTS) : generateLifeScene(state.character);
}

function createProjectActionScene() {
  const activeProject = state.projects.find((project) => project.status === "active");
  if (!activeProject) return createProjectRecruitmentScene();
  if (activeProject.phase <= 2) return createProjectConflictScene(activeProject);
  if (activeProject.phase === 3) return createProjectExecutionScene(activeProject);
  return createProjectFinalScene(activeProject);
}

function createProjectRecruitmentScene() {
  const template = pick(PROJECT_TEMPLATES);
  const collaborator = generateFriend();
  const baseProject = {
    id: createId(), templateName: template.name, name: template.name, icon: template.icon,
    goal: template.goal, deliverable: template.deliverable, collaborator,
    role: "member", phase: 1, quality: 0, status: "active", notes: [], startedAt: getStage(state.turn).label
  };
  const leaderProject = { ...baseProject, role: "leader" };
  const memberProject = { ...baseProject, role: "member" };
  return {
    id: createId(), icon: template.icon, title: `${template.name}正在招募`,
    story: `学校公布了“${template.name}”计划：${template.goal}，最后要完成${template.deliverable}。${collaborator.name}${collaborator.trait}，在报名表前问你：“要不要一起？”`,
    choices: [
      {
        label: "报名负责人，把事情真正组织起来", requires: { social: 55, health: 40 }, effects: { social: 3, study: 2, mood: -1 },
        special: { type: "startProject", project: leaderProject },
        followUps: [createProjectKickoffScene(leaderProject, template)],
        result: `你在负责人一栏写下名字。${collaborator.name}加入了小组，但进度、分工和最终结果都开始落到你肩上。`
      },
      {
        label: `和${collaborator.name}一起做普通成员`, effects: { social: 3, mood: 2 },
        special: { type: "startProject", project: memberProject },
        followUps: [createProjectKickoffScene(memberProject, template)],
        result: `你加入了项目组，主要和${collaborator.name}搭档。名字写进名单只是开始，接下来每个月都可能出问题。`
      },
      { label: "这次不参加，把时间留给别的事", effects: { mood: 1 }, result: "你合上报名表。走廊里很快又有人填上了那个空位。" }
    ]
  };
}

function createProjectKickoffScene(project, template = findProjectTemplate(project)) {
  return {
    id: createId(), icon: "🗂️", title: `${project.name} · 第一次会议`,
    story: `${template.kickoff}${project.collaborator.name}把笔记本推到桌子中间，等着大家决定第一步。`,
    choices: [
      {
        label: "先确认目标，再把任务拆到每个人", effects: { study: 3, social: 2 },
        special: { type: "updateProject", projectId: project.id, phase: 2, qualityDelta: 3, note: "第一次会议明确了目标与分工" },
        result: "会议没有那么热闹，但每个人离开时都知道下周要带回什么。"
      },
      {
        label: "先做一个小样，边做边确定方向", effects: { mood: 2, study: 2 },
        special: { type: "updateProject", projectId: project.id, phase: 2, qualityDelta: 2, note: "先用小样验证了方向" },
        result: "一个并不精致的小样在桌上诞生，抽象的想法终于有了形状。"
      }
    ]
  };
}

function createProjectConflictScene(project) {
  const template = findProjectTemplate(project);
  return {
    id: createId(), icon: "⚠️", title: `${project.name} · 进度失控`, story: template.conflict,
    choices: project.role === "leader" ? [
      {
        label: "暂停争论，重新分配任务和截止时间", effects: { social: 3, study: 2, mood: -2 },
        special: { type: "updateProject", projectId: project.id, phase: 3, qualityDelta: 3, note: "在冲突中重排了任务" },
        followUps: [createProjectIncidentScene(project, "coordinate")],
        result: "有人觉得你太强硬，但混乱的任务表终于重新开始运转。"
      },
      {
        label: "把最危险的部分接过来，自己补上", effects: { study: 4, health: -3, social: -1 },
        special: { type: "updateProject", projectId: project.id, phase: 3, qualityDelta: 2, note: "独自补上了进度缺口" },
        followUps: [createProjectIncidentScene(project, "solo")],
        result: "进度暂时追了回来，但深夜里只有你的头像还亮着。"
      }
    ] : [
      {
        label: `先和${project.collaborator.name}把自己的部分救回来`, effects: { study: 3, social: 3 },
        special: { type: "updateProject", projectId: project.id, phase: 3, qualityDelta: 3, note: `和${project.collaborator.name}稳住了核心任务` },
        followUps: [createProjectIncidentScene(project, "partner")],
        result: "你们没有解决所有矛盾，却先做出了一块别人可以接着用的成果。"
      },
      {
        label: "在群里直接指出负责人的安排有问题", effects: { social: -2, study: 3, mood: 1 },
        special: { type: "updateProject", projectId: project.id, phase: 3, qualityDelta: 1, note: "公开质疑了原来的安排" },
        followUps: [createProjectIncidentScene(project, "challenge")],
        result: "问题被摆到台面上，群聊却安静了很久。接下来的合作开始变得微妙。"
      }
    ]
  };
}

function createProjectIncidentScene(project, approach) {
  const template = findProjectTemplate(project);
  const opening = approach === "solo" ? "你独自补进度的那天，" : approach === "partner" ? `你和${project.collaborator.name}继续执行时，` : "重新开工后的第三天，";
  return {
    id: createId(), icon: "🔎", title: `${project.name} · 计划之外`, story: `${opening}${template.incident}`,
    choices: [
      {
        label: "停下来处理这件具体问题", effects: { social: 2, study: 2, mood: -1 },
        special: { type: "updateProject", projectId: project.id, phase: 3, qualityDelta: 2, note: "认真处理了一次计划外事件" },
        result: "这耽误了原定进度，却补上了项目原先没有看见的一块现实。"
      },
      {
        label: "先保证主线进度，把它记进待办", effects: { study: 2, mood: 1 },
        special: { type: "updateProject", projectId: project.id, phase: 3, qualityDelta: 1, note: "优先保住了主线进度" },
        result: "项目按计划继续，但那件没有彻底解决的事一直留在小组待办里。"
      }
    ]
  };
}

function createProjectExecutionScene(project) {
  return {
    id: createId(), icon: "🧱", title: `${project.name} · 最后一轮制作`,
    story: `${project.deliverable}已经有了雏形。${project.collaborator.name}发现最关键的一部分还经不起现场检验，而提交日期就在下周。`,
    choices: [
      {
        label: "删掉不可靠的部分，把核心打磨完整", effects: { study: 4, mood: -1 },
        special: { type: "updateProject", projectId: project.id, phase: 4, qualityDelta: 3, note: "缩小范围并完成可靠版本" },
        result: "最终版本没有最初设想得庞大，却能把每一处细节讲清楚。"
      },
      {
        label: "保留完整构想，熬夜把所有部分拼起来", effects: { study: 3, health: -4, mood: -2 },
        special: { type: "updateProject", projectId: project.id, phase: 4, qualityDelta: 2, note: "冒险保留了完整构想" },
        result: "凌晨两点，最后一个文件终于传进共享盘。没人知道现场会不会出错。"
      }
    ]
  };
}

function createProjectFinalScene(project) {
  const strong = project.quality >= 8;
  return {
    id: createId(), icon: "🏁", title: `${project.name} · 正式结项`,
    story: strong
      ? `${project.deliverable}在现场顺利完成。评审追问了几个细节，${project.collaborator.name}看向你，示意由你回答。`
      : `展示当天还是出现了遗漏，但${project.deliverable}终于被摆在真实观众面前。${project.collaborator.name}小声说：“至少我们做完了。”`,
    choices: [
      {
        label: "如实讲清成果，也讲清失败和修改过程", requires: { study: 50 }, effects: strong ? { study: 5, social: 5, mood: 4 } : { study: 4, social: 2, mood: 2 },
        special: { type: "completeProject", projectId: project.id, qualityDelta: 1 },
        result: strong ? "项目获得了优秀评价。真正被记住的，不只是成品，还有你们如何解决那些失控的时刻。" : "结果不算耀眼，但评审认可了你们对问题的诚实复盘。这个项目完整地留在了经历里。"
      },
      {
        label: "把台前机会让给搭档，自己负责现场保障", effects: { social: 4, mood: 3, study: 2 },
        special: { type: "completeProject", projectId: project.id, qualityDelta: 0 },
        result: `${project.collaborator.name}完成了陈述。散场后，对方在人群里找到你，认真说这次合作不能只算自己的功劳。`
      }
    ]
  };
}

function findProjectTemplate(project) {
  return PROJECT_TEMPLATES.find((template) => template.name === project.templateName || template.name === project.name) ?? PROJECT_TEMPLATES[0];
}

function getProjectPhaseLabel(phase) {
  return ({ 1: "召开第一次会议", 2: "解决团队与进度问题", 3: "完成最后一轮制作", 4: "展示成果并正式结项" })[phase] ?? "继续推进项目";
}

function createLuckScene() {
  const age = getStage(state.turn).age;
  if (isWorkingLife() && age < 18) return createMysteryMarketScene();
  if (age < 18) return Math.random() < 0.55 ? createSchoolRaffleScene() : createMysteryMarketScene();
  return Math.random() < 0.7 ? createLotteryScene() : createMysteryMarketScene();
}

function createLotteryScene() {
  const ticketPrice = 5;
  const roll = Math.random();
  const prize = roll < 0.62 ? 0 : roll < 0.88 ? 5 : roll < 0.98 ? 20 : 100;
  const result = prize === 0
    ? "号码一个也没对上。五元钱换来的是一张很快失去价值的纸。"
    : prize === ticketPrice
      ? "中了五元，刚好拿回票钱。这次没有赚，也没有亏。"
      : prize === 20
        ? "店员核对后递给你二十元。一次小概率的好运真的发生了。"
        : "最后一个图案刮开时，奖金是一百元。周围的人都凑过来看，你却知道这不代表下一张也会中奖。";
  return {
    id: createId(), icon: "🎫", title: "彩票店里的五元选择",
    story: "你已经成年。路过彩票店时，柜台上写着“理性购彩，量力而行”。一张即开票五元，结果完全随机，而且这次结果会随事件写进存档，刷新也不会重抽。",
    choices: [
      {
        label: "花 5 元买一张，只买这一次", requires: { money: ticketPrice },
        effects: { money: prize - ticketPrice, mood: prize > ticketPrice ? 5 : prize === ticketPrice ? 1 : -2 },
        special: { type: "recordLottery", stake: ticketPrice, prize }, result
      },
      { label: "看看就走，把五元留在口袋里", effects: { mood: 1 }, result: "你离开柜台。没有开奖的刺激，也没有损失，这同样是一次确定的选择。" }
    ]
  };
}

function createSchoolRaffleScene() {
  const ticketPrice = 3;
  const roll = Math.random();
  const outcome = roll < 0.5
    ? { effects: { money: -ticketPrice, mood: -1 }, prize: 0, result: "号码没有被念到。抽奖券变成了一张普通的小纸片。" }
    : roll < 0.82
      ? { effects: { money: -ticketPrice, mood: 3 }, prize: 3, result: "你抽中一袋零食。按价值差不多回本，但开心比价格更直接。" }
      : roll < 0.97
        ? { effects: { money: 7, mood: 4 }, prize: 10, result: "你抽中了十元书店券，扣掉抽奖券后还算一次小收获。" }
        : { effects: { money: 27, mood: 6, social: 3 }, prize: 30, result: "你的号码竟然是一等奖：三十元书店券。班里好几个人都跑来确认。" };
  return {
    id: createId(), icon: "🎟️", title: "校园义卖的随机抽奖",
    story: "你还未满十八岁，不能购买彩票。校园义卖倒是设置了三元一次的公益抽奖，奖品从零食到书店券不等，收入会进入公益项目。",
    choices: [
      {
        label: "花 3 元抽一次", requires: { money: ticketPrice }, effects: outcome.effects,
        special: { type: "recordChance", name: "校园义卖抽奖", stake: ticketPrice, prize: outcome.prize }, result: outcome.result
      },
      { label: "直接捐一元，不参加抽奖", requires: { money: 1 }, effects: { money: -1, mood: 2 }, special: { type: "recordChance", name: "校园义卖捐款", stake: 1, prize: 0 }, result: "你没有拿抽奖券，只把一元放进捐款箱。结果不随机，去向却很清楚。" }
    ]
  };
}

function createMysteryMarketScene() {
  const price = 6;
  const roll = Math.random();
  const outcome = roll < 0.55
    ? { effects: { money: -price, mood: -2 }, prize: 0, result: "袋子里是几件用不上、也很难转卖的小东西。这次好奇心花掉了六元。" }
    : roll < 0.86
      ? { effects: { money: -price, study: 3, mood: 2 }, prize: 6, result: "里面有一本旧书和一套还能用的画笔。很难说赚了钱，但确实没有白拿。" }
      : roll < 0.98
        ? { effects: { money: 9, mood: 4 }, prize: 15, result: "你发现一枚有人收集的旧徽章，转手卖了十五元，扣掉成本净赚九元。" }
        : { effects: { money: 34, mood: 6 }, prize: 40, result: "袋底是一款已经停产的小模型。收藏者愿意出四十元收走它，这次运气少见地站在你这边。" };
  return {
    id: createId(), icon: "🛍️", title: "旧物市集的神秘袋",
    story: "旧物摊主把没有分类的小物件装进纸袋，每袋六元。可能是垃圾、可能刚好有用，也可能藏着能转卖的东西；袋子一旦选定，刷新页面也不会改变内容。",
    choices: [
      {
        label: "花 6 元买一个神秘袋", requires: { money: price }, effects: outcome.effects,
        special: { type: "recordChance", name: "旧物神秘袋", stake: price, prize: outcome.prize }, result: outcome.result
      },
      { label: "不为未知结果花钱", effects: { mood: 1 }, result: "你在摊位前看了一会儿，然后离开。错过可能的惊喜，也避开了确定的成本。" }
    ]
  };
}

function createMoneyScene() {
  const goal = state.economy.savingsGoal;
  if (!goal) return createAllowanceScene();
  if (state.stats.money >= goal.cost) return createGoalPurchaseScene(goal);
  const scenes = [createPocketMoneyEarningScene(goal), createSpendingTemptationScene(goal)];
  if (state.stats.money >= 4) scenes.push(createUnexpectedExpenseScene(goal));
  if (state.stats.money >= 5) scenes.push(createLendingScene(goal));
  return pick(scenes);
}

function createAllowanceScene() {
  const resourceLevel = state.character.family.resourceLevel;
  const allowance = 4 + resourceLevel * 3;
  const spend = Math.min(8, allowance);
  return {
    id: createId(), icon: "🪙", title: "这个月的零花钱",
    story: `${state.character.parent}。家里这个月给了你 ${allowance} 元可以自己安排的钱。对${state.character.family.name}来说，这个数目符合家里目前的生活状况。`,
    choices: [
      {
        label: "先存起来，再决定想买什么", effects: { money: allowance, mood: 1 },
        followUps: [createSavingsGoalScene()],
        result: `你把 ${allowance} 元完整放进零钱盒，第一次认真为一件未来的东西留钱。`
      },
      {
        label: "留下一部分，剩下的买零食和小东西", effects: { money: allowance - spend, mood: 4 },
        result: `你花掉了 ${spend} 元，剩下 ${allowance - spend} 元。快乐很具体，零钱也确实少了一截。`
      }
    ]
  };
}

function createSavingsGoalScene() {
  return {
    id: createId(), icon: "🐷", title: "零钱盒需要一个目标",
    story: "只说“我要存钱”很容易半途花掉。你在纸上列了四件真正想要的东西，只能先选一件。",
    choices: MONEY_GOALS.map((goal) => ({
      label: `${goal.icon} 为${goal.name}攒钱`, effects: {},
      special: { type: "setSavingsGoal", goal },
      result: `目标定下来了：${goal.name}，需要 ${goal.cost} 元。以后每一笔小收入和小消费都会离它更近，或更远。`
    }))
  };
}

function createPocketMoneyEarningScene(goal) {
  const profiles = {
    "small-business": { task: "周末店里临时缺人，家里问你愿不愿意帮忙理货、记账和收拾桌面", amount: 14 },
    intellectual: { task: "家里有一批旧书和资料需要分类，一位熟人也想请你辅导低年级孩子的功课", amount: 12 },
    "dual-income": { task: "邻居出门办事，想请你帮忙照看宠物并取两次快递", amount: 10 },
    "single-parent": { task: "社区活动室需要整理图书和布置座位，完成后会发一点劳务补贴", amount: 9 },
    "migrant-worker": { task: "附近快递点周末需要人帮忙给包裹贴单、分区，但要连续站好几个小时", amount: 11 },
    affluent: { task: "家里不赞成直接多给钱，提出完成一份月度阅读与家务清单后再给奖励", amount: 16 }
  };
  const profile = profiles[state.character.family.id] ?? profiles["dual-income"];
  return {
    id: createId(), icon: "🧹", title: `离“${goal.name}”还差一点`, story: `${profile.task}。这不是固定工资，但可以让零钱盒厚一点。`,
    choices: [
      { label: "把事情认真做完，赚下这笔钱", effects: { money: profile.amount, health: -2, study: 1 }, result: `你用自己的时间换来 ${profile.amount} 元。数额不大，但这笔钱和直接收到时感觉完全不同。` },
      { label: "只处理几件闲置物，在二手平台卖掉", effects: { money: 6, family: 1, mood: 1 }, result: "你和家人确认后卖掉了闲置书和旧文具，得到 6 元，也腾出了一点空间。" }
    ]
  };
}

function createSpendingTemptationScene(goal) {
  const price = Math.min(12, Math.max(6, state.stats.money));
  return {
    id: createId(), icon: "🧋", title: "同学都在买的东西",
    story: `放学后，同学们都在买最近很火的饮料和小挂件，一套刚好 ${price} 元。你想起零钱盒上写着“${goal.name}”。`,
    choices: [
      { label: "今天也想和大家一起买", effects: { money: -price, mood: 5, social: 2 }, result: `你花了 ${price} 元，和大家一起拆包装、拍照片。攒钱进度退了一点，这份参与感却是真的。` },
      { label: "不买，但留下来陪大家聊天", effects: { mood: 1, social: 2 }, result: "没人因为你没买就把你赶走。你发现融入一群人不一定非要花同样的钱。" }
    ]
  };
}

function createUnexpectedExpenseScene(goal) {
  const expense = pick([8, 10, 12]);
  const item = pick(["用了很久的自动铅笔突然坏了", "社团临时要求打印一叠材料", "骑车回家时发现车胎漏气了"]);
  return {
    id: createId(), icon: "🧾", title: "计划外的小支出", story: `${item}，处理好需要 ${expense} 元。你正在为“${goal.name}”攒钱，原来的计划不得不让出一点位置。`,
    choices: [
      { label: "用自己的零花钱解决", effects: { money: -expense, family: 1 }, result: `你付了 ${expense} 元。零钱盒变轻，但第一次感到自己能承担一件具体的小事。` },
      { label: "先告诉家里，商量能不能一起承担", effects: { family: 3, mood: -1, money: -Math.ceil(expense / 2) }, result: `家里承担了一部分，你自己付了 ${Math.ceil(expense / 2)} 元。攒钱慢了，但问题没有变成秘密。` }
    ]
  };
}

function createLendingScene(goal) {
  const friend = state.friends.length ? pick(state.friends) : null;
  const name = friend?.name ?? "同桌";
  const amount = Math.min(10, Math.max(5, state.stats.money));
  return {
    id: createId(), icon: "🤲", title: `${name}开口借钱`,
    story: `${name}说自己忘带饭卡，想借 ${amount} 元，答应下周归还。你身上的钱原本正要存进“${goal.name}”的零钱盒。`,
    choices: [
      {
        label: `借给${name}，把还款时间说清楚`, effects: { money: -amount, social: 2 },
        followUps: [createLoanFollowUp(name, friend?.id, amount)],
        result: `${name}收下钱并认真记下数额。帮助别人和保护自己的边界，第一次同时出现在一笔小钱里。`
      },
      { label: "说明自己也在攒钱，请对方找老师帮忙", effects: { social: -1, mood: 1 }, result: `${name}有点尴尬，但还是去找了老师。你没有做错，只是这次拒绝并不轻松。` }
    ]
  };
}

function createLoanFollowUp(name, friendId, amount) {
  return {
    id: createId(), icon: "📩", title: `${name}来还钱了`,
    story: `一周后，${name}主动找到你，手里拿着借走的 ${amount} 元。对方说这几天一直记着，没有等你开口。`,
    choices: [
      { label: "收回借款，照原计划存起来", effects: { money: amount, social: 2 }, special: friendId ? { type: "adjustFriend", friendId, amount: 4 } : null, result: "钱回到了手里，这次守信也让你更愿意相信对方。" },
      { label: "只收一半，剩下的请对方吃点东西", effects: { money: Math.floor(amount / 2), mood: 3, social: 3 }, special: friendId ? { type: "adjustFriend", friendId, amount: 6 } : null, result: "你们把一笔借款变成了一次并肩吃东西的下午。" }
    ]
  };
}

function createGoalPurchaseScene(goal) {
  return {
    id: createId(), icon: goal.icon, title: `终于攒够了：${goal.name}`,
    story: `零钱已经达到 ${state.stats.money} 元，超过了目标所需的 ${goal.cost} 元。你可以兑现几个月前的决定，也可以发现自己已经不那么急着拥有它。`,
    choices: [
      {
        label: `花 ${goal.cost} 元买下${goal.name}`, effects: { money: -goal.cost, ...goal.reward },
        special: { type: "completeSavingsGoal", goal },
        result: `你真的用一点点积累买下了${goal.name}。比物品本身更清楚的，是每一笔钱从哪里来、又为什么留下。`
      },
      { label: "先不买，继续保留这笔钱", effects: { mood: 2 }, special: { type: "clearSavingsGoal" }, result: "目标完成后，你反而不再着急。钱被保留下来，下一次决定会更从容。" }
    ]
  };
}

function createFriendshipScene() {
  if (!state.friends.length || Math.random() < 0.5) {
    const friend = generateFriend();
    return {
      id: createId(), icon: "🫂", title: `认识${friend.name}`,
      story: `你在${pick(["图书馆门口", "食堂排队时", "体育课分组时", "放学的公交站"])}遇见了${friend.name}。${friend.name}${friend.trait}，似乎也在留意你。`,
      choices: [
        { label: `主动和${friend.name}聊几句`, effects: { social: 5, mood: 3 }, special: { type: "addFriend", friend }, followUps: [createFriendFollowUp(friend)], result: `你们交换了联系方式。${friend.name}成为了你在这段人生中第 ${state.friends.length + 1} 位真正记住名字的朋友。` },
        { label: "礼貌点头，然后离开", effects: { mood: 1 }, result: "你们擦肩而过。以后或许还会再见，也或许不会。" }
      ]
    };
  }

  const friend = pick(state.friends);
  return {
    id: createId(), icon: "💬", title: `${friend.name}发来的消息`,
    story: `${friend.name}最近状态不太好，放学后发来一句“能不能聊聊”。你原本还有自己的安排。`,
    choices: [
      { label: `陪${friend.name}聊一会儿`, effects: { social: 4, mood: -1 }, special: { type: "adjustFriend", friendId: friend.id, amount: 8 }, result: `${friend.name}没有立刻变开心，但认真说了一句“谢谢你在”。` },
      { label: "说明自己今天确实没有精力", effects: { mood: 2, social: -1 }, special: { type: "adjustFriend", friendId: friend.id, amount: -2 }, result: `${friend.name}有一点失落，但你也学会了诚实表达自己的边界。` }
    ]
  };
}

function createFriendFollowUp(friend) {
  const detail = pick([
    `${friend.name}说自己刚转来不久，每天放学都要绕路去接读小学的妹妹。`,
    `${friend.name}承认最近父母经常不在家，所以总故意拖到教室快关门才走。`,
    `${friend.name}给你看了一本画满人物设定的旧本子，这是从没给班里其他人看过的东西。`
  ]);
  return {
    id: createId(), icon: "🚏", title: `和${friend.name}一起放学`, story: `交换联系方式后的那天，你们第一次并肩走出校门。${detail}`,
    choices: [
      { label: "认真听完，也说一点自己的事", effects: { social: 3, mood: 2 }, special: { type: "adjustFriend", friendId: friend.id, amount: 6 }, result: "你们没有突然成为无话不谈的人，但彼此都多知道了一件真实的小事。" },
      { label: "用玩笑把略显沉重的话题带过去", effects: { mood: 3, social: 1 }, special: { type: "adjustFriend", friendId: friend.id, amount: 2 }, result: `${friend.name}笑了出来。话题轻松了，有些没有说完的部分也留到了以后。` }
    ]
  };
}

function generateFriend() {
  const identity = pick(["boy", "girl"]);
  const usedNames = new Set([state.character.name, ...state.friends.map((friend) => friend.name)]);
  let name;
  do {
    name = `${pick(BACKGROUND_DATA.surnames)}${pick(identity === "girl" ? BACKGROUND_DATA.girlNames : BACKGROUND_DATA.boyNames)}`;
  } while (usedNames.has(name));
  return {
    id: createId(),
    name,
    identity,
    trait: pick(["说话很慢但很细心", "看起来外向，其实很怕被忽略", "成绩普通，却特别讲义气", "喜欢画画，总在课本边角涂鸦", "不太爱说话，但记得别人随口提过的事"]),
    closeness: 20,
    metAt: getStage(state.turn).label
  };
}

function createEducationMilestone() {
  if (state.turn === 20 && state.education.route === "undecided") return createRouteScene();
  if (state.turn === 30 && state.education.track !== "dropout") return state.education.route === "international" ? createInternationalEntryScene() : createZhongkaoScene();
  if (state.turn === 60 && !["dropout", "work"].includes(state.education.track)) {
    if (state.education.route === "international") return createOverseasApplicationScene();
    if (state.education.track === "vocational") return createVocationalGraduationScene();
    return createGaokaoScene();
  }
  return null;
}

function createRouteScene() {
  const resources = state.character.family.resourceLevel;
  const internationalChoice = resources >= 4
    ? { label: "和家里商量国际课程路线", effects: { study: 2, money: -8, family: -2 }, special: { type: "setRoute", route: "international", track: "middle-school" }, result: "家庭条件能够承担主要费用，但语言、课程和申请压力仍需要你自己面对。" }
    : resources === 3
      ? { label: "让家庭压缩开支，尝试国际课程", effects: { study: 3, money: -15, family: -6, mood: -2 }, special: { type: "setRoute", route: "international", track: "middle-school" }, result: "家里决定拿出多年积蓄支持你。这条路从第一天起就带着明确的经济压力。" }
      : { label: "争取奖学金，冒险尝试国际路线", effects: { study: 4, money: -20, family: -8, mood: -3 }, special: { type: "setRoute", route: "international", track: "middle-school" }, result: "以目前的家庭条件，只有奖学金和极强的成绩才能支撑这条路。你和家人都承担了很大风险。" };
  return {
    id: createId(), icon: "🛤️", title: "初三：第一次真正的分岔路",
    story: `班主任要求每个家庭认真考虑下一阶段。你来自${state.character.family.name}，家庭资源会真实影响选择：国内升学最常见，国际课程费用高且需要语言能力，也有人因为成绩或家庭原因离开学校。`,
    choices: [
      { label: "走国内普通升学路线", effects: { study: 3, family: 2 }, special: { type: "setRoute", route: "domestic", track: "middle-school" }, result: "目标明确下来：先面对中考，再争取普通高中和高考。" },
      { ...internationalChoice, requires: { study: 55, money: 20, family: 35 } },
      { label: "不再继续升学，尽早进入社会", effects: { study: -5, money: 8, mood: -2 }, special: { type: "setRoute", route: "dropout", track: "dropout" }, result: "课桌被留在身后。从下个月起，生活不再以考试为中心，而以工作、技能和收入为中心。" }
    ]
  };
}

function createZhongkaoScene() {
  const score = Math.max(280, Math.min(720, Math.round(330 + state.stats.study * 4 + randomBetween(-35, 35))));
  const strong = score >= 560;
  return {
    id: createId(), icon: "🏫", title: `中考放榜：${score} 分`,
    story: strong ? "这个成绩达到了本地普通高中的录取范围，也为你保留了职业教育的选择。" : "这个成绩没有达到理想普高线。现实摆在面前：选择更适合的职业教育，或者承担更大压力寻找其他机会。",
    choices: strong ? [
      { label: "进入普通高中，继续准备高考", effects: { study: 5, family: 4 }, special: { type: "setTrack", track: "academic" }, result: "新的校服、新的教室，以及三年后那场更大的考试在前面等着。" },
      { label: "选择中职，尽早学习具体技能", effects: { study: 2, mood: 3 }, special: { type: "setTrack", track: "vocational" }, result: "这不是失败，而是另一种更具体的学习方式。" }
    ] : [
      { label: "进入中职，选择一门实用专业", effects: { study: 3, mood: 2 }, special: { type: "setTrack", track: "vocational" }, result: "你进入职业学校，课程开始和真实工作发生联系。" },
      { label: "停止学业，先进入社会工作", effects: { money: 8, mood: -3 }, special: { type: "setRoute", route: "dropout", track: "dropout" }, result: "没有下一张录取通知书。你开始用工作和生活重新定义成长。" }
    ]
  };
}

function createInternationalEntryScene() {
  return {
    id: createId(), icon: "🌍", title: "国际课程的第一天",
    story: "课堂里第一次出现全英文材料、项目合作和升学顾问。学费与期待都变得具体，这条路并不比普通高中轻松。",
    choices: [
      { label: "接受挑战，建立长期申请计划", effects: { study: 5, family: -2, money: -10 }, special: { type: "setTrack", track: "international-high" }, result: "语言成绩、课程分数和课外经历，成为未来三年的新坐标。" }
    ]
  };
}

function createGaokaoScene() {
  const score = Math.max(260, Math.min(690, Math.round(280 + state.stats.study * 4.2 + randomBetween(-45, 45))));
  const admitted = score >= 500;
  return {
    id: createId(), icon: "🎓", title: `高考放榜：${score} 分`,
    story: admitted ? "分数超过了本科线。学校和城市的选择第一次真正摆在你面前。" : "分数没有达到理想本科线。你需要在继续读书和进入社会之间做出务实选择。",
    choices: admitted ? [
      { label: "选择合适的大学和专业", effects: { study: 5, family: 5, money: -8 }, special: { type: "setTrack", track: "university" }, result: "录取通知书到来，人生离开熟悉的城市，进入新的阶段。" },
      { label: "不读大学，直接寻找工作", effects: { money: 10, family: -3 }, special: { type: "setTrack", track: "work" }, result: "你放下录取可能，开始用真实收入衡量自己的选择。" }
    ] : [
      { label: "选择专科或职业院校继续学习", effects: { study: 4, money: -5 }, special: { type: "setTrack", track: "university" }, result: "学校并非最初设想，但继续学习仍然给未来留下空间。" },
      { label: "进入社会，从第一份工作开始", effects: { money: 10, mood: -2 }, special: { type: "setTrack", track: "work" }, result: "考试结束了，新的评分标准变成能力、收入和生活。" }
    ]
  };
}

function createOverseasApplicationScene() {
  const success = state.stats.study + state.stats.social + randomBetween(-20, 20) >= 115;
  return {
    id: createId(), icon: "✈️", title: "海外申请结果",
    story: success ? "邮箱里出现了期待已久的录取通知。新的国家、语言和生活成本都变得真实。" : "理想学校没有给出录取，但你仍收到了一些其他项目的机会。",
    choices: [
      { label: success ? "接受录取，去海外学习" : "选择现有项目，继续海外路线", effects: { study: 5, money: -18, family: -3 }, special: { type: "setTrack", track: "university" }, result: "行李箱被合上时，你知道这条路真正开始了。" },
      { label: "结束国际路线，先进入社会", effects: { money: 8, mood: -2 }, special: { type: "setTrack", track: "work" }, result: "投入没有完全按计划开花，但语言和经历仍然属于你。" }
    ]
  };
}

function createVocationalGraduationScene() {
  return {
    id: createId(), icon: "🧰", title: "中职毕业：第一份正式去向",
    story: "实习单位给出留用机会，老师也建议你考虑继续升学。手艺、学历和收入各有现实代价。",
    choices: [
      { label: "接受留用，开始正式工作", effects: { money: 15, study: 2 }, special: { type: "setTrack", track: "work" }, result: "从实习生到正式员工，你开始独立承担工作结果。" },
      { label: "参加考试，继续进入职业院校", effects: { study: 6, money: -5 }, special: { type: "setTrack", track: "university" }, result: "你决定再给自己几年系统学习的时间。" }
    ]
  };
}

function applySpecialChoice(special) {
  if (!special) return;
  if (special.type === "addFriend" && !state.friends.some((friend) => friend.id === special.friend.id)) state.friends.push(special.friend);
  if (special.type === "adjustFriend") {
    const friend = state.friends.find((item) => item.id === special.friendId);
    if (friend) friend.closeness = Math.max(0, Math.min(100, friend.closeness + special.amount));
  }
  if (special.type === "startProject" && !state.projects.some((project) => project.id === special.project.id)) {
    state.projects.push({ ...special.project, notes: [...(special.project.notes ?? [])] });
  }
  if (special.type === "updateProject") {
    const project = state.projects.find((item) => item.id === special.projectId);
    if (project) {
      project.phase = special.phase ?? project.phase;
      project.quality = Math.max(0, project.quality + (special.qualityDelta ?? 0));
      if (special.note) project.notes.push(special.note);
    }
  }
  if (special.type === "completeProject") {
    const project = state.projects.find((item) => item.id === special.projectId);
    if (project) {
      project.quality = Math.max(0, project.quality + (special.qualityDelta ?? 0));
      project.status = "completed";
      project.phase = 5;
      project.completedAt = getStage(state.turn).label;
    }
  }
  if (special.type === "setSavingsGoal") state.economy.savingsGoal = { ...special.goal, startedAt: getStage(state.turn).label };
  if (special.type === "clearSavingsGoal") state.economy.savingsGoal = null;
  if (special.type === "completeSavingsGoal") {
    state.economy.lastCompletedGoal = { ...special.goal, completedAt: getStage(state.turn).label };
    state.economy.savingsGoal = null;
  }
  if (special.type === "recordChance" || special.type === "recordLottery") {
    state.economy.chanceHistory.unshift({
      id: createId(), name: special.type === "recordLottery" ? "即开型彩票" : special.name,
      stake: special.stake, prize: special.prize, stage: getStage(state.turn).label
    });
    state.economy.chanceHistory = state.economy.chanceHistory.slice(0, 20);
  }
  if (special.type === "recordLottery") {
    state.economy.lottery.tickets += 1;
    state.economy.lottery.spent += special.stake;
    state.economy.lottery.won += special.prize;
    state.economy.lottery.bestPrize = Math.max(state.economy.lottery.bestPrize, special.prize);
  }
  if (special.type === "setRoute") {
    state.education.route = special.route;
    state.education.track = special.track;
    if (special.track === "dropout") state.education.exitTurn = state.turn;
  }
  if (special.type === "setTrack") {
    state.education.track = special.track;
    if (special.track === "work") state.education.exitTurn = state.turn;
  }
}

function buildOriginStory(origin) {
  const openings = [
    `${origin.name}在${origin.city}长大。家里属于${origin.family.name}，${origin.parent}。`,
    `故事开始在${origin.city}。${origin.name}生活在一个${origin.family.name}里，${origin.parent}。`,
    `十三岁以前，${origin.name}一直住在${origin.city}。这是一个${origin.family.name}，${origin.parent}。`
  ];
  const endings = [
    `${origin.family.detail}。因为${origin.personality}，很多心事并不会轻易说出口；而“${origin.talent.name}”也许会在未来某天改变人生方向。`,
    `${origin.family.detail}。${origin.name}的性格${origin.personality}，藏着“${origin.talent.name}”这项还未完全显露的天赋。`,
    `${origin.family.detail}。带着${origin.personality}的性格和“${origin.talent.name}”的天赋，新的学年即将开始。`
  ];
  return `${pick(openings)}${pick(endings)}`;
}

function createOpeningScene(origin) {
  return {
    id: createId(),
    icon: "🎒",
    title: "开学前夜",
    story: `${origin.story} 明天，${origin.name}将第一次走进${origin.school}。窗外已经很安静，书包还放在桌边。`,
    choices: [
      { label: "认真整理书包，然后早点睡", effects: { study: 2, health: 2 }, result: "一切都准备妥当。第二天醒来时，紧张里多了一点踏实。" },
      { label: "再玩一会儿，反正明天才正式开始", effects: { mood: 2, health: -1 }, result: "这一晚轻松地过去了，只是第二天的闹钟显得格外刺耳。" }
    ]
  };
}

function createWorkFamilyScene() {
  return {
    id: createId(), icon: "🏠", title: "工资到账后的家庭消息",
    story: `${state.character.parent}。这个月家里有一笔日常开支需要分担，而你也有自己的生活费用和计划。进入社会后，陪伴家人常常和钱、时间同时有关。`,
    choices: [
      { label: "承担一部分开支，也把自己的预算说清楚", effects: { family: 5, money: -6, mood: 1 }, result: "你帮了家里，也没有假装自己的钱没有边界。" },
      { label: "这次先不出钱，安排时间回去做事", effects: { family: 4, health: -1, mood: 2 }, result: "你用一个下午处理了家里的杂事。付出的不是现金，却同样具体。" }
    ]
  };
}

function createWorkRestScene() {
  return {
    id: createId(), icon: "🛏️", title: "排班表上空下来的一天",
    story: "连续几个班次结束后，你终于有一整天不用打卡。手机里既有临时加班消息，也有堆了很久的生活琐事。",
    choices: [
      { label: "拒绝加班，睡够以后处理自己的生活", effects: { health: 6, mood: 4, money: -2 }, result: "这一天没有增加收入，却让房间和身体都恢复了一点秩序。" },
      { label: "接半天临时班，剩下时间休息", effects: { money: 6, health: 2, mood: 1 }, result: "你没有赚到整天加班的钱，也没有把休息全部卖掉。" }
    ]
  };
}

function generateWorkLifeScene(character) {
  const scenes = [
    () => ({
      id: createId(), icon: "🚌", title: "末班车上的座位",
      story: `结束一天工作后，${character.name}坐上回住处的末班车。车窗外是${character.city}还亮着的招牌，工作群里又出现一条明早提前到岗的通知。`,
      choices: [
        { label: "回复确认，回去后立刻休息", effects: { health: 3, mood: -1 }, result: "你没有继续刷手机，至少为明早保住了几小时完整睡眠。" },
        { label: "先问清提前到岗是否有补贴", effects: { money: 3, social: -1 }, result: "问题让群里安静了一会儿，主管最后确认会计算加班。" }
      ]
    }),
    () => ({
      id: createId(), icon: "💵", title: "工资条上的差额",
      story: "发薪日到账金额比预想少了一点。你对照排班记录，发现其中一段加班时间可能没有被计入。",
      choices: [
        { label: "带着记录去找主管核对", effects: { money: 7, social: -1, study: 1 }, result: "差额被补回来了。你也学会了保存每一次排班和工资记录。" },
        { label: "这次算了，不想因此起冲突", effects: { mood: -2 }, result: "事情暂时过去，但那笔没有拿到的钱让你记了很久。" }
      ]
    }),
    () => ({
      id: createId(), icon: "🍜", title: "下班后的便宜晚饭",
      story: "住处附近的小店快打烊了。你可以买一份热饭，也可以回去把昨天剩下的食材简单处理掉。",
      choices: [
        { label: "买一份热饭，和同事坐下聊会儿", effects: { health: 2, social: 3, money: -4 }, result: "一顿不贵的饭让疲惫缓下来，也听到了一条新的招工消息。" },
        { label: "回去自己做，省下今天的饭钱", effects: { money: 2, family: 1, health: 1 }, result: "味道普通，但你开始真正掌握自己的生活成本。" }
      ]
    }),
    () => ({
      id: createId(), icon: "🔧", title: "一次没人愿意接的麻烦",
      story: "工作现场出现一个反复返工的问题，经验多的同事嫌麻烦，主管问有没有人愿意留下来一起查原因。",
      choices: [
        { label: "留下观察并把过程记下来", effects: { study: 5, health: -2, social: 2 }, result: "问题最终不是你解决的，但你完整看懂了一次真实排查。" },
        { label: "完成自己的班次，按时离开", effects: { health: 3, mood: 2 }, result: "机会被别人接走，你则保住了已经安排好的个人时间。" }
      ]
    })
  ];
  return pick(scenes)();
}

function generateLifeScene(character) {
  if (isWorkingLife()) return generateWorkLifeScene(character);
  const scenes = [
    () => ({
      id: createId(), icon: "🚌", title: `${character.city}的傍晚`,
      story: `放学后的公交车穿过${character.city}。车窗上映出${character.name}的脸，今天似乎不想立刻回家。`,
      choices: [
        { label: "提前一站下车，慢慢走回去", effects: { mood: 3, health: 1 }, result: "陌生的小路吹着风，这座住了很久的城市忽然有了新的样子。" },
        { label: "给家里发消息，然后按时回家", effects: { family: 3 }, result: "家里已经留好了饭。普通的一晚，因为有人等待而显得温暖。" }
      ]
    }),
    () => ({
      id: createId(), icon: "🍚", title: "饭桌上的沉默",
      story: `${character.parent}。今晚家人看起来格外疲惫，饭桌上只有碗筷碰撞的声音。`,
      choices: [
        { label: "说一件学校里的小事", effects: { family: 4, social: 1 }, result: "话题慢慢被打开，家人的表情也放松了一些。" },
        { label: "安静吃完，替家里收拾碗筷", effects: { family: 3, mood: 1 }, result: "没有太多对话，但那份体谅被悄悄看见了。" }
      ]
    }),
    () => ({
      id: createId(), icon: "✨", title: "天赋露出一点光",
      story: `一次偶然的课堂活动里，${character.name}发现自己的“${character.talent.name}”比想象中更突出。老师和同学都注意到了。`,
      choices: [
        { label: "认真投入，看看自己能走多远", effects: { study: 4, mood: 2 }, result: `“${character.talent.name}”不再只是一个标签，它开始成为真正的能力。` },
        { label: "暂时不声张，把它留给自己", effects: { mood: 3 }, result: "这个小秘密像口袋里的一颗糖，让普通日子有了隐约的期待。" }
      ]
    }),
    () => ({
      id: createId(), icon: "🪟", title: "一个人的周日下午",
      story: `${character.name}是个${character.personality}的人。周日下午，朋友都没有空，家里也很安静，一整段时间突然完全属于自己。`,
      choices: [
        { label: "翻开一本一直想看的书", effects: { study: 3, mood: 2 }, result: "故事把时间悄悄带走，合上书时天色已经暗了。" },
        { label: "什么也不计划，随心度过", effects: { mood: 5, study: -1 }, result: "这一天没有成果，却让疲惫的心重新松了下来。" }
      ]
    })
  ];
  return pick(scenes)();
}

function createNeutralChip(text) {
  const chip = document.createElement("span");
  chip.className = "effect-chip neutral";
  chip.textContent = text;
  return chip;
}

function makeTag(text) {
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = text;
  return tag;
}

function originDetail(label, value) {
  return `<div class="origin-detail"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function pick(items) { return items[Math.floor(Math.random() * items.length)]; }
function randomBetween(minimum, maximum) { return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; }
function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[character]);
}

function createId() {
  const webCrypto = window.crypto || window.msCrypto;
  if (webCrypto && typeof webCrypto.randomUUID === "function") return webCrypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

if (state) showGame(); else showSetup();

