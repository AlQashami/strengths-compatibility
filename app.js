const TALENTS = [
  { id: 'achiever', ar: 'المنجز', en: 'Achiever', domain: 'executing' },
  { id: 'arranger', ar: 'المرتّب', en: 'Arranger', domain: 'executing' },
  { id: 'belief', ar: 'الاعتقاد', en: 'Belief', domain: 'executing' },
  { id: 'consistency', ar: 'الثبات', en: 'Consistency', domain: 'executing' },
  { id: 'deliberative', ar: 'التأنّي', en: 'Deliberative', domain: 'executing' },
  { id: 'discipline', ar: 'الانضباط', en: 'Discipline', domain: 'executing' },
  { id: 'focus', ar: 'التركيز', en: 'Focus', domain: 'executing' },
  { id: 'responsibility', ar: 'المسؤولية', en: 'Responsibility', domain: 'executing' },
  { id: 'restorative', ar: 'المُصلح', en: 'Restorative', domain: 'executing' },

  { id: 'activator', ar: 'المنشّط', en: 'Activator', domain: 'influencing' },
  { id: 'command', ar: 'التحكّم', en: 'Command', domain: 'influencing' },
  { id: 'communication', ar: 'التواصل', en: 'Communication', domain: 'influencing' },
  { id: 'competition', ar: 'المنافسة', en: 'Competition', domain: 'influencing' },
  { id: 'maximizer', ar: 'المُتقن', en: 'Maximizer', domain: 'influencing' },
  { id: 'self_assurance', ar: 'الثقة بالنفس', en: 'Self-Assurance', domain: 'influencing' },
  { id: 'significance', ar: 'الأهمية', en: 'Significance', domain: 'influencing' },
  { id: 'woo', ar: 'الودّ', en: 'Woo', domain: 'influencing' },

  { id: 'adaptability', ar: 'التكيّف', en: 'Adaptability', domain: 'relationship' },
  { id: 'connectedness', ar: 'الترابط', en: 'Connectedness', domain: 'relationship' },
  { id: 'developer', ar: 'المطوّر', en: 'Developer', domain: 'relationship' },
  { id: 'empathy', ar: 'إدراك المشاعر', en: 'Empathy', domain: 'relationship' },
  { id: 'harmony', ar: 'التوافق', en: 'Harmony', domain: 'relationship' },
  { id: 'includer', ar: 'المُحتوي', en: 'Includer', domain: 'relationship' },
  { id: 'individualization', ar: 'التفرّد', en: 'Individualization', domain: 'relationship' },
  { id: 'positivity', ar: 'التفاؤل', en: 'Positivity', domain: 'relationship' },
  { id: 'relator', ar: 'عميق العلاقة', en: 'Relator', domain: 'relationship' },

  { id: 'analytical', ar: 'التحليل', en: 'Analytical', domain: 'strategic' },
  { id: 'context', ar: 'السياق', en: 'Context', domain: 'strategic' },
  { id: 'futuristic', ar: 'المستقبلي', en: 'Futuristic', domain: 'strategic' },
  { id: 'ideation', ar: 'ابتكار الأفكار', en: 'Ideation', domain: 'strategic' },
  { id: 'input', ar: 'التجميع', en: 'Input', domain: 'strategic' },
  { id: 'intellection', ar: 'الفكر', en: 'Intellection', domain: 'strategic' },
  { id: 'learner', ar: 'المُتعلّم', en: 'Learner', domain: 'strategic' },
  { id: 'strategic', ar: 'الاستراتيجي', en: 'Strategic', domain: 'strategic' }
];

const TALENT_MAP = Object.fromEntries(TALENTS.map(t => [t.id, t]));

function talentLabel(id) {
  const t = TALENT_MAP[id];
  return `${t.ar} (${t.en})`;
}

