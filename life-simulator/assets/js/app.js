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
  network: ["social"], "job-search": ["study", "social"],
  course: ["study"], club: ["social", "mood"], parttime: ["money"],
  internship: ["study", "social"], future: ["study"], certificate: ["study"],
  operate: ["study", "money"], customers: ["social", "money"], product: ["study"],
  cashflow: ["study", "money"], expand: ["social", "money"],
  leisure: ["health", "mood"], assets: ["money", "mood"]
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

const JOB_ACTIONS = [
  { id: "work", icon: "💼", name: "做好本职工作", note: "争取绩效、经验和稳定收入", color: "#ffe6ce", effects: { study: 2, social: 2, mood: 1, money: 3 } },
  { id: "skill", icon: "🛠️", name: "提升职业技能", note: "为加薪或下一份工作做准备", color: "#dce8ff", effects: { study: 5, money: -2, health: -1 } },
  { id: "network", icon: "🤝", name: "经营职场关系", note: "同事、前辈和行业联系人", color: "#ffe0e8", effects: { social: 6, money: -2, mood: 1 } },
  { id: "job-search", icon: "📄", name: "寻找更好岗位", note: "更新简历并参加面试", color: "#daf2df", effects: { study: 3, social: 3, mood: -2 } },
  { id: "finances", icon: "🧾", name: "管理收支", note: "核对工资、房租和日常预算", color: "#fff0bd", effects: { mood: 1 } },
  { id: "assets", icon: "🏘️", name: "管理投资资产", note: "房产出租、卖出或买卖股票", color: "#e4f2d2", effects: { mood: 1 } },
  { id: "leisure", icon: "🎬", name: "享受生活", note: "花一点钱换休息、兴趣和好心情", color: "#eee2ff", effects: { mood: 7, health: 2, money: -4 } },
  { id: "family", icon: "🏠", name: "维系家庭", note: "在工作之外保留家人关系", color: "#eee2ff", effects: { family: 7, mood: 2, money: -3 } },
  { id: "rest", icon: "🌙", name: "休息恢复", note: "避免工作和通勤耗尽身体", color: "#dceced", effects: { health: 6, mood: 4 } },
  { id: "luck", icon: "🎲", name: "试试运气", note: "随机机会不等于稳定收入", color: "#ffe1c7", effects: { mood: 1 } }
];

const BUSINESS_ACTIONS = [
  { id: "operate", icon: "🧮", name: "盯紧日常经营", note: "本月经营回款另行结算", color: "#ffe6ce", effects: { study: 3, money: 10, health: -2, mood: 1 } },
  { id: "customers", icon: "📣", name: "寻找客户", note: "推广、谈单和维护口碑", color: "#ffe0e8", effects: { social: 6, money: -2, mood: 1 } },
  { id: "product", icon: "🛠️", name: "改进产品服务", note: "用时间换长期竞争力", color: "#dce8ff", effects: { study: 5, money: -3, health: -1 } },
  { id: "cashflow", icon: "💹", name: "管理现金流", note: "核对收入、成本和欠款", color: "#fff0bd", effects: { study: 2, mood: 1 } },
  { id: "assets", icon: "🏘️", name: "管理投资资产", note: "房产出租、卖出或买卖股票", color: "#e4f2d2", effects: { mood: 1 } },
  { id: "leisure", icon: "🎬", name: "享受生活", note: "暂时离开经营，恢复生活感", color: "#eee2ff", effects: { mood: 7, health: 2, money: -4 } },
  { id: "expand", icon: "🚀", name: "尝试扩大经营", note: "高投入也可能带来更高回报", color: "#daf2df", effects: { social: 3, money: -8, health: -2 }, requiresBusinessMonths: 10 },
  { id: "family", icon: "🏠", name: "处理家庭关系", note: "家人的支持也有边界和代价", color: "#eee2ff", effects: { family: 7, mood: 2 } },
  { id: "rest", icon: "🌙", name: "停下来休息", note: "经营者也不是无限运转的机器", color: "#dceced", effects: { health: 6, mood: 4, money: -1 } },
  { id: "luck", icon: "🎲", name: "试试运气", note: "运气不能替代稳定经营", color: "#ffe1c7", effects: { mood: 1 } }
];

const CAREER_BACKGROUND = {
  "dual-income": { business: "社区生活服务工作室", homeJob: "本地企业运营助理", support: "家人能提供稳定住处，但启动资金有限" },
  "small-business": { business: "家庭小店升级项目", homeJob: "家中店铺运营与采购", support: "父母熟悉客源、进货和日常经营" },
  "single-parent": { business: "低成本线上服务工作室", homeJob: "社区服务机构职员", support: "家里能提供的资金很少，但愿意分担部分生活" },
  intellectual: { business: "知识与教育内容工作室", homeJob: "本地教育机构课程运营", support: "家人能提供专业建议和人脉，但会谨慎评估风险" },
  "migrant-worker": { business: "技能维修与上门服务", homeJob: "城郊制造企业技术岗", support: "家人能介绍实际工作，却难以承担大的创业损失" },
  affluent: { business: "品牌与数字服务创业项目", homeJob: "家族熟悉企业的管理培训岗", support: "家庭能提供更高启动资金，也会介入经营决策" }
};

const PROPERTY_TYPES = [
  { id: "old-flat", name: "城郊老小区单间", price: 90, rentIncome: 5, monthlyFee: 1, icon: "🏚️" },
  { id: "small-flat", name: "小户型住宅", price: 160, rentIncome: 9, monthlyFee: 2, icon: "🏠" },
  { id: "street-shop", name: "社区临街小铺", price: 260, rentIncome: 15, monthlyFee: 3, icon: "🏪" }
];

const STOCK_PRODUCTS = [
  { id: "index", name: "宽基指数", basePrice: 10, volatility: 0.08, dividend: 0.08, icon: "📊" },
  { id: "growth", name: "成长科技", basePrice: 14, volatility: 0.2, dividend: 0, icon: "🚀" },
  { id: "dividend", name: "红利组合", basePrice: 8, volatility: 0.05, dividend: 0.18, icon: "💵" }
];

const COLLEGE_DATA = {
  elite: {
    label: "重点本科", duration: 40,
    schools: ["华东综合大学", "南江理工大学", "北城师范大学", "滨海财经大学"]
  },
  bachelor: {
    label: "普通本科", duration: 40,
    schools: ["南江学院", "海州大学", "省城科技学院", "新城师范学院", "江北财经学院"]
  },
  junior: {
    label: "专科", duration: 30,
    schools: ["城市职业技术学院", "滨海信息职业学院", "省城商贸职业学院", "交通职业技术学院"]
  },
  overseas: {
    label: "海外本科", duration: 40,
    schools: ["北岸州立大学", "圣河文理学院", "西港科技大学", "新桥大学"]
  },
  topup: {
    label: "专升本", duration: 20,
    schools: ["省城科技学院", "南江学院", "新城师范学院"]
  },
  postgraduate: {
    label: "硕士研究生", duration: 30,
    schools: ["华东综合大学", "南江理工大学", "海州大学"]
  }
};

const COLLEGE_MAJORS = [
  "计算机科学与技术", "汉语言文学", "会计学", "机械设计制造", "护理学",
  "市场营销", "数字媒体艺术", "学前教育", "电子商务", "建筑工程技术"
];

