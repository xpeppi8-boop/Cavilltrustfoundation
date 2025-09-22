import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.donate": "Donate",
      "nav.fanClub": "Fan Club",
      "nav.programs": "Programs",
      "nav.impact": "Impact",
      
      // Hero Section
      "hero.welcome": "Welcome to Henry Cavill Foundation",
      "hero.subtitle": "Join us in supporting Henry Cavill's creative vision and be part of an exclusive community of fans who appreciate fine storytelling and artistic excellence.",
      
      // Support Section
      "support.title": "Support the Foundation",
      "support.description": "Together we are building a community that turns compassion into impact. Your donation helps fund veteran support, wildlife conservation, and grassroots initiatives that change lives. Every contribution moves us closer to our goal.",
      "support.annualTarget": "Annual target",
      "support.raisedSoFar": "Raised so far",
      "support.donateButton": "Donate Now",
      "support.quote": "When we come together, small acts become powerful change. If Henry's work has inspired you, this is your chance to inspire others.",
      
      // Donation Form
      "donation.payWithGiftCard": "Pay with Gift Card",
      "donation.payWithCrypto": "Pay with Cryptocurrency",
      "donation.emailPlaceholder": "enter your email",
      "donation.emailLabel": "Email for receipt (optional)",
      "donation.backButton": "Back",
      "donation.confirmButton": "I Have Donated",
      "donation.thankYou": "Thank you for your donation!",
      "donation.confirmationMessage": "A confirmation email will be sent {{email}}.",
      "donation.toYourEmail": "to your email",
      "donation.toEmail": "to {{email}}",
      
      // Fan Club Section
      "fanClub.title": "Join the Fan Club",
      "fanClub.exclusiveContent": "Exclusive Content",
      "fanClub.exclusiveContentDesc": "Get access to behind-the-scenes photos, videos, and personal updates from Henry that you won't find anywhere else.",
      "fanClub.memberEvents": "Member Events",
      "fanClub.memberEventsDesc": "Be the first to know about exclusive fan events, Q&A sessions, and special appearances by Henry.",
      "fanClub.merchandise": "Merchandise",
      "fanClub.merchandiseDesc": "Access to limited edition merchandise and early releases available only to fan club members.",
      "fanClub.joinButton": "Join Now",
      
      // Footer
      "footer.aboutTitle": "About Us",
      "footer.aboutText": "The Cavill Trust Foundation supports initiatives in veteran welfare, wildlife conservation, and community development. We believe small acts can create powerful change.",
      "footer.contactTitle": "Contact",
      "footer.location": "London, United Kingdom",
      "footer.linksTitle": "Quick Links",
      "footer.copyright": "© 2025 Cavill Trust Foundation",
      "footer.rights": "Registered charity. All rights reserved.",
      "footer.sponsors": "Our Sponsors",
      
      // Common
      "common.copy": "Copy",
      "common.done": "Done",
      
      // Reasons to Support
      "reasons.integrity.title": "Founded on Integrity",
      "reasons.integrity.desc": "The Henry Cavill Foundation is built on values of honesty, responsibility, and compassion — the same principles Henry has demonstrated throughout his career and personal life.",
      "reasons.commitment.title": "Personal Commitment",
      "reasons.commitment.desc": "Henry's philanthropy is not just financial — he actively participates in fundraising events, fitness challenges, and awareness campaigns. Your support goes hand-in-hand with his personal dedication.",
      "reasons.heroes.title": "Supporting Heroes and Wildlife",
      "reasons.heroes.desc": "From aiding military veterans and their families through the Royal Marines Charity, to protecting endangered species with the Durrell Wildlife Conservation Trust, every contribution makes a lasting impact on both people and the planet.",
      "reasons.impact.title": "Global Awareness, Local Impact",
      "reasons.impact.desc": "With a global fanbase and trusted partnerships, the Foundation raises awareness on an international stage while funding projects that deliver real, measurable change in communities.",
      "reasons.transparency.title": "Transparency You Can Trust",
      "reasons.transparency.desc": "Every donation is handled with care and accountability. We believe in showing you where your support goes and how it transforms lives.",
      "reasons.passion.title": "Inspired by Passion, Driven by Action",
      "reasons.passion.desc": "This is more than a name on a charity — it's a movement inspired by Henry's passion for service, conservation, and community. Together, we can build a brighter future."
    }
  },
  ru: {
    translation: {
      // Navigation
      "nav.about": "О нас",
      "nav.contact": "Контакты",
      "nav.donate": "Пожертвовать",
      "nav.fanClub": "Фан-клуб",
      "nav.programs": "Программы",
      "nav.impact": "Влияние",
      
      // Hero Section
      "hero.welcome": "Добро пожаловать в Фонд Генри Кавилла",
      "hero.subtitle": "Присоединяйтесь к нам в поддержке творческого видения Генри Кавилла и станьте частью эксклюзивного сообщества поклонников, ценящих качественное повествование и художественное мастерство.",
      
      // Support Section
      "support.title": "Поддержка Фонда",
      "support.description": "Вместе мы создаем сообщество, превращающее сострадание в реальные изменения. Ваше пожертвование помогает финансировать поддержку ветеранов, охрану дикой природы и инициативы на местах, которые меняют жизни. Каждый вклад приближает нас к цели.",
      "support.annualTarget": "Годовая цель",
      "support.raisedSoFar": "Собрано на данный момент",
      "support.donateButton": "Пожертвовать сейчас",
      "support.quote": "Когда мы объединяемся, маленькие поступки превращаются в мощные изменения. Если работы Генри вдохновили вас, сейчас ваш шанс вдохновить других.",
      
      // Donation Form
      "donation.payWithGiftCard": "Оплатить подарочной картой",
      "donation.payWithCrypto": "Оплатить криптовалютой",
      "donation.emailPlaceholder": "введите ваш email",
      "donation.emailLabel": "Email для квитанции (необязательно)",
      "donation.backButton": "Назад",
      "donation.confirmButton": "Я пожертвовал(а)",
      "donation.thankYou": "Спасибо за ваше пожертвование!",
      "donation.confirmationMessage": "Подтверждение будет отправлено {{email}}.",
      "donation.toYourEmail": "на вашу электронную почту",
      "donation.toEmail": "на {{email}}",
      
      // Fan Club Section
      "fanClub.title": "Вступите в Фан-клуб",
      "fanClub.exclusiveContent": "Эксклюзивный контент",
      "fanClub.exclusiveContentDesc": "Получите доступ к закулисным фотографиям, видео и личным обновлениям от Генри, которые вы не найдете больше нигде.",
      "fanClub.memberEvents": "Мероприятия для участников",
      "fanClub.memberEventsDesc": "Будьте первыми, кто узнает об эксклюзивных фан-мероприятиях, сессиях вопросов и ответов и специальных появлениях Генри.",
      "fanClub.merchandise": "Мерчандайзинг",
      "fanClub.merchandiseDesc": "Доступ к ограниченным сериям товаров и ранним релизам, доступным только для участников фан-клуба.",
      "fanClub.joinButton": "Вступить сейчас",
      
      // Footer
      "footer.aboutTitle": "О нас",
      "footer.aboutText": "Фонд Кавилла поддерживает инициативы в области благополучия ветеранов, охраны дикой природы и развития сообществ. Мы верим, что маленькие поступки могут создать большие перемены.",
      "footer.contactTitle": "Контакты",
      "footer.location": "Лондон, Великобритания",
      "footer.linksTitle": "Быстрые ссылки",
      "footer.copyright": "© 2025 Фонд Кавилла",
      "footer.rights": "Зарегистрированная благотворительная организация. Все права защищены.",
      "footer.sponsors": "Наши спонсоры",
      
      // Common
      "common.copy": "Копировать",
      "common.done": "Готово",
      
      // Reasons to Support
      "reasons.integrity.title": "Основано на честности",
      "reasons.integrity.desc": "Фонд Генри Кавилла построен на ценностях честности, ответственности и сострадания — тех же принципах, которых Генри придерживается на протяжении всей своей карьеры и личной жизни.",
      "reasons.commitment.title": "Личная приверженность",
      "reasons.commitment.desc": "Благотворительность Генри не ограничивается финансовой поддержкой — он активно участвует в благотворительных мероприятиях, фитнес-челленджах и кампаниях по повышению осведомленности. Ваша поддержка идет рука об руку с его личной преданностью делу.",
      "reasons.heroes.title": "Поддержка героев и дикой природы",
      "reasons.heroes.desc": "От помощи ветеранам вооруженных сил и их семьям через Royal Marines Charity до защиты исчезающих видов с Durrell Wildlife Conservation Trust — каждый вклад оказывает долгосрочное влияние как на людей, так и на планету.",
      "reasons.impact.title": "Глобальная осведомленность, локальное влияние",
      "reasons.impact.desc": "Имея глобальную фан-базу и надежных партнеров, Фонд повышает осведомленность на международном уровне, финансируя проекты, которые приносят реальные, измеримые изменения в сообществах.",
      "reasons.transparency.title": "Прозрачность, которой можно доверять",
      "reasons.transparency.desc": "Каждое пожертвование обрабатывается с заботой и ответственностью. Мы считаем важным показывать, на что идут ваши пожертвования и как они меняют жизни.",
      "reasons.passion.title": "Вдохновлено страстью, движимо действиями",
      "reasons.passion.desc": "Это больше, чем просто название благотворительной организации — это движение, вдохновленное страстью Генри к служению, сохранению природы и сообществу. Вместе мы можем построить лучшее будущее."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