function normalizeEnWords(str) {
  return str
    .toLowerCase()
    .replace(/[®™]/g, '')
    .replace(/[^a-z\- ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeArWords(str) {
  return str
    .replace(/[ً-ٰٟۖ-ۭ]/g, '')
    .replace(/ـ/g, '')
    .replace(/[آأإٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[^؀-ۿ ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const DOMAINS = [
  { key: 'executing', ar: 'التنفيذ', dot: 'dot-executing', lead: 'قيادة التنفيذ وتحويل الخطط لنتائج ملموسة على أرض الواقع' },
  { key: 'influencing', ar: 'التأثير', dot: 'dot-influencing', lead: 'قيادة التواصل الخارجي وإقناع الآخرين وبيع الفكرة' },
  { key: 'relationship', ar: 'بناء العلاقات', dot: 'dot-relationship', lead: 'قيادة بناء العلاقات والحفاظ على تماسك الفريق' },
  { key: 'strategic', ar: 'التفكير الاستراتيجي', dot: 'dot-strategic', lead: 'قيادة التحليل ووضع التوجه واتخاذ قرارات مبنية على تفكير عميق' }
];

const DOMAIN_GAP_SUGGESTIONS = {
  executing: ['achiever', 'discipline', 'arranger'],
  influencing: ['command', 'communication', 'activator'],
  relationship: ['relator', 'empathy', 'harmony'],
  strategic: ['strategic', 'analytical', 'ideation']
};

const FRICTION_RULES = [
  { pair: ['harmony', 'activator'], text: 'صاحب الانسجام قد ينزعج من اندفاع صاحب التحريك للتحرك فوراً دون تهيئة الأجواء؛ الحل الاتفاق على وقت قصير للتشاور قبل الحسم.' },
  { pair: ['harmony', 'command'], text: 'صاحب الانسجام يتجنب المواجهة المباشرة بينما صاحب القيادة يميل للحسم الصريح؛ قد يشعر الأول بالضغط من أسلوب الثاني.' },
  { pair: ['deliberative', 'activator'], text: 'صاحب التروي يفضل دراسة المخاطر بعناية بينما صاحب التحريك يريد التحرك فوراً؛ قد يشعر الأول بالتسرع والثاني بالبطء.' },
  { pair: ['discipline', 'adaptability'], text: 'صاحب الانضباط يحب الخطط والروتين الثابت بينما صاحب التكيف يستمتع بالمرونة والتغيير المفاجئ؛ الاحتكاك يظهر حول الجداول الزمنية.' },
  { pair: ['focus', 'ideation'], text: 'صاحب التركيز يريد الالتزام بمسار واحد واضح بينما صاحب توليد الأفكار يتفرع باستمرار لأفكار جديدة؛ قد يشعر الأول بالتشتت.' },
  { pair: ['individualization', 'consistency'], text: 'صاحب الفردية يريد معاملة كل شخص حسب حالته الخاصة بينما صاحب الاتساق يريد قواعد موحدة للجميع؛ احتكاك محتمل حول مفهوم العدالة.' },
  { pair: ['analytical', 'woo'], text: 'صاحب التحليل يحتاج بيانات وأدلة قبل القرار بينما صاحب كسب الود يعمل بالحدس والعلاقات؛ قد يرى الأول الثاني سطحياً والثاني يرى الأول بطيئاً.' },
  { pair: ['competition', 'harmony'], text: 'صاحب المنافسة يحب القياس والمقارنة والفوز بينما صاحب الانسجام يتجنب أي مقارنة قد تسبب خلافاً؛ احتكاك حول طريقة تقييم الأداء.' },
  { pair: ['restorative', 'positivity'], text: 'صاحب الترميم يميل لرؤية المشكلة أولاً بينما صاحب الإيجابية يركز على الجانب المشرق؛ قد يشعر أحدهما أن الآخر يتجاهل الواقع أو يبالغ بالتشاؤم.' },
  { pair: ['command', 'includer'], text: 'صاحب القيادة يحسم القرار بسرعة بينما صاحب الشمول يريد إشراك الجميع بالرأي أولاً؛ قد يشعر الثاني أن رأيه يُتجاوز.' },
  { pair: ['maximizer', 'restorative'], text: 'صاحب التطوير للأفضل يركز جهده على تعزيز نقاط القوة بينما صاحب الترميم يركز على إصلاح نقاط الضعف؛ اختلاف بأولويات التطوير.' },
  { pair: ['context', 'futuristic'], text: 'صاحب السياق يرجع للماضي كمرجع للقرار بينما صاحب الرؤية المستقبلية يركز للأمام دوماً؛ قد يبدو أحدهما متمسكاً بالماضي والآخر بعيداً عن الواقع الحالي.' },
  { pair: ['self_assurance', 'includer'], text: 'صاحب الثقة بالنفس يميل لاتخاذ القرار بثقة عالية دون استشارة الجميع بينما صاحب الشمول يريد سماع رأي كل فرد؛ قد يشعر الثاني أن قراراته تُتخذ دون إشراكه الكافي.' },
  { pair: ['achiever', 'harmony'], text: 'صاحب المنجز يدفع بقوة لإنجاز المهام حتى لو تطلب ذلك نقاشاً حاداً بينما صاحب الانسجام يتجنب أي احتكاك قد يبطئ الإنجاز أو يوتر الأجواء؛ احتكاك حول سرعة اتخاذ القرار مقابل الحفاظ على الانسجام.' },
  { pair: ['futuristic', 'deliberative'], text: 'صاحب الرؤية المستقبلية متحمس للانطلاق نحو رؤية جديدة بينما صاحب التروي يفضل تقييم المخاطر بعناية قبل أي خطوة؛ قد يرى الأول الثاني متردداً والثاني يرى الأول متسرعاً بالحكم على المستقبل.' },
  { pair: ['input', 'focus'], text: 'صاحب جمع المعلومات يحب جمع أكبر قدر من المعلومات والموارد قبل التحرك بينما صاحب التركيز يريد الالتزام بمسار واحد محدد سريعاً؛ احتكاك حول متى يكفي التحضير ومتى يبدأ التنفيذ.' },
  { pair: ['relator', 'woo'], text: 'صاحب بناء العلاقات يفضل دوائر علاقات قليلة وعميقة بينما صاحب كسب الود يستمتع بتوسيع شبكة العلاقات باستمرار؛ قد يشعر الأول أن الثاني سطحي والثاني أن الأول منغلق اجتماعياً.' },
  { pair: ['responsibility', 'adaptability'], text: 'صاحب المسؤولية يلتزم بوعوده وجداوله بدقة بينما صاحب التكيف يفضل ترك المجال مفتوحاً للتغيير حسب الموقف؛ احتكاك حول الالتزام بالمواعيد المسبقة مقابل المرونة اللحظية.' },
  { pair: ['significance', 'empathy'], text: 'صاحب التميز يسعى لتحقيق أثر واضح ومُعترف به بينما صاحب التعاطف يعطي أولوية لمشاعر الآخرين حتى لو تراجع تقديره الشخصي؛ قد يرى الأول الثاني متنازلاً كثيراً والثاني يرى الأول أنانياً أحياناً.' }
];

const PAIR_SYNERGY_RULES = [
  { pair: ['achiever', 'arranger'], text: 'صاحب المنجز يوفر الدافع المستمر للعمل، بينما صاحب المرتّب ينظّم الموارد والخطوات بأفضل شكل لتحقيق ذلك الدافع بكفاءة أعلى.' },
  { pair: ['input', 'connectedness'], text: 'صاحب التجميع يجمع المعلومات والموارد المتفرقة، بينما صاحب الترابط يربطها بمعنى أعمق ويجد الخيط الذي يجمعها؛ توليفة قوية لفهم شامل للموقف.' },
  { pair: ['ideation', 'analytical'], text: 'صاحب ابتكار الأفكار يولّد احتمالات جديدة باستمرار، بينما صاحب التحليل يفحصها بمنطق ودليل قبل تبنّيها؛ توازن ممتاز بين الإبداع والدقة.' },
  { pair: ['command', 'relator'], text: 'صاحب التحكّم يحسم المواقف الصعبة بثقة، بينما صاحب بناء العلاقات يحافظ على متانة العلاقة الشخصية رغم الحسم؛ يمنح الفريق قوة قرار دون خسارة الثقة.' },
  { pair: ['woo', 'deliberative'], text: 'صاحب الودّ يفتح الأبواب ويكسب العلاقات الجديدة بسرعة، بينما صاحب التروي يقيّم بعناية أي هذه العلاقات أو الفرص يستحق الاستثمار فيها فعلاً.' },
  { pair: ['futuristic', 'achiever'], text: 'صاحب الرؤية المستقبلية يرسم رؤية بعيدة المدى ملهمة، بينما صاحب المنجز يحوّل هذه الرؤية لخطوات عمل يومية ملموسة تُنجز فعلياً.' },
  { pair: ['strategic', 'activator'], text: 'صاحب التفكير الاستراتيجي يحدد أفضل مسار من بين احتمالات متعددة، بينما صاحب التحريك يدفع لبدء التنفيذ فوراً دون تسويف؛ مزيج ممتاز بين التخطيط الذكي والانطلاق السريع.' },
  { pair: ['developer', 'maximizer'], text: 'صاحب المطوّر يستمتع برعاية نمو الآخرين من الصفر، بينما صاحب التطوير للأفضل يدفع من هو متميز أصلاً نحو التميز الاستثنائي؛ يغطيان معاً كل مراحل تطوير الفريق.' },
  { pair: ['discipline', 'developer'], text: 'صاحب الانضباط يضع أنظمة وهياكل واضحة للعمل، بينما صاحب المطوّر يستثمر هذه الهياكل لبناء قدرات الأفراد ضمنها بشكل تدريجي وموثوق.' },
  { pair: ['empathy', 'command'], text: 'صاحب التعاطف يستشعر ما يحتاجه الآخرون قبل أن يُقال، بينما صاحب التحكّم يترجم ذلك لقرار واضح وحاسم؛ قيادة إنسانية وحازمة في آن واحد.' },
  { pair: ['learner', 'communication'], text: 'صاحب المتعلّم يكتسب معرفة جديدة باستمرار، بينما صاحب التواصل يعرف كيف يحوّل هذه المعرفة لرسالة مشوّقة وواضحة لبقية الفريق أو الجمهور.' },
  { pair: ['responsibility', 'woo'], text: 'صاحب المسؤولية يبني الثقة عبر الالتزام الفعلي بالوعود، بينما صاحب كسب الود يوسّع دائرة العلاقات التي يمكن البناء عليها هذه الثقة معها.' },
  { pair: ['significance', 'includer'], text: 'صاحب التميز يطمح لإنجاز ذي أثر كبير وملحوظ، بينما صاحب الشمول يحرص أن يشعر الجميع بأنهم جزء من هذا الإنجاز لا مجرد متفرجين عليه.' },
  { pair: ['individualization', 'arranger'], text: 'صاحب الفردية يفهم نقاط تميز كل فرد بدقة، بينما صاحب المرتّب يوزّع الأدوار والمهام بناءً على هذا الفهم لتحقيق أعلى كفاءة ممكنة للفريق.' },
  { pair: ['positivity', 'analytical'], text: 'صاحب الإيجابية يحافظ على حماس الفريق ومعنوياته خلال التحديات، بينما صاحب التحليل يضمن أن القرارات مبنية على أساس واقعي ومنطقي رغم هذا التفاؤل.' },
  { pair: ['belief', 'strategic'], text: 'صاحب الاعتقاد يمنح الفريق هدفاً وقيماً ثابتة يعمل من أجلها، بينما صاحب التفكير الاستراتيجي يحدد أفضل طريق عملي لتحقيق هذا الهدف على أرض الواقع.' }
];

function computePairMatches(list1, list2, rules, limit = 10) {
  const set1 = new Set(list1.slice(0, limit));
  const set2 = new Set(list2.slice(0, limit));
  const matches = [];
  rules.forEach(rule => {
    const [a, b] = rule.pair;
    if (set1.has(a) && set2.has(b)) matches.push({ id1: a, id2: b, text: rule.text });
    else if (set1.has(b) && set2.has(a)) matches.push({ id1: b, id2: a, text: rule.text });
  });
  return matches;
}

function leadTalentInDomain(talentIds, domainKey) {
  return talentIds.find(id => TALENT_MAP[id].domain === domainKey) || null;
}

const SHADOW_DOUBLE_LOOKUP = {
  achiever: 'كلاكما يمتلك موهبة المنجز بقوة، ما يعني خطر الإرهاق (burnout) لأن كليكما لا يعرف متى يتوقف عن العمل أو يمنح نفسه استراحة كافية.',
  command: 'كلاكما يمتلك موهبة القيادة، وهذا قد يتحول لصراع صامت أو معلن حول من يتخذ القرار النهائي في المواقف الحرجة.',
  significance: 'كلاكما يمتلك موهبة التميز، فقد تتحول العلاقة لتنافس على الأضواء والتقدير بدل التكامل والدعم المتبادل.',
  discipline: 'كلاكما يمتلك موهبة الانضباط، وقد ينتج جموداً مفرطاً ومقاومة مشتركة لأي تغيير أو مرونة يتطلبها الموقف.',
  woo: 'كلاكما يمتلك موهبة كسب الود، فقد تبنيان شبكة علاقات واسعة لكنها سطحية دون متابعة عميقة أو التزام طويل الأمد.',
  analytical: 'كلاكما يمتلك موهبة التحليل، وقد يقع الفريق في شلل التحليل (analysis paralysis) وتأخر اتخاذ القرارات بانتظار مزيد من البيانات.',
  restorative: 'كلاكما يمتلك موهبة الترميم، وقد يتحول التركيز بالكامل نحو حل المشاكل والنقد الذاتي، مع إغفال الفرص الجديدة.',
  maximizer: 'كلاكما يمتلك موهبة التطوير للأفضل، وقد يتم تجاهل نقاط الضعف الأساسية التي تحتاج معالجة عاجلة لصالح تعزيز ما هو قوي أصلاً.',
  harmony: 'كلاكما يمتلك موهبة الانسجام، وقد يؤدي ذلك لتجنب النقاشات الضرورية خوفاً من الخلاف، وتأجيل قرارات مهمة.',
  activator: 'كلاكما يمتلك موهبة التحريك، وقد يندفع الفريق لتنفيذ قرارات دون تخطيط كافٍ أو دراسة للمخاطر.',
  focus: 'كلاكما يمتلك موهبة التركيز، وقد ينتج تصلباً بالأولويات ورفضاً مشتركاً لأي تعديل بالمسار حتى لو كان مبرراً.',
  deliberative: 'كلاكما يمتلك موهبة التروي، وقد ينتج تردد مفرط وفرص ضائعة بسبب بطء اتخاذ القرار.',
  competition: 'كلاكما يمتلك موهبة المنافسة، وقد يتحول كل تعاون بينكما لمنافسة حتى في المواقف التي لا تستدعي ذلك.',
  self_assurance: 'كلاكما يمتلك موهبة الثقة بالذات، وقد يصعب على الفريق قبول رأي مخالف أو نقد بنّاء من طرف ثالث.',
  individualization: 'كلاكما يمتلك موهبة الفردية، وقد تبالغان بتخصيص كل شيء لدرجة غياب معايير أو أنظمة موحدة يحتاجها الفريق الأكبر.'
};

// ---------- Multi-person infrastructure (2-10 people) ----------

const PERSON_COLORS = [
  { bg: '#6d1a2b', text: '#ffffff' },
  { bg: '#c9a227', text: '#3c0f1a' },
  { bg: '#2f6d4a', text: '#ffffff' },
  { bg: '#2a5d8f', text: '#ffffff' },
  { bg: '#8a3b6b', text: '#ffffff' },
  { bg: '#b5872f', text: '#3c0f1a' },
  { bg: '#3c7a7a', text: '#ffffff' },
  { bg: '#7a4a2f', text: '#ffffff' },
  { bg: '#5a4a8f', text: '#ffffff' },
  { bg: '#4a7a2f', text: '#ffffff' }
];

function personColor(n) {
  return PERSON_COLORS[(n - 1) % PERSON_COLORS.length];
}

const ARABIC_DIGIT_MAP = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
const ASCII_TO_ARABIC_DIGIT = Object.fromEntries(Object.entries(ARABIC_DIGIT_MAP).map(([ar, en]) => [en, ar]));

function toArabicDigits(num) {
  return String(num).split('').map(ch => ASCII_TO_ARABIC_DIGIT[ch] || ch).join('');
}

const state = {};
let activePersons = [];

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function defaultPersonName(n) {
  if (n === 1) return 'الشخص الأول';
  if (n === 2) return 'الشخص الثاني';
  return `الشخص ${toArabicDigits(n)}`;
}

function getPersonName(n) {
  const el = document.getElementById(`name-${n}`);
  const v = el ? el.value.trim() : '';
  return v || defaultPersonName(n);
}

function domainMeta(key) {
  return DOMAINS.find(d => d.key === key);
}

function ensurePersonState(n) {
  if (!state[n]) state[n] = { talents: [] };
}

function personPanelHTML(n, nameValue) {
  const color = personColor(n);
  const badgeNum = toArabicDigits(n);
  return `<article class="person-panel" data-person="${n}">
      <div class="panel-head">
        <span class="person-badge" style="background:${color.bg};color:${color.text}">${badgeNum}</span>
        <input type="text" class="person-name" id="name-${n}" value="${escapeHtml(nameValue)}" maxlength="30">
      </div>

      <div class="talent-picker">
        <label>أضف موهبة</label>
        <input type="text" class="talent-search" data-person="${n}" placeholder="اكتب اسم الموهبة أو اختر من القائمة...">
        <div class="talent-dropdown hidden" id="dropdown-${n}"></div>
      </div>

      <div class="pdf-upload-row">
        <label class="pdf-upload-btn" for="pdf-upload-${n}">📄 رفع تقرير Gallup (PDF) — تعبئة تلقائية</label>
        <input type="file" id="pdf-upload-${n}" accept="application/pdf" class="pdf-upload-input">
        <p class="pdf-upload-status" id="pdf-status-${n}"></p>
      </div>

      <div class="list-head">
        <span>الترتيب الحالي</span>
        <span class="count-tag" id="count-${n}">0 مواهب</span>
      </div>
      <ol class="talent-list" id="list-${n}"></ol>
      <button class="btn-ghost btn-clear" data-person="${n}">مسح الكل</button>

      <div class="profile-box">
        <div class="profile-row">
          <input type="text" class="profile-name-input" id="profile-name-${n}" placeholder="اسم البروفايل">
          <button class="btn-secondary" id="save-${n}">حفظ البروفايل</button>
        </div>
        <div class="profile-row">
          <select class="profile-select" id="profile-select-${n}"></select>
          <button class="btn-secondary" id="load-${n}">تحميل</button>
          <button class="btn-danger" id="delete-${n}">حذف</button>
        </div>
      </div>
    </article>`;
}

function setPersonCount(newCount, opts = {}) {
  const grid = document.getElementById('people-grid');
  const oldCount = activePersons.length;
  newCount = Math.max(2, Math.min(10, newCount));

  if (newCount === oldCount) return;

  if (newCount < oldCount) {
    const toRemove = activePersons.slice(newCount);
    const willLose = toRemove.filter(n => state[n] && state[n].talents.length);
    if (willLose.length && !opts.skipConfirm) {
      const namesTxt = willLose.map(n => getPersonName(n)).join('، ');
      if (!confirm(`سيتم حذف بيانات: ${namesTxt}. هل تريد المتابعة؟`)) {
        const countSelect = document.getElementById('person-count');
        if (countSelect) countSelect.value = String(oldCount);
        return;
      }
    }
    toRemove.forEach(n => {
      const panel = grid.querySelector(`.person-panel[data-person="${n}"]`);
      if (panel) panel.remove();
      delete state[n];
    });
    activePersons = activePersons.slice(0, newCount);
  } else {
    for (let n = oldCount + 1; n <= newCount; n++) {
      ensurePersonState(n);
      const wrapper = document.createElement('div');
      wrapper.innerHTML = personPanelHTML(n, defaultPersonName(n));
      grid.appendChild(wrapper.firstElementChild);
      activePersons.push(n);
      initPersonPanel(n);
      renderPersonList(n);
    }
  }

  renderSavedProfiles();
  updateAnalyzeHint();
}

function buildDropdown(personNum, query) {
  const dropdown = document.getElementById(`dropdown-${personNum}`);
  const added = new Set(state[personNum].talents);
  const q = query.trim();

  const grouped = {};
  DOMAINS.forEach(d => grouped[d.key] = []);

  const qLower = q.toLowerCase();
  TALENTS.forEach(t => {
    if (added.has(t.id)) return;
    if (q && !t.ar.includes(q) && !t.en.toLowerCase().includes(qLower)) return;
    grouped[t.domain].push(t);
  });

  let html = '';
  let hasAny = false;
  DOMAINS.forEach(d => {
    if (grouped[d.key].length === 0) return;
    hasAny = true;
    html += `<div class="dropdown-group-label">${escapeHtml(d.ar)}</div>`;
    grouped[d.key].forEach(t => {
      html += `<div class="dropdown-item" data-id="${t.id}"><span class="domain-dot ${d.dot}"></span><span>${escapeHtml(talentLabel(t.id))}</span></div>`;
    });
  });

  if (!hasAny) {
    html = `<div class="dropdown-empty">لا توجد نتائج مطابقة أو تمت إضافة جميع المواهب</div>`;
  }

  dropdown.innerHTML = html;
  dropdown.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      addTalent(personNum, item.dataset.id);
      document.querySelector(`.talent-search[data-person="${personNum}"]`).value = '';
      dropdown.classList.add('hidden');
    });
  });
}

function addTalent(personNum, talentId) {
  if (state[personNum].talents.includes(talentId)) return;
  state[personNum].talents.push(talentId);
  renderPersonList(personNum);
}

function removeTalent(personNum, index) {
  state[personNum].talents.splice(index, 1);
  renderPersonList(personNum);
}

function moveTalent(personNum, index, dir) {
  const arr = state[personNum].talents;
  const target = index + dir;
  if (target < 0 || target >= arr.length) return;
  [arr[index], arr[target]] = [arr[target], arr[index]];
  renderPersonList(personNum);
}

function renderPersonList(personNum) {
  const list = document.getElementById(`list-${personNum}`);
  const talents = state[personNum].talents;

  list.innerHTML = talents.map((id, i) => {
    const t = TALENT_MAP[id];
    const d = domainMeta(t.domain);
    return `<li>
      <span class="rank-badge">${i + 1}</span>
      <span class="domain-dot ${d.dot}"></span>
      <span class="talent-item-name">${escapeHtml(talentLabel(t.id))}</span>
      <span class="item-actions">
        <button data-action="up" data-index="${i}" title="تحريك لأعلى">▲</button>
        <button data-action="down" data-index="${i}" title="تحريك لأسفل">▼</button>
        <button class="remove-btn" data-action="remove" data-index="${i}" title="حذف">×</button>
      </span>
    </li>`;
  }).join('');

  list.querySelectorAll('button').forEach(btn => {
    const index = Number(btn.dataset.index);
    btn.addEventListener('click', () => {
      if (btn.dataset.action === 'up') moveTalent(personNum, index, -1);
      else if (btn.dataset.action === 'down') moveTalent(personNum, index, 1);
      else removeTalent(personNum, index);
    });
  });

  const count = talents.length;
  const countTag = document.getElementById(`count-${personNum}`);
  if (count === 0) countTag.textContent = '0 مواهب';
  else if (count === 5) countTag.textContent = 'Top 5';
  else if (count >= 30) countTag.textContent = 'قائمة كاملة';
  else countTag.textContent = `${count} مواهب`;

  updateAnalyzeHint();
}

function updateAnalyzeHint() {
  const hint = document.getElementById('analyze-hint');
  if (!hint) return;
  const notReady = activePersons.filter(n => state[n] && state[n].talents.length < 5);
  if (notReady.length === 0 && activePersons.length >= 2) {
    hint.textContent = 'جاهز للتحليل';
    hint.classList.remove('warn');
  } else {
    hint.textContent = 'أدخل ٥ مواهب على الأقل لكل شخص لبدء التحليل';
    hint.classList.add('warn');
  }
}

function getProfiles() {
  try {
    return JSON.parse(localStorage.getItem('strengthsProfiles')) || [];
  } catch (e) {
    return [];
  }
}

function saveProfiles(profiles) {
  localStorage.setItem('strengthsProfiles', JSON.stringify(profiles));
}

function renderSavedProfiles() {
  const profiles = getProfiles();
  activePersons.forEach(n => {
    const select = document.getElementById(`profile-select-${n}`);
    if (!select) return;
    const current = select.value;
    select.innerHTML = profiles.length
      ? profiles.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')
      : `<option value="">لا توجد بروفايلات محفوظة</option>`;
    if (profiles.some(p => p.id === current)) select.value = current;
  });
}

function saveProfile(personNum) {
  const nameInput = document.getElementById(`profile-name-${personNum}`);
  const name = nameInput.value.trim();
  if (!name) { alert('الرجاء إدخال اسم للبروفايل'); return; }
  if (state[personNum].talents.length === 0) { alert('لا توجد مواهب لحفظها'); return; }

  const profiles = getProfiles();
  const existing = profiles.find(p => p.name === name);
  if (existing) {
    if (!confirm(`يوجد بروفايل باسم "${name}" مسبقاً، هل تريد استبداله؟`)) return;
    existing.talents = [...state[personNum].talents];
  } else {
    profiles.push({ id: Date.now().toString(), name, talents: [...state[personNum].talents] });
  }
  saveProfiles(profiles);
  renderSavedProfiles();
  nameInput.value = '';
}

function loadProfile(personNum) {
  const select = document.getElementById(`profile-select-${personNum}`);
  const profile = getProfiles().find(p => p.id === select.value);
  if (!profile) { alert('اختر بروفايلاً أولاً'); return; }
  state[personNum].talents = [...profile.talents];
  renderPersonList(personNum);
}

function deleteProfile(personNum) {
  const select = document.getElementById(`profile-select-${personNum}`);
  const profiles = getProfiles();
  const profile = profiles.find(p => p.id === select.value);
  if (!profile) { alert('اختر بروفايلاً أولاً'); return; }
  if (!confirm(`حذف البروفايل "${profile.name}"؟`)) return;
  saveProfiles(profiles.filter(p => p.id !== profile.id));
  renderSavedProfiles();
}

function computeDomainScores(talentIds) {
  const n = talentIds.length;
  const rawWeights = {};
  DOMAINS.forEach(d => rawWeights[d.key] = 0);
  let total = 0;

  talentIds.forEach((id, i) => {
    const weight = n - i;
    const domain = TALENT_MAP[id].domain;
    rawWeights[domain] += weight;
    total += weight;
  });

  const percents = {};
  DOMAINS.forEach(d => {
    percents[d.key] = total > 0 ? (rawWeights[d.key] / total) * 100 : 0;
  });

  const rounded = {};
  let sum = 0;
  DOMAINS.forEach(d => {
    rounded[d.key] = Math.round(percents[d.key]);
    sum += rounded[d.key];
  });
  const diff = 100 - sum;
  if (diff !== 0 && total > 0) {
    const topKey = DOMAINS.map(d => d.key).sort((a, b) => percents[b] - percents[a])[0];
    rounded[topKey] += diff;
  }

  const ranked = [...DOMAINS.map(d => d.key)].sort((a, b) => rounded[b] - rounded[a]);

  return { percents: rounded, ranked };
}

function topSet(talentIds, n) {
  return new Set(talentIds.slice(0, Math.min(n, talentIds.length)));
}

const RANKED_LINE_RE = /^(\d{1,2})[.)]\s*(.+)$/;

function normalizeLine(line) {
  return line
    .replace(/[٠-٩]/g, d => ARABIC_DIGIT_MAP[d])
    .replace(/ /g, ' ')
    .trim();
}

function matchTalentPrefix(rest) {
  const restEn = normalizeEnWords(rest);
  const restAr = normalizeArWords(rest);
  let bestId = null;
  let bestLen = -1;

  TALENTS.forEach(t => {
    const nameEn = normalizeEnWords(t.en);
    if (nameEn && (restEn === nameEn || restEn.startsWith(nameEn + ' ')) && nameEn.length > bestLen) {
      bestId = t.id;
      bestLen = nameEn.length;
    }
  });
  if (bestId) return bestId;

  TALENTS.forEach(t => {
    const nameAr = normalizeArWords(t.ar);
    if (nameAr && (restAr === nameAr || restAr.startsWith(nameAr + ' ')) && nameAr.length > bestLen) {
      bestId = t.id;
      bestLen = nameAr.length;
    }
  });
  return bestId;
}

function extractRankedTalentIdsFromText(text) {
  const lines = text.split('\n').map(normalizeLine);
  const matches = [];
  lines.forEach(line => {
    const m = line.match(RANKED_LINE_RE);
    if (!m) return;
    const id = matchTalentPrefix(m[2]);
    if (id) matches.push({ num: parseInt(m[1], 10), id });
  });

  let best = [];
  let current = [];
  matches.forEach(m => {
    if (current.length && m.num === current.length + 1) {
      current.push(m.id);
    } else {
      if (current.length > best.length) best = current;
      current = m.num === 1 ? [m.id] : [];
    }
  });
  if (current.length > best.length) best = current;
  return best;
}

async function getPdfFullText(file) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    content.items.forEach(item => {
      fullText += item.str;
      fullText += item.hasEOL ? '\n' : ' ';
    });
    fullText += '\n';
  }
  return fullText;
}

