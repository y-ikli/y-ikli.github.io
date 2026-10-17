// Ouvre tous les liens externes dans un nouvel onglet
window.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="http"]:not([target])');
  links.forEach(link => {
    // Ne pas modifier les liens internes au domaine
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    }
  });
});
