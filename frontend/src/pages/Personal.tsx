import React, { useState } from 'react';

export default function Particuliers() {

  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="mb-60">
      <section className="py-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center">
            <img src="/choix.svg" alt="" className="mb-8 h-auto w-1/4" />
          </div>
          <h1 className="mb-4 font-jomhuria text-6xl text-primary">
            Commencez gratuitement ou selon vos besoins!
          </h1>
        </div>
      </section>

      {/* Pricing toggle */}
      <div className="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-16">
        <div className="relative flex w-full p-1 bg-white dark:bg-slate-900 rounded-full">
          <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
            <span
              className={`absolute inset-0 w-1/2 bg-emerald-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${isAnnual ? 'translate-x-0' : 'translate-x-full'
                }`}
            ></span>
          </span>
          <button
            className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${isAnnual ? 'text-white' : 'text-black dark:text-slate-400'
              }`}
            onClick={() => setIsAnnual(true)}
            aria-pressed={isAnnual}
          >
            Annuel <span className={isAnnual ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500'}>-20%</span>
          </button>
          <button
            className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${isAnnual ? 'text-black dark:text-slate-400' : 'text-white'
              }`}
            onClick={() => setIsAnnual(false)}
            aria-pressed={!isAnnual}
          >
            Mensuel
          </button>
        </div>
      </div>

      <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">

        {/* Pricing table 1*/}

        <div className="h-full">
          <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
            <div className="mb-5">
              <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">Régulier</div>
              <div className="inline-flex items-baseline mb-2">
                <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">0$</span>
                <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl" v-text="isAnnual ? '29' : '35'"></span>
                <span className="text-slate-500 font-medium">\mo</span>
              </div>
              <div className="text-sm text-slate-500 mb-5">Plan de base pour les particuliers avec des fonctionnalités essentielles.</div>
              <a className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150" href="/inscription">
              Choisir Plan
              </a>
            </div>
            <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">Comprend:</div>
            <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span><b>20</b> transactions quotidiennes</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span><b>5000$</b> en transactions quotidiennes</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Taux d'intérêt prêts: <b>{isAnnual ? '20.99%' : '24.99%'}</b></span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Service client 24h/7 jours</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing table 2*/}

        <div className="h-full dark">
          <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
            <div className="absolute top-0 right-0 mr-6 -mt-4">
              <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-emerald-500 text-white rounded-full shadow-sm shadow-slate-950/5">Le plus populaire</div>
            </div>
            <div className="mb-5">
              <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">Premium</div>
              <div className="inline-flex items-baseline mb-2">
                <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">{isAnnual ? '12' : '15'}$</span>
                <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl" v-text="isAnnual ? '49' : '55'"></span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <div className="text-sm text-slate-500 mb-5">Plan avancé pour les utilisateurs exigeants, avec des avantages supplémentaires.</div>
              <a className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150" href="/inscription">
                Choisir Plan
              </a>
            </div>
            <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">Comprend:</div>
            <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Nombre <b>illimité</b> d’opérations par mois</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span><b>15000$</b> en transactions quotidiennes</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Taux d'intérêt prêts: <b>{isAnnual ? '19.99%' : '23.99%'}</b></span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Service client 24h/7 jours</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Service de conversion devises étrangères</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing table 3*/}

        <div className="h-full">
          <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
            <div className="mb-5">
              <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">Ultime</div>
              <div className="inline-flex items-baseline mb-2">
                <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">{isAnnual ? '40' : '50'}$</span>
                <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl" v-text="isAnnual ? '79' : '85'"></span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <div className="text-sm text-slate-500 mb-5">Plan exclusif pour les utilisateurs professionnels, avec des avantages premium.</div>
              {/* bg-indigo-500 pour mauve */}
              <a className="w-full inline-flex justify-center whitespace-nowrap rounded-lg  bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150" href="/inscription">
              Choisir Plan
              </a>
            </div>
            <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">Comprend:</div>
            <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Nombre <b>illimité</b> d’opérations par mois</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span><b>100 000$</b> en transactions quotidiennes</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Taux d'intérêt prêts: <b>{isAnnual ? '18.99%' : '22.99%'}</b></span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Service client 24h/7</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Service de conversion devises étrangères</span>
              </li>
              <li className="flex items-center">
                <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Chèques, traites et autres services <b>gratuits</b></span>
              </li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
}