async function handlePdfUpload(personNum, file) {
  const status = document.getElementById(`pdf-status-${personNum}`);
  status.textContent = 'جارِ قراءة الملف...';
  status.classList.remove('error');
  try {
    const text = await getPdfFullText(file);
    const ids = extractRankedTalentIdsFromText(text);

    if (ids.length < 5) {
      status.textContent = 'لم يتم التعرف على ترتيب مواهب صالح داخل هذا الملف.';
      status.classList.add('error');
      return;
    }

    state[personNum].talents = ids;
    renderPersonList(personNum);
    status.textContent = `تمت تعبئة ${ids.length} موهبة تلقائياً من الملف.`;
  } catch (e) {
    status.textContent = 'تعذّرت قراءة الملف، تأكد أنه تقرير CliftonStrengths بصيغة PDF.';
    status.classList.add('error');
  }
}

// ---------- Analysis helpers (shared by pairwise + team-wide sections) ----------

function isDomainStrongFor(scores, n, key) {
  return scores[n].ranked.slice(0, 2).includes(key) && scores[n].percents[key] > 0;
}

function domainRelation(scores, a, b) {
  const sharedStrength = [];
  const complementary = [];
  const sharedGap = [];
  DOMAINS.forEach(d => {
    const aStrong = isDomainStrongFor(scores, a, d.key);
    const bStrong = isDomainStrongFor(scores, b, d.key);
    if (aStrong && bStrong) sharedStrength.push(d);
    else if (!aStrong && !bStrong) sharedGap.push(d);
    else if (aStrong) complementary.push({ domain: d, strongN: a, weakN: b });
    else complementary.push({ domain: d, strongN: b, weakN: a });
  });
  return { sharedStrength, complementary, sharedGap };
}

