import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Particuliers() {
  const [isYearly, setIsYearly] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="mb-32 mt-12">
      <h1 className="mb-4 text-center font-jomhuria text-6xl">
        {t("personal.h1")}
      </h1>

      {/* Pricing toggle */}
      <div className="m-auto mb-8 flex max-w-[14rem] justify-center lg:mb-16">
        <div className="relative flex w-full rounded-full bg-muted p-1">
          <span
            className="pointer-events-none absolute inset-0 m-1"
            aria-hidden="true"
          >
            <span
              className={`absolute inset-0 w-1/2 transform rounded-full bg-green-500 shadow-sm shadow-indigo-950/10 transition-transform duration-150 ease-in-out ${
                isYearly ? "translate-x-0" : "translate-x-full"
              }`}
            ></span>
          </span>
          <button
            className={`relative h-8 flex-1 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out ${
              isYearly ? "text-white" : "text-black dark:text-slate-400"
            }`}
            onClick={() => setIsYearly(true)}
            aria-pressed={isYearly}
          >
            {t("personal.yearly")}{" "}
            <span
              className={
                isYearly
                  ? "text-slate-100"
                  : "text-slate-400 dark:text-slate-500"
              }
            >
              -20%
            </span>
          </button>
          <button
            className={`relative h-8 flex-1 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out ${
              isYearly ? "text-black dark:text-slate-400" : "text-white"
            }`}
            onClick={() => setIsYearly(false)}
            aria-pressed={!isYearly}
          >
            {t("personal.monthly")}
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
        {/* Pricing table 1*/}

        <div className="h-full">
          <div className="relative flex h-full flex-col rounded-2xl border p-6 shadow dark:border-slate-900 dark:bg-slate-900">
            <div className="mb-5">
              <div className="mb-1 font-semibold">{t("plans.tier1.name")}</div>
              <div className="mb-2 inline-flex select-none items-baseline">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-200">
                  ${isYearly ? "192" : "20"}
                </span>
                <span className="font-medium text-slate-500">
                  {isYearly ? "/an" : "/mo"}
                </span>
              </div>
              <div className="mb-5 text-sm text-slate-500">
                {t("plans.tier1.description")}
              </div>
              <Link
                to={"/inscription"}
                className="flex items-center justify-center whitespace-nowrap rounded-full bg-green-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-green-600"
              >
                {t("buttons.choosePlan")}
              </Link>
            </div>
            <div className="mb-3 font-medium text-slate-900 dark:text-slate-200">
              Inclus
            </div>
            <ul className="grow space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>
                  <Trans i18nKey={"plans.tier1.perk1"}>
                    <b>20</b> transactions quotidiennes
                  </Trans>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>
                  <Trans i18nKey={"plans.tier1.perk2"}>
                    <b>$5,000</b> en transactions quotidiennes.
                  </Trans>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>{t("plans.tier1.perk3")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing table 2*/}

        <div className="h-full">
          <div className="relative flex h-full flex-col rounded-2xl border p-6 shadow dark:border-slate-900 dark:bg-slate-900">
            <div className="absolute right-0 top-0 -mt-4 mr-6">
              <Badge className="cursor-default rounded-full bg-green-500 text-white hover:bg-green-500">
                Le plus populaire
              </Badge>
            </div>
            <div className="mb-5">
              <div className="mb-1 select-none font-semibold text-slate-900 dark:text-slate-200">
                {t("plans.tier2.name")}
              </div>
              <div className="mb-2 inline-flex select-none items-baseline">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-200">
                  ${isYearly ? "384" : "40"}
                </span>
                <span
                  className="text-4xl font-bold text-slate-900 dark:text-slate-200"
                  v-text="isYearly ? '49' : '55'"
                ></span>
                <span className="font-medium text-slate-500">
                  {isYearly ? "/an" : "/mo"}
                </span>
              </div>
              <div className="mb-5 text-sm text-slate-500">
                {t("plans.tier2.description")}
              </div>
              <Link
                to={"/inscription"}
                className="flex items-center justify-center whitespace-nowrap rounded-full bg-green-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-green-600"
              >
                {t("buttons.choosePlan")}
              </Link>
            </div>
            <div className="mb-3 font-medium text-slate-900 dark:text-slate-200">
              Inclus
            </div>
            <ul className="grow space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>
                  <Trans i18nKey={"plans.tier2.perk1"}>
                    Nombre <b>illimité</b> d'opérations par mois.
                  </Trans>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>
                  <Trans i18nKey={"plans.tier2.perk2"}>
                    <b>$15,000</b> en transactions quotidiennes.
                  </Trans>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>{t("plans.tier2.perk3")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>{t("plans.tier2.perk4")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing table 3*/}

        <div className="h-full">
          <div className="relative flex h-full flex-col rounded-2xl border p-6 shadow dark:border-slate-900 dark:bg-slate-900">
            <div className="mb-5">
              <div className="mb-1 select-none font-semibold text-slate-900 dark:text-slate-200">
                {t("plans.tier3.name")}
              </div>
              <div className="mb-2 inline-flex select-none items-baseline">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-200">
                  ${isYearly ? "816" : "85"}
                </span>
                <span className="font-medium text-slate-500">
                  {isYearly ? "/an" : "/mo"}
                </span>
              </div>
              <div className="mb-5 text-sm text-slate-500">
                {t("plans.tier3.description")}
              </div>
              <Link
                to={"/inscription"}
                className="flex items-center justify-center whitespace-nowrap rounded-full bg-green-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-green-600"
              >
                {t("buttons.choosePlan")}
              </Link>
            </div>
            <div className="mb-3 font-medium text-slate-900 dark:text-slate-200">
              Inclus
            </div>
            <ul className="grow space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>
                  <Trans i18nKey={"plans.tier3.perk1"}>
                    Nombre <b>illimité</b> d'opérations par mois
                  </Trans>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>
                  <Trans i18nKey={"plans.tier3.perk2"}>
                    <b>$100,000</b> en transactions quotidiennes
                  </Trans>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>{t("plans.tier3.perk3")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>{t("plans.tier3.perk4")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                <span>
                  <Trans i18nKey={"plans.tier3.perk5"}>
                    Chèques, traites et autres services <b>gratuits</b>
                  </Trans>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
