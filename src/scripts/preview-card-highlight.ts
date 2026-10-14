// Native anchor links handle navigation, including without JavaScript.
// The only enhancement is a brief highlight on the matching static card.
let active: HTMLElement | null = null;
let clearHighlight: ReturnType<typeof setTimeout> | undefined;

for (const link of document.querySelectorAll<HTMLAnchorElement>('.pp-row[href^="#kind-"]')) {
  link.addEventListener('click', () => {
    const card = document.getElementById(link.hash.slice(1));
    if (!card) return;
    active?.classList.remove('is-highlighted');
    clearTimeout(clearHighlight);
    // Restart the glow when the same card is selected again.
    void card.offsetWidth;
    card.classList.add('is-highlighted');
    active = card;
    clearHighlight = setTimeout(() => {
      card.classList.remove('is-highlighted');
      active = null;
    }, 2200);
  });
}
