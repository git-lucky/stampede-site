// Homepage practice hunt in the Expedition Passport look. Local only: no network calls, no storage,
// no uploads. Photos you choose are previewed from object URLs and never leave the page. Follows Tim's
// draft player redesign (redesign/player): the board header (#4), coin rows (#6), the round rubber
// stamp (#6, stampGeometry.ts), the challenge card (#13, #15) and the completion sequence (#19).
import { practiceChallenges, practiceRivals, type PracticeChallenge, type PracticeKind } from '@/content/practice';
import { FA, faSvg, type FaName } from '@/content/passportIcons';

const root = document.getElementById('pp');

if (root) {
  const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ---------- the round rubber stamp (port of stampGeometry.ts + Stamp.tsx) ---------- */
  const hash = (s: string) => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = (seed: number) => { let s = seed || 1; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; };
  const CENTER = 60;
  const INNER_EDGE = 41 - 1.5 / 2;
  const BAND_MID = (41 + 0.75 + (55 - 1.75)) / 2;
  const room = (y: number, fs: number) => {
    const dy = Math.max(Math.abs(y - CENTER), Math.abs(y - 0.74 * fs - CENTER), Math.abs(y + 0.2 * fs - CENTER));
    return 2 * (Math.sqrt(Math.max(0, INNER_EDGE ** 2 - dy ** 2)) - 7.8);
  };
  const star = (cx: number, cy = CENTER, r = 4.3) => {
    let d = '';
    for (let k = 0; k < 10; k++) {
      const a = -Math.PI / 2 + (k * Math.PI) / 5;
      const rr = k % 2 ? r * 0.45 : r;
      d += `${k ? 'L' : 'M'}${(cx + rr * Math.cos(a)).toFixed(2)} ${(cy + rr * Math.sin(a)).toFixed(2)}`;
    }
    return `${d}Z`;
  };
  const INK = '#174F6B'; // the skin's stamp ink: the cover colour, made safe on paper (passportSkin)
  let uid = 0;
  function stampSvg(o: { place: string; date: string; mid: string; sub: string; kind: FaName; seed: string; paper: boolean }) {
    const r = rng(hash(o.seed));
    const id = `st${++uid}`;
    const rotation = Math.round(-16 + r() * 28);
    let wear = '';
    for (let i = 0; i < 40; i++) wear += `<circle cx="${(8 + r() * 104).toFixed(1)}" cy="${(8 + r() * 104).toFixed(1)}" r="${(0.4 + r() * 1).toFixed(2)}" fill="#000" fill-opacity="${(0.3 + r() * 0.4).toFixed(2)}"/>`;
    const fade = Math.round(r() * 360);
    const line = (text: string, y: number, fs: number, ls = 0) => {
      const w = text.length * fs * 0.7 + ls * Math.max(0, text.length - 1);
      const R = room(y, fs);
      return `<text x="60" y="${y}" text-anchor="middle" font-family="Overpass, Geologica, sans-serif" font-weight="900" font-size="${fs}" letter-spacing="${ls}" fill="${INK}"${w > R ? ` textLength="${R.toFixed(1)}" lengthAdjust="spacingAndGlyphs"` : ''}>${esc(text)}</text>`;
    };
    const midFs = o.mid.length <= 4 ? 24 : o.mid.length <= 6 ? 18 : o.mid.length <= 8 ? 14 : 11;
    const i = FA[o.kind];
    const sc = 14 / Math.max(i.w, i.h);
    const ico = `<path fill="${INK}" transform="translate(${(60 - (i.w * sc) / 2).toFixed(2)} ${(38 - (i.h * sc) / 2).toFixed(2)}) scale(${sc.toFixed(5)})" d="${i.d}"/>`;
    const sub = o.sub.length > 6 ? line(o.sub, 84.5, 7.5, 0.5) : line(o.sub, 86, 9, 1);
    return `<svg viewBox="0 0 120 120" style="transform:rotate(${rotation}deg)" role="img" aria-label="Stamped: ${esc(o.mid)}, ${esc(o.sub)}, ${esc(o.place)}">
<defs><path id="${id}t" d="M15.5 60a44.5 44.5 0 0 1 89 0" fill="none"/><path id="${id}b" d="M7.5 60a52.5 52.5 0 0 0 105 0" fill="none"/>
<mask id="${id}m" maskUnits="userSpaceOnUse" x="-10" y="-10" width="140" height="140"><rect x="-10" y="-10" width="140" height="140" fill="#fff"/><g transform="rotate(${fade} 60 60)"><rect x="-10" y="86" width="140" height="40" fill="#000" fill-opacity=".3"/></g>${wear}</mask></defs>
${o.paper ? '<circle cx="60" cy="60" r="56.8" fill="#FBF8F0"/>' : ''}<g mask="url(#${id}m)" opacity=".92">
<circle cx="60" cy="60" r="55" fill="none" stroke="${INK}" stroke-width="3.5"/><circle cx="60" cy="60" r="41" fill="none" stroke="${INK}" stroke-width="1.5"/>
<text font-family="Overpass, Geologica, sans-serif" font-weight="900" font-size="10.5" letter-spacing="1.6" fill="${INK}"><textPath href="#${id}t" startOffset="50%" text-anchor="middle">${esc(o.place.toUpperCase())}</textPath></text>
<text font-family="Overpass, Geologica, sans-serif" font-weight="900" font-size="9" letter-spacing="1.4" fill="${INK}"><textPath href="#${id}b" startOffset="50%" text-anchor="middle">${esc(o.date.toUpperCase())}</textPath></text>
<path d="${star(CENTER - BAND_MID)}" fill="${INK}"/><path d="${star(CENTER + BAND_MID)}" fill="${INK}"/>${ico}
${line(o.mid, 72, midFs)}${sub}
</g></svg>`;
  }
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const stampDate = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const stampTime = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  /* ---------- state ---------- */
  const CH = practiceChallenges;
  const BY = Object.fromEntries(CH.map((c) => [c.id, c])) as Record<PracticeKind, PracticeChallenge>;
  const GOAL = CH.reduce((s, c) => s + c.points, 0);
  const PLACE = 'Urban Safari';
  type State = { done: boolean; pending: boolean; answer: string; media: 'file' | 'sample' | null; url: string | null; at: Date | null };
  const blank = (): State => ({ done: false, pending: false, answer: '', media: null, url: null, at: null });
  let state = Object.fromEntries(CH.map((c) => [c.id, blank()])) as Record<PracticeKind, State>;
  const timers = new Set<number>();
  const later = (fn: () => void, ms: number) => {
    const t = window.setTimeout(() => { timers.delete(t); fn(); }, reduced() ? 0 : ms);
    timers.add(t);
  };

  const list = $('pp-list');
  const rowOf = (id: PracticeKind) => list.querySelector<HTMLElement>(`.pp-row[data-kind="${id}"]`)!;
  const live = document.createElement('p');
  live.className = 'vh';
  live.setAttribute('aria-live', 'polite');
  root.after(live);

  /* ---------- the board header: race track, score tag, progress ---------- */
  const track = $('pp-track');
  const you = $('pp-you');
  const ring = $('pp-you-ring');
  const tag = $('pp-tag');
  const rivals = [...track.querySelectorAll<HTMLElement>('.pp-rival')];
  let shown = 0;
  let countFrame = 0;
  const score = () => CH.reduce((s, c) => s + (state[c.id].done ? c.points : 0), 0);
  const doneCount = () => CH.filter((c) => state[c.id].done).length;
  const leftOf = (f: number) => 3 + Math.min(1, Math.max(0, f)) * Math.max(0, track.clientWidth - 69);
  const ordinal = (n: number) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? 'TH' : ['TH', 'ST', 'ND', 'RD'][n % 10] || 'TH'}`;
  function placeTiles(points: number) {
    rivals.forEach((t) => { t.style.left = `${leftOf(Number(t.dataset.points) / GOAL)}px`; });
    const x = leftOf(points / GOAL);
    you.style.left = `${x}px`;
    ring.style.left = `${x}px`;
    const w = tag.offsetWidth;
    const W = track.clientWidth;
    tag.style.left = `${Math.max(0, Math.min(x + 15 - w / 2, Math.max(0, W - w)))}px`;
  }
  function paintHeader(points: number) {
    const rank = 1 + practiceRivals.filter((p) => p > points).length;
    $('pp-rank').textContent = ordinal(rank);
    $('pp-progress').textContent = `${doneCount()} of ${CH.length}`;
    track.setAttribute('aria-label', `Race track: your team is ${ordinal(rank).toLowerCase()} with ${points} points`);
    placeTiles(points);
  }
  function countTo(to: number) {
    cancelAnimationFrame(countFrame);
    const from = shown;
    if (to <= from || reduced()) { shown = to; $('pp-score').textContent = String(to); return; }
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 700);
      shown = Math.round(from + (to - from) * (1 - (1 - k) ** 3));
      $('pp-score').textContent = String(shown);
      if (k < 1) countFrame = requestAnimationFrame(step);
    };
    countFrame = requestAnimationFrame(step);
  }
  new ResizeObserver(() => placeTiles(score())).observe(track);

  const detailCard = (id: PracticeKind) => document.querySelector<HTMLElement>(`.dcard[data-kind="${id}"]`)!;
  // a stamp that sits on a photo gets its paper under it (Tim, 2026-09-28)
  const stampFor = (c: PracticeChallenge, paper = false) => {
    const at = state[c.id].at ?? new Date();
    return stampSvg({ place: PLACE, date: stampDate(at), mid: `+${c.points}`, sub: stampTime(at), kind: c.fa, seed: c.id, paper });
  };

  /* ---------- the challenge card ---------- */
  const card = $('pp-card');
  const scrim = $('pp-scrim');
  const pic = $('pp-card-pic');
  const img = $<HTMLImageElement>('pp-card-img');
  const answer = $('pp-answer');
  const feedback = $('pp-feedback');
  const bar = $<HTMLButtonElement>('pp-bar');
  const fileInput = $<HTMLInputElement>('pp-file');
  let current: PracticeKind | null = null;
  let opener: HTMLElement | null = null;
  let closeTimer = 0;
  let cardVersion = 0;
  const modalBackground = new Set<HTMLElement>();
  function setModalBackground(inert: boolean) {
    if (!inert) {
      modalBackground.forEach((element) => { element.inert = false; });
      modalBackground.clear();
      return;
    }
    // Keep the card's ancestors active and make the rest of the page inert.
    for (let branch: HTMLElement | null = card; branch?.parentElement; branch = branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling instanceof HTMLElement && sibling !== branch && sibling !== scrim && !sibling.inert) {
          sibling.inert = true;
          modalBackground.add(sibling);
        }
      }
      if (branch.parentElement === document.body) break;
    }
  }
  let keyboard = false;
  document.addEventListener('keydown', (e) => { if (['Tab', 'Enter', ' ', 'Escape'].includes(e.key)) keyboard = true; }, true);
  document.addEventListener('pointerdown', () => { keyboard = false; }, true);
  const setBar = (label: string, fa: FaName, disabled = false) => {
    $('pp-bar-label').textContent = label;
    $('pp-bar-icon').innerHTML = faSvg(fa);
    bar.disabled = disabled;
  };
  const release = (s: State) => { if (s.url) URL.revokeObjectURL(s.url); s.url = null; s.media = null; };

  function showMedia(c: PracticeChallenge) {
    const s = state[c.id];
    pic.querySelectorAll('video').forEach((v) => { v.pause(); v.remove(); });
    img.hidden = false;
    if (s.media === 'file' && s.url) {
      if (c.id === 'photo') { img.src = s.url; img.alt = 'Your practice photo'; }
      else {
        img.hidden = true;
        const v = document.createElement('video');
        v.src = s.url; v.controls = true; v.muted = true; v.playsInline = true; v.preload = 'metadata';
        img.after(v);
      }
    } else if (s.media === 'sample' && c.id === 'photo') { img.src = '/img/practice/pose-card.webp'; img.alt = 'A sample team photo'; }
    else { img.src = c.card; img.alt = ''; }
  }
  function renderAnswer(c: PracticeChallenge) {
    const s = state[c.id];
    feedback.textContent = '';
    if (s.done) { answer.innerHTML = ''; setBar('Back to challenges', 'check'); return; }
    if (c.id === 'photo' || c.id === 'video') {
      const noun = c.id === 'photo' ? 'photo' : 'clip';
      const ready = c.id === 'photo' ? 'Sample photo ready.' : 'Sample clip ready. No recording needed.';
      answer.innerHTML = `<button type="button" class="pp-alt" id="pp-sample">No ${noun} handy? Use a sample ${noun}</button>`;
      $('pp-sample').addEventListener('click', () => {
        if (s.pending || s.done) return;
        release(s); s.media = 'sample'; feedback.textContent = ready; showMedia(c); setBar('Submit', 'check');
      });
      if (s.media) { feedback.textContent = s.media === 'sample' ? ready : `Your ${noun} is ready, in this page only.`; setBar('Submit', 'check'); }
      else setBar(c.verb, c.fa);
    } else if (c.picks) {
      answer.innerHTML = `<fieldset class="pp-picks"><legend class="pp-answer-label">Pick one</legend>${c.picks.map((t, i) => `<label class="pp-pick"><input type="radio" name="pp-choice" value="${i}"${s.answer === String(i) ? ' checked' : ''}><i>${'ABC'[i]}</i><span>${esc(t)}</span></label>`).join('')}</fieldset>`;
      setBar(c.verb, c.fa);
    } else {
      answer.innerHTML = `<label class="pp-answer-label" for="pp-input">${esc(c.label ?? 'Your answer')}</label><input class="pp-field" id="pp-input" type="text" autocomplete="off" maxlength="80" placeholder="${esc(c.placeholder ?? '')}">`;
      $<HTMLInputElement>('pp-input').value = s.answer;
      setBar(c.verb, c.fa);
    }
    if (s.pending) answer.querySelectorAll<HTMLInputElement>('input,textarea,button').forEach((el) => { el.disabled = true; });
  }
  function openCard(id: PracticeKind, from: HTMLElement) {
    clearTimeout(closeTimer);
    const version = ++cardVersion;
    const c = BY[id];
    const s = state[id];
    current = id; opener = from;
    $('pp-card-title').textContent = c.title;
    $('pp-card-mission').textContent = c.mission;
    $('pp-card-worth').textContent = String(c.points);
    $('pp-card-stamp').innerHTML = s.done ? stampFor(c, true) : '';
    pic.classList.toggle('has-stamp', s.done);
    showMedia(c); renderAnswer(c);
    card.hidden = false; card.inert = false; scrim.hidden = false;
    setModalBackground(true);
    card.querySelector<HTMLElement>('.pp-card-scroll')!.scrollTop = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (version !== cardVersion || !current) return;
      card.classList.add('in'); scrim.classList.add('on');
    }));
    (keyboard ? $('pp-card-close') : card).focus({ preventScroll: true });
  }
  function closeCard() {
    if (card.hidden) return;
    pic.querySelectorAll('video').forEach((v) => v.pause());
    ++cardVersion;
    clearTimeout(closeTimer);
    card.classList.remove('in'); scrim.classList.remove('on');
    card.inert = true;
    const back = opener;
    current = null;
    setModalBackground(false);
    closeTimer = window.setTimeout(() => { card.hidden = true; scrim.hidden = true; }, reduced() ? 0 : 340);
    back?.focus({ preventScroll: true });
  }
  $('pp-card-close').addEventListener('click', closeCard);
  scrim.addEventListener('click', closeCard);
  document.addEventListener('keydown', (e) => {
    if (!current) return;
    if (e.key === 'Escape') { e.preventDefault(); closeCard(); }
    if (e.key !== 'Tab') return;
    const controls = [...card.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), video[controls], [href], [tabindex]:not([tabindex="-1"])')]
      .filter((element) => element.getClientRects().length > 0);
    const first = controls[0] || card;
    const last = controls[controls.length - 1] || card;
    if (e.shiftKey && (document.activeElement === first || document.activeElement === card)) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && (document.activeElement === last || document.activeElement === card)) {
      e.preventDefault(); first.focus();
    }
  });
  list.addEventListener('click', (e) => {
    const row = (e.target as Element).closest<HTMLElement>('.pp-row');
    if (row) openCard(row.dataset.kind as PracticeKind, row);
  });

  const practiceToggle = $<HTMLButtonElement>('practice-toggle');
  const practicePanel = $('practice-panel');
  practiceToggle.addEventListener('click', () => {
    const open = practiceToggle.getAttribute('aria-expanded') !== 'true';
    if (!open) closeCard();
    if (open) {
      practicePanel.querySelectorAll<HTMLImageElement>('img[data-src]').forEach((image) => {
        image.src = image.dataset.src!;
        delete image.dataset.src;
      });
    }
    practiceToggle.setAttribute('aria-expanded', String(open));
    practicePanel.inert = !open;
    practicePanel.classList.toggle('is-open', open);
    practiceToggle.focus({ preventScroll: true });
  });

  answer.addEventListener('input', (e) => {
    const s = current && state[current];
    if (!s || s.pending || s.done) return;
    const t = e.target as HTMLInputElement;
    if (t.id === 'pp-input' || t.name === 'pp-choice') { s.answer = t.value; feedback.textContent = ''; }
  });
  fileInput.addEventListener('change', () => {
    const c = current ? BY[current] : null;
    const file = fileInput.files?.[0];
    fileInput.value = '';
    if (!c || !file) return;
    const s = state[c.id];
    if (s.pending || s.done) return;
    if (!file.type.startsWith(c.id === 'photo' ? 'image/' : 'video/')) { feedback.textContent = `Choose a ${c.id === 'photo' ? 'photo' : 'video'} file.`; return; }
    release(s); s.url = URL.createObjectURL(file); s.media = 'file';
    showMedia(c); renderAnswer(c);
  });

  $<HTMLFormElement>('pp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!current) return;
    const c = BY[current];
    const s = state[c.id];
    if (s.done) { closeCard(); return; }
    if (s.pending) return;
    if (c.id === 'photo' || c.id === 'video') {
      if (!s.media) { fileInput.accept = c.id === 'photo' ? 'image/*' : 'video/*'; fileInput.click(); return; }
    } else if (c.id === 'trivia') {
      // a few spellings of Woodward, with or without "OK" or "Oklahoma"
      const a = s.answer.toLowerCase().replace(/[^a-z]/g, '').replace(/(oklahoma|ok)$/, '');
      if (!['woodward', 'woodword', 'woodwards', 'woodard', 'woodwrd'].includes(a)) {
        feedback.textContent = s.answer.trim() ? 'Not quite. Look at the hunt’s name: WooTown. Try again. This is practice.' : 'Type your answer first.';
        $('pp-input').focus(); return;
      }
    } else if (c.picks) {
      if (s.answer !== String(c.right)) { feedback.textContent = s.answer ? 'Not quite. What adds points? Try again.' : 'Pick one answer first.'; return; }
    }
    complete(c);
  });

  /* ---------- the completion sequence (#19): stamp on the card, back to the list, the stamp presses
     onto the coin, the score counts and your tile moves; the kind's detail card gets its stamp ---------- */
  function complete(c: PracticeChallenge) {
    const s = state[c.id];
    s.pending = true; s.at = new Date();
    answer.querySelectorAll<HTMLInputElement>('input,textarea,button').forEach((el) => { el.disabled = true; });
    setBar('Stamped', 'check', true);
    feedback.textContent = '';
    if (document.activeElement instanceof HTMLElement && answer.contains(document.activeElement)) document.activeElement.blur();
    card.querySelector('.pp-card-scroll')!.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
    const big = $('pp-card-stamp');
    big.innerHTML = stampFor(c, true);
    big.firstElementChild?.classList.add('press');
    pic.classList.add('has-stamp');
    later(() => {
      if (current === c.id) closeCard();
      later(() => {
        s.pending = false; s.done = true;
        const row = rowOf(c.id);
        row.classList.add('done');
        const slot = row.querySelector('.pp-coin-stamp')!;
        slot.innerHTML = stampFor(c);
        slot.firstElementChild?.classList.add('press');
        row.setAttribute('aria-label', `${c.title}, stamped, ${c.points} points`);
        const k = detailCard(c.id);
        k.classList.add('is-stamped');
        const ks = k.querySelector('.dcard-stamp')!;
        ks.innerHTML = stampFor(c, true);
        ks.firstElementChild?.classList.add('press');
        k.querySelector('.dcard-status')!.textContent = `Stamped: plus ${c.points} points from the practice phone.`;
        // the score counts the moment the stamp presses in
        later(() => {
          const pts = score();
          countTo(pts); paintHeader(pts);
          tag.classList.remove('pulse'); void tag.offsetWidth; tag.classList.add('pulse');
          live.textContent = `Stamped: ${c.title}, plus ${c.points}. Your score is ${pts}, ${doneCount()} of ${CH.length} done.`;
          $<HTMLButtonElement>('pp-reset').disabled = false;
        }, 450);
      }, 360);
    }, 1250);
  }

  /* ---------- Start over: phone and detail cards both ---------- */
  $('pp-reset').addEventListener('click', () => {
    pic.querySelectorAll('video').forEach((v) => { v.pause(); v.remove(); });
    ++cardVersion;
    clearTimeout(closeTimer);
    timers.forEach((t) => clearTimeout(t)); timers.clear();
    Object.values(state).forEach(release);
    state = Object.fromEntries(CH.map((c) => [c.id, blank()])) as Record<PracticeKind, State>;
    if (!card.hidden) { card.classList.remove('in'); scrim.classList.remove('on'); card.hidden = true; scrim.hidden = true; current = null; }
    setModalBackground(false);
    list.querySelectorAll('.pp-row').forEach((r) => { r.classList.remove('done'); r.removeAttribute('aria-label'); r.querySelector('.pp-coin-stamp')!.innerHTML = ''; });
    document.querySelectorAll('.dcard').forEach((k) => { k.classList.remove('is-stamped'); k.querySelector('.dcard-stamp')!.innerHTML = ''; k.querySelector('.dcard-status')!.textContent = 'Not stamped yet.'; });
    countTo(0); paintHeader(0);
    $<HTMLButtonElement>('pp-reset').disabled = true;
    live.textContent = 'Practice cleared. Score 0.';
  });

  paintHeader(0);
  document.fonts.ready.then(() => placeTiles(score()));
}
