import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  //https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
            indicators: {
              title: 'Indicators',
              indicators: 'Indicators',
              eps: 'EPS',
              pe: 'P/E',
              peg: 'PEG',
              roe: 'ROE',
              ebitda: 'EBITDA',
              epsEstimateCurrentYear: 'EPS Estimate Current Year',
              epsEstimateNextYear: 'EPS Estimate Next Year',
              epsEstimateNextQuarter: 'EPS Estimate Next Quarter',
              marketCap: 'Market Cap.',
              sharesOutstanding: 'Shares Outstanding',
              priceBook: 'P/B',
              bookValuePerShare: 'BVPS',
              priceSales: 'P/S',
              revenue: 'Revenue',
              oneYearTargetPrice: 'One Year Target Price',
              earningsAnnouncement: 'Earnings Anoucement',
              market: 'Market',
              info: {
                  eps: 'Earnings Per Share',
                  pe: 'Price-to-Earnings',
                  peg: 'Price/Earnings-to-Growth',
                  roe: 'Return on Equity',
                  ebitda: 'Earnings Before Interest, Taxes, Depreciation, and Amortization',
                  epsEstimateNextQuarter: 'Earnings Per Share Estimate for Next Quarter',
                  epsEstimateCurrentYear: 'Earnings Per Share Estimate for Current Year',
                  epsEstimateNextYear: 'Earnings Per Share Estimate for Next Year',
                  marketCap: 'Market Capitalization',
                  sharesOutstanding: 'Shares Outstanding',
                  priceBook: 'Price-To-Book',
                  bookValuePerShare: 'Book Value/Share',
                  priceSales: 'Price-to-Sales Ratio',
                  revenue: 'Revenue',
                  oneYearTargetPrice: 'One Year Target Price',
                  earningsAnnouncement: 'Earnings Anoucement',
                  market: 'Market',
              },
              ref: {
                  eps: 'https://www.investopedia.com/terms/e/eps.asp',
                  pe: 'https://www.investopedia.com/terms/p/price-earningsratio.asp',
                  peg: 'https://www.investopedia.com/terms/p/pegratio.asp',
                  roe: 'https://www.investopedia.com/terms/r/returnonequity.asp',
                  ebitda: 'https://www.investopedia.com/terms/e/ebitda.asp',
                  epsEstimateCurrentYear: 'https://www.investopedia.com/terms/e/earningsestimate.asp',
                  epsEstimateNextYear: 'https://www.investopedia.com/terms/e/earningsestimate.asp',
                  epsEstimateNextQuarter: 'https://www.investopedia.com/terms/e/earningsestimate.asp',
                  marketCap: 'https://www.investopedia.com/investing/market-capitalization-defined/',
                  sharesOutstanding: 'https://www.investopedia.com/terms/o/outstandingshares.asp',
                  priceBook: 'https://www.investopedia.com/terms/p/price-to-bookratio.asp',
                  bookValuePerShare: 'https://www.investopedia.com/terms/b/bvps.asp',
                  priceSales: 'https://www.investopedia.com/terms/p/price-to-salesratio.asp',
                  revenue: 'Revenue',
                  oneYearTargetPrice: 'One Year Target Price',
                  earningsAnnouncement: 'Earnings Anoucement',
                  market: 'Market',
              }
          }
        }
      }
    }
  });

export default i18n;