// Both controls are buttons: activation only highlights their counterpart.
// No scrolling, navigation, focus transfer or game interaction.
let active: HTMLElement | null = null;
let clearHighlight: ReturnType<typeof setTimeout> | undefined;

for (const button of document.querySelectorAll<HTMLButtonElement>('.pp-row, .dcard')) {
  button.addEventListener('click', () => {
    const prefix = button.classList.contains('pp-row') ? 'kind' : 'row';
    const match = document.getElementById(`${prefix}-${button.dataset.kind}`)!;
    active?.classList.remove('is-highlighted');
    clearTimeout(clearHighlight);
    // Restart the glow when the same match is selected again.
    void match.offsetWidth;
    match.classList.add('is-highlighted');
    active = match;
    clearHighlight = setTimeout(() => {
      match.classList.remove('is-highlighted');
      active = null;
    }, 2200);
  });
}