function computeCompatibility(scores, a, b, sharedCount, synergyCount, frictionCount) {
  const s1 = scores[a].percents, s2 = scores[b].percents;
  let alignSum = 0;
  DOMAINS.forEach(d => { alignSum += 100 - Math.abs(s1[d.key] - s2[d.key]); });
  const domainAlign = Math.round(alignSum / DOMAINS.length);
  const sharedContribution = Math.min(sharedCount, 5) * 4;
  const synergyContribution = Math.min(synergyCount, 6) * 4;
  const frictionPenalty = frictionCount * 6;
  const raw = 15 + domainAlign * 0.3 + sharedContribution + synergyContribution - frictionPenalty;
  const score = Math.max(5, Math.min(98, Math.round(raw)));
  return { score, domainAlign, sharedContribution, synergyContribution, frictionPenalty, sharedCount, synergyCount, frictionCount };
}

function compatibilityLabel(score) {
  if (score >= 80) return 'توافق قوي جداً';
  if (score >= 65) return 'توافق جيد';
  if (score >= 45) return 'توافق متوسط، يحتاج تنسيقاً واعياً';
  return 'توافق تحدٍّ، يتطلب جهداً واضحاً من الطرفين';
}

function computeCoreSharedTalents(persons, tops) {
  if (persons.length < 2) return [];
  const first = [...tops[persons[0]]];
  return first.filter(id => persons.every(n => tops[n].has(id)));
}

