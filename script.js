const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
document.querySelectorAll('.project-card').forEach(card => card.addEventListener('click', () => {
  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.querySelector('img').alt;
  lightbox.showModal();
}));
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});

const inquiryForm = document.querySelector('#inquiry-form');
const mailGuide = document.querySelector('.mail-guide');
let pendingMailUrl = '';

inquiryForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `[홈페이지 수리 문의] ${data.get('type')} - ${data.get('name')}`;
  const body = [
    '대형 유압장비 수리 상담을 요청합니다.', '',
    `업체명 / 담당자: ${data.get('name')}`,
    `연락처: ${data.get('phone')}`,
    `문의 유형: ${data.get('type')}`, '',
    '[문의 내용]', data.get('message'), '',
    '※ 현장 및 장비 사진을 이 메일에 첨부해 주세요.'
  ].join('\n');

  pendingMailUrl = `mailto:qlinesoft@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  mailGuide.showModal();
});

mailGuide.querySelector('.guide-close').addEventListener('click', () => mailGuide.close());
mailGuide.querySelector('.open-mail').addEventListener('click', () => {
  mailGuide.close();
  window.location.href = pendingMailUrl;
});
mailGuide.addEventListener('click', event => {
  if (event.target === mailGuide) mailGuide.close();
});
