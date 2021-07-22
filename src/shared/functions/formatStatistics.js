

const formatStatistic = (statistic, value) => {
    switch (statistic) {
        case 'summaryDetails.averageDailyVolume10Day': {
            return minifier(value, 2)
        }
        case 'keyStatistics.beta': {
            return minifier(value, 2)
        }
        case 'keyStatistics.bookValue': {
            return minifier(value, 2)
        }
        case 'keyStatistics.change52Week': {
            return minifier(value, 2) + '%'
        }
        case 'financialData.currentRatio': {
            return minifier(value, 2)
        }
        case 'keyStatistics.dateShortInterest': {
            return new Date(value * 1000).toLocaleDateString()
        }
        case 'financialData.debtToEquity': {
            return minifier(value, 2)
        }
        case 'summaryDetails.dividendYield': {
            return minifier(value, 2)
        }
        case 'financialData.earningsGrowth': {
            return minifier(value, 2) + '%'
        }
        case 'keyStatistics.earningsQuarterlyGrowth': {
            return minifier(value, 2)
        }
        case 'financialData.ebitda': {
            return minifier(value, 2)
        }
        case 'financialData.ebitdaMargins': {
            return minifier(value, 2, 100) + '%'
        }
        case 'keyStatistics.enterpriseToEbitda': {
            return minifier(value, 2)
        }
        case 'keyStatistics.enterpriseToRevenue': {
            return minifier(value, 2)
        }
        case 'keyStatistics.enterpriseValue': {
            return minifier(value, 2)
        }
        case 'summaryDetails.fiftyDayAverage': {
            return minifier(value, 2)
        }
        case 'summaryDetails.fiftyTwoWeekHigh': {
            return minifier(value, 2)
        }
        case 'summaryDetails.fiftyTwoWeekLow': {
            return minifier(value, 2)
        }
        case 'summaryDetails.fiveYearAvgDividendYield': {
            return minifier(value, 2)
        }
        case 'keyStatistics.floatShares': {
            return minifier(value, 2)
        }
        case 'keyStatistics.forwardEps': {
            return minifier(value, 2)
        }
        case 'keyStatistics.forwardPE': {
            return minifier(value, 3)
        }
        case 'financialData.freeCashflow': {
            return minifier(value, 2)
        }
        case 'financialData.grossMargins': {
            return minifier(value, 2, 100) + '%'
        }
        case 'financialData.grossProfits': {
            return minifier(value, 2)
        }
        case 'keyStatistics.heldPercentInstitutions': {
            return minifier(value, 2) + '%'
        }
        case 'keyStatistics.lastDividendDate': {
            return value === '-' ? value : new Date(value * 1000).toLocaleDateString()
        }
        case 'keyStatistics.lastDividendValue': {
            return value === '-' ? value : minifier(value, 2)
        }
        case 'keyStatistics.lastFiscalYearEnd': {
            return minifier(value, 2)
        }
        case 'keyStatistics.lastSplitDate': {
            return new Date(value * 1000).toLocaleDateString()
        }
        case 'keyStatistics.lastSplitFactor': {
            return minifier(value, 2)
        }
        case 'summaryDetails.marketCap': {
            return minifier(value, 2)
        }
        case 'keyStatistics.mostRecentQuarter': {
            return minifier(value, 2)
        }
        case 'keyStatistics.netIncomeToCommon': {
            return minifier(value, 2)
        }
        case 'keyStatistics.nextFiscalYearEnd': {
            return minifier(value, 2)
        }
        case 'financialData.numberOfAnalystOpinions': {
            return minifier(value, 2)
        }
        case 'financialData.operatingCashflow': {
            return minifier(value, 2)
        }
        case 'financialData.operatingMargins': {
            return minifier(value, 2, 100) + '%'
        }
        case 'summaryDetails.payoutRatio': {
            return minifier(value, 2) + '%'
        }
        case 'keyStatistics.pegRatio': {
            return minifier(value, 2)
        }
        case 'keyStatistics.priceToBook': {
            return minifier(value, 2)
        }
        case 'summaryDetails.priceToSalesTrailing12Months': {
            return minifier(value, 2)
        }
        case 'financialData.profitMargins': {
            console.log("Profit", value, minifier(value, 2) + '%')
            return minifier(value, 2, 100) + '%'
        }
        case 'keyStatistics.profitMargins': {
            return minifier(value, 2) + '%'
        }
        case 'financialData.quickRatio': {
            return minifier(value, 2)
        }
        case 'financialData.recommendationKey': {
            return value
        }
        case 'financialData.recommendationMean': {
            return minifier(value, 2)
        }
        case 'financialData.returnOnAssets': {
            return minifier(value, 2) + '%'
        }
        case 'financialData.returnOnEquity': {
            return minifier(value, 2) + '%'
        }
        case 'financialData.revenueGrowth': {
            return minifier(value, 2) + '%'
        }
        case 'financialData.revenuePerShare': {
            return minifier(value, 2)
        }
        case 'keyStatistics.sandP52WeekChange': {
            return minifier(value, 2) + '%'
        }
        case 'keyStatistics.sharesOutstanding': {
            return minifier(value, 2)
        }
        case 'keyStatistics.sharesPercentSharesOut': {
            return minifier(value, 2) + '%'
        }
        case 'keyStatistics.sharesShort': {
            return minifier(value, 2)
        }
        case 'keyStatistics.sharesShortPreviousMonthDate': {
            return new Date(value * 1000).toLocaleDateString()
        }
        case 'keyStatistics.sharesShortPriorMonth': {
            return minifier(value, 2)
        }
        case 'keyStatistics.shortPercentOfFloat': {
            return minifier(value, 2) + '%'
        }
        case 'keyStatistics.shortRatio': {
            return minifier(value, 2)
        }
        case 'financialData.targetHighPrice': {
            return minifier(value, 2)
        }
        case 'financialData.targetLowPrice': {
            return minifier(value, 2)
        }
        case 'financialData.targetMeanPrice': {
            return minifier(value, 2)
        }
        case 'financialData.targetMedianPrice': {
            return minifier(value, 2)
        }
        case 'financialData.totalCash': {
            return minifier(value, 2)
        }
        case 'financialData.totalCashPerShare': {
            return minifier(value, 2)
        }
        case 'financialData.totalDebt': {
            return minifier(value, 2)
        }
        case 'financialData.totalRevenue': {
            return minifier(value, 2)
        }
        case 'summaryDetails.trailingAnnualDividendRate': {
            return minifier(value, 2) + '%'
        }
        case 'summaryDetails.trailingAnnualDividendYield': {
            return minifier(value, 2) + '%'
        }
        case 'keyStatistics.trailingEps': {
            return minifier(value, 2)
        }
        case 'summaryDetails.trailingPE': {
            return minifier(value, 2)
        }
        case 'summaryDetails.twoHundredDayAverage': {
            return minifier(value, 2)
        }
        case 'summaryDetails.volume': {
            return minifier(value, 2)
        }
    }
}

function minifier(num, digits, percent = 1) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : (num * percent).toFixed(digits);
}

export default formatStatistic