// ---------- Render: domains ----------

function renderDomainsSection(persons, names, scores) {
  let html = '';
  DOMAINS.forEach(d => {
    html += `<div class="domain-chart-row">
      <div class="domain-chart-label"><span><span class="domain-dot ${d.dot}"></span> ${escapeHtml(d.ar)}</span></div>`;
    persons.forEach(n => {
      const color = personColor(n);
      const pct = scores[n].percents[d.key];
      html += `<div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${color.bg};color:${color.text}">${escapeHtml(names[n])} ${pct}%</div></div>`;
    });
    html += `</div>`;
  });
  return html;
}

// ---------- Render: connection map (operates on exactly one pair) ----------

function renderConnectionMapSection(p1Name, p2Name, arr1, arr2, sharedTalentIds, synergyMatches, frictionMatches) {
  const rowHeight = 34;
  const topMargin = 26;
  const width = 640;
  const maxRows = Math.max(arr1.length, arr2.length, 1);
  const height = topMargin + maxRows * rowHeight + 10;
  const rightX = width - 130;
  const leftX = 130;

  const pos1 = {};
  const pos2 = {};
  arr1.forEach((id, i) => { pos1[id] = topMargin + i * rowHeight; });
  arr2.forEach((id, i) => { pos2[id] = topMargin + i * rowHeight; });

  const lines = [];
  sharedTalentIds.forEach(id => {
    if (pos1[id] !== undefined && pos2[id] !== undefined) {
      lines.push({ y1: pos1[id], y2: pos2[id], cls: 'map-line-shared' });
    }
  });
  synergyMatches.forEach(m => {
    if (pos1[m.id1] !== undefined && pos2[m.id2] !== undefined) {
      lines.push({ y1: pos1[m.id1], y2: pos2[m.id2], cls: 'map-line-synergy' });
    }
  });
  frictionMatches.forEach(m => {
    if (pos1[m.id1] !== undefined && pos2[m.id2] !== undefined) {
      lines.push({ y1: pos1[m.id1], y2: pos2[m.id2], cls: 'map-line-friction' });
    }
  });

  let svg = `<svg class="connection-map-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  lines.forEach(l => {
    svg += `<line x1="${rightX}" y1="${l.y1}" x2="${leftX}" y2="${l.y2}" class="${l.cls}" />`;
  });

  arr1.forEach((id, i) => {
    const y = topMargin + i * rowHeight;
    svg += `<circle cx="${rightX}" cy="${y}" r="5" class="map-dot p1" />`;
    svg += `<text x="${rightX - 12}" y="${y + 4}" class="map-label" text-anchor="end" direction="rtl">${escapeHtml(talentLabel(id))}</text>`;
  });

  arr2.forEach((id, i) => {
    const y = topMargin + i * rowHeight;
    svg += `<circle cx="${leftX}" cy="${y}" r="5" class="map-dot p2" />`;
    svg += `<text x="${leftX + 12}" y="${y + 4}" class="map-label" text-anchor="start" direction="rtl">${escapeHtml(talentLabel(id))}</text>`;
  });

  svg += `<text x="${rightX}" y="16" class="map-col-title" text-anchor="end">${escapeHtml(p1Name)}</text>`;
  svg += `<text x="${leftX}" y="16" class="map-col-title" text-anchor="start">${escapeHtml(p2Name)}</text>`;
  svg += `</svg>`;

  const legend = `<div class="map-legend">
    <span class="legend-item"><span class="legend-swatch legend-shared"></span> موهبة مشتركة</span>
    <span class="legend-item"><span class="legend-swatch legend-synergy"></span> تكامل إيجابي</span>
    <span class="legend-item"><span class="legend-swatch legend-friction"></span> احتكاك محتمل</span>
  </div>`;

  let tableRows = '';
  sharedTalentIds.forEach(id => {
    tableRows += `<tr><td>مشترك</td><td colspan="2">${escapeHtml(talentLabel(id))}</td><td>لغة مشتركة تسهّل التفاهم السريع بينكما.</td></tr>`;
  });
  synergyMatches.forEach(m => {
    tableRows += `<tr><td>تكامل</td><td>${escapeHtml(talentLabel(m.id1))} (${escapeHtml(p1Name)})</td><td>${escapeHtml(talentLabel(m.id2))} (${escapeHtml(p2Name)})</td><td>${m.text}</td></tr>`;
  });
  frictionMatches.forEach(m => {
    tableRows += `<tr><td>احتكاك</td><td>${escapeHtml(talentLabel(m.id1))} (${escapeHtml(p1Name)})</td><td>${escapeHtml(talentLabel(m.id2))} (${escapeHtml(p2Name)})</td><td>${m.text}</td></tr>`;
  });

  const table = tableRows
    ? `<table class="dynamics-table map-table"><thead><tr><th>النوع</th><th>موهبة ${escapeHtml(p1Name)}</th><th>موهبة ${escapeHtml(p2Name)}</th><th>التفسير</th></tr></thead><tbody>${tableRows}</tbody></table>`
    : `<p>لا توجد علاقات بارزة بين أبرز مواهب الطرفين ضمن القواعد الحالية.</p>`;

  return `<div class="map-wrap">${svg}</div>${legend}${table}`;
}

// ---------- Render: overlap (per pair + team-wide summary) ----------

function renderOverlapSection(persons, names, scores, tops, pairs) {
  let html = '';

  if (persons.length > 2) {
    const avgScore = Math.round(pairs.reduce((s, p) => s + p.score, 0) / pairs.length);
    html += `<div class="score-badge-row"><span class="score-badge">متوسط التوافق العام للفريق: ${avgScore}%</span><span class="score-label">${compatibilityLabel(avgScore)}</span></div>`;

    const core = computeCoreSharedTalents(persons, tops);
    html += '<div class="subhead">مواهب أساسية مشتركة بين كل أفراد الفريق</div>';
    html += core.length
      ? `<div class="chip-row">${core.map(id => `<span class="chip">${escapeHtml(talentLabel(id))}</span>`).join('')}</div><p>هذه المواهب موجودة عند جميع أفراد الفريق دون استثناء، وتشكل "اللغة المشتركة" أو الثقافة الأساسية للفريق ككل.</p>`
      : `<p>لا توجد موهبة واحدة مشتركة بين جميع أفراد الفريق دفعة واحدة، وهذا طبيعي كلما زاد عدد الأفراد؛ التوافق هنا يُبنى غالباً على أزواج متكاملة أكثر من قاسم مشترك واحد للجميع.</p>`;
  }

  const multi = pairs.length > 1;
  pairs.forEach(pair => {
    const { a, b, sharedNames, synergyMatches, frictionMatches, score, breakdown } = pair;
    const rel = domainRelation(scores, a, b);

    let pairHtml = `<div class="score-badge-row"><span class="score-badge">درجة التوافق: ${score}%</span><span class="score-label">${compatibilityLabel(score)}</span></div>`;
    pairHtml += `<p class="score-explain">يعتمد هذا الرقم على: محاذاة الدومينز (${breakdown.domainAlign}%)، ${sharedNames.length} موهبة مشتركة، ${synergyMatches.length} توليفة تكامل إيجابي، و${frictionMatches.length} نقطة احتكاك محتملة.</p>`;

    pairHtml += '<div class="subhead">المواهب المشتركة (لغة مشتركة)</div>';
    if (sharedNames.length) {
      pairHtml += `<div class="chip-row">${sharedNames.map(nm => `<span class="chip">${escapeHtml(nm)}</span>`).join('')}</div>`;
      pairHtml += `<p>وجود هذه المواهب عند الطرفين يعني تفاهماً سريعاً وأسلوب عمل مألوف للاثنين دون حاجة لشرح طويل.</p>`;
    } else {
      pairHtml += `<p>لا توجد مواهب فردية متطابقة ضمن أبرز مواهب الطرفين، لكن هذا لا يمنع وجود توافق على مستوى الدومينز.</p>`;
    }

    pairHtml += '<div class="subhead">دومينز القوة المشتركة</div>';
    pairHtml += rel.sharedStrength.length
      ? `<ul>${rel.sharedStrength.map(d => `<li><strong>${escapeHtml(d.ar)}</strong>: كلا الطرفين قوي فيه، يشكل أرضية مشتركة راسخة للعمل.</li>`).join('')}</ul>`
      : `<p>لا يوجد دومين يشترك فيه الطرفان كأعلى دومين لديهما.</p>`;

    pairHtml += '<div class="subhead">المواهب المكمّلة (تغطية الفجوات)</div>';
    pairHtml += rel.complementary.length
      ? `<ul>${rel.complementary.map(c => `<li><strong>${escapeHtml(c.domain.ar)}</strong>: نقطة قوة عند ${escapeHtml(names[c.strongN])} ونقطة ضعف نسبية عند ${escapeHtml(names[c.weakN])}، ما يعني أن هذه الفجوة عند ${escapeHtml(names[c.weakN])} مغطاة من جهة ${escapeHtml(names[c.strongN])}.</li>`).join('')}</ul>`
      : `<p>لا يوجد تكامل واضح على مستوى الدومينز بين الطرفين حالياً.</p>`;

    pairHtml += '<div class="subhead">تكامل على مستوى المواهب الفردية</div>';
    pairHtml += synergyMatches.length
      ? `<ul>${synergyMatches.map(m => `<li><strong>${escapeHtml(talentLabel(m.id1))}</strong> + <strong>${escapeHtml(talentLabel(m.id2))}</strong>: ${m.text}</li>`).join('')}</ul>`
      : `<p>لا توجد توليفة مواهب معروفة بينهما ضمن قواعد التكامل الفردي حالياً، لكن هذا لا ينفي وجود تكامل على مستوى الدومينز أعلاه.</p>`;

    pairHtml += '<div class="subhead">الفجوات المشتركة بينهما (تحتاج طرفاً آخر)</div>';
    pairHtml += rel.sharedGap.length
      ? `<ul>${rel.sharedGap.map(d => `<li><strong>${escapeHtml(d.ar)}</strong>: كلا الطرفين ضعيف نسبياً فيه، ولا أحد منهما يغطي هذه الفجوة عن الآخر.</li>`).join('')}</ul>`
      : `<p>لا توجد فجوة دومين يشترك فيها الطرفان، وهذه إشارة جيدة لاكتفائهما ذاتياً.</p>`;

    html += multi
      ? `<div class="pair-block"><h3 class="pair-heading">${escapeHtml(names[a])} × ${escapeHtml(names[b])}</h3>${pairHtml}</div>`
      : pairHtml;
  });

  return html;
}

// ---------- Render: dynamics (per pair + team leaderboard) ----------

function renderDynamicsSection(persons, names, scores, talents, pairs) {
  let html = '';

  if (persons.length > 2) {
    html += '<div class="subhead">قيادة كل دومين على مستوى الفريق</div>';
    html += '<table class="dynamics-table"><thead><tr><th>الدومين</th><th>الترتيب من الأقوى للأضعف</th></tr></thead><tbody>';
    DOMAINS.forEach(d => {
      const ranked = [...persons].sort((x, y) => scores[y].percents[d.key] - scores[x].percents[d.key]);
      const cells = ranked.map(n => {
        const lead = leadTalentInDomain(talents[n], d.key);
        const leadTxt = lead ? ` (${escapeHtml(talentLabel(lead))})` : '';
        return `${escapeHtml(names[n])}: ${scores[n].percents[d.key]}%${leadTxt}`;
      }).join(' > ');
      html += `<tr><td>${escapeHtml(d.ar)}</td><td>${cells}</td></tr>`;
    });
    html += '</tbody></table>';
  }

  const multi = pairs.length > 1;
  pairs.forEach(pair => {
    const { a, b } = pair;
    const s1 = scores[a], s2 = scores[b];
    let rows = '';
    DOMAINS.forEach(d => {
      const v1 = s1.percents[d.key];
      const v2 = s2.percents[d.key];
      const lead1 = leadTalentInDomain(talents[a], d.key);
      const lead2 = leadTalentInDomain(talents[b], d.key);
      let leader, detail;

      if (Math.abs(v1 - v2) < 5) {
        leader = 'متكافئ بينهما';
        const parts = [];
        if (lead1) parts.push(`${escapeHtml(names[a])}: ${escapeHtml(talentLabel(lead1))}`);
        if (lead2) parts.push(`${escapeHtml(names[b])}: ${escapeHtml(talentLabel(lead2))}`);
        detail = `${escapeHtml(d.lead)}${parts.length ? ' — أبرز موهبة لكل طرف هنا: ' + parts.join('، ') : ''}`;
      } else {
        const leaderIsA = v1 > v2;
        leader = leaderIsA ? escapeHtml(names[a]) : escapeHtml(names[b]);
        const leadTalent = leaderIsA ? lead1 : lead2;
        detail = `${escapeHtml(d.lead)}${leadTalent ? ' — أبرز ما يقود به: ' + escapeHtml(talentLabel(leadTalent)) : ''}`;
      }

      rows += `<tr><td>${escapeHtml(d.ar)}</td><td>${v1}%</td><td>${v2}%</td><td>${leader}</td><td>${detail}</td></tr>`;
    });

    let pairHtml = `<table class="dynamics-table">
      <thead><tr><th>الدومين</th><th>${escapeHtml(names[a])}</th><th>${escapeHtml(names[b])}</th><th>من يقود عادة</th><th>ماذا يعني ذلك عملياً</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;

    const actionDomains = ['executing', 'influencing'];
    const p1Top = s1.ranked[0];
    const p2Top = s2.ranked[0];
    const p1IsAction = actionDomains.includes(p1Top);
    const p2IsAction = actionDomains.includes(p2Top);

    if (p1IsAction !== p2IsAction) {
      const actionPerson = p1IsAction ? names[a] : names[b];
      const thoughtPerson = p1IsAction ? names[b] : names[a];
      pairHtml += `<p class="subhead">الخلاصة</p><p>بشكل عام، تميل قيادة الجوانب العملية والتنفيذية لتكون من جهة ${escapeHtml(actionPerson)}، بينما تميل قيادة الجوانب الفكرية أو العلاقاتية لتكون من جهة ${escapeHtml(thoughtPerson)}؛ توزيع أدوار طبيعي إذا اتفقتما عليه صراحة.</p>`;
    }

    html += multi
      ? `<div class="pair-block"><h3 class="pair-heading">${escapeHtml(names[a])} × ${escapeHtml(names[b])}</h3>${pairHtml}</div>`
      : pairHtml;
  });

  return html;
}