const COLLEGE_ACTIONS = [
  { id: "course", icon: "📚", name: "修读专业课", note: "上课、作业、实验和期末成绩", color: "#dce8ff", effects: { study: 6, mood: -2, health: -1 } },
  { id: "friends", icon: "🛏️", name: "经营大学关系", note: "室友、同班同学和新的朋友圈", color: "#ffe0e8", effects: { social: 6, mood: 3, study: -1 } },
  { id: "club", icon: "🎸", name: "参加社团活动", note: "寻找兴趣，也承担集体事务", color: "#eee2ff", effects: { social: 5, mood: 4, study: -1, money: -2 } },
  { id: "parttime", icon: "☕", name: "校外兼职", note: "用时间换收入和社会经验", color: "#ffe6ce", effects: { money: 9, health: -3, study: -2 } },
  { id: "internship", icon: "💼", name: "寻找实习", note: "大二以后接触真实岗位", color: "#daf2df", effects: { study: 4, social: 4, money: 3, health: -2 }, minCollegeMonth: 10 },
  { id: "future", icon: "🧭", name: "规划毕业去向", note: "就业、升学和资格准备", color: "#fff0bd", effects: { study: 4, mood: -1, money: -2 }, finalYearOnly: true },
  { id: "finances", icon: "👛", name: "安排生活费", note: "兼职、消费和储蓄目标", color: "#fff0bd", effects: { mood: 1 } },
  { id: "rest", icon: "🌙", name: "休息和锻炼", note: "恢复身体，暂时放下绩点", color: "#dceced", effects: { health: 6, mood: 4, study: -2 } },
  { id: "luck", icon: "🎲", name: "试试运气", note: "成年后的随机机会与彩票", color: "#ffe1c7", effects: { mood: 1 } }
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
    version: 11,
    character: pendingOrigin,
    stats: { ...pendingOrigin.stats },
    turn: 0,
    education: { route: "undecided", track: "middle-school", exitTurn: null },
    friends: [],
    projects: [],
    economy: { savingsGoal: null, ledger: [], chanceHistory: [], lottery: { tickets: 0, spent: 0, won: 0, bestPrize: 0 } },
    investments: createEmptyInvestments(),
    career: null,
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
  const careerFinanceScene = applyCareerEconomy(action);
  const stageBeforeAdvance = getStage(state.turn);
  addMemory(`${action.icon} ${action.name}：${action.note}。`, stageBeforeAdvance.label, action.color);
  state.turn += 1;

  const scenes = [createActionScene(action)];
  if (careerFinanceScene) scenes.push(careerFinanceScene);
  const thresholdScene = detectThresholdScene();
  if (thresholdScene) scenes.push(thresholdScene);
  if (Math.random() < 0.55) scenes.push(createExtraScene());
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
  const hasAvailableChoice = event.choices.some((choice) => getUnmetRequirements(choice.requires).length === 0);
  if (!hasAvailableChoice) {
    const escapeChoice = {
      label: "条件不足，先离开这里",
      effects: {},
      result: "你没有勉强花掉并不存在的钱，也没有让这件事困住接下来的生活。"
    };
    const escapeButton = document.createElement("button");
    escapeButton.type = "button";
    escapeButton.className = "choice-button escape-choice";
    escapeButton.innerHTML = "<span>条件不足，先离开这里</span><span class=\"choice-arrow\">→</span>";
    escapeButton.addEventListener("click", () => resolveEvent(event, escapeChoice));
    choices.push(escapeButton);
  }
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
        chip.textContent = `${STAT_META[key].icon} ${getStatDisplayName(key)} ${value > 0 ? "+" : ""}${value}`;
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
    ? state.career
      ? `${state.career.locationLabel} · ${state.career.path === "business" ? state.career.name : `${state.career.employer} · ${state.career.title}`} · ${state.career.housing}`
      : `${character.city}，已经进入社会，生活以工作、收入和独立生存为中心`
    : isUniversityLife()
      ? `${state.education.admission.school} · ${state.education.admission.major} · ${state.education.admission.label}`
      : `${character.city}，就读于${character.school}`;
  document.querySelector("#familySummary").textContent = `${character.family.name}。${character.parent}。${character.family.detail}`;
  const backgroundTags = [
    makeTag(`性格 · ${character.personality}`),
    makeTag(`天赋 · ${character.talent.name}`),
    makeTag(`朋友 · ${state.friends.length ? state.friends.slice(0, 2).map((friend) => friend.name).join("、") : "还没有"}`),
    makeTag(`路线 · ${getRouteLabel()}`),
    makeTag(`学籍 · ${getEducationSummary()}`),
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
  ];
  if (state.career) {
    const properties = state.investments?.properties ?? [];
    const stockValue = getStockMarketValue();
    backgroundTags.splice(5, 0,
      makeTag(`去向 · ${state.career.path === "business" ? "创业" : "找工作"} · ${state.career.locationLabel}`),
      makeTag(`住房 · ${state.career.housing}`),
      makeTag(`固定开支 · 房租${state.career.rent} + 水电${state.career.utilities} + 生活${state.career.livingCost}`),
      makeTag(`欠款 · ${state.career.arrears ?? 0}`),
      makeTag(`房产 · ${properties.length}套${properties.length ? ` · 市值${properties.reduce((sum, item) => sum + item.marketValue, 0)}` : ""}`),
      makeTag(`股票 · 市值${Math.round(stockValue)}`),
      makeTag(`同事 · ${state.career.colleagues?.length ? state.career.colleagues.slice(0, 2).map((item) => item.name).join("、") : "尚未建立稳定关系"}`),
      makeTag(`副业投资 · ${state.investments?.ventures?.length ?? 0}项`),
      makeTag(`上月被动收入 · ${state.investments?.lastPassiveIncome ?? 0}`)
    );
  }
  document.querySelector("#backgroundTags").replaceChildren(...backgroundTags);
  document.querySelector("#turnCount").textContent = `已走过 ${state.turn} 个月`;
  document.querySelector("#monthHint").textContent = `${stage.grade}${stage.month}，选择一项行动推进时间`;

  const statElements = Object.entries(STAT_META).map(([key, meta]) => {
    const value = state.stats[key];
    const item = document.createElement("article");
    item.className = "stat";
    item.innerHTML = `<div class="stat-head"><span class="stat-name">${meta.icon} ${getStatDisplayName(key)}</span></div><div class="stat-value">${value}</div><div class="stat-bar"><i style="width:${Math.min(100, value)}%;--stat-color:${meta.color}"></i></div>`;
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
  if (education.track === "university" && education.admission) {
    const elapsed = Math.max(0, turn - education.admission.startTurn);
    const year = Math.floor(elapsed / 10) + 1;
    const grade = `${education.admission.label} ${year} 年级`;
    return { grade, month, age: 13 + Math.floor(turn / 10), label: `${grade} · ${month}` };
  }
  if (education.retaking) {
    const grade = "高考复读";
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

function createEmptyInvestments() {
  return {
    properties: [],
    ventures: [],
    stocks: {
      prices: Object.fromEntries(STOCK_PRODUCTS.map((product) => [product.id, product.basePrice])),
      holdings: Object.fromEntries(STOCK_PRODUCTS.map((product) => [product.id, 0])),
      averageCosts: Object.fromEntries(STOCK_PRODUCTS.map((product) => [product.id, 0])),
      marketMonth: 0
    },
    lastPassiveIncome: 0
  };
}

function getStockMarketValue() {
  const stocks = state.investments?.stocks;
  if (!stocks) return 0;
  return STOCK_PRODUCTS.reduce((sum, product) => sum + (stocks.holdings[product.id] ?? 0) * (stocks.prices[product.id] ?? product.basePrice), 0);
}

function applyInvestmentReturns() {
  const investments = state.investments ??= createEmptyInvestments();
  const stocks = investments.stocks;
  stocks.marketMonth = (stocks.marketMonth ?? 0) + 1;
  STOCK_PRODUCTS.forEach((product) => {
    const current = stocks.prices[product.id] ?? product.basePrice;
    const change = (Math.random() * 2 - 1) * product.volatility;
    stocks.prices[product.id] = Math.max(2, Math.round(current * (1 + change) * 10) / 10);
  });

  let passiveIncome = 0;
  investments.properties.forEach((property) => {
    const marketChange = randomBetween(-2, 3) / 100;
    property.marketValue = Math.max(Math.round(property.purchasePrice * 0.65), Math.round(property.marketValue * (1 + marketChange)));
    const netRent = property.status === "rented" ? property.rentIncome - property.monthlyFee : -property.monthlyFee;
    passiveIncome += netRent;
  });
  investments.ventures.forEach((venture) => {
    venture.months = (venture.months ?? 0) + 1;
    const income = randomBetween(-venture.risk, venture.baseIncome + venture.risk);
    venture.lastIncome = income;
    venture.totalIncome = (venture.totalIncome ?? 0) + income;
    passiveIncome += income;
  });
  if (stocks.marketMonth % 3 === 0) {
    passiveIncome += STOCK_PRODUCTS.reduce((sum, product) => {
      const units = stocks.holdings[product.id] ?? 0;
      return sum + Math.floor(units * product.dividend);
    }, 0);
  }
  investments.lastPassiveIncome = passiveIncome;
  if (passiveIncome) {
    applyToStats(state.stats, { money: passiveIncome });
    recordMoneyChange(passiveIncome, passiveIncome > 0 ? "房租、分红与副业分成" : "投资维护与副业亏损");
  }
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
    if (!cared.has(key)) {
      const careerPressure = Boolean(state.career) && ["health", "mood"].includes(key);
      effects[key] = careerPressure ? -1 : key === "study" || key === "health" || key === "mood" ? -2 : -1;
    }
    if (state.stats[key] >= 78) effects[key] = (effects[key] ?? 0) - 1;
  });
  if (!cared.has("money") && state.stats.money > 0 && !state.career) {
    effects.money = -1;
    recordMoneyChange(-1, "本月日常小支出");
  }
  applyToStats(state.stats, effects);
}

function applyCareerEconomy(action) {
  const career = state.career;
  if (!career || !isWorkingLife()) return null;
  career.months = (career.months ?? 0) + 1;
  applyInvestmentReturns();
  const incomeSwing = career.path === "business" ? randomBetween(-12, 15) : randomBetween(-1, 2);
  const actionBonus = career.path === "job" && action.id === "work" ? 2
    : career.path === "business" && ["operate", "customers"].includes(action.id) ? 8 : 0;
  const income = Math.max(0, career.baseIncome + incomeSwing + actionBonus);
  const utilities = Math.max(1, career.utilities + randomBetween(-1, 2));
  const totalCost = career.rent + utilities + career.livingCost;

  applyToStats(state.stats, { money: income });
  recordMoneyChange(income, career.path === "business" ? `${career.name}本月经营收入` : `${career.employer}工资到账`);
  const paid = Math.min(state.stats.money, totalCost);
  applyToStats(state.stats, { money: -paid });
  if (paid) recordMoneyChange(-paid, `住房与生活支出（房租${career.rent}·水电${utilities}·生活${career.livingCost}）`);
  const shortfall = totalCost - paid;
  career.lastSettlement = { income, rent: career.rent, utilities, livingCost: career.livingCost, totalCost, paid, shortfall, turn: state.turn };
  career.arrears = (career.arrears ?? 0) + shortfall;
  const surplus = income - totalCost;
  if (shortfall > 0) applyToStats(state.stats, { mood: -2 });
  else if (surplus >= 8) applyToStats(state.stats, { mood: 2 });
  else if (surplus >= 2) applyToStats(state.stats, { mood: 1 });
  addMemory(
    `💳 本月结算：收入 ${income}，房租 ${career.rent}、水电 ${utilities}、生活费 ${career.livingCost}${shortfall ? `，尚欠 ${shortfall}` : "，已结清"}。`,
    getStage(state.turn).label,
    shortfall ? "#ff91ad" : "#fff0bd"
  );
  return shortfall > 0 ? createArrearsScene(shortfall) : null;
}

function createArrearsScene(shortfall) {
  const career = state.career;
  const choices = [
    { label: "接临时活，先补一部分缺口", effects: { money: 8, health: -4, mood: -2 }, special: { type: "payArrears", amount: 8 }, result: "你用额外工时换来一笔钱，欠款少了，但身体也更疲惫。" },
    { label: "向家人说明情况，暂时周转", effects: { money: Math.min(12, career.arrears), family: -4 }, special: { type: "payArrears", amount: Math.min(12, career.arrears) }, result: "家里帮你挡住了眼前的缺口，也要求你重新做一份能长期维持的预算。" },
    { label: "先记下欠款，下个月再处理", effects: { mood: -3 }, result: "账单没有消失，欠款会继续影响之后的选择。" }
  ];
  if (career.path === "job") scenes.push(...createJobSocialScenes(career));
  if (career.location === "away") {
    choices.push({ label: "结束外地生活，搬回家降低开支", effects: { family: 3, mood: -2 }, special: { type: "moveCareerHome" }, result: "你退掉住处回到家乡。机会少了一些，但下个月不再承担外地房租。" });
  }
  return {
    id: createId(), icon: "🧾", title: "这个月的钱不够付完账单",
    story: `收入到账后仍差 ${shortfall}，累计欠款达到 ${career.arrears}。房租、水电和吃饭不会因为计划失误自动消失。`, choices
  };
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
  if (isUniversityLife()) return createUniversityThresholdScene(key, band);
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
  if (state.stats.health < 25 && ["study", "language", "coursework", "activity", "work", "skill", "job-search", "course", "parttime", "internship", "future", "operate", "customers", "product", "expand"].includes(action.id)) return "健康过低，必须先恢复身体";
  if (state.stats.mood < 25 && ["study", "language", "coursework", "activity", "work", "course", "parttime", "internship", "future", "operate", "customers", "product", "expand"].includes(action.id)) return "心情过低，暂时无法承担高压行动";
  if (state.stats.social < 25 && action.id === "activity") return "人缘过低，暂时无法加入合作项目";
  if (isUniversityLife()) {
    const admission = state.education.admission;
    const elapsed = Math.max(0, state.turn - admission.startTurn);
    if (action.minCollegeMonth && elapsed < action.minCollegeMonth) return `入学满 ${Math.ceil(action.minCollegeMonth / 10)} 年后开放`;
    if (action.finalYearOnly && elapsed < admission.duration - 10) return "进入最后一学年后开放";
  }
  if (action.requiresBusinessMonths && (state.career?.months ?? 0) < action.requiresBusinessMonths) return `经营满 ${action.requiresBusinessMonths} 个月后开放`;
  if (state.career?.arrears >= 20 && action.id === "expand") return "欠款过高，不能继续扩张";
  return null;
}

function isWorkingLife() {
  return ["dropout", "work"].includes(state.education.track);
}

function isUniversityLife() {
  return state.education.track === "university" && Boolean(state.education.admission);
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
  return Object.entries(requirements ?? {}).map(([key, value]) => `${getStatDisplayName(key)}≥${value}`).join("、");
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
    const previousVersion = saved.version ?? 1;
    saved.version = 11;
    saved.education ??= { route: "undecided", track: saved.turn < 30 ? "middle-school" : "academic", exitTurn: null };
    if (saved.education.track === "university" && !saved.education.admission) {
      const wasVocational = saved.memories.some((memory) => String(memory.stage ?? "").includes("中职"));
      const level = saved.education.route === "international" ? "overseas" : wasVocational ? "junior" : "bachelor";
      const profile = COLLEGE_DATA[level];
      saved.education.admission = {
        level,
        label: profile.label,
        school: pick(profile.schools),
        major: pick(COLLEGE_MAJORS),
        duration: profile.duration,
        startTurn: 60,
        score: null,
        migrated: true
      };
    }
    saved.friends ??= [];
    saved.projects ??= [];
    saved.projects = saved.projects.map((project) => ({ phase: 1, quality: 0, status: "active", notes: [], ...project }));
    saved.economy ??= { savingsGoal: null, ledger: [] };
    saved.economy.ledger ??= [];
    saved.economy.chanceHistory ??= [];
    saved.economy.lottery ??= { tickets: 0, spent: 0, won: 0, bestPrize: 0 };
    saved.investments ??= createEmptyInvestments();
    saved.investments.properties ??= [];
    saved.investments.ventures ??= [];
    saved.investments.stocks ??= createEmptyInvestments().stocks;
    saved.investments.lastPassiveIncome ??= 0;
    const investmentDefaults = createEmptyInvestments().stocks;
    saved.investments.stocks.prices ??= investmentDefaults.prices;
    saved.investments.stocks.holdings ??= investmentDefaults.holdings;
    saved.investments.stocks.averageCosts ??= investmentDefaults.averageCosts;
    saved.investments.stocks.marketMonth ??= 0;
    STOCK_PRODUCTS.forEach((product) => {
      saved.investments.stocks.prices[product.id] ??= product.basePrice;
      saved.investments.stocks.holdings[product.id] ??= 0;
      saved.investments.stocks.averageCosts[product.id] ??= 0;
    });
    saved.career ??= null;
    if (saved.career) saved.career.colleagues ??= [];
    if (saved.career && previousVersion < 11) {
      const educationBonus = ({ postgraduate: 7, elite: 5, overseas: 5, bachelor: 3, topup: 3, junior: 1 }[saved.education.admission?.level] ?? 0);
      const floor = saved.career.path === "business"
        ? (saved.career.location === "away" ? 42 : 32)
        : (saved.career.location === "away" ? 24 : 18) + educationBonus;
      saved.career.baseIncome = Math.max(saved.career.baseIncome ?? 0, floor);
      saved.career.economicModel = 3;
    }
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    return saved;
  } catch {
    return null;
  }
}

function getAvailableActions() {
  let actions;
  if (isWorkingLife() && state.career?.path === "job") actions = JOB_ACTIONS;
  else if (isWorkingLife() && state.career?.path === "business") actions = BUSINESS_ACTIONS;
  else if (["dropout", "work"].includes(state.education.track)) actions = WORK_ACTIONS;
  else if (isUniversityLife()) actions = COLLEGE_ACTIONS;
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
  if (track === "university") return state.education.admission?.label ?? "大学";
  if (route === "domestic") return "国内升学";
  return "尚未决定";
}

function getEducationSummary() {
  if (isWorkingLife()) return state.career
    ? `${state.career.path === "business" ? "创业经营" : "在职"} · ${state.career.locationLabel}`
    : "已进入社会";
  if (state.education.retaking) return "高考复读中";
  const admission = state.education.admission;
  if (admission) return `${admission.school} · ${admission.major}`;
  return state.character.school;
}

function formatEffectSummary(effects) {
  return Object.entries(effects)
    .map(([key, value]) => `${getStatDisplayName(key)}${value > 0 ? "+" : ""}${value}`)
    .join(" · ");
}

function getStatDisplayName(key) {
  if (key !== "money") return STAT_META[key].name;
  if (state?.career) return state.career.path === "business" ? "经营资金" : "可用资金";
  if (isUniversityLife()) return "生活费";
  return "零花钱";
}

function createActionScene(action) {
  if (isWorkingLife() && state.career) return createCareerActionScene(action);
  if (isUniversityLife()) {
    if (action.id === "finances") return createMoneyScene();
    if (action.id === "luck") return createLuckScene();
    if (action.id === "friends") return createUniversityFriendshipScene();
    return createUniversityActionScene(action);
  }
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

function createUniversityFriendshipScene() {
  const existing = state.friends.length ? pick(state.friends) : null;
  if (existing) {
    return {
      id: createId(), icon: "🧑‍🤝‍🧑", title: `和${existing.name}的大学周末`,
      story: `${existing.name}邀请你一起去学校附近走走。课程、宿舍和未来计划之外，你们终于有时间认真聊聊彼此最近的状态。`,
      choices: [
        { label: "赴约，把最近的压力说出来", effects: { social: 5, mood: 4, money: -2 }, special: { type: "adjustFriend", friendId: existing.id, amount: 8 }, result: `你们聊到天黑。${existing.name}不一定能解决问题，却更理解你正在经历什么。` },
        { label: "留在宿舍完成自己的安排", effects: { study: 3, mood: 1 }, special: { type: "adjustFriend", friendId: existing.id, amount: -2 }, result: "你完成了计划，也意识到关系需要投入时间才能继续。" }
      ]
    };
  }
  const friend = generateFriend();
  return {
    id: createId(), icon: "🛏️", title: `在宿舍认识${friend.name}`,
    story: `开学后的宿舍生活比想象中具体。${friend.name}${friend.trait}，你们因为一次公共区域的整理问题第一次认真说上话。`,
    choices: [
      { label: "主动商量规则，也聊聊彼此", effects: { social: 6, mood: 3 }, special: { type: "addFriend", friend }, result: `${friend.name}成为你大学阶段第一个真正记住名字和习惯的朋友。` },
      { label: "保持礼貌，先观察一阵", effects: { mood: 2, study: 1 }, result: "你们维持着舒服的距离，关系暂时停留在普通室友。" }
    ]
  };
}

function createUniversityActionScene(action) {
  const admission = state.education.admission;
  const scenes = {
    course: {
      icon: "📚", title: `${admission.major}的专业课考核`,
      story: "老师公布了占期末成绩四成的小组作业。资料不完整、队友时间不同，单靠临时突击很难拿到理想成绩。",
      choices: [
        { label: "提前拆分任务，每周检查一次进度", effects: { study: 5, social: 2, mood: -1 }, result: "过程比一次熬夜漫长，但最终交付没有在截止日前失控。" },
        { label: "先完成自己最擅长的部分", effects: { study: 4, social: -1, health: 1 }, result: "你的部分质量不错，小组整体却留下了配合上的遗憾。" }
      ]
    },
    club: {
      icon: "🎸", title: "社团招新后的第一次任务",
      story: "你加入的社团要办一次公开活动。真正开始筹备后，场地、经费、宣传和人员安排都需要有人承担。",
      choices: [
        { label: "负责一块具体工作，按时交付", effects: { social: 5, study: 2, mood: 2 }, result: "活动当天仍有混乱，但你负责的部分经得起检查。" },
        { label: "只做普通参与者，保留个人时间", effects: { mood: 4, health: 2 }, result: "你享受了活动，也没有让社团占满整个学期。" }
      ]
    },
    parttime: {
      icon: "☕", title: "课表之外的兼职班次",
      story: "附近门店愿意安排晚班，按小时结算。收入能缓解生活费压力，但第二天早课不会因此推迟。",
      choices: [
        { label: "接下固定晚班，建立收入来源", effects: { money: 10, health: -4, study: -2 }, result: "第一笔工资很具体，疲惫也同样具体。你开始重新计算时间的价格。" },
        { label: "只接周末临时班", effects: { money: 5, health: -1, mood: 1 }, result: "收入少一些，但课程和睡眠没有完全被打乱。" }
      ]
    },
    internship: {
      icon: "💼", title: "第一份实习申请",
      story: `招聘信息写着“有相关经验优先”。你学的是${admission.major}，课程成绩只是门槛，简历、面试和实际任务才决定能否留下。`,
      choices: [
        { label: "认真准备作品和面试，投递岗位", requires: { study: 55 }, effects: { study: 5, social: 4, money: 4, mood: -1 }, result: "你拿到一次短期实习。工作内容并不光鲜，却第一次与专业真正连接。" },
        { label: "先补足能力，再等下一轮招聘", effects: { study: 5, mood: 2, money: -2 }, result: "机会暂时过去，但你的准备不再只围绕考试。" }
      ]
    },
    future: {
      icon: "🧭", title: "毕业去向登记表",
      story: `${admission.label}的最后一年开始了。辅导员要求填写就业、升学或待定，选择不会立刻决定人生，却会改变最后一年的准备方向。`,
      choices: [
        { label: "以就业为目标，准备简历和招聘", effects: { study: 3, social: 4, mood: -1 }, result: "你开始参加招聘说明会，也第一次用岗位要求审视自己的经历。" },
        { label: "准备继续升学，把重心放回考试", requires: { study: 60 }, effects: { study: 6, health: -2, money: -3 }, result: "参考书重新堆上桌面。升学不是自动延期就业，而是另一场有门槛的竞争。" }
      ]
    },
    rest: {
      icon: "🌙", title: "没有课的半天",
      story: "课表终于空出半天。你可以补觉、去操场，也可以继续把未完成的任务塞进这段空白。",
      choices: [
        { label: "补觉后去运动，让身体恢复", effects: { health: 6, mood: 3 }, result: "任务没有全部完成，但身体重新有了继续一周的力气。" },
        { label: "留在图书馆处理积压任务", effects: { study: 4, mood: -1, health: -1 }, result: "待办清掉了一批，休息却又被推到下一次。" }
      ]
    }
  };
  const scene = scenes[action.id] ?? scenes.rest;
  return { id: createId(), ...scene };
}

function createUniversityExtraScene() {
  const admission = state.education.admission;
  return { id: createId(), ...pick([
    { icon: "🏠", title: "宿舍里的生活规则", story: "熄灯时间、空调费用和卫生安排终于引发争执。没人是坏人，但每个人都习惯了不同的生活方式。", choices: [
      { label: "把问题逐项写下来一起商量", effects: { social: 5, mood: 2 }, result: "规则不完美，却比互相猜测有效得多。" },
      { label: "自己多承担一点，先避免冲突", effects: { social: 2, mood: -2, health: -1 }, result: "宿舍安静下来，你的不满却没有完全消失。" }
    ] },
    { icon: "📝", title: "期末周同时到来", story: "三门考试、两份报告和一次展示挤在同一周。每一项都重要，但时间不允许全部做到最好。", choices: [
      { label: "按学分和薄弱程度分配时间", effects: { study: 5, mood: -2 }, result: "你放弃了面面俱到，成绩却比混乱突击稳定。" },
      { label: "和同学组成复习小组", effects: { study: 3, social: 4, health: -1 }, result: "有人提醒重点，也有人带来焦虑，但你不再独自应付。" }
    ] },
    { icon: "💳", title: "生活费比预想中更快见底", story: "教材、聚餐、交通和日用品一点点吃掉余额。离下次生活费到账还有一段时间。", choices: [
      { label: "做一份详细预算，停止非必要支出", effects: { money: 5, mood: -2, study: 1 }, result: "日子变得克制，但你第一次真正知道钱去了哪里。" },
      { label: "找短期兼职补上缺口", effects: { money: 8, health: -3, study: -1 }, result: "余额回升，时间却明显更紧。" }
    ] },
    { icon: "☎️", title: "家里打来的电话", story: `家人问起你在${admission.school}的生活。你报喜不报忧已经有一阵，电话那头仍听出了迟疑。`, choices: [
      { label: "说出最近真正困难的部分", effects: { family: 6, mood: 3 }, result: "家人未必能解决问题，但你不再一个人维持“都很好”的表象。" },
      { label: "只说顺利的事，让家里放心", effects: { family: 2, mood: -1 }, result: "电话平静结束，那些没说出口的话仍留在宿舍里。" }
    ] },
    { icon: "🎓", title: "奖学金答辩名单", story: "你的综合成绩进入候选范围，但还要提交材料并参加公开答辩，兼职和社团经历也会被询问。", choices: [
      { label: "整理材料，认真参加答辩", requires: { study: 60 }, effects: { study: 2, health: -1 }, followUp: createScholarshipFollowUp(admission), result: "材料交上去了。真正决定结果的答辩安排在下周。" },
      { label: "不参加，把时间留给课程和休息", effects: { health: 3, mood: 2 }, result: "你放弃了一次竞争，也没有让每个空档都变成考核。" }
    ] },
    { icon: "🧪", title: "实验数据和预期完全相反", story: `${admission.major}课程的小组实验连续三次得出异常结果。截止日期逼近，组员开始提议直接修改数据。`, choices: [
      { label: "保留异常结果，重新检查过程", effects: { study: 5, health: -2, social: 1 }, result: "你们最后发现了操作误差，也在报告里写下真实失败过程。" },
      { label: "按常见结果整理报告，先保证交付", effects: { study: 1, mood: -2 }, result: "报告顺利交出，那组被改过的数据却让你一直不踏实。" }
    ] },
    { icon: "🛏️", title: "室友突然决定搬出去", story: "室友因为实习和作息冲突申请换宿舍。留下的床位很快会安排新人，原来的生活规则也要重来。", choices: [
      { label: "帮忙收拾，也好好告别", effects: { social: 4, mood: -1 }, result: "搬走不等于关系结束，你们约好以后仍然联系。" },
      { label: "把注意力放到新室友和新规则", effects: { social: 3, study: 1 }, result: "新的相处并不立刻舒服，但你更早说清了彼此边界。" }
    ] },
    { icon: "🌍", title: "一学期交换项目", story: "学院公布交换名额。经历很吸引人，但语言准备、材料和额外费用都不轻。", choices: [
      { label: "提交申请，争取这次机会", requires: { study: 68, money: 18 }, effects: { study: 4, social: 3, money: -12, family: -2 }, result: "申请材料寄出后，你开始认真面对离开熟悉环境的成本。" },
      { label: "这次不去，寻找本地实践机会", effects: { study: 2, money: 3, mood: 2 }, result: "你错过了远方，也把资源留给了更适合当前状态的计划。" }
    ] },
    { icon: "💼", title: "实习和期末考试撞在一起", story: "实习单位临时把重要任务提前，恰好撞上两门期末考试。两边都说这是不能错过的节点。", choices: [
      { label: "和实习主管协商交付时间", requires: { social: 45 }, effects: { social: 3, study: 3, mood: -2 }, result: "协商没有让任务消失，却争取到一段能真正完成考试的时间。" },
      { label: "先保住考试，接受实习评价下降", effects: { study: 5, social: -3, mood: -1 }, result: "成绩稳住了，实习总结里却留下了配合不足的评价。" }
    ] },
    { icon: "🩺", title: "一次必须预约的检查", story: "持续的不适没有因为熬过期末周而消失。校医院建议你去做进一步检查，费用和时间都需要安排。", choices: [
      { label: "按建议检查，不继续拖延", requires: { money: 5 }, effects: { health: 6, money: -5, mood: -1 }, result: "检查没有发现严重问题，也明确了接下来该如何恢复。" },
      { label: "先调整作息，再观察一个月", effects: { health: 2, mood: 1 }, result: "症状暂时缓和，但你知道如果再次出现就不能继续拖。" }
    ] }
  ]) };
}

function createScholarshipFollowUp(admission) {
  const strong = state.stats.study >= 72;
  return {
    id: createId(), icon: strong ? "🏅" : "📋", title: "奖学金答辩结果",
    story: strong
      ? `评审认可了你在${admission.major}课程里的持续表现，也追问了你如何平衡生活和学习。`
      : "你的材料完整，但与其他候选人相比，课程成绩和实践经历还缺少一项明显优势。",
    choices: strong ? [
      { label: "接受奖励，并留下一部分作为应急金", effects: { money: 14, mood: 4, study: 1 }, result: "奖学金到账后，你没有立刻花掉全部，而是给未来留了一点缓冲。" },
      { label: "用奖励参加一项专业训练", effects: { money: 6, study: 5, health: -1 }, result: "钱很快变成课程和材料，能力的增长则需要更久才能看见。" }
    ] : [
      { label: "向评审询问具体差距", effects: { study: 4, mood: -1 }, result: "没有得到奖金，但你拿到了一份比模糊失落更有用的改进方向。" },
      { label: "接受结果，不再反复比较", effects: { mood: 4, health: 1 }, result: "名单不会改变，你把注意力重新放回自己的节奏。" }
    ]
  };
}

function createUniversityThresholdScene(key, band) {
  const scenes = {
    study: {
      low: { icon: "📉", title: "绩点进入危险区", story: "连续缺交作业和考试失利让课程亮起预警。再不补救，奖学金、实习和毕业资格都会受影响。", choices: [
        { label: "找任课老师确认补救方案", effects: { study: 8, mood: -2 }, result: "问题没有消失，但你拿到了一份能执行的补救清单。" },
        { label: "减少社交，集中补最危险的课程", effects: { study: 7, social: -2 }, result: "几周很单调，最危险的一门课终于回到及格线附近。" }
      ] },
      high: { icon: "🏅", title: "成绩进入专业前列", story: "较高的绩点带来奖学金、交换和导师项目的机会，也意味着后续选择会更看重你的持续表现。", choices: [
        { label: "申请导师项目，继续提高门槛", effects: { study: 3, social: 3, health: -2 }, result: "你进入更真实的项目环境，发现高分只是入场券。" },
        { label: "维持成绩，把时间留给实践", effects: { study: 1, mood: 3, social: 2 }, result: "你没有只追逐数字，经历开始变得更完整。" }
      ] }
    },
    health: {
      low: { icon: "🏥", title: "身体撑不住大学日程", story: "熬夜、兼职和课程叠在一起，校医院建议你暂停高压安排。继续硬撑可能直接影响考试和实习。", choices: [
        { label: "请假检查并完整休息", effects: { health: 9, study: -2, money: -3 }, result: "付出了时间和费用，身体终于不再用更强烈的方式提醒你。" },
        { label: "退掉一项额外安排", effects: { health: 7, mood: 3, social: -1 }, result: "日程少了一项，生活重新出现可以呼吸的空隙。" }
      ] },
      high: { icon: "🏃", title: "稳定体能带来更多选择", story: "规律作息和运动让你能承担课程之外的活动，但好状态也可能被误认为永远不会透支。", choices: [
        { label: "参加一次校园运动活动", effects: { health: 2, social: 4, mood: 2 }, result: "你认识了不同专业的人，也保住了自己的节奏。" },
        { label: "保持现有安排，不额外加码", effects: { health: 2, mood: 3 }, result: "你没有把每一份余力都立刻兑换成任务。" }
      ] }
    },
    mood: {
      low: { icon: "🌧️", title: "大学生活失去方向感", story: "课程、关系和未来都像没有答案。连续几周，你很难从任何事情里获得期待。", choices: [
        { label: "预约学校心理咨询并减少安排", effects: { mood: 9, health: 3 }, result: "生活没有立刻变好，但你开始把困境当作可以处理的问题。" },
        { label: "把真实状态告诉可信任的人", effects: { mood: 8, social: 4 }, result: "有人知道以后，你不必继续独自维持正常。" }
      ] },
      high: { icon: "🌤️", title: "你开始享受大学生活", story: "你对课程和身边的人都有稳定兴趣。新的机会不断出现，但好状态同样需要边界。", choices: [
        { label: "尝试一个一直想做的新活动", effects: { mood: 3, social: 4, money: -2 }, result: "这段经历未必写进简历，却让生活变得具体。" },
        { label: "维持节奏，不把快乐变成任务", effects: { mood: 2, health: 3 }, result: "你保留了轻松，而不是急着证明它有价值。" }
      ] }
    },
    social: {
      low: { icon: "🪑", title: "你与同学越来越疏远", story: "课程通知、组队和实习消息常常最后才传到你这里。大学关系不只影响心情，也影响信息和机会。", choices: [
        { label: "从一次课程小组合作重新建立联系", effects: { social: 7, study: 2 }, result: "有具体任务作为开场，交流没有想象中困难。" },
        { label: "主动联系一个仍然信任的人", effects: { social: 6, mood: 3 }, result: "关系没有立刻恢复，但对话重新开始了。" }
      ] },
      high: { icon: "🤝", title: "校园关系开始带来机会", story: "同学愿意把项目、社团职位和招聘信息转给你。人缘成为资源，也带来更多请求。", choices: [
        { label: "选择真正匹配的一次合作", effects: { social: 3, study: 3, health: -1 }, result: "你没有接下所有邀请，而是把一次合作认真做完。" },
        { label: "先维持关系，不新增任务", effects: { social: 2, mood: 3 }, result: "你学会让关系流动，而不是用答应所有事情维持它。" }
      ] }
    },
    family: {
      low: { icon: "☎️", title: "你很久没有认真和家里说话", story: "电话只剩生活费和成绩问答。离家之后的沉默，让彼此越来越不知道对方真正的处境。", choices: [
        { label: "打一次不赶时间的视频电话", effects: { family: 8, mood: 2 }, result: "你们没有讨论宏大未来，只重新知道了彼此最近怎么生活。" },
        { label: "安排假期回家，提前留出费用", effects: { family: 7, money: -4 }, result: "车票花掉了一部分钱，也让回家从一句话变成具体计划。" }
      ] },
      high: { icon: "🏠", title: "家庭成为稳定后盾", story: "无论考试、兼职还是去向选择，你都愿意和家里讨论。支持不是替你决定，而是让失败仍有落脚处。", choices: [
        { label: "一起讨论毕业后的现实预算", effects: { family: 3, study: 2, money: 2 }, result: "理想和房租、收入、城市成本第一次写在同一张纸上。" },
        { label: "安排一次不谈学业的相处", effects: { family: 4, mood: 4, money: -3 }, result: "你们度过了一段普通时间，关系没有只围绕未来运转。" }
      ] }
    }
  };
  return { id: createId(), ...scenes[key][band] };
}

function createExtraScene() {
  if (state.career) return createCareerExtraScene();
  if (["dropout", "work"].includes(state.education.track)) return generateLifeScene(state.character);
  if (isUniversityLife()) return createUniversityExtraScene();
  return Math.random() < 0.7 ? createSchoolExtraScene() : Math.random() < 0.5 ? pick(EVENTS) : generateLifeScene(state.character);
}

function createSchoolExtraScene() {
  const friend = state.friends.length ? pick(state.friends) : null;
  const family = state.character.family;
  const scenes = [
    {
      icon: "📱", title: "手机屏幕突然碎了", story: "放学挤公交时手机从口袋滑落，屏幕裂出一道长纹。还能用，但触控开始失灵。",
      choices: [
        { label: "先用旧手机，坚持到下个月", effects: { mood: -2, money: 2 }, result: "使用很不方便，但你没有立刻打乱原来的预算。" },
        { label: "拿出存下的钱去维修", requires: { money: 8 }, effects: { money: -8, mood: 3 }, result: "手机恢复正常，余额却明显薄了一截。" }
      ]
    },
    {
      icon: "🚌", title: "一次不在计划里的校外参观", story: "学校临时获得一个城市展馆的参观名额，需要周末出发，也要自己承担餐费和交通。",
      choices: [
        { label: "报名参加，去看看课堂之外的东西", requires: { money: 3 }, effects: { study: 3, social: 3, money: -3 }, result: "展览没有直接提高考试分数，却让一个抽象知识变得真实。" },
        { label: "不参加，把周末留给原计划", effects: { study: 2, health: 2 }, result: "你错过了一次集体经历，也保住了原本安排好的时间。" }
      ]
    },
    {
      icon: "🏫", title: "班主任下学期要调走", story: "消息在班里传开。有人难过，有人松了一口气，也有人开始担心新的管理方式。",
      choices: [
        { label: "认真写一张告别卡片", effects: { social: 3, mood: 2, study: 1 }, result: "老师收下卡片时没有说很多，只提醒你以后也要为自己的选择负责。" },
        { label: "保持平常，不把变化想得太重", effects: { mood: 2, health: 1 }, result: "告别安静发生，新的学期仍会按时到来。" }
      ]
    },
    {
      icon: "💼", title: "家里的工作安排发生变化", story: `${state.character.parent}。最近家里的工作时间和收入出现变化，饭桌上开始频繁讨论开支。`,
      choices: [
        { label: "主动减少自己的非必要花销", effects: { family: 5, money: 3, mood: -2 }, result: "你不能解决大人的工作问题，却让家里的预算稍微松了一点。" },
        { label: "问清楚情况，不独自猜测", effects: { family: 4, mood: 2 }, result: "真实情况没有想象中可怕，但未来几个月确实需要更谨慎。" }
      ]
    },
    {
      icon: "📣", title: "班群里出现一条针对你的传言", story: "一段被截掉前后文的聊天记录在同学间转发，你发现讨论的主角正是自己。",
      choices: [
        { label: "找到最初转发的人，当面把事情说清楚", requires: { social: 35 }, effects: { social: 4, mood: -3 }, result: "不是所有人都相信解释，但传言没有继续任意生长。" },
        { label: "保留证据，请班主任介入", effects: { study: 1, social: -1, mood: 2 }, result: "老师处理了传播源，班里的气氛仍花了一段时间才恢复。" }
      ]
    },
    {
      icon: "🏅", title: "一笔临时助学奖励", story: `${family.name}的资料和你最近的表现符合一项校内奖励条件，但申请需要公开部分家庭情况。`,
      choices: [
        { label: "接受现实需要，认真提交申请", requires: { study: 50 }, effects: { money: 10, study: 2, mood: -1 }, result: "奖励到账了，被别人知道家庭情况的不自在也真实存在。" },
        { label: "不申请，保留自己的隐私", effects: { mood: 3 }, result: "你放弃了这笔钱，也保住了不想解释的部分。" }
      ]
    }
  ];
  if (friend) {
    scenes.push({
      icon: "💬", title: `和${friend.name}之间的一次误会`, story: `${friend.name}连续几天回复得很冷淡。你后来听说，对方以为你把一件私下说的话告诉了别人。`,
      choices: [
        { label: "约出来把事情从头说清楚", effects: { social: 2, mood: -2 }, special: { type: "adjustFriend", friendId: friend.id, amount: 5 }, followUp: createFriendTrustFollowUp(friend), result: "解释没有立刻换来原谅，但你们同意再核对一次消息来源。" },
        { label: "先给彼此一点时间，不追着解释", effects: { mood: 1, social: -2 }, special: { type: "adjustFriend", friendId: friend.id, amount: -4 }, result: "冲突没有扩大，关系却暂时退回了更远的位置。" }
      ]
    });
  }
  return { id: createId(), ...pick(scenes) };
}

function generateColleague() {
  const identity = pick(["boy", "girl"]);
  return {
    id: createId(),
    name: `${pick(BACKGROUND_DATA.surnames)}${pick(identity === "girl" ? BACKGROUND_DATA.girlNames : BACKGROUND_DATA.boyNames)}`,
    role: pick(["同组同事", "资深同事", "项目搭档", "隔壁组同事"]),
    trait: pick(["做事仔细但说话直接", "消息灵通但很看重回报", "平时安静，关键时刻愿意帮忙", "能力不错，也有很强的个人打算"]),
    closeness: 35
  };
}

function ensureCareerColleague() {
  state.career.colleagues ??= [];
  if (!state.career.colleagues.length) state.career.colleagues.push(generateColleague());
  return pick(state.career.colleagues);
}

function createJobSocialScenes(career) {
  const colleague = ensureCareerColleague();
  const social = state.stats.social;
  const common = [{
    icon: "🗣️", title: "办公室里出现两种说法",
    story: `项目延期后，两个小组互相认为责任在对方。${colleague.name}提醒你，主管很快会分别找人了解情况。`,
    choices: [
      { label: "只说明自己确认过的事实", effects: { social: 3, study: 2, mood: -1 }, special: { type: "adjustColleague", colleagueId: colleague.id, amount: 3 }, result: "你没有替任何一边编故事，也让主管看见了完整的时间线。" },
      { label: `先和${colleague.name}统一说法`, effects: { social: 2, mood: -2 }, special: { type: "adjustColleague", colleagueId: colleague.id, amount: 5 }, result: "你们暂时站到了一边，但这份默契也带上了职场立场。" }
    ]
  }];
  if (social <= 35) {
    common.push(
      {
        icon: "🔕", title: "重要消息最后才传到你这里", story: "排班和项目安排已经在私下讨论过一轮，你直到正式通知前才知道，几乎没有调整空间。",
        choices: [
          { label: `主动问${colleague.name}以后能否同步消息`, effects: { social: 5, mood: -2 }, special: { type: "adjustColleague", colleagueId: colleague.id, amount: 6 }, result: "对方答应提醒你，也直白地说：平时不来往，大家很容易忘记你。" },
          { label: "直接要求主管建立公开通知规则", effects: { study: 2, social: -2, mood: 1 }, result: "流程变得更透明，一些同事却觉得你把小事上升成了制度问题。" }
        ]
      },
      {
        icon: "⚠️", title: "一次失误被推到了你身上", story: `交付出错后，有人说“最后是你经手的”。你手里有部分记录，却缺少愿意当场替你说明的同事。`,
        choices: [
          { label: "整理记录，逐项还原责任边界", effects: { study: 4, social: 1, mood: -3 }, result: "你证明问题不全由自己造成，也意识到只埋头做事不足以保护自己。" },
          { label: "先承担补救，再私下解释", effects: { social: 2, health: -3, mood: -2 }, result: "项目被救回来了，责任归属却只得到模糊修正。" }
        ]
      }
    );
  } else if (social >= 65) {
    common.push(
      {
        icon: "🌟", title: "关键项目点名要你加入", story: `跨部门负责人通过${colleague.name}听说了你的表现，邀请你加入一个能接触核心业务的短期项目。`,
        choices: [
          { label: "加入项目，承担一块明确成果", effects: { study: 4, social: 4, health: -2, mood: 1 }, result: "工作量增加了，但你的名字第一次出现在更高层级的成果里。" },
          { label: "先问清时间和绩效归属", effects: { study: 2, social: 2, mood: 2 }, result: "你没有只被机会两个字打动，而是争取到更明确的责任和评价。" }
        ]
      },
      createCoworkerVentureScene(colleague, career)
    );
  } else {
    common.push({
      icon: "🔄", title: `${colleague.name}准备离职`, story: `${colleague.name}私下告诉你已经拿到新机会，并问你愿不愿意接手一部分工作资料和行业联系人。`,
      choices: [
        { label: "认真完成交接，也维持离职后的联系", effects: { study: 3, social: 4, health: -1 }, special: { type: "adjustColleague", colleagueId: colleague.id, amount: 5 }, result: "你接住了工作，也留下了一条不依附于当前公司的关系。" },
        { label: "只接必要工作，不额外承担人情", effects: { study: 2, mood: 2 }, result: "交接按流程完成，你没有把别人的离职全部变成自己的负担。" }
      ]
    });
  }
  return common;
}

function createCoworkerVentureScene(colleague, career) {
  const background = CAREER_BACKGROUND[state.character.family.id] ?? CAREER_BACKGROUND["dual-income"];
  const venture = {
    id: createId(), name: `${colleague.name}的${background.business}`, partner: colleague.name,
    capital: 20, baseIncome: 3, risk: 3, months: 0, totalIncome: 0, lastIncome: 0, active: true
  };
  return {
    icon: "🤝", title: `${colleague.name}私下问你要不要一起做项目`,
    story: `${colleague.name}说自己准备做“${venture.name}”，希望你出资金或直接成为合伙人。对方有一份初步计划，但客户、回款和分工都还没有被验证。`,
    choices: [
      { label: "先看客户、成本和分工，不当场答应", effects: { study: 2, social: 2 }, followUp: createVentureTermsScene(colleague, career, venture), result: "你没有被熟人和创业两个词催着转账，而是要求把数字和责任写清楚。" },
      { label: "明确拒绝，只维持同事关系", effects: { mood: 2, social: -1 }, special: { type: "adjustColleague", colleagueId: colleague.id, amount: -2 }, result: "对方有些失望，但你保住了工资、现金和关系边界。" }
    ]
  };
}

function createVentureTermsScene(colleague, career, venture) {
  return {
    id: createId(), icon: "📑", title: `${venture.name}的合伙条件`,
    story: `计划写明：小额入股需要 20，每月分成会在亏损 -${venture.risk} 到盈利 ${venture.baseIncome + venture.risk} 之间波动；全职合伙需要投入 35，并放弃当前稳定工资。`,
    choices: [
      { label: "投入20，保留工作并作为小股东", requires: { money: 20 }, effects: { money: -20, social: 2 }, special: { type: "addVenture", venture }, result: `你成为小股东。项目每月可能分成，也可能继续亏损；${colleague.name}负责日常经营。` },
      { label: "投入35并辞职，成为全职合伙人", requires: { money: 35, social: 60 }, effects: { money: -35, mood: 3, health: -2 }, special: { type: "switchCareerToBusiness", venture }, result: `你离开${career.employer}，与${colleague.name}共同经营${venture.name}。稳定工资从此被经营收入取代。` },
      { label: "看完方案后拒绝，不投入", effects: { study: 2, mood: 1 }, special: { type: "adjustColleague", colleagueId: colleague.id, amount: -1 }, result: "你认可对方做了准备，但风险仍超过自己能承担的范围。" }
    ]
  };
}

function createFriendTrustFollowUp(friend) {
  return {
    id: createId(), icon: "🔎", title: `误会的来源`, story: `你和${friend.name}终于找到最初那条消息，发现是另一位同学转述时漏掉了关键一句。现在要决定是否继续追究。`,
    choices: [
      { label: "只澄清事实，不把矛盾继续扩大", effects: { social: 4, mood: 3 }, special: { type: "adjustFriend", friendId: friend.id, amount: 7 }, result: `你和${friend.name}的关系慢慢恢复，也共同划清了以后谈论隐私的边界。` },
      { label: "要求对方在群里公开道歉", effects: { social: 2, mood: 1 }, special: { type: "adjustFriend", friendId: friend.id, amount: 3 }, result: "道歉让事情结束得更明确，也让几个人之间留下了尴尬。" }
    ]
  };
}

function createCareerExtraScene() {
  const career = state.career;
  const scenes = [
    {
      icon: "🔌", title: "这个月的水电账单比预期高",
      story: `${career.housing}的实际开支并不完全固定。空调、热水和公共费用让账单多了几项。`,
      choices: [
        { label: "核对明细并调整下个月用量", effects: { study: 2, money: -2 }, result: "钱还是花了，但你开始知道生活成本具体从哪里产生。" },
        { label: "先正常缴费，不让生活被账单占满", effects: { money: -4, mood: 2 }, result: "你付清了账单，也保留了这个月基本的舒适。" }
      ]
    },
    career.location === "away" ? {
      icon: "🏘️", title: "合租房里的公共开支",
      story: "室友提出重新分摊网费和清洁用品，但每个人在家的时间不同，怎么算都有人觉得吃亏。",
      choices: [
        { label: "按人数均摊，并把规则写清楚", effects: { social: 3, money: -2 }, result: "规则不可能绝对公平，但之后少了很多重复争执。" },
        { label: "少争论一次，自己多承担一点", effects: { social: 1, money: -4, mood: -1 }, result: "事情很快过去，你也意识到退让会变成别人默认的规则。" }
      ]
    } : {
      icon: "🍚", title: "住在家里也不是完全免费",
      story: "家人没有收房租，但买菜、网络和家务都是真实成本。你需要决定如何分担。",
      choices: [
        { label: "固定承担一部分家庭开支", effects: { family: 5, money: -4 }, result: "住家成本仍然很低，但你不再把家人的承担当作理所当然。" },
        { label: "多做家务，暂时保留现金", effects: { family: 4, health: -1 }, result: "你用时间分担了生活，现金压力没有继续增加。" }
      ]
    },
    career.path === "business" ? {
      icon: "📦", title: "一笔突然取消的订单", story: `客户临时取消了${career.name}的一笔订单，已经投入的材料和时间无法全部收回。`,
      choices: [
        { label: "把现有成果改成可再次销售的版本", effects: { study: 3, money: -2 }, result: "损失没有消失，但剩余投入被转成了下一次机会。" },
        { label: "接受损失，今后先收定金", effects: { money: -4, study: 2, mood: -2 }, result: "这次付了学费，之后的合同里多了一条明确规则。" }
      ]
    } : {
      icon: "🚇", title: "通勤时间正在吞掉晚上", story: `从${career.housing}到${career.employer}的往返，让工作日剩下的时间比想象中更少。`,
      choices: [
        { label: "利用通勤学习一点职业内容", effects: { study: 3, health: -1 }, result: "碎片时间有了用途，但大脑也更难真正停下来。" },
        { label: "通勤时彻底休息，不再处理工作", effects: { mood: 3, health: 1 }, result: "路程没有变短，但它不再全部属于公司。" }
      ]
    }
  ];
  if (career.path === "job") {
    scenes.push(
      {
        icon: "📉", title: "部门突然冻结招聘", story: `${career.employer}通知近期业务收缩。暂时没有明确裁员名单，但试用期和绩效较低的人最先感到压力。`,
        choices: [
          { label: "整理成果，主动和主管确认预期", effects: { study: 3, social: 2, mood: -2 }, result: "你没有获得绝对保证，却知道接下来必须守住哪些结果。" },
          { label: "悄悄更新简历，同时维持当前工作", effects: { study: 2, social: 3, health: -1 }, result: "你没有立刻离职，但为最坏情况留了一条出口。" }
        ]
      },
      {
        icon: "📈", title: "主管提出一次晋升面谈", story: `你在${career.title}岗位的表现进入候选名单。新岗位工资更高，也会增加协调和加班责任。`,
        choices: [
          { label: "参加面谈，争取更高岗位", requires: { study: 58, social: 45 }, effects: { study: 2, mood: -1 }, followUp: createPromotionFollowUp(career), result: "你把做过的事情整理成具体结果，晋升讨论进入正式流程。" },
          { label: "暂不竞争，先稳定生活状态", effects: { health: 3, mood: 3 }, result: "收入暂时不变，你也没有让刚稳定的生活再次失控。" }
        ]
      },
      {
        icon: "💸", title: "工资比约定日期晚了", story: "财务通知工资要延迟一周，但房租和生活账单仍按原日期到期。",
        choices: [
          { label: "使用应急金，等待正式到账", requires: { money: 6 }, effects: { money: -3, mood: -2 }, result: "账单没有逾期，应急金却少了一层缓冲。" },
          { label: "和房东说明情况，协商延后几天", effects: { social: 2, mood: -2 }, result: "房东同意了这一次，也明确下个月不能继续拖延。" }
        ]
      }
    );
  } else {
    scenes.push(
      {
        icon: "🚚", title: "供应商临时上调价格", story: `${career.name}常用的一项材料突然涨价，现有报价继续执行就会压缩利润。`,
        choices: [
          { label: "寻找新供应商并先做小批测试", effects: { study: 3, money: -3, social: 2 }, result: "新材料没有立刻全面替代，但你不再只有一个进货渠道。" },
          { label: "维持原供应商，调整下一批报价", effects: { money: 2, social: -2 }, result: "成本暂时可控，一部分价格敏感的客户却离开了。" }
        ]
      },
      {
        icon: "⭐", title: "平台上出现一条差评", story: `一位客户给${career.name}留下低分评价，描述里既有真实问题，也有超出约定的要求。`,
        choices: [
          { label: "公开回应并补救真实问题", effects: { social: 4, money: -4, mood: -2 }, result: "差评没有删除，但后来的客户看到了你处理问题的方式。" },
          { label: "提交申诉，不接受全部责任", effects: { study: 2, social: -1, mood: 1 }, result: "平台保留了评价，也撤掉了其中一项不实指控。" }
        ]
      },
      {
        icon: "🧾", title: "第一次认真处理经营手续", story: "业务开始持续产生收入，记账、票据和合规登记不再能靠记忆应付。",
        choices: [
          { label: "花钱请专业人员梳理一次", requires: { money: 6 }, effects: { money: -6, study: 4, mood: 2 }, result: "流程终于变清楚，也避免了以后更昂贵的补救。" },
          { label: "自己查资料，先完成最必要部分", effects: { study: 5, health: -2, mood: -1 }, result: "你花了几个晚上，至少让账和票据开始能对得上。" }
        ]
      }
    );
  }
  if (career.location === "away") {
    scenes.push({
      icon: "🔑", title: "房东通知下次续租要涨价", story: `现在的房租是 ${career.rent}。房东提出续租后每月再加 2，也允许你到期搬走。`,
      choices: [
        { label: "接受涨租，保留现在的通勤和生活", effects: { mood: -2 }, special: { type: "adjustCareer", rentDelta: 2 }, result: "你省下搬家折腾，之后每个月却要承担更高固定开支。" },
        { label: "开始寻找更远但便宜的住处", effects: { money: -3, health: -2, study: 2 }, special: { type: "adjustCareer", rentDelta: -2, livingDelta: 1 }, result: "搬家花掉一笔钱，房租下降了，通勤和日常不便却增加。" },
        { label: "不再续租，搬回家乡", effects: { family: 3, mood: -2 }, special: { type: "moveCareerHome" }, result: "你结束外地租房生活，机会范围变窄，固定开支也明显下降。" }
      ]
    });
  }
  if ((career.arrears ?? 0) > 0) {
    scenes.push({
      icon: "📨", title: "欠款提醒再次出现", story: `你还有 ${career.arrears} 没有结清。继续拖延不会立刻结束人生，但会压缩每一个新选择。`,
      choices: [
        { label: "拿出当前余额优先补欠款", requires: { money: 1 }, effects: {}, special: { type: "payArrears", amount: Math.min(10, career.arrears) }, result: "你先补上能承担的一部分，欠款开始下降。" },
        { label: "继续保留现金，应对下个月基本生活", effects: { mood: -2 }, result: "欠款仍在，但你没有把手里最后的钱全部交出去。" }
      ]
    });
  }
  return { id: createId(), ...pick(scenes) };
}

function createPromotionFollowUp(career) {
  const passed = state.stats.study + state.stats.social >= 118;
  return {
    id: createId(), icon: passed ? "🪜" : "📋", title: "晋升面谈结果",
    story: passed ? "主管认可了你的成果，但明确新岗位会同时负责进度和新人协作。" : "你的工作结果合格，但跨团队经验还不足，这次岗位给了另一位候选人。",
    choices: passed ? [
      { label: "接受晋升和新的责任", effects: { money: 5, health: -2 }, special: { type: "adjustCareer", incomeDelta: 4, title: `${career.title}（晋升）` }, result: "基本收入提高了，从下个月开始，责任和压力也会一起进入日常。" },
      { label: "暂缓晋升，保留当前节奏", effects: { mood: 3, health: 2 }, result: "岗位没有变化，你保留了一次被认可的记录。" }
    ] : [
      { label: "询问差距，准备下一轮", effects: { study: 4, mood: -1 }, result: "这次没有涨薪，但你知道下一段经历该补在哪里。" },
      { label: "不再纠结，把重心转回生活", effects: { mood: 4, health: 2 }, result: "结果没有改变，你也没有让一次落选占满接下来的日子。" }
    ]
  };
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
      { label: "直接捐一元，不参加抽奖", requires: { money: 1 }, effects: { money: -1, mood: 2 }, special: { type: "recordChance", name: "校园义卖捐款", stake: 1, prize: 0 }, result: "你没有拿抽奖券，只把一元放进捐款箱。结果不随机，去向却很清楚。" },
      { label: "口袋空空，看看热闹就离开", effects: { mood: 1 }, result: "你没有因为没钱硬撑。看完开奖后，你跟着人群离开了摊位。" }
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
  if (state.education.retaking && state.turn >= state.education.retakeDue) return createGaokaoScene(true);
  if (isUniversityLife()) {
    const admission = state.education.admission;
    if (state.turn >= admission.startTurn + admission.duration) return createCollegeGraduationScene();
  }
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

function createGaokaoScene(isRetake = false) {
  const score = Math.max(260, Math.min(690, Math.round(280 + state.stats.study * 4.2 + randomBetween(-45, 45))));
  const choices = [];
  let resultLine;
  if (score >= 620) {
    const elite = createCollegeAdmission("elite", score);
    const bachelor = createCollegeAdmission("bachelor", score);
    resultLine = "这个分数进入重点本科录取范围，也可以为了专业或城市选择普通本科。";
    choices.push(
      { label: `进入${elite.school} · ${elite.major}（重点本科）`, effects: { study: 5, family: 5, money: -12 }, special: { type: "enrollCollege", admission: elite }, result: `录取通知书来自${elite.school}。四年的专业学习、宿舍生活和毕业竞争从这里开始。` },
      { label: `选择${bachelor.school} · ${bachelor.major}（普通本科）`, effects: { study: 4, mood: 3, money: -8 }, special: { type: "enrollCollege", admission: bachelor }, result: `你根据专业和城市选择了${bachelor.school}，而不是只看学校层次。` }
    );
  } else if (score >= 500) {
    const bachelor = createCollegeAdmission("bachelor", score);
    const junior = createCollegeAdmission("junior", score);
    resultLine = "这个分数达到普通本科录取范围，也保留了更偏技能和就业的专科选择。";
    choices.push(
      { label: `进入${bachelor.school} · ${bachelor.major}（普通本科）`, effects: { study: 5, family: 4, money: -8 }, special: { type: "enrollCollege", admission: bachelor }, result: `录取通知书到来。你将在${bachelor.school}完成四年本科。` },
      { label: `选择${junior.school} · ${junior.major}（专科）`, effects: { study: 3, mood: 3, money: -5 }, special: { type: "enrollCollege", admission: junior }, result: `你选择更强调实操的${junior.school}，学制三年。` }
    );
  } else if (score >= 360) {
    const junior = createCollegeAdmission("junior", score);
    resultLine = "这个分数没有进入本科录取范围，但达到了专科批次。继续读书、复读和工作都有现实代价。";
    choices.push(
      { label: `进入${junior.school} · ${junior.major}（专科）`, effects: { study: 4, family: 2, money: -5 }, special: { type: "enrollCollege", admission: junior }, result: `你进入${junior.school}。三年后可以就业，也可以争取专升本。` },
      { label: "复读一年，再参加一次高考", effects: { study: 3, mood: -5, family: -2, money: -6 }, special: { type: "startRetake", score }, result: "你回到复读班。下一次考试可能提高，也可能承受更重的压力。" }
    );
  } else {
    resultLine = "这个分数没有达到本地专科批次。复读或进入社会，成为眼前最现实的两条路。";
    choices.push({ label: "复读一年，再参加一次高考", effects: { study: 4, mood: -6, family: -2, money: -6 }, special: { type: "startRetake", score }, result: "你决定再用一年换一次机会，但结果仍要由下一年的状态决定。" });
  }
  choices.push({ label: "不继续读大学，直接寻找工作", effects: { money: 10, family: -3, mood: -1 }, special: { type: "setTrack", track: "work", gaokaoScore: score }, result: "你离开升学系统，开始用技能、收入和工作经历建立下一阶段。" });
  return {
    id: createId(), icon: "🎓", title: `高考放榜：${score} 分`,
    story: `${isRetake ? "这是复读后的第二次成绩。" : "这是你第一次正式面对大学录取批次。"}${resultLine}`,
    choices
  };
}

function createOverseasApplicationScene() {
  const success = state.stats.study + state.stats.social + randomBetween(-20, 20) >= 115;
  const admission = createCollegeAdmission("overseas", null);
  return {
    id: createId(), icon: "✈️", title: "海外申请结果",
    story: success ? "邮箱里出现了期待已久的录取通知。新的国家、语言和生活成本都变得真实。" : "理想学校没有给出录取，但你仍收到了一些其他项目的机会。",
    choices: [
      { label: success ? `接受${admission.school}录取，去海外学习` : `选择${admission.school}，继续海外路线`, effects: { study: 5, money: -18, family: -3 }, special: { type: "enrollCollege", admission }, result: `行李箱被合上时，你知道${admission.major}的四年学习真正开始了。` },
      { label: "结束国际路线，先进入社会", effects: { money: 8, mood: -2 }, special: { type: "setTrack", track: "work" }, result: "投入没有完全按计划开花，但语言和经历仍然属于你。" }
    ]
  };
}

function createVocationalGraduationScene() {
  const admission = createCollegeAdmission("junior", null);
  return {
    id: createId(), icon: "🧰", title: "中职毕业：第一份正式去向",
    story: "实习单位给出留用机会，老师也建议你考虑继续升学。手艺、学历和收入各有现实代价。",
    choices: [
      { label: "接受留用，开始正式工作", effects: { money: 15, study: 2 }, special: { type: "setTrack", track: "work" }, result: "从实习生到正式员工，你开始独立承担工作结果。" },
      { label: `参加考试，进入${admission.school}`, effects: { study: 6, money: -5 }, special: { type: "enrollCollege", admission }, result: `你进入${admission.major}专业，决定再给自己三年系统学习的时间。` }
    ]
  };
}

function createCollegeAdmission(level, score) {
  const profile = COLLEGE_DATA[level];
  return {
    level,
    label: profile.label,
    school: pick(profile.schools),
    major: pick(COLLEGE_MAJORS),
    duration: profile.duration,
    startTurn: state.turn,
    score
  };
}

function getCareerEducationBonus() {
  const level = state.education.admission?.level;
  return ({ postgraduate: 7, elite: 5, overseas: 5, bachelor: 3, topup: 3, junior: 1 }[level] ?? 0);
}

function buildCareerProfile(path, location) {
  const background = CAREER_BACKGROUND[state.character.family.id] ?? CAREER_BACKGROUND["dual-income"];
  const away = location === "away";
  const educationBonus = getCareerEducationBonus();
  if (path === "job") {
    const title = away ? `${state.education.admission?.major ?? "综合"}相关岗位` : background.homeJob;
    return {
      path, location, locationLabel: away ? "去外地闯荡" : "留在家乡",
      title, employer: away ? "外地成长型公司" : `${state.character.city}本地单位`,
      housing: away ? "与人合租" : "与家人同住",
      baseIncome: (away ? 24 : 18) + educationBonus,
      rent: away ? 8 : 0, utilities: away ? 3 : 2, livingCost: away ? 6 : 4,
      arrears: 0, months: 0, colleagues: [], startedTurn: state.turn, economicModel: 2
    };
  }
  return {
    path, location, locationLabel: away ? "去外地闯荡" : "留在家乡",
    name: background.business,
    title: "经营者", employer: background.business,
    housing: away ? "与人合租并租用共享工位" : "住在家中并从低成本场地起步",
    baseIncome: away ? 42 : 32,
    rent: away ? 9 : 2, utilities: away ? 4 : 3, livingCost: away ? 6 : 4,
    arrears: 0, months: 0, colleagues: [], startedTurn: state.turn, economicModel: 3
  };
}

function createCareerLocationScene(path) {
  const background = CAREER_BACKGROUND[state.character.family.id] ?? CAREER_BACKGROUND["dual-income"];
  const homeCareer = buildCareerProfile(path, "home");
  const awayCareer = buildCareerProfile(path, "away");
  const resourceLevel = state.character.family.resourceLevel;
  const homeStartup = path === "business" ? Math.max(8, 30 - resourceLevel * 4) : 0;
  const awayStartup = path === "business" ? homeStartup + 10 : 8;
  const pathText = path === "business" ? `创业方向是“${background.business}”。${background.support}` : `家乡可接触的岗位是“${background.homeJob}”。${background.support}`;
  return {
    id: createId(), icon: path === "business" ? "🚀" : "🧳",
    title: path === "business" ? "在哪里开始创业" : "留在家乡，还是去外地",
    story: `${pathText} 留乡成本低、家庭联系更稳定；外地机会和收入上限较高，但要先承担搬家、房租、水电和独立生活费。`,
    choices: [
      {
        label: path === "business" ? `留在家乡，从${background.business}起步` : `留在家乡，接受${background.homeJob}`,
        requires: path === "business" ? { money: homeStartup } : undefined,
        effects: path === "business" ? { money: -homeStartup, family: 4, mood: 1 } : { family: 5, mood: 1 },
        special: { type: "startCareer", career: homeCareer, graduated: true },
        result: path === "business"
          ? `你投入 ${homeStartup} 作为启动资金，利用熟悉的家庭与社区资源开始经营。`
          : "你留在熟悉的城市开始工作，没有房租压力，但收入和机会也更接近本地水平。"
      },
      {
        label: path === "business" ? `去外地，把${background.business}做成独立项目` : "去外地闯荡，先租房再找工作",
        requires: { money: awayStartup },
        effects: { money: -awayStartup, family: -4, social: 3, mood: -2 },
        special: { type: "startCareer", career: awayCareer, graduated: true },
        result: path === "business"
          ? `你拿出 ${awayStartup} 支付启动、搬家和押金，到了外地从零寻找客户。`
          : "你支付了搬家和押金，在外地与人合租。更高的工资要先经过试用期和每月生活成本检验。"
      }
    ]
  };
}

function createCollegeGraduationScene() {
  const admission = state.education.admission;
  const choices = [];
  if (admission.level === "junior") {
    const topup = createCollegeAdmission("topup", admission.score);
    choices.push({ label: `参加专升本，进入${topup.school}`, requires: { study: 60, money: 15 }, effects: { study: 5, money: -10, mood: -2 }, special: { type: "enrollCollege", admission: topup }, result: `你通过专升本进入${topup.school}，还需要两年完成本科学历。` });
  } else if (["elite", "bachelor", "overseas", "topup"].includes(admission.level)) {
    const postgraduate = createCollegeAdmission("postgraduate", admission.score);
    choices.push({ label: `继续读研：${postgraduate.school} · ${postgraduate.major}`, requires: { study: 70, money: 20 }, effects: { study: 5, money: -12, health: -2 }, special: { type: "enrollCollege", admission: postgraduate }, result: "你没有把读研当作自动延期就业，而是接受了新的研究和毕业门槛。" });
  }
  const background = CAREER_BACKGROUND[state.character.family.id] ?? CAREER_BACKGROUND["dual-income"];
  const minimumStartup = Math.max(8, 30 - state.character.family.resourceLevel * 4);
  choices.push(
    {
      label: "直接就业：先找一份工作", effects: { study: 2, family: 2 },
      followUp: createCareerLocationScene("job"),
      result: `你拿到${admission.label}毕业证，开始比较家乡岗位、外地工资和真实居住成本。`
    },
    {
      label: `尝试创业：${background.business}`, requires: { money: minimumStartup }, effects: { study: 2, mood: 2 },
      followUp: createCareerLocationScene("business"),
      result: `你没有把创业理解成自动赚钱，而是先根据${state.character.family.name}能提供的资源确定低成本起点。`
    }
  );
  return {
    id: createId(), icon: "🎓", title: `${admission.school}毕业季`,
    story: `你完成了${admission.major}专业的${Math.round(admission.duration / 10)}年学制。成绩、实习、人际关系和家庭条件共同影响下一步，但毕业不会自动兑换成理想工作。`,
    choices
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
  if (special.type === "startCareer") {
    state.career = { ...special.career, startedTurn: state.turn, months: 0, arrears: 0 };
    state.education.track = "work";
    state.education.exitTurn = state.turn;
    state.education.retaking = false;
    if (special.graduated && state.education.admission) state.education.admission.graduatedAt = getStage(state.turn).label;
  }
  if (special.type === "payArrears" && state.career) {
    const payment = Math.min(special.amount, state.career.arrears ?? 0, state.stats.money);
    applyToStats(state.stats, { money: -payment });
    state.career.arrears = Math.max(0, (state.career.arrears ?? 0) - payment);
    if (payment) recordMoneyChange(-payment, "补交生活欠款");
  }
  if (special.type === "moveCareerHome" && state.career) {
    state.career.location = "home";
    state.career.locationLabel = "搬回家乡";
    state.career.housing = "与家人同住";
    state.career.rent = state.career.path === "business" ? 2 : 0;
    state.career.utilities = state.career.path === "business" ? 3 : 2;
    state.career.livingCost = 4;
    state.career.baseIncome = Math.max(8, state.career.baseIncome - 4);
  }
  if (special.type === "expandCareer" && state.career?.path === "business") {
    state.career.baseIncome += 5;
    state.career.rent += 3;
    state.career.utilities += 1;
    state.career.expansions = (state.career.expansions ?? 0) + 1;
  }
  if (special.type === "adjustCareer" && state.career) {
    state.career.baseIncome = Math.max(0, state.career.baseIncome + (special.incomeDelta ?? 0));
    state.career.rent = Math.max(0, state.career.rent + (special.rentDelta ?? 0));
    state.career.utilities = Math.max(1, state.career.utilities + (special.utilitiesDelta ?? 0));
    state.career.livingCost = Math.max(2, state.career.livingCost + (special.livingDelta ?? 0));
    if (special.title) state.career.title = special.title;
  }
  if (special.type === "addProperty") {
    state.investments ??= createEmptyInvestments();
    if (!state.investments.properties.some((property) => property.id === special.property.id)) {
      state.investments.properties.push({ ...special.property });
    }
  }
  if (special.type === "setPropertyStatus") {
    const property = state.investments?.properties.find((item) => item.id === special.propertyId);
    if (property) property.status = special.status;
  }
  if (special.type === "sellProperty") {
    state.investments.properties = state.investments.properties.filter((property) => property.id !== special.propertyId);
  }
  if (special.type === "tradeStock") {
    const stocks = state.investments.stocks;
    const currentUnits = stocks.holdings[special.stockId] ?? 0;
    if (special.side === "buy") {
      const oldCost = (stocks.averageCosts[special.stockId] ?? 0) * currentUnits;
      const nextUnits = currentUnits + special.units;
      stocks.holdings[special.stockId] = nextUnits;
      stocks.averageCosts[special.stockId] = Math.round(((oldCost + special.price * special.units) / nextUnits) * 10) / 10;
    } else {
      stocks.holdings[special.stockId] = Math.max(0, currentUnits - special.units);
      if (stocks.holdings[special.stockId] === 0) stocks.averageCosts[special.stockId] = 0;
    }
  }
  if (special.type === "adjustColleague" && state.career) {
    const colleague = state.career.colleagues?.find((item) => item.id === special.colleagueId);
    if (colleague) colleague.closeness = Math.max(0, Math.min(100, colleague.closeness + special.amount));
  }
  if (special.type === "addVenture") {
    state.investments.ventures ??= [];
    if (!state.investments.ventures.some((venture) => venture.id === special.venture.id)) {
      state.investments.ventures.push({ ...special.venture });
    }
  }
  if (special.type === "switchCareerToBusiness" && state.career) {
    state.career.path = "business";
    state.career.name = special.venture.name;
    state.career.title = "合伙经营者";
    state.career.employer = special.venture.name;
    state.career.baseIncome = state.career.location === "away" ? 42 : 32;
    state.career.economicModel = 3;
    state.career.businessPartner = special.venture.partner;
    state.career.months = 0;
  }
  if (special.type === "setRoute") {
    state.education.route = special.route;
    state.education.track = special.track;
    if (special.track === "dropout") {
      state.education.exitTurn = state.turn;
      state.education.retaking = false;
    }
  }
  if (special.type === "setTrack") {
    state.education.track = special.track;
    if (special.gaokaoScore !== undefined) state.education.gaokaoScore = special.gaokaoScore;
    if (special.track === "work") {
      state.education.exitTurn = state.turn;
      state.education.retaking = false;
      if (special.graduated && state.education.admission) state.education.admission.graduatedAt = getStage(state.turn).label;
    }
  }
  if (special.type === "enrollCollege") {
    state.education.track = "university";
    state.education.retaking = false;
    delete state.education.retakeDue;
    state.education.admission = { ...special.admission, startTurn: state.turn };
    if (special.admission.score !== null && special.admission.score !== undefined) state.education.gaokaoScore = special.admission.score;
  }
  if (special.type === "startRetake") {
    state.education.route = "domestic";
    state.education.track = "academic";
    state.education.retaking = true;
    state.education.retakeDue = state.turn + 10;
    state.education.gaokaoScore = special.score;
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

function createAssetManagementScene() {
  const properties = state.investments.properties;
  const stockValue = Math.round(getStockMarketValue());
  return {
    id: createId(), icon: "🏦", title: "这个月的资产安排",
    story: `你有 ${properties.length} 套房产，股票账户市值 ${stockValue}，可用资金 ${state.stats.money}。房产门槛高、现金流较稳；股票随市场涨跌，可能盈利也可能亏损。`,
    choices: [
      { label: `查看房产市场与已有房产（${properties.length}套）`, effects: {}, followUp: createPropertyMarketScene(), result: "你打开房产清单，开始比较价格、租金和出售价值。" },
      { label: `查看股票账户（市值${stockValue}）`, effects: {}, followUp: createStockMarketScene(), result: "行情只是当前价格，不保证下个月继续同一方向。" },
      { label: "这个月不投资，保留现金", effects: { mood: 2 }, result: "没有交易也是一种决定。现金不会上涨，却能应对生活里的意外。" }
    ]
  };
}

function createPropertyMarketScene() {
  const owned = state.investments.properties;
  const choices = [];
  owned.slice(0, 3).forEach((property) => {
    choices.push({
      label: `管理${property.name}（${property.status === "rented" ? `出租中，每月净租${property.rentIncome - property.monthlyFee}` : "空置中"}）`,
      effects: {}, followUp: createPropertyManagementScene(property), result: "你重新核对这套房的租赁状态、维护费和当前市场价值。"
    });
  });
  PROPERTY_TYPES.forEach((type) => {
    const property = {
      id: createId(), typeId: type.id, name: type.name, icon: type.icon,
      purchasePrice: type.price, marketValue: type.price, rentIncome: type.rentIncome,
      monthlyFee: type.monthlyFee, status: "vacant", purchasedAt: getStage(state.turn).label
    };
    choices.push({
      label: `购买${type.name}（${type.price}，潜在净月租${type.rentIncome - type.monthlyFee}）`,
      requires: { money: type.price }, effects: { money: -type.price },
      special: { type: "addProperty", property }, followUp: createPropertyUseScene(property),
      result: `你支付 ${type.price} 买下${type.name}。房子已经属于你，但空置时仍要承担每月 ${type.monthlyFee} 的维护费。`
    });
  });
  choices.push({ label: "暂时不买，继续积累首付款", effects: { study: 1, mood: 1 }, result: "你记下价格和租金，没有因为能看见资产就仓促买入。" });
  return {
    id: createId(), icon: "🏘️", title: "房产市场",
    story: "房价会逐月小幅波动。出租能带来固定租金，但要扣维护费；空置房仍有成本，卖出价格也可能低于买入价。",
    choices
  };
}

function createPropertyUseScene(property) {
  return {
    id: createId(), icon: property.icon, title: `${property.name}如何使用`,
    story: `这套房当前市值 ${property.marketValue}。如果出租，每月租金 ${property.rentIncome}、维护费 ${property.monthlyFee}；保留空置则只有维护支出。`,
    choices: [
      { label: "立即出租，建立每月租金收入", effects: { mood: 2 }, special: { type: "setPropertyStatus", propertyId: property.id, status: "rented" }, result: `房子成功出租，从下个月开始每月获得净租金 ${property.rentIncome - property.monthlyFee}。` },
      { label: "暂时空置，等待以后决定", effects: { mood: 1 }, result: `房子暂时空置，每月仍会扣除 ${property.monthlyFee} 的维护费。` }
    ]
  };
}

function createPropertyManagementScene(property) {
  const liveProperty = state.investments.properties.find((item) => item.id === property.id) ?? property;
  const salePrice = Math.max(1, Math.round(liveProperty.marketValue * (0.92 + Math.random() * 0.16)));
  const choices = [];
  if (liveProperty.status !== "rented") {
    choices.push({ label: `出租，每月净收入${liveProperty.rentIncome - liveProperty.monthlyFee}`, effects: { mood: 2 }, special: { type: "setPropertyStatus", propertyId: liveProperty.id, status: "rented" }, result: "租约签好后，这套房从下个月开始带来稳定现金流。" });
  } else {
    choices.push({ label: "继续出租，维持固定收入", effects: { mood: 1 }, result: "租客继续居住，租金按月进入你的账户。" });
    choices.push({ label: "结束出租，暂时收回房屋", effects: { mood: -1 }, special: { type: "setPropertyStatus", propertyId: liveProperty.id, status: "vacant" }, result: "房屋重新空置，租金停止，维护费用仍会继续。" });
  }
  choices.push(
    { label: `按当前报价 ${salePrice} 卖出`, effects: { money: salePrice }, special: { type: "sellProperty", propertyId: liveProperty.id }, result: `交易完成，你收回 ${salePrice}。与买入价 ${liveProperty.purchasePrice} 相比，盈亏已经兑现。` },
    { label: "继续持有，不改变用途", effects: {}, result: "你保留了房产，也继续承担它当前的收益和成本。" }
  );
  return {
    id: createId(), icon: liveProperty.icon, title: `管理${liveProperty.name}`,
    story: `买入价 ${liveProperty.purchasePrice}，当前估值 ${liveProperty.marketValue}，状态为${liveProperty.status === "rented" ? "出租" : "空置"}。`, choices
  };
}

function createStockMarketScene() {
  const stocks = state.investments.stocks;
  const choices = [];
  STOCK_PRODUCTS.forEach((product) => {
    const price = stocks.prices[product.id] ?? product.basePrice;
    const units = stocks.holdings[product.id] ?? 0;
    const bundle = 5;
    const total = Math.round(price * bundle);
    choices.push({
      label: `买入${product.name} ${bundle}份（${total}）`, requires: { money: total }, effects: { money: -total },
      special: { type: "tradeStock", side: "buy", stockId: product.id, units: bundle, price },
      result: `你以每份 ${price} 买入${product.name} ${bundle}份。下个月价格可能上涨，也可能下跌。`
    });
    if (units > 0) {
      choices.push({
        label: `卖出${product.name}全部 ${units}份（约${Math.round(price * units)}）`, effects: { money: Math.round(price * units) },
        special: { type: "tradeStock", side: "sell", stockId: product.id, units, price },
        result: `你按当前价格卖出${product.name}，账面涨跌变成了真实盈亏。`
      });
    }
  });
  choices.push({ label: "不交易，只观察市场", effects: { study: 2, mood: 1 }, result: "你记录了价格，没有因为一次涨跌就改变全部计划。" });
  const quote = STOCK_PRODUCTS.map((product) => `${product.icon}${product.name} ${stocks.prices[product.id] ?? product.basePrice}（持有${stocks.holdings[product.id] ?? 0}）`).join("；");
  return { id: createId(), icon: "📈", title: "简化股票市场", story: `${quote}。宽基波动较小，成长科技波动较大，红利组合每三个月可能分红。这里没有稳赚选项。`, choices };
}

function createCareerLeisureScene() {
  const scenes = [
    { icon: "🎬", title: "真正不谈工作的晚上", story: "你关掉工作消息，选了一部一直想看的电影。今晚没有绩效、客户或账单讨论。", choices: [
      { label: "买点喜欢的食物，好好看完", effects: { mood: 5, money: -3 }, result: "剧情结束时问题仍在，但你重新感觉生活不只剩任务。" },
      { label: "在家简单休息，不额外消费", effects: { mood: 4, health: 2 }, result: "一个安静晚上没有产出，却让疲惫真正下降。" }
    ] },
    { icon: "🌳", title: "离住处不远的公园", story: "天气难得舒服，公园里有人跑步、遛狗，也有人只是坐着发呆。", choices: [
      { label: "慢慢走一圈，把手机调成静音", effects: { mood: 5, health: 3 }, result: "没有花钱的一段时间，也能让身体和情绪同时松下来。" },
      { label: "约朋友一起吃顿简单的饭", effects: { mood: 5, social: 4, money: -4 }, result: "你们没有解决未来，只认真交换了最近的生活。" }
    ] },
    { icon: "🎨", title: "重新捡起以前的爱好", story: `工作之后，你已经很久没有认真使用“${state.character.talent.name}”这项天赋。这个月终于空出半天。`, choices: [
      { label: "买一点材料，认真做一次", effects: { mood: 6, study: 2, money: -3 }, result: "成品不一定有用，但那几个小时重新属于你自己。" },
      { label: "先从免费的方式重新开始", effects: { mood: 5, health: 1 }, result: "没有昂贵装备，兴趣仍然慢慢回来了。" }
    ] }
  ];
  return { id: createId(), ...pick(scenes) };
}

function createCareerActionScene(action) {
  if (action.id === "luck") return createLuckScene();
  if (action.id === "assets") return createAssetManagementScene();
  if (action.id === "leisure") return createCareerLeisureScene();
  const career = state.career;
  const isBusiness = career.path === "business";
  const sceneMap = {
    work: {
      icon: "💼", title: `${career.employer}的一次考核`,
      story: `主管把一项时间紧、责任明确的任务交给你。做好可能换来绩效，出错也会直接写进评价。`,
      choices: [
        { label: "先确认标准，再按节点交付", effects: { study: 3, social: 2, money: 3 }, result: "任务按时交付，绩效里多了一条可以被看见的结果。" },
        { label: "主动多接一部分，争取更高评价", effects: { money: 6, health: -4, mood: -2 }, result: "收入和评价提高了，但连续加班也留下了真实疲惫。" }
      ]
    },
    skill: {
      icon: "🛠️", title: "下班后的技能课程", story: `你找到一门和${career.title}相关的课程，但学习会占掉连续几个晚上。`,
      choices: [
        { label: "完成课程并做一份作品", effects: { study: 5, health: -2, money: -2 }, result: "证书不保证涨薪，但作品让下一次面试有了具体内容。" },
        { label: "只补当前工作最缺的一项", effects: { study: 3, mood: 2 }, result: "你没有贪多，先解决了眼前最常返工的问题。" }
      ]
    },
    network: {
      icon: "🤝", title: "行业里的一次新联系", story: `一位前辈愿意介绍你认识同行，但聚会需要花时间和一笔交通餐饮费。`,
      choices: [
        { label: "赴约并认真了解对方的工作", effects: { social: 5, money: -3, study: 2 }, result: "没有立刻得到工作，但你知道了行业里真实的招聘标准。" },
        { label: "先在线联系，保留以后见面的机会", effects: { social: 3, mood: 1 }, result: "关系没有突飞猛进，却留下了一条以后可以继续联系的线。" }
      ]
    },
    "job-search": {
      icon: "📄", title: "一份更好的岗位邀请", story: `另一家公司给出面试机会，工资可能更高，但通勤、试用期和稳定性都需要重新计算。`,
      choices: [
        { label: "参加面试，先拿到具体条件再判断", effects: { study: 3, social: 3, mood: -1 }, result: "你拿到了一份可比较的条件，而不是只凭想象辞职。" },
        { label: "暂时留下，先积累半年经验", effects: { mood: 2, study: 1 }, result: "你没有追逐每一个机会，而是给当前履历留出完整的一段经历。" }
      ]
    },
    finances: {
      icon: "🧾", title: "重新核对这个月的生活账", story: `你的固定开支是房租 ${career.rent}、基础水电 ${career.utilities}、生活费 ${career.livingCost}。目前还有 ${career.arrears ?? 0} 的欠款。`,
      choices: [
        { label: "减少非必要消费，留出应急金", effects: { money: 3, mood: -2, study: 1 }, result: "预算变得不那么舒服，却更能抵抗下个月的意外。" },
        { label: "维持当前生活质量，不再额外压缩", effects: { mood: 3 }, result: "你保住了生活感，也接受存款增长会更慢。" }
      ]
    },
    operate: {
      icon: "🧰", title: `${career.name}的日常交付`, story: `这个月的订单挤在一起，一位老客户又临时修改需求。`,
      choices: [
        { label: "重新排期，保证已经承诺的质量", effects: { study: 3, social: 3, money: 8 }, result: "客户多等了一点时间，但尾款顺利到账，也愿意继续合作。" },
        { label: "加班全部接下，先保住现金收入", effects: { money: 15, health: -5, mood: -2 }, result: "一批订单集中回款，连续赶工也让身体明显透支。" }
      ]
    },
    customers: {
      icon: "📣", title: "第一批真正会付钱的客户", story: `有人对${career.name}感兴趣，但希望先低价试一次。`,
      choices: [
        { label: "接受小单，用结果换口碑", effects: { social: 5, money: 2, study: 2 }, result: "利润不高，但客户留下了一条真实评价。" },
        { label: "守住价格，只接能覆盖成本的订单", effects: { money: 4, social: -1, mood: 1 }, result: "你失去了一笔小单，却没有让忙碌变成亏损。" }
      ]
    },
    product: {
      icon: "🧪", title: "产品需要重新打磨", story: `几位客户指出了同一个问题。改进需要投入资金，也可能减少以后返工。`,
      choices: [
        { label: "花钱改进最关键的环节", effects: { study: 5, money: -5, mood: -1 }, result: "短期现金变少了，交付却开始稳定下来。" },
        { label: "先做低成本修补，观察下个月", effects: { study: 2, money: -1 }, result: "问题暂时可控，但没有彻底消失。" }
      ]
    },
    cashflow: {
      icon: "📊", title: "账上收入不等于真正利润", story: `你把${career.name}的流水、成本和未收款重新列了一遍，发现忙碌并不一定意味着赚钱。`,
      choices: [
        { label: "停止一项低利润业务", effects: { study: 3, money: 4, mood: -1 }, result: "订单少了一些，现金流反而变得清楚。" },
        { label: "催收已经到期的款项", effects: { money: 6, social: -2 }, result: "一部分款项终于到账，合作关系也变得更现实。" }
      ]
    },
    expand: {
      icon: "🚀", title: `${career.name}是否该扩张`, story: "现有业务开始稳定，有人建议租更大的地方或招一名帮手。扩张会提高上限，也会把固定成本锁得更高。",
      choices: [
        { label: "小规模扩张，只增加必要投入", effects: { money: -8, social: 3, study: 2 }, special: { type: "expandCareer" }, result: "你增加了一部分产能，下个月的收入和固定成本都会提高。" },
        { label: "暂不扩张，先积累三个月现金", effects: { money: 3, mood: 2 }, result: "你放弃了速度，换来更厚一点的安全垫。" }
      ]
    }
  };
  if (action.id === "family") return createWorkFamilyScene();
  if (action.id === "rest") return createWorkRestScene();
  const scene = sceneMap[action.id] ?? (isBusiness ? sceneMap.operate : sceneMap.work);
  return { id: createId(), ...scene };
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

