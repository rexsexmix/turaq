const footerSections = [
  {
    title: "Покупателям",
    links: ["Купить квартиру", "Снять", "Новостройки", "Аналитика рынка"],
  },
  {
    title: "Продавцам",
    links: ["Подать объявление", "Тарифы", "Кабинет агентства", "Помощь"],
  },
  {
    title: "Компания",
    links: ["О нас", "Карьера", "Контакты", "Условия"],
  },
  {
    title: "Контакты",
    links: ["Алматы, Достык 240", "+7 727 000 00 00", "hello@turaq.kz"],
  },
];

export function Footer() {
  return (
    <footer className="mt-10 bg-surface-secondary px-6 py-12">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium text-text-primary">{section.title}</h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-secondary transition-colors duration-200 hover:text-brand"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-2xl font-semibold tracking-[-0.5px] text-brand">turaq</p>
          <p className="text-sm text-text-secondary">© 2026 Turaq. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