// ---------- Render: communication (per pair) ----------

function renderCommunicationSection(persons, names, pairs) {
  const multi = pairs.length > 1;
  return pairs.map(pair => {
    const { a, b, sharedNames, frictionMatches } = pair;
    let html = '';
    if (sharedNames.length) {
      html += `<p>امتلاككما لموهبة ${sharedNames.map(nm => `<strong>${escapeHtml(nm)}</strong>`).join('، ')} المشتركة يمنحكما لغة مشتركة وفهماً سريعاً لبعضكما في هذا الجانب.</p>`;
    }

    html += '<div class="subhead">نقاط الاحتكاك المحتملة</div>';
    html += frictionMatches.length
      ? `<ul>${frictionMatches.map(m => `<li>${m.text}</li>`).join('')}</ul>`
      : `<p>لا توجد أنماط احتكاك معروفة بارزة بين أبرز مواهبكما، وهذا مؤشر جيد لسهولة التواصل بينكما.</p>`;

    html += `<div class="subhead">نصيحة عملية</div><p>عند الاختلاف، اتفقا مسبقاً على "قاعدة تحكيم" بسيطة: من يحسم في مواضيع التنفيذ السريع، ومن يحسم في مواضيع تتطلب تروٍّ أو تحليلاً، بدل أن يتكرر الخلاف على نفس النقطة في كل مرة.</p>`;

    return multi
      ? `<div class="pair-block"><h3 class="pair-heading">${escapeHtml(names[a])} × ${escapeHtml(names[b])}</h3>${html}</div>`
      : html;
  }).join('');
}

