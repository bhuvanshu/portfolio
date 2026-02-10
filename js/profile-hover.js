// Interactive profile image hover: pointer-follow tilt and scale
(function(){
  const card = document.querySelector('.profile-img');
  if (!card) return;

  const img = card.querySelector('img');
  if (!img) return;

  let rect = null;

  function updateRect(){
    rect = card.getBoundingClientRect();
  }

  function onPointerMove(e){
    if (!rect) updateRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    const rotY = (px - 0.5) * 16; // -8deg..8deg
    const rotX = (0.5 - py) * 10; // -5deg..5deg
    const scale = 1.06;

    card.classList.add('is-tilting');
    img.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
  }

  function onPointerEnter(){
    updateRect();
    card.style.cursor = 'pointer';
  }

  function onPointerLeave(){
    card.classList.remove('is-tilting');
    img.style.transform = '';
    card.style.cursor = '';
  }

  window.addEventListener('resize', updateRect);
  card.addEventListener('pointerenter', onPointerEnter);
  card.addEventListener('pointermove', onPointerMove);
  card.addEventListener('pointerleave', onPointerLeave);
})();
