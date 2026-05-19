"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  addListingDraft,
  getListingDraftById,
  updateListingDraft,
} from "@/lib/listingDrafts";
import type { PropertyCity } from "@/types/property";

type DealType = "rent" | "sale";

type FieldErrors = Partial<Record<string, string>>;

const cities: { value: PropertyCity; label: string }[] = [
  { value: "Алматы", label: "Алматы" },
  { value: "Астана", label: "Астана" },
  { value: "Шымкент", label: "Шымкент" },
];

function isNonEmptyUrl(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Форма подачи объявления: проверка на стороне браузера, без отправки на сервер.
 * Успех — заглушка с пояснением, что публикация появится позже.
 */
export function SubmitListingForm() {
  const formId = useId();
  const searchParams = useSearchParams();
  const draftIdParam = searchParams.get("draftId");
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [dealType, setDealType] = useState<DealType | "">("");
  const [city, setCity] = useState<"" | PropertyCity>("");
  const [district, setDistrict] = useState("");
  const [rooms, setRooms] = useState("");
  const [area, setArea] = useState("");
  const [floor, setFloor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [savedAsUpdate, setSavedAsUpdate] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const validate = (): boolean => {
    const next: FieldErrors = {};

    if (!dealType) {
      next.dealType = "Выберите тип сделки";
    }

    if (!city) {
      next.city = "Выберите город";
    }

    const districtTrimmed = district.trim();
    if (districtTrimmed.length < 2) {
      next.district = "Укажите район (минимум 2 символа)";
    }

    const roomsNum = Number.parseInt(rooms, 10);
    if (!Number.isFinite(roomsNum) || roomsNum < 1 || roomsNum > 10) {
      next.rooms = "Укажите число комнат от 1 до 10";
    }

    const areaNum = Number.parseFloat(area.replace(",", "."));
    if (!Number.isFinite(areaNum) || areaNum <= 0) {
      next.area = "Укажите площадь больше нуля";
    }

    const floorTrimmed = floor.trim();
    if (floorTrimmed.length < 1) {
      next.floor = "Укажите этаж, например 5 или 5/9";
    } else if (!/\d/.test(floorTrimmed)) {
      next.floor = "Укажите этаж цифрами, например 5 или 5/9";
    }

    const priceNum = Number.parseFloat(price.replace(/\s/g, "").replace(",", "."));
    if (!Number.isFinite(priceNum) || priceNum <= 0) {
      next.price = "Укажите цену больше нуля";
    }

    const descTrimmed = description.trim();
    if (descTrimmed.length < 20) {
      next.description = "Описание — минимум 20 символов";
    }

    const imageTrimmed = imageUrl.trim();
    if (!isNonEmptyUrl(imageTrimmed)) {
      next.imageUrl = "Введите корректную ссылку на фото (http или https)";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  useEffect(() => {
    if (!draftIdParam) {
      return;
    }
    const draft = getListingDraftById(draftIdParam);
    if (!draft) {
      return;
    }
    setEditingDraftId(draft.id);
    setDealType(draft.dealType);
    setCity(draft.city);
    setDistrict(draft.district);
    setRooms(String(draft.rooms));
    setArea(String(draft.area));
    setFloor(draft.floor);
    setPrice(String(draft.price));
    setDescription(draft.description ?? "");
    setImageUrl(draft.imageUrl);
    setSubmitted(false);
    setErrors({});
  }, [draftIdParam]);

  useEffect(() => {
    if (!toastVisible) {
      return;
    }
    const timer = window.setTimeout(() => setToastVisible(false), 5500);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      setSubmitted(false);
      setToastVisible(false);
      return;
    }

    const roomsNum = Number.parseInt(rooms, 10);
    const areaNum = Number.parseFloat(area.replace(",", "."));
    const priceNum = Number.parseFloat(price.replace(/\s/g, "").replace(",", "."));
    const districtTrimmed = district.trim();
    const imageTrimmed = imageUrl.trim();
    const descTrimmed = description.trim();

    const draftPayload = {
      dealType: dealType as DealType,
      city: city as PropertyCity,
      district: districtTrimmed,
      rooms: roomsNum,
      area: areaNum,
      floor: floor.trim(),
      price: priceNum,
      title: `${roomsNum}-комн, ${districtTrimmed}`,
      imageUrl: imageTrimmed,
      description: descTrimmed,
    };

    const isUpdate = Boolean(editingDraftId && getListingDraftById(editingDraftId));
    if (isUpdate && editingDraftId) {
      updateListingDraft(editingDraftId, draftPayload);
    } else {
      const created = addListingDraft(draftPayload);
      setEditingDraftId(created.id);
    }

    setSavedAsUpdate(isUpdate);
    setSubmitted(true);
    setToastVisible(true);
  };

  const successBlock =
    submitted ? (
      <div
        className="mt-8 rounded-card border border-brand/40 bg-surface-secondary p-6"
        role="status"
        aria-live="polite"
        id={`${formId}-success`}
      >
        <p className="text-lg font-semibold text-text-primary">
          {savedAsUpdate ? "Черновик обновлён" : "Черновик сохранён"}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
          Данные лежат в браузере (localStorage) — после перезагрузки они останутся в профиле. Публикация на сайте
          появится после подключения сервера.
        </p>
        <Link
          href="/profile"
          className="mt-4 inline-flex rounded-pill bg-brand px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-deep"
        >
          Открыть профиль
        </Link>
      </div>
    ) : null;

  return (
    <>
      {toastVisible ? (
        <div
          className="fixed bottom-6 left-1/2 z-[100] max-w-[min(100%,420px)] -translate-x-1/2 px-4"
          role="status"
          aria-live="polite"
        >
          <div className="rounded-card border border-brand/50 bg-surface-secondary px-4 py-3 shadow-lg">
            <p className="text-sm font-medium text-text-primary">Форма проверена</p>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary">
              Отправка на сервер пока отключена — это демонстрация успешной проверки формы.
            </p>
          </div>
        </div>
      ) : null}

      {successBlock}

      {!submitted ? (
        <form
          className="mt-8 flex flex-col gap-6 rounded-card border border-border bg-surface-secondary p-5 sm:p-6"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Форма подачи объявления"
        >
          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm font-medium text-text-secondary">Тип сделки</legend>
            <div className="flex flex-wrap gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-button border border-border bg-surface px-4 py-2.5 text-sm text-text-primary has-[:checked]:border-brand has-[:checked]:ring-2 has-[:checked]:ring-brand">
                <input
                  type="radio"
                  name="dealType"
                  value="sale"
                  checked={dealType === "sale"}
                  onChange={() => setDealType("sale")}
                  className="sr-only"
                />
                Продажа
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-button border border-border bg-surface px-4 py-2.5 text-sm text-text-primary has-[:checked]:border-brand has-[:checked]:ring-2 has-[:checked]:ring-brand">
                <input
                  type="radio"
                  name="dealType"
                  value="rent"
                  checked={dealType === "rent"}
                  onChange={() => setDealType("rent")}
                  className="sr-only"
                />
                Аренда
              </label>
            </div>
            {errors.dealType ? <p className="text-sm text-error">{errors.dealType}</p> : null}
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm text-text-secondary">
          Город
          <select
            value={city}
            onChange={(event) => setCity(event.target.value as PropertyCity | "")}
            aria-invalid={errors.city ? true : undefined}
            className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
          >
            <option value="">Выберите город</option>
            {cities.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {errors.city ? <span className="text-error">{errors.city}</span> : null}
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-text-secondary">
          Район или ЖК
          <input
            type="text"
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            autoComplete="address-level2"
            aria-invalid={errors.district ? true : undefined}
            className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
            placeholder="Например, Самал-2"
          />
          {errors.district ? <span className="text-error">{errors.district}</span> : null}
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-sm text-text-secondary">
          Комнат
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={10}
            value={rooms}
            onChange={(event) => setRooms(event.target.value)}
            aria-invalid={errors.rooms ? true : undefined}
            className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary tabular-nums transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
            placeholder="2"
          />
          {errors.rooms ? <span className="text-error">{errors.rooms}</span> : null}
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-text-secondary">
          Площадь, м²
          <input
            type="text"
            inputMode="decimal"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            aria-invalid={errors.area ? true : undefined}
            className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary tabular-nums transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
            placeholder="68"
          />
          {errors.area ? <span className="text-error">{errors.area}</span> : null}
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-text-secondary">
          Этаж
          <input
            type="text"
            value={floor}
            onChange={(event) => setFloor(event.target.value)}
            aria-invalid={errors.floor ? true : undefined}
            className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
            placeholder="7/12"
          />
          {errors.floor ? <span className="text-error">{errors.floor}</span> : null}
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm text-text-secondary">
        Цена {dealType === "rent" ? "(за месяц)" : "(за объект)"}
        <input
          type="text"
          inputMode="numeric"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          aria-invalid={errors.price ? true : undefined}
          className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary tabular-nums transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
          placeholder={dealType === "rent" ? "280000" : "49500000"}
        />
        {errors.price ? <span className="text-error">{errors.price}</span> : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-text-secondary">
        Описание
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={5}
          aria-invalid={errors.description ? true : undefined}
          className="rounded-card border border-border bg-surface px-3 py-2.5 text-[15px] leading-relaxed text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
          placeholder="Квартира с ремонтом, окна во двор, рядом метро..."
        />
        {errors.description ? <span className="text-error">{errors.description}</span> : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-text-secondary">
        Ссылка на фото (необязательно)
        <input
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          aria-invalid={errors.imageUrl ? true : undefined}
          className="rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand aria-invalid:border-error"
          placeholder="https://"
        />
        {errors.imageUrl ? <span className="text-error">{errors.imageUrl}</span> : null}
      </label>

      <button
        type="submit"
        className="rounded-pill bg-brand px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-deep focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface-secondary"
      >
        Отправить
      </button>
    </form>
      ) : null}
    </>
  );
}