// ---------- Render: creativity (per pair) ----------

function renderCreativityForPair(p1Name, p2Name, top1, top2) {
  const ST = ['analytical', 'context', 'futuristic', 'ideation', 'input', 'intellection', 'learner', 'strategic'];
  const p1ST = ST.filter(id => top1.has(id));
  const p2ST = ST.filter(id => top2.has(id));

  const p1HasIdeation = top1.has('ideation');
  const p2HasIdeation = top2.has('ideation');
  const p1HasEvaluator = top1.has('analytical') || top1.has('strategic');
  const p2HasEvaluator = top2.has('analytical') || top2.has('strategic');

  let html = '';

  if (p1HasIdeation && p2HasIdeation) {
    html += `<p>كلاكما يمتلك موهبة ${escapeHtml(talentLabel('ideation'))} ويميل لتوليد أفكار جديدة باستمرار؛ احرصا أن يتولى أحدكما دور التقييم والتنفيذ حتى لا تبقى الأفكار نظرية بلا تطبيق.</p>`;
  } else if ((p1HasIdeation && p2HasEvaluator) || (p2HasIdeation && p1HasEvaluator)) {
    const ideator = p1HasIdeation ? p1Name : p2Name;
    const evaluator = p1HasIdeation ? p2Name : p1Name;
    const evaluatorTop = p1HasIdeation ? top2 : top1;
    const evaluatorTalentId = evaluatorTop.has('strategic') ? 'strategic' : 'analytical';
    html += `<p>توليفة قوية للإبداع: إطلاق الأفكار الجديدة (${escapeHtml(talentLabel('ideation'))}) يأتي من جهة ${escapeHtml(ideator)}، بينما يتم تقييمها بعمق (${escapeHtml(talentLabel(evaluatorTalentId))}) من جهة ${escapeHtml(evaluator)} قبل التنفيذ، ما ينتج إبداعاً متوازناً بين التوليد والتمحيص.</p>`;
  } else if (p1ST.length === 0 && p2ST.length === 0) {
    html += `<p>لا توجد مواهب من مجال التفكير الاستراتيجي ضمن أبرز مواهب أي منكما؛ إبداعكما المشترك سيكون غالباً عملياً وتحسينياً (تطوير على شيء قائم) أكثر من كونه ابتكاراً جذرياً من الصفر. عند الحاجة لأفكار جديدة كلياً، استعينا بطرف ثالث أو أدوات خارجية مثل ورش العمل الجماعية أو البيانات والأبحاث.</p>`;
  } else {
    const namesInfo = [];
    if (p1ST.length) namesInfo.push(`${escapeHtml(p1Name)}: ${p1ST.map(id => escapeHtml(talentLabel(id))).join('، ')}`);
    if (p2ST.length) namesInfo.push(`${escapeHtml(p2Name)}: ${p2ST.map(id => escapeHtml(talentLabel(id))).join('، ')}`);
    html += `<p>يمتلك أحدكما على الأقل مواهب من مجال التفكير الاستراتيجي (${namesInfo.join(' — ')})، ما يمنح الثنائي قدرة على التفكير بعمق قبل التنفيذ، لكن تأكدا من إشراك الطرف الآخر بشكل فعّال في هذه المرحلة حتى لا يتحول التفكير لمجهود فردي.</p>`;
  }

  return html;
}

function renderCreativitySection(persons, names, tops, pairs) {
  const multi = pairs.length > 1;
  return pairs.map(pair => {
    const { a, b } = pair;
    const html = renderCreativityForPair(names[a], names[b], tops[a], tops[b]);
    return multi
      ? `<div class="pair-block"><h3 class="pair-heading">${escapeHtml(names[a])} × ${escapeHtml(names[b])}</h3>${html}</div>`
      : html;
  }).join('');
}

// ---------- Render: shadow side (per pair) ----------

function renderShadowSection(persons, names, pairs) {
  const multi = pairs.length > 1;
  return pairs.map(pair => {
    const { a, b, sharedIds } = pair;
    let html;
    if (!sharedIds.length) {
      html = `<p>لا توجد مواهب مضاعفة (مشتركة بقوة) بين الطرفين ضمن أبرز مواهبهما، لذا لا يوجد خطر مبالغة واضح ناتج عن ازدواج نفس الموهبة.</p>`;
    } else {
      const items = sharedIds.map(id => {
        const name = talentLabel(id);
        const specific = SHADOW_DOUBLE_LOOKUP[id];
        const text = specific || `قوة "${escapeHtml(name)}" مضاعفة عند الطرفين يعني ميلاً مشتركاً لنفس السلوك دون طرف يوازنه؛ راقبا المبالغة فيه دون رقيب داخلي للفريق.`;
        return `<li><strong>${escapeHtml(name)}</strong>: ${text}</li>`;
      });
      html = `<ul>${items.join('')}</ul>`;
    }
    return multi
      ? `<div class="pair-block"><h3 class="pair-heading">${escapeHtml(names[a])} × ${escapeHtml(names[b])}</h3>${html}</div>`
      : html;
  }).join('');
}

