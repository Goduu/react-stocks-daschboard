import { TableGrid } from './table/Table';
import { MainCardGrid } from './card/MainCard';
import { NoteGrid } from './note/Note';
import { SwotGrid } from './swot/Swot';
import { IndicatorsGrid } from './indicators/Indicators';
import LineChartCard from './LineChart/LineChartCard';
import BarChartCard from './BarChart/BarChartCard';
import MultichartsCard from './multicharts/Multicharts';
import { EsgGrid } from './esg/Esg';
import { Statistics } from './statistics/Statistics';
import News from './news/News';


export const getCardProps = (type, functions, gridItems, ticker, id) => {
  let props = {
    params: {},
    i: id,
    x: (gridItems.items.length * 2) % (gridItems.cols || 12),
    y: -99, // puts it at the bottom
    identifier: ticker,
    type: type,
    onRemoveItem: (id) => functions.onRemoveItem(id),
    changeParams: (p) => functions.changeParams(p)
  }
  let component
  switch (type) {
    case 'note':
      console.log("note")
      props = {
        ...props,
        w: 3,
        h: 2,
        minH: 2,
        maxW: 3,
        minW: 2,
      }
      component = NoteGrid(props)
      break
    case 'card':
      props = {
        ...props,
        w: 3,
        h: 2,
        minW: 2,
        maxW: 3,
        minH: 2,
        maxH: 2,
      }
      component = MainCardGrid(props)
      break
    case 'table':
      console.log("TABLE")
      props = {
        ...props,
        w: 6,
        h: 2,
      }
      component = TableGrid(props)
      break
    case 'pricechart':
      console.log("pricechart")
      props = {
        ...props,
        w: 5,
        h: 2,
        params: { period: "1 Month" },
      }
      component = LineChartCard(props)
      break

    case 'dividendchart':
      console.log("dividendchart")
      props = {
        ...props,
        w: 5,
        h: 2,
        params: { period: "6 Months" },

      }
      component = BarChartCard(props)
      break
    case 'multichart':
      console.log("multichart")
      props = {
        ...props,
        w: 5,
        h: 2,
        params: { period: 180 },

      }
      component = MultichartsCard(props)
      break

    case 'news':
      console.log("news")
      props = {
        ...props,
        w: 3,
        h: 2,
        minH: 2,
        maxH: 2,
        minW: 3,
      }
      component = News(props)
      break

    case 'swot':
      console.log("swot")

      props = {
        ...props,
        w: 4,
        h: 2,
        minH: 2,
        minW: 4,
      }
      component = SwotGrid(props)
      break

    case 'indicators':
      console.log("indicators")
      props = {
        ...props,
        w: 4,
        h: 2,
        minH: 2,
        minW: 2,
        // editIndicatorList: editIndicatorList
      }
      component = IndicatorsGrid(props)
      break
    case 'esg':
      console.log("esg")
      props = {
        ...props,
        w: 5,
        h: 3,
        minH: 3,
        minW: 5,
        maxH: 3
        // editIndicatorList: editIndicatorList
      }
      component = EsgGrid(props)
      break
    case 'statistics':
      console.log("statistics")
      props = {
        ...props,
        w: 2,
        h: 1,
        minH: 1,
        minW: 1,
        maxH: 1,
        maxW: 3,
        // editIndicatorList: editIndicatorList
      }
      component = Statistics(props)
      break

  }
  return component
}


export const getRestoredItems = (g, ticker, props, functions) => {
  let gridItems_
  let type = g.type
  let iTemp = g.id
  let params = g.params
  props = {
    ...props,
    params: params,
    onRemoveItem: (i) => functions.onRemoveItem(i),
    changeParams: (p) => functions.changeParams(p)
  }

  if (type === 'card') {
    props = {
      ...props,
      identifier: ticker,
      onRemoveItem: null
    }
    gridItems_ = MainCardGrid(props)



  } else if (type === 'note') {
    props = {
      ...props,

    }
    gridItems_ = NoteGrid(props)

  } else if (type === 'table') {

    props = {
      ...props,
    }
    gridItems_ = TableGrid(props)


  } else if (type === 'pricechart') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = LineChartCard(props)

  }

  else if (type === 'dividendchart') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = BarChartCard(props)

  }
  else if (type === 'multichart') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = MultichartsCard(props)

  }
  else if (type === 'news') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = News(props)
  }
  else if (type === 'swot') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = SwotGrid(props)
  }
  else if (type === 'indicators') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = IndicatorsGrid(props)
  }
  else if (type === 'esg') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = EsgGrid(props)
  }
  else if (type === 'statistics') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = Statistics(props)
  }
  return {
    gridItems: gridItems_,
    gridElements: { id: iTemp, type: type, params: params }
  }
}