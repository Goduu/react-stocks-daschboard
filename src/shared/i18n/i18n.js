import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DateTime } from 'luxon';

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
      format: (value, format, lng) => {
        if (value instanceof Date) {
          return DateTime.fromJSDate(value).setLocale(lng).toISODate(DateTime[format])
        }
        return value;
      }
    },
    resources: {
      en: {
        translation: {
          esg: {
            UNDER_PERF: 'Low',
            AVG_PERF: 'Mid',
            LAG_PERF: 'High',
            totalEsg: 'ESG Total',
            socialScore: 'Social',
            environmentScore: 'Environment',
            governanceScore: 'Governance'
          },
          indicators: {
            averageAnalystRating: 'Avg Analyst Rating',
            averageDailyVolume3Months: 'Avg Daily Volume 3 Months',
            averageDailyVolume10Day: 'Avg Daily Volume 10 Days',
            bookValuePerShare: 'BVPS',
            earningsAnnouncement: 'Earnings Anoucement',
            ebitda: 'EBITDA',
            eps: 'EPS',
            epsEstimateCurrentYear: 'EPS Estimate Current Year',
            epsEstimateNextYear: 'EPS Estimate Next Year',
            epsEstimateNextQuarter: 'EPS Estimate Next Quarter',
            epsForward: 'EPS Forward',
            epsCurrentYear: 'EPS Current Year',
            hist: 'History',
            indicators: 'Indicators',
            marketCap: 'Market Cap.',
            market: 'Market',
            oneYearTargetPrice: 'One Year Target Price',
            priceBook: 'P/B',
            pe: 'P/E',
            peg: 'PEG',
            priceSales: 'P/S',
            roe: 'ROE',
            revenue: 'Revenue',
            sharesOutstanding: 'Shares Outstanding',
            title: 'Indicators',
            forwardPE: 'Forward PE',
            profitMargins: 'Profit Margins',
            sharesPercentSharesOut: 'Shares avaliable',
            heldPercentInsiders: 'Held by Insiders',
            heldPercentInstitutions: 'Held by Institutions',
            beta: 'Beta',
            earningsQuarterlyGrowth: 'Earnings Quarterly Growth',
            mostRecentQuarter: 'Most recent quarter',
            netIncomeToCommon: 'Net Income to Common',
            trailingEps: 'Trailing EPS',
            forwardEps: 'Forward EPS',
            enterpriseToRevenue: 'EV/R',
            enterpriseToEbitda: 'EV/EBITDA',
            '52WeekChange': 'One Year Change',
            lastDividendValue: 'Last Dividend',
            lastDividendDate: 'Last Dividend Date',
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
              forwardPE: 'Forward P/E',
              profitMargins: 'Profit Margins',
              sharesPercentSharesOut: 'Shares avaliable to the market',
              heldPercentInsiders: 'Shares Held by Insiders',
              heldPercentInstitutions: 'Shares Held by Institutions',
              beta: 'Beta',
              earningsQuarterlyGrowth: 'Earnings Quarterly Growth',
              mostRecentQuarter: 'Most recent quarter',
              netIncomeToCommon: 'Net Income to Common',
              forwardEps: 'Forward EPS',
              enterpriseToRevenue: 'Enterprise-Value-to-Revenue',
              enterpriseToEbitda: 'Enterprise Value to EBITDA',
              '52WeekChange': 'One Year Change',
              lastDividendValue: 'Last Dividend',
              lastDividendDate: 'Last Dividend Date',
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
              revenue: 'https://www.investopedia.com/terms/r/revenue.asp',
              oneYearTargetPrice: 'https://www.investopedia.com/investing/target-prices-and-sound-investing/',
              earningsAnnouncement: 'Earnings Anoucement',
              market: 'Market',
              forwardPE: 'https://www.investopedia.com/terms/f/forwardpe.asp',
              profitMargins: 'https://www.investopedia.com/terms/p/profitmargin.asp',
              sharesPercentSharesOut: 'https://www.investopedia.com/terms/o/outstandingshares.asp',
              heldPercentInsiders: 'https://www.investopedia.com/articles/02/121002.asp',
              heldPercentInstitutions: 'Shares Held by Institutions',
              beta: 'https://www.investopedia.com/terms/b/beta.asp',
              earningsQuarterlyGrowth: 'https://www.investopedia.com/terms/q/quarterlyrevenuegrowth.asp',
              mostRecentQuarter: '',
              netIncomeToCommon: 'https://www.thebalance.com/net-income-applicable-to-common-shares-357584',
              forwardEps: 'https://www.investopedia.com/terms/f/fowardlookingearnings.asp',
              enterpriseToRevenue: 'https://www.investopedia.com/terms/e/ev-revenue-multiple.asp',
              enterpriseToEbitda: 'https://www.investopedia.com/terms/e/ebitda-ev-multiple.asp',
              '52WeekChange': 'https://www.investopedia.com/terms/1/52-week-range.asp',
              lastDividendValue: 'https://www.investopedia.com/terms/d/dividend.asp',
              lastDividendDate: 'https://www.investopedia.com/terms/d/dividend.asp',
            }
          },
          date: '{{date, DATE_HUGE}}'
        }
      }
    }
  });

export default i18n;