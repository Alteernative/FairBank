import React, { useState } from "react";

export default function Particuliers() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="mb-60 dark:bg-slate-950 dark:text-white">
      <section className="py-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center">
            <img
              src="/images/personal.svg"
              alt=""
              className="mb-8 h-auto w-1/3"
            />
          </div>
          <h1 className="mb-4 font-jomhuria text-6xl text-primary">
            Commencez gratuitement ou selon vos besoins!
          </h1>
        </div>
      </section>

      {/* Pricing toggle */}
      <div className="m-auto mb-8 flex max-w-[14rem] justify-center lg:mb-16">
        <div className="relative flex w-full rounded-full bg-white p-1 dark:bg-slate-900">
          <span
            className="pointer-events-none absolute inset-0 m-1"
            aria-hidden="true"
          >
            <span
              className={`absolute inset-0 w-1/2 transform rounded-full bg-emerald-500 shadow-sm shadow-indigo-950/10 transition-transform duration-150 ease-in-out ${
                isAnnual ? "translate-x-0" : "translate-x-full"
              }`}
            ></span>
          </span>
          <button
            className={`relative h-8 flex-1 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 ${
              isAnnual ? "text-white" : "text-black dark:text-slate-400"
            }`}
            onClick={() => setIsAnnual(true)}
            aria-pressed={isAnnual}
          >
            Annuel{" "}
            <span
              className={
                isAnnual
                  ? "text-indigo-200"
                  : "text-slate-400 dark:text-slate-500"
              }
            >
              -20%
            </span>
          </button>
          <button
            className={`relative h-8 flex-1 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 ${
              isAnnual ? "text-black dark:text-slate-400" : "text-white"
            }`}
            onClick={() => setIsAnnual(false)}
            aria-pressed={!isAnnual}
          >
            Mensuel
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
        {/* Pricing table 1*/}

        <div className="h-full">
          <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow shadow-slate-950/5 dark:border-slate-900 dark:bg-slate-900">
            <div className="mb-5">
              <div className="mb-1 font-semibold text-slate-900 dark:text-slate-200">
                Régulier
              </div>
              <div className="mb-2 inline-flex items-baseline">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-200">
                  0$
                </span>
                <span
                  className="text-4xl font-bold text-slate-900 dark:text-slate-200"
                  v-text="isAnnual ? '29' : '35'"
                ></span>
                <span className="font-medium text-slate-500">\mo</span>
              </div>
              <div className="mb-5 text-sm text-slate-500">
                Plan de base pour les particuliers avec des fonctionnalités
                essentielles.
              </div>
              <a
                className="inline-flex w-full justify-center whitespace-nowrap rounded-lg bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 transition-colors duration-150 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600"
                href="/inscription"
              >
                Choisir Plan
              </a>
            </div>
            <div className="mb-3 font-medium text-slate-900 dark:text-slate-200">
              Comprend:
            </div>
            <ul className="grow space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>
                  <b>20</b> transactions quotidiennes
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>
                  <b>5000$</b> en transactions quotidiennes
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>
                  Taux d'intérêt prêts: <b>{isAnnual ? "20.99%" : "24.99%"}</b>
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Service client 24h/7 jours</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing table 2*/}

        <div className="dark h-full">
          <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow shadow-slate-950/5 dark:border-slate-900 dark:bg-slate-900">
            <div className="absolute right-0 top-0 -mt-4 mr-6">
              <div className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-slate-950/5">
                Le plus populaire
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-1 font-semibold text-slate-900 dark:text-slate-200">
                Premium
              </div>
              <div className="mb-2 inline-flex items-baseline">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-200">
                  {isAnnual ? "12" : "15"}$
                </span>
                <span
                  className="text-4xl font-bold text-slate-900 dark:text-slate-200"
                  v-text="isAnnual ? '49' : '55'"
                ></span>
                <span className="font-medium text-slate-500">/mo</span>
              </div>
              <div className="mb-5 text-sm text-slate-500">
                Plan avancé pour les utilisateurs exigeants, avec des avantages
                supplémentaires.
              </div>
              <a
                className="inline-flex w-full justify-center whitespace-nowrap rounded-lg bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 transition-colors duration-150 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600"
                href="/inscription"
              >
                Choisir Plan
              </a>
            </div>
            <div className="mb-3 font-medium text-slate-900 dark:text-slate-200">
              Comprend:
            </div>
            <ul className="grow space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>
                  Nombre <b>illimité</b> d’opérations par mois
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>
                  <b>15000$</b> en transactions quotidiennes
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>
                  Taux d'intérêt prêts: <b>{isAnnual ? "19.99%" : "23.99%"}</b>
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Service client 24h/7 jours</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Service de conversion devises étrangères</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing table 3*/}

        <div className="h-full">
          <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow shadow-slate-950/5 dark:border-slate-900 dark:bg-slate-900">
            <div className="mb-5">
              <div className="mb-1 font-semibold text-slate-900 dark:text-slate-200">
                Ultime
              </div>
              <div className="mb-2 inline-flex items-baseline">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-200">
                  {isAnnual ? "40" : "50"}$
                </span>
                <span
                  className="text-4xl font-bold text-slate-900 dark:text-slate-200"
                  v-text="isAnnual ? '79' : '85'"
                ></span>
                <span className="font-medium text-slate-500">/mo</span>
              </div>
              <div className="mb-5 text-sm text-slate-500">
                Plan exclusif pour les utilisateurs professionnels, avec des
                avantages premium.
              </div>
              {/* bg-indigo-500 pour mauve */}
              <a
                className="inline-flex w-full justify-center whitespace-nowrap rounded-lg  bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 transition-colors duration-150 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600"
                href="/inscription"
              >
                Choisir Plan
              </a>
            </div>
            <div className="mb-3 font-medium text-slate-900 dark:text-slate-200">
              Comprend:
            </div>
            <ul className="grow space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>
                  Nombre <b>illimité</b> d’opérations par mois
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>
                  <b>100 000$</b> en transactions quotidiennes
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>
                  Taux d'intérêt prêts: <b>{isAnnual ? "18.99%" : "22.99%"}</b>
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Service client 24h/7</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Service de conversion devises étrangères</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-3 w-3 shrink-0 fill-emerald-500"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>
                  Chèques, traites et autres services <b>gratuits</b>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