// ---------- Render: recommendation (team-wide gap; generalizes the 2-person case) ----------

function renderRecommendationSection(persons, names, scores) {
  const teamGap = DOMAINS.filter(d => persons.every(n => !isDomainStrongFor(scores, n, d.key)));
  const isTeam = persons.length > 2;

  if (!teamGap.length) {
    return isTeam
      ? `<p>الفريق مكتفٍ ذاتياً بشكل جيد: يغطي مجالات الدومينز الأربعة معاً دون فجوة يشترك فيها جميع الأفراد. أي تحديات ستكون على مستوى التنسيق بين الأدوار أكثر من نقص جوهري بالمواهب.</p>`
      : `<p>الثنائي مكتفٍ ذاتياً بشكل جيد: يغطي مجالات الدومينز الأربعة معاً دون فجوة مشتركة واضحة. أي تحديات ستكون على مستوى التنسيق بينكما أكثر من نقص جوهري بالمواهب.</p>`;
  }

  const domainList = teamGap.map(d => `<strong>${escapeHtml(d.ar)}</strong>`).join(' و');
  const suggestions = teamGap.map(d => {
    const talentNames = DOMAIN_GAP_SUGGESTIONS[d.key].map(id => talentLabel(id)).join('، ');
    return `<li>لتغطية دومين "${escapeHtml(d.ar)}": ابحثوا عن عضو إضافي تبرز عنده مواهب مثل ${talentNames}.</li>`;
  }).join('');

  const intro = isTeam
    ? `<p>يُنصح بإضافة عضو جديد للفريق يمتلك مواهب قوية في مجال ${domainList}، لأن جميع أفراد الفريق الحاليين لديهم ضعف نسبي فيه ولا أحد منهم يغطي هذه الفجوة عن الآخرين.</p>`
    : `<p>يُنصح بإضافة عضو ثالث للفريق يمتلك مواهب قوية في مجال ${domainList}، لأن كلا الطرفين لديه ضعف نسبي فيه ولا أحد يغطي هذه الفجوة عن الآخر.</p>`;

  return `${intro}<ul>${suggestions}</ul>`;
}

// ---------- Main analysis ----------

function analyze() {
  const notReady = activePersons.filter(n => state[n].talents.length < 5);
  if (notReady.length || activePersons.length < 2) {
    updateAnalyzeHint();
    return;
  }

  const names = {};
  const talents = {};
  const scores = {};
  const tops = {};
  activePersons.forEach(n => {
    names[n] = getPersonName(n);
    talents[n] = state[n].talents;
    scores[n] = computeDomainScores(talents[n]);
    tops[n] = topSet(talents[n], 10);
  });

  const pairs = [];
  for (let i = 0; i < activePersons.length; i++) {
    for (let j = i + 1; j < activePersons.length; j++) {
      const a = activePersons[i], b = activePersons[j];
      const sharedIds = [...tops[a]].filter(id => tops[b].has(id));
      const sharedNames = sharedIds.map(id => talentLabel(id));
      const synergyMatches = computePairMatches(talents[a], talents[b], PAIR_SYNERGY_RULES);
      const frictionMatches = computePairMatches(talents[a], talents[b], FRICTION_RULES);
      const breakdown = computeCompatibility(scores, a, b, sharedIds.length, synergyMatches.length, frictionMatches.length);
      pairs.push({ a, b, sharedIds, sharedNames, synergyMatches, frictionMatches, score: breakdown.score, breakdown });
    }
  }

  document.getElementById('domains-body').innerHTML = renderDomainsSection(activePersons, names, scores);

  const mapSelectorHTML = activePersons.length > 2 ? `
    <div class="pair-selector-row">
      <label>اختر شخصين لعرض خريطة الترابط بينهما:</label>
      <select id="map-person-a"></select>
      <span class="pair-x">×</span>
      <select id="map-person-b"></select>
    </div>` : '';
  document.getElementById('map-body').innerHTML = `${mapSelectorHTML}<div id="map-render-target"></div>`;

  function renderMapFor(a, b) {
    const sharedIds = [...tops[a]].filter(id => tops[b].has(id));
    const synergyMatches = computePairMatches(talents[a], talents[b], PAIR_SYNERGY_RULES);
    const frictionMatches = computePairMatches(talents[a], talents[b], FRICTION_RULES);
    document.getElementById('map-render-target').innerHTML = renderConnectionMapSection(
      names[a], names[b], talents[a].slice(0, 8), talents[b].slice(0, 8), sharedIds, synergyMatches, frictionMatches
    );
  }

  if (activePersons.length > 2) {
    const selA = document.getElementById('map-person-a');
    const selB = document.getElementById('map-person-b');
    activePersons.forEach(n => {
      selA.innerHTML += `<option value="${n}">${escapeHtml(names[n])}</option>`;
      selB.innerHTML += `<option value="${n}">${escapeHtml(names[n])}</option>`;
    });
    selA.value = activePersons[0];
    selB.value = activePersons[1];
    const onChange = () => {
      const a = parseInt(selA.value, 10);
      const b = parseInt(selB.value, 10);
      if (a === b) return;
      renderMapFor(a, b);
    };
    selA.addEventListener('change', onChange);
    selB.addEventListener('change', onChange);
    renderMapFor(activePersons[0], activePersons[1]);
  } else {
    renderMapFor(activePersons[0], activePersons[1]);
  }

  document.getElementById('overlap-body').innerHTML = renderOverlapSection(activePersons, names, scores, tops, pairs);
  document.getElementById('dynamics-body').innerHTML = renderDynamicsSection(activePersons, names, scores, talents, pairs);
  document.getElementById('communication-body').innerHTML = renderCommunicationSection(activePersons, names, pairs);
  document.getElementById('creativity-body').innerHTML = renderCreativitySection(activePersons, names, tops, pairs);
  document.getElementById('shadow-body').innerHTML = renderShadowSection(activePersons, names, pairs);
  document.getElementById('recommendation-body').innerHTML = renderRecommendationSection(activePersons, names, scores);

  const results = document.getElementById('results');
  results.classList.remove('hidden');
  results.scrollIntoView({ behavior: 'smooth' });
}

function initPersonPanel(n) {
  const searchInput = document.querySelector(`.talent-search[data-person="${n}"]`);
  const dropdown = document.getElementById(`dropdown-${n}`);

  searchInput.addEventListener('focus', () => {
    buildDropdown(n, searchInput.value);
    dropdown.classList.remove('hidden');
  });
  searchInput.addEventListener('input', () => {
    buildDropdown(n, searchInput.value);
    dropdown.classList.remove('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.talent-picker')) dropdown.classList.add('hidden');
  });

  document.querySelector(`.btn-clear[data-person="${n}"]`).addEventListener('click', () => {
    if (state[n].talents.length && !confirm('مسح كل مواهب هذا الشخص؟')) return;
    state[n].talents = [];
    renderPersonList(n);
  });

  document.getElementById(`save-${n}`).addEventListener('click', () => saveProfile(n));
  document.getElementById(`load-${n}`).addEventListener('click', () => loadProfile(n));
  document.getElementById(`delete-${n}`).addEventListener('click', () => deleteProfile(n));

  document.getElementById(`pdf-upload-${n}`).addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handlePdfUpload(n, file);
    e.target.value = '';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  setPersonCount(2, { skipConfirm: true });

  const countSelect = document.getElementById('person-count');
  if (countSelect) {
    countSelect.addEventListener('change', (e) => {
      setPersonCount(parseInt(e.target.value, 10));
    });
  }

  updateAnalyzeHint();
  document.getElementById('analyze-btn').addEventListener('click', analyze);
});
