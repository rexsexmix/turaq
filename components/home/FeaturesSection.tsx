import {
  BadgeCheck,
  FileSignature,
  GalleryVertical,
  Images,
  LineChart,
  Map,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

/** Короткие тезисы о преимуществах Turaq (MVP — без реальной логики за кадром). */
const features = [
  {
    title: "Честная цена",
    text: "Подсказка по рынку на каждом объявлении — меньше сомнений при выборе.",
    icon: LineChart,
  },
  {
    title: "Проверенный собственник",
    text: "Верификация через eGov — меньше риска мошенничества.",
    icon: BadgeCheck,
  },
  {
    title: "Договоры в приложении",
    text: "Аренда, задаток и сопровождение — с ЭЦП, без беготни по кабинетам.",
    icon: FileSignature,
  },
  {
    title: "Turaq Pro",
    text: "Отдельный кабинет для агентств и застройщиков: фиды, аналитика, CRM.",
    icon: Users,
  },
  {
    title: "Профиль риелтора",
    text: "Как соцсеть: подписки, рейтинг, портфолио и доверие к человеку.",
    icon: Sparkles,
  },
  {
    title: "Фото и видео района",
    text: "Живые материалы от людей — не только сухие параметры квартиры.",
    icon: Images,
  },
  {
    title: "Лента объявлений",
    text: "Вертикальные видео — одна из вкладок, рядом с классическим поиском.",
    icon: GalleryVertical,
  },
  {
    title: "Карта и зоны",
    text: "Нарисуй район на карте — покажем объявления именно там.",
    icon: Map,
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-10" aria-labelledby="features-heading">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-brand">Почему Turaq</p>
            <h2 id="features-heading" className="mt-1 text-[28px] font-bold tracking-[-0.5px] text-text-primary">
              Восемь опор, на которых держится сервис
            </h2>
          </div>
          <p className="max-w-md text-sm text-text-secondary">
            Сначала делаем быстрый и понятный поиск. Уникальные сценарии подключаются поэтапно — без ломки
            привычного опыта.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, text, icon: Icon }) => (
            <article
              key={title}
              className="flex flex-col rounded-card border border-border bg-surface-secondary p-5 transition-all duration-200 hover:border-brand/40"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{text}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 flex items-start gap-2 rounded-large border border-dashed border-border bg-surface-secondary/60 px-4 py-3 text-sm text-text-secondary">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
          <span>
            Live-показы и ипотека «за 5 минут» — на дорожной карте второй волны. Сейчас фокус на каталоге и
            карточке объекта.
          </span>
        </p>
      </div>
    </section>
  );
}
