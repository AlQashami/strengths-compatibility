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

const state = {
  1: { talents: [] },
  2: { talents: [] }
};

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getPersonName(n) {
  const v = document.getElementById(`name-${n}`).value.trim();
  return v || (n === 1 ? 'الشخص الأول' : 'الشخص الثاني');
}

function domainMeta(key) {
  return DOMAINS.find(d => d.key === key);
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
  const ok1 = state[1].talents.length >= 5;
  const ok2 = state[2].talents.length >= 5;
  if (ok1 && ok2) {
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
  [1, 2].forEach(n => {
    const select = document.getElementById(`profile-select-${n}`);
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
const ARABIC_DIGIT_MAP = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };

function normalizeLine(line) {
  return line
    .replace(/[٠-٩]/g, d => ARABIC_DIGIT_MAP[d])
    .replace(/\u00A0/g, ' ')
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

function renderDomainsSection(p1Name, p2Name, s1, s2) {
  let html = '';
  DOMAINS.forEach(d => {
    html += `<div class="domain-chart-row">
      <div class="domain-chart-label"><span><span class="domain-dot ${d.dot}"></span> ${escapeHtml(d.ar)}</span></div>
      <div class="bar-track"><div class="bar-fill p1" style="width:${s1.percents[d.key]}%">${escapeHtml(p1Name)} ${s1.percents[d.key]}%</div></div>
      <div class="bar-track"><div class="bar-fill p2" style="width:${s2.percents[d.key]}%">${escapeHtml(p2Name)} ${s2.percents[d.key]}%</div></div>
    </div>`;
  });
  return html;
}

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

function renderOverlapSection(p1Name, p2Name, s1, s2, sharedTalentNames, synergyMatches) {
  const isStrong = (scores, ranked, key) => ranked.slice(0, 2).includes(key) && scores[key] > 0;

  const sharedStrength = [];
  const complementary = [];
  const sharedGap = [];

  DOMAINS.forEach(d => {
    const p1Strong = isStrong(s1.percents, s1.ranked, d.key);
    const p2Strong = isStrong(s2.percents, s2.ranked, d.key);

    if (p1Strong && p2Strong) sharedStrength.push(d);
    else if (!p1Strong && !p2Strong) sharedGap.push(d);
    else if (p1Strong) complementary.push({ domain: d, strong: p1Name, weak: p2Name });
    else complementary.push({ domain: d, strong: p2Name, weak: p1Name });
  });

  let html = '<div class="subhead">المواهب المشتركة (لغة مشتركة)</div>';
  if (sharedTalentNames.length) {
    html += `<div class="chip-row">${sharedTalentNames.map(n => `<span class="chip">${escapeHtml(n)}</span>`).join('')}</div>`;
    html += `<p>وجود هذه المواهب عند الطرفين يعني تفاهماً سريعاً وأسلوب عمل مألوف للاثنين دون حاجة لشرح طويل.</p>`;
  } else {
    html += `<p>لا توجد مواهب فردية متطابقة ضمن أبرز مواهب الطرفين، لكن هذا لا يمنع وجود توافق على مستوى الدومينز.</p>`;
  }

  html += '<div class="subhead">دومينز القوة المشتركة</div>';
  html += sharedStrength.length
    ? `<ul>${sharedStrength.map(d => `<li><strong>${escapeHtml(d.ar)}</strong>: كلا الطرفين قوي فيه، يشكل أرضية مشتركة راسخة للعمل.</li>`).join('')}</ul>`
    : `<p>لا يوجد دومين يشترك فيه الطرفان كأعلى دومين لديهما.</p>`;

  html += '<div class="subhead">المواهب المكمّلة (تغطية الفجوات)</div>';
  html += complementary.length
    ? `<ul>${complementary.map(c => `<li><strong>${escapeHtml(c.domain.ar)}</strong>: نقطة قوة عند ${escapeHtml(c.strong)} ونقطة ضعف نسبية عند ${escapeHtml(c.weak)}، ما يعني أن هذه الفجوة عند ${escapeHtml(c.weak)} مغطاة من جهة ${escapeHtml(c.strong)}.</li>`).join('')}</ul>`
    : `<p>لا يوجد تكامل واضح على مستوى الدومينز بين الطرفين حالياً.</p>`;

  html += '<div class="subhead">تكامل على مستوى المواهب الفردية</div>';
  html += synergyMatches.length
    ? `<ul>${synergyMatches.map(m => `<li><strong>${escapeHtml(talentLabel(m.id1))}</strong> + <strong>${escapeHtml(talentLabel(m.id2))}</strong>: ${m.text}</li>`).join('')}</ul>`
    : `<p>لا توجد توليفة مواهب معروفة بينهما ضمن قواعد التكامل الفردي حالياً، لكن هذا لا ينفي وجود تكامل على مستوى الدومينز أعلاه.</p>`;

  html += '<div class="subhead">الفجوات المشتركة (تحتاج طرف ثالث)</div>';
  html += sharedGap.length
    ? `<ul>${sharedGap.map(d => `<li><strong>${escapeHtml(d.ar)}</strong>: كلا الطرفين ضعيف نسبياً فيه، ولا أحد يغطي هذه الفجوة عن الآخر.</li>`).join('')}</ul>`
    : `<p>لا توجد فجوة دومين يشترك فيها الطرفان، وهذه إشارة جيدة لاكتفاء الثنائي ذاتياً.</p>`;

  return { html, sharedGap };
}

function renderDynamicsSection(p1Name, p2Name, s1, s2, talents1, talents2) {
  let rows = '';
  DOMAINS.forEach(d => {
    const v1 = s1.percents[d.key];
    const v2 = s2.percents[d.key];
    const lead1 = leadTalentInDomain(talents1, d.key);
    const lead2 = leadTalentInDomain(talents2, d.key);
    let leader, detail;

    if (Math.abs(v1 - v2) < 5) {
      leader = 'متكافئ بينهما';
      const parts = [];
      if (lead1) parts.push(`${escapeHtml(p1Name)}: ${escapeHtml(talentLabel(lead1))}`);
      if (lead2) parts.push(`${escapeHtml(p2Name)}: ${escapeHtml(talentLabel(lead2))}`);
      detail = `${escapeHtml(d.lead)}${parts.length ? ' — أبرز موهبة لكل طرف هنا: ' + parts.join('، ') : ''}`;
    } else {
      const leaderIsP1 = v1 > v2;
      leader = leaderIsP1 ? escapeHtml(p1Name) : escapeHtml(p2Name);
      const leadTalent = leaderIsP1 ? lead1 : lead2;
      detail = `${escapeHtml(d.lead)}${leadTalent ? ' — أبرز ما يقود به: ' + escapeHtml(talentLabel(leadTalent)) : ''}`;
    }

    rows += `<tr><td>${escapeHtml(d.ar)}</td><td>${v1}%</td><td>${v2}%</td><td>${leader}</td><td>${detail}</td></tr>`;
  });

  let html = `<table class="dynamics-table">
    <thead><tr><th>الدومين</th><th>${escapeHtml(p1Name)}</th><th>${escapeHtml(p2Name)}</th><th>من يقود عادة</th><th>ماذا يعني ذلك عملياً</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;

  const actionDomains = ['executing', 'influencing'];
  const thoughtDomains = ['relationship', 'strategic'];
  const p1Top = s1.ranked[0];
  const p2Top = s2.ranked[0];
  const p1IsAction = actionDomains.includes(p1Top);
  const p2IsAction = actionDomains.includes(p2Top);

  if (p1IsAction !== p2IsAction) {
    const actionPerson = p1IsAction ? p1Name : p2Name;
    const thoughtPerson = p1IsAction ? p2Name : p1Name;
    html += `<p class="subhead">الخلاصة</p><p>بشكل عام، تميل قيادة الجوانب العملية والتنفيذية لتكون من جهة ${escapeHtml(actionPerson)}، بينما تميل قيادة الجوانب الفكرية أو العلاقاتية لتكون من جهة ${escapeHtml(thoughtPerson)}؛ توزيع أدوار طبيعي إذا اتفقتما عليه صراحة.</p>`;
  }

  return html;
}

function renderCommunicationSection(p1Name, p2Name, frictionMatches, sharedTalentNames) {
  let html = '';
  if (sharedTalentNames.length) {
    html += `<p>امتلاككما لموهبة ${sharedTalentNames.map(n => `<strong>${escapeHtml(n)}</strong>`).join('، ')} المشتركة يمنحكما لغة مشتركة وفهماً سريعاً لبعضكما في هذا الجانب.</p>`;
  }

  html += '<div class="subhead">نقاط الاحتكاك المحتملة</div>';
  if (frictionMatches.length) {
    html += `<ul>${frictionMatches.map(m => `<li>${m.text}</li>`).join('')}</ul>`;
  } else {
    html += `<p>لا توجد أنماط احتكاك معروفة بارزة بين أبرز مواهبكما، وهذا مؤشر جيد لسهولة التواصل بينكما.</p>`;
  }

  html += `<div class="subhead">نصيحة عملية</div><p>عند الاختلاف، اتفقا مسبقاً على "قاعدة تحكيم" بسيطة: من يحسم في مواضيع التنفيذ السريع، ومن يحسم في مواضيع تتطلب تروٍّ أو تحليلاً، بدل أن يتكرر الخلاف على نفس النقطة في كل مرة.</p>`;

  return html;
}

function renderCreativitySection(p1Name, p2Name, top1, top2) {
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

function renderShadowSection(p1Name, p2Name, sharedTalentIds) {
  if (!sharedTalentIds.length) {
    return `<p>لا توجد مواهب مضاعفة (مشتركة بقوة) بين الطرفين ضمن أبرز مواهبهما، لذا لا يوجد خطر مبالغة واضح ناتج عن ازدواج نفس الموهبة.</p>`;
  }

  const items = sharedTalentIds.map(id => {
    const name = talentLabel(id);
    const specific = SHADOW_DOUBLE_LOOKUP[id];
    const text = specific || `قوة "${escapeHtml(name)}" مضاعفة عند الطرفين يعني ميلاً مشتركاً لنفس السلوك دون طرف يوازنه؛ راقبا المبالغة فيه دون رقيب داخلي للفريق.`;
    return `<li><strong>${escapeHtml(name)}</strong>: ${text}</li>`;
  });

  return `<ul>${items.join('')}</ul>`;
}

function renderRecommendationSection(p1Name, p2Name, sharedGapDomains) {
  if (!sharedGapDomains.length) {
    return `<p>الثنائي مكتفٍ ذاتياً بشكل جيد: يغطي مجالات الدومينز الأربعة معاً دون فجوة مشتركة واضحة. أي تحديات ستكون على مستوى التنسيق بينكما أكثر من نقص جوهري بالمواهب.</p>`;
  }

  const domainList = sharedGapDomains.map(d => `<strong>${escapeHtml(d.ar)}</strong>`).join(' و');
  const suggestions = sharedGapDomains.map(d => {
    const talentNames = DOMAIN_GAP_SUGGESTIONS[d.key].map(id => talentLabel(id)).join('، ');
    return `<li>لتغطية دومين "${escapeHtml(d.ar)}": ابحثا عن عضو ثالث تبرز عنده مواهب مثل ${talentNames}.</li>`;
  }).join('');

  return `<p>يُنصح بإضافة عضو ثالث للفريق يمتلك مواهب قوية في مجال ${domainList}، لأن كلا الطرفين لديه ضعف نسبي فيه ولا أحد يغطي هذه الفجوة عن الآخر.</p><ul>${suggestions}</ul>`;
}

function analyze() {
  if (state[1].talents.length < 5 || state[2].talents.length < 5) {
    updateAnalyzeHint();
    return;
  }

  const p1Name = getPersonName(1);
  const p2Name = getPersonName(2);

  const talents1 = state[1].talents;
  const talents2 = state[2].talents;

  const s1 = computeDomainScores(talents1);
  const s2 = computeDomainScores(talents2);

  const top1 = topSet(talents1, 10);
  const top2 = topSet(talents2, 10);

  const sharedTalentIds = [...top1].filter(id => top2.has(id));
  const sharedTalentNames = sharedTalentIds.map(id => talentLabel(id));

  const synergyMatches = computePairMatches(talents1, talents2, PAIR_SYNERGY_RULES);
  const frictionMatches = computePairMatches(talents1, talents2, FRICTION_RULES);

  document.getElementById('domains-body').innerHTML = renderDomainsSection(p1Name, p2Name, s1, s2);

  document.getElementById('map-body').innerHTML = renderConnectionMapSection(
    p1Name, p2Name, talents1.slice(0, 8), talents2.slice(0, 8), sharedTalentIds, synergyMatches, frictionMatches
  );

  const overlap = renderOverlapSection(p1Name, p2Name, s1, s2, sharedTalentNames, synergyMatches);
  document.getElementById('overlap-body').innerHTML = overlap.html;

  document.getElementById('dynamics-body').innerHTML = renderDynamicsSection(p1Name, p2Name, s1, s2, talents1, talents2);
  document.getElementById('communication-body').innerHTML = renderCommunicationSection(p1Name, p2Name, frictionMatches, sharedTalentNames);
  document.getElementById('creativity-body').innerHTML = renderCreativitySection(p1Name, p2Name, top1, top2);
  document.getElementById('shadow-body').innerHTML = renderShadowSection(p1Name, p2Name, sharedTalentIds);
  document.getElementById('recommendation-body').innerHTML = renderRecommendationSection(p1Name, p2Name, overlap.sharedGap);

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
  initPersonPanel(1);
  initPersonPanel(2);
  renderSavedProfiles();
  updateAnalyzeHint();
  document.getElementById('analyze-btn').addEventListener('click', analyze);
});
