// Expedition planner (homepage #plan and /plan/).
// Four required answers move Atlas along the route; the travelled line turns solid blue.
// Submitting builds an email draft to Mike with the answers and opens it in the visitor's
// email app (mailto:), the same no-backend mechanism the previous /plan/ page used.
const planForm = document.getElementById('plan-form') as HTMLFormElement | null;

if (planForm) {
  const form = planForm;
  const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
  const plannerFields = $<HTMLDetailsElement>('planner-fields');
  const route = document.querySelector('.route') as HTMLElement;
  const status = $<HTMLElement>('route-status');
  const hint = $<HTMLElement>('form-hint');
  const groupInput = $<HTMLInputElement>('group');
  const groupErr = $<HTMLElement>('group-err');
  const result = $<HTMLElement>('result');
  const summary = $<HTMLElement>('summary');
  const copyMsg = $<HTMLElement>('copy-msg');
  const sendLink = $<HTMLAnchorElement>('send-email');
  const email = form.dataset.email || 'mike@urbansafari.app';
  const defaultHint = form.dataset.hint || '';
  const QUESTIONS = ['occasion', 'style', 'group', 'city'] as const;
  type Question = (typeof QUESTIONS)[number];
  const NAMES: Record<Question, string> = { occasion: 'the occasion', style: 'how much we handle', group: 'group size', city: 'the city' };
  let lastAnswered = -1;

  const groupValid = () => {
    const n = Number(groupInput.value);
    return groupInput.value.trim() !== '' && Number.isInteger(n) && n >= 2 && n <= 2000;
  };
  const answered = (): Record<Question, boolean> => {
    const d = new FormData(form);
    return {
      occasion: !!d.get('occasion'),
      style: !!d.get('style'),
      group: groupValid(),
      city: String(d.get('city') || '').trim() !== '',
    };
  };

  function paintRoute(finished = false) {
    const a = answered();
    const count = QUESTIONS.filter((q) => a[q]).length;
    QUESTIONS.forEach((q, i) => route.querySelector(`[data-cp="${i}"]`)?.classList.toggle('done', a[q]));
    route.querySelector('[data-cp="4"]')?.classList.toggle('done', finished);
    // Atlas stands on the checkpoint answered last, and runs to the flag when the request is ready
    if (lastAnswered >= 0 && !a[QUESTIONS[lastAnswered]]) {
      const still = QUESTIONS.map((q, i) => (a[q] ? i : -1)).filter((i) => i >= 0);
      lastAnswered = still.length ? still[still.length - 1] : -1;
    }
    const at = finished ? 4 : Math.max(lastAnswered, 0);
    route.style.setProperty('--p', String(at / 4));
    status.textContent = finished ? 'Request ready to send' : count === 4 ? 'All four answered. Ready to continue.' : `${count} of 4 answered`;
    if (count === 4 && hint.classList.contains('warn')) {
      hint.classList.remove('warn');
      hint.textContent = 'Ready when you are.';
    }
  }

  form.addEventListener('input', (e) => {
    const name = (e.target as HTMLInputElement).name;
    const i = QUESTIONS.indexOf(name as Question);
    if (i >= 0 && answered()[name as Question]) lastAnswered = i;
    if (name === 'group' && groupInput.getAttribute('aria-invalid') === 'true' && groupValid()) {
      groupInput.removeAttribute('aria-invalid');
      groupErr.hidden = true;
    }
    paintRoute();
  });
  groupInput.addEventListener('blur', () => {
    const bad = groupInput.value.trim() !== '' && !groupValid();
    if (bad) groupInput.setAttribute('aria-invalid', 'true');
    else groupInput.removeAttribute('aria-invalid');
    groupErr.hidden = !bad;
  });

  const choose = (name: 'style' | 'occasion', value: string) => {
    const radio = form.querySelector<HTMLInputElement>(`input[name="${name}"][value="${CSS.escape(value)}"]`);
    if (!radio) return false;
    radio.checked = true;
    lastAnswered = QUESTIONS.indexOf(name);
    return true;
  };

  // "Plan a Scout hunt", "Plan a celebration" and similar links open the planner and preselect their answer
  document.addEventListener('click', (e) => {
    const target = e.target as Element;
    if (target.closest('a[href="#plan"]')) plannerFields.open = true;
    const link = target.closest<HTMLElement>('[data-pick-style],[data-pick-occasion]');
    if (!link) return;
    if (!result.hidden) showForm();
    const [name, value] = link.dataset.pickStyle ? (['style', link.dataset.pickStyle] as const) : (['occasion', link.dataset.pickOccasion || ''] as const);
    if (choose(name, value)) paintRoute();
  });

  function summaryRows(): [string, string][] {
    const d = new FormData(form);
    const text = (key: string) => String(d.get(key) || '').trim();
    const rows: [string, string][] = [
      ['Occasion', text('occasion')],
      ['Style', text('style')],
      ['Group', `About ${Number(d.get('group'))} people`],
      ['City', text('city')],
    ];
    const date = text('date');
    if (date) {
      const [y, m, day] = date.split('-').map(Number);
      rows.push(['Preferred date', new Date(y, m - 1, day).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })]);
    }
    const note = text('note');
    if (note) rows.push(['Note', note]);
    // optional contact fields exist only on /plan/
    ([['company', 'Company'], ['name', 'Name'], ['email', 'Email']] as const).forEach(([key, label]) => {
      const value = text(key);
      if (value) rows.push([label, value]);
    });
    return rows;
  }
  function emailDraft() {
    const rows = summaryRows();
    const city = rows.find(([k]) => k === 'City')?.[1] || '';
    const body = `Hi Mike,\n\nI’d like to plan an Urban Safari.\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n`;
    return `mailto:${email}?subject=${encodeURIComponent(`Urban Safari inquiry: ${city}`)}&body=${encodeURIComponent(body)}`;
  }

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function showForm() {
    plannerFields.open = true;
    result.hidden = true;
    form.hidden = false;
    copyMsg.textContent = '';
    paintRoute(false);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    plannerFields.open = true;
    const a = answered();
    const missing = QUESTIONS.filter((q) => !a[q]);
    if (missing.length) {
      if (!a.group && groupInput.value.trim() !== '') {
        groupInput.setAttribute('aria-invalid', 'true');
        groupErr.hidden = false;
      }
      hint.classList.add('warn');
      hint.textContent = 'Still to answer: ' + missing.map((q) => NAMES[q]).join(', ') + '.';
      form.querySelector<HTMLElement>(`[name="${missing[0]}"]`)?.focus();
      return;
    }
    summary.innerHTML = summaryRows().map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('');
    const draft = emailDraft();
    sendLink.href = draft;
    form.hidden = true;
    result.hidden = false;
    paintRoute(true);
    result.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    // Hand the request to the visitor's email app. Nothing is sent until they press Send.
    window.location.href = draft;
  });

  document.querySelector('[data-edit]')?.addEventListener('click', () => {
    showForm();
    form.querySelector('input')?.focus();
  });
  document.querySelector('[data-restart]')?.addEventListener('click', () => {
    form.reset();
    lastAnswered = -1;
    groupErr.hidden = true;
    groupInput.removeAttribute('aria-invalid');
    hint.classList.remove('warn');
    hint.textContent = defaultHint;
    showForm();
    form.querySelector('input')?.focus();
  });
  document.querySelector('[data-copy-summary]')?.addEventListener('click', async () => {
    const text = `Urban Safari expedition request (to ${email})\n` + summaryRows().map(([k, v]) => `${k}: ${v}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      copyMsg.textContent = 'Summary copied.';
    } catch {
      copyMsg.textContent = 'Copying is blocked in this window. Select the summary above and copy it by hand.';
    }
  });

  // /plan/ links from city pages and the old site carry ?city=, ?style= (or ?package=) and ?occasion=
  if (form.dataset.presets === 'url') {
    const params = new URLSearchParams(location.search);
    const PACKAGES: Record<string, string> = { scout: 'Scout', 'remote-expedition': 'Remote Expedition', 'guided-expedition': 'Guided Expedition' };
    const occasion = params.get('occasion');
    if (occasion) choose('occasion', occasion);
    const style = params.get('style') || PACKAGES[params.get('package') || ''];
    if (style) choose('style', style);
    const city = (params.get('city') || '').trim().slice(0, 100);
    if (city) {
      (form.elements.namedItem('city') as HTMLInputElement).value = city;
      lastAnswered = QUESTIONS.indexOf('city');
      const help = document.getElementById('city-help');
      if (help) help.hidden = false;
    }
  }
  paintRoute();
  // Enable submission only after the email handler and planner are ready.
  form.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled = false;
  $('planner-unavailable').hidden = true;
}
