import { Table } from './table/Table';
import { MainCard } from './card/MainCard';
import { Note } from './note/Note';
import { Swot } from './swot/Swot';
import { IndicatorsGrid } from './indicators/Indicators';
import LineChartCard from './LineChart/LineChartCard';
import BarChartCard from './BarChart/BarChartCard';
import {Multichart} from './multicharts/Multicharts';
import { Esg } from './esg/Esg';
import { Statistics } from './statistics/Statistics';
import News from './news/News';


export const getCardProps = (type, functions, gridItems, ticker, id) => {
  let props = {
    params: {},
    i: id,
    x: (gridItems.items.length * 2) % (gridItems.cols || 12),
    y: 99, // puts it at the bottom
    identifier: ticker,
    type: type,
    onRemoveItem: (id) => functions.onRemoveItem(id),
    changeParams: (p) => functions.changeParams(p)
  }
  let component
  switch (type) {
    case 'note':
      props = {
        ...props,
        w: 3,
        h: 2,
        minH: 2,
        maxW: 5,
        minW: 2,
      }
      component = {
        key: id,
        dataGrid: props,
        component: <Note  {...props} />,
      }
      break
    case 'card':
      props = {
        ...props,
        onRemoveItem: undefined,
        w: 3,
        h: 2,
        minW: 2,
        maxW: 3,
        minH: 2,
        maxH: 2,
      }
      component = {
        key: id,
        dataGrid: props,
        component: <MainCard  {...props} />,
      }
      break
    case 'table':
      props = {
        ...props,
        w: 6,
        h: 2,
      }
      component = {
        key: id,
        dataGrid: props,
        component: <Table  {...props} />,
      }
      break
    case 'pricechart':
      props = {
        ...props,
        w: 5,
        h: 2,
        params: { period: "1 Month" },
      }
      component = {
        key: id,
        dataGrid: props,
        component: <LineChartCard  {...props} />,
      }
      break

    case 'dividendchart':
      props = {
        ...props,
        w: 5,
        h: 2,
        params: { period: "6 Months" },

      }
      component = {
        key: id,
        dataGrid: props,
        component: <BarChartCard  {...props} />,
      }
      break
    case 'multichart':
      props = {
        ...props,
        w: 5,
        h: 2,
        params: { period: 180 },

      }
      component = {
        key: id,
        dataGrid: props,
        component: <Multichart  {...props} />,
      }
      break

    case 'news':
      props = {
        ...props,
        w: 3,
        h: 2,
        minH: 2,
        maxH: 2,
        minW: 3,
      }
      component = {
        key: id,
        dataGrid: props,
        component: <News  {...props} />,
      }
      break

    case 'swot':
      props = {
        ...props,
        w: 4,
        h: 2,
        minH: 2,
        minW: 4,
      }
      component = {
        key: id,
        dataGrid: props,
        component: <Swot  {...props} />,
      }
      break

    case 'indicators':
      props = {
        ...props,
        w: 4,
        h: 2,
        minH: 2,
        minW: 2,
        // editIndicatorList: editIndicatorList
      }
      component = {
        key: id,
        dataGrid: props,
        component: <IndicatorsGrid  {...props} />,
      }
      break
    case 'esg':
      props = {
        ...props,
        w: 5,
        h: 3,
        minH: 3,
        minW: 5,
        maxH: 3
        // editIndicatorList: editIndicatorList
      }
      component = {
        key: id,
        dataGrid: props,
        component: <Esg  {...props} />,
      }
      break
    case 'statistics':
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
      component = {
        key: id,
        dataGrid: props,
        component: <Statistics  {...props} />,
      }
      break

  }
  return component
}


export const getRestoredItems = (g, ticker, props, functions) => {
  let gridItems_
  let type = g.type
  let id = g.id
  let params = g.params
  props = {
    ...props,
    params: params,
    onRemoveItem: (i) => functions.onRemoveItem(i),
    changeParams: (p) => functions.changeParams(p)
  }
  const componentProps = {
    key: id,
    dataGrid: props
  }

  if (type === 'card') {
    props = {
      ...props,
      identifier: ticker,
      onRemoveItem: null
    }
    gridItems_ = {
      ...componentProps,
      component: <MainCard  {...props} />,
    }



  } else if (type === 'note') {
    props = {
      ...props,

    }
    gridItems_ = {
      ...componentProps,
      component: <Note  {...props} />,
    }

  } else if (type === 'table') {

    props = {
      ...props,
    }
    gridItems_ = {
      ...componentProps,
      component: <Table  {...props} />,
    }


  } else if (type === 'pricechart') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = {
      ...componentProps,
      component: <LineChartCard  {...props} />,
    }

  }

  else if (type === 'dividendchart') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = {
      ...componentProps,
      component: <BarChartCard  {...props} />,
    }

  }
  else if (type === 'multichart') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = {
      ...componentProps,
      component: <Multichart  {...props} />,
    }

  }
  else if (type === 'news') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = {
      ...componentProps,
      component: <News  {...props} />,
    }
  }
  else if (type === 'swot') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = {
      ...componentProps,
      component: <Swot  {...props} />,
    }
  }
  else if (type === 'indicators') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = {
      ...componentProps,
      component: <IndicatorsGrid  {...props} />,
    }
  }
  else if (type === 'esg') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = {
      ...componentProps,
      component: <Esg  {...props} />,
    }
  }
  else if (type === 'statistics') {
    props = {
      ...props,
      identifier: ticker,
    }
    gridItems_ = {
      ...componentProps,
      component: <Statistics  {...props} />,
    }
  }
  return {
    gridItems: gridItems_,
    gridElements: { id: id, type: type, params: params }
  }
}