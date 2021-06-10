import { TableGrid } from './table/Table';
import { CardGrid } from './card/Card';
import { NoteGrid } from './note/Note';
import { SwotGrid } from './swot/Swot';
import { IndicatorsGrid } from './indicators/Indicators';
import LineChartCard from './LineChart/LineChartCard';
import BarChartCard from './BarChart/BarChartCard';
import News from './news/News';

export const getCardProps = (type, functions, gridItems, ticker, id) => {
    console.log("Get card prop incio", type)
    let props = {
        params: {},
        i: id,
        x: (gridItems.items.length * 2) % (gridItems.cols || 12),
        y: -99, // puts it at the bottom
        identifier: ticker,
        onRemoveItem: (id) => functions.onRemoveItem(id),
        changeParams: functions.changeParams
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
            component =  NoteGrid(props)
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
            component =  CardGrid(props)
            break
        case 'table':
            console.log("TABLE")
            props = {
                ...props,
                w: 6,
                h: 2,
            }
            component =  TableGrid(props)
            break
        case 'pricechart':
            console.log("pricechart")
            props = {
                ...props,
                w: 5,
                h: 2,
                params: { period: "1 Month" },
            }
            component =  LineChartCard(props)
            break

        case 'dividendchart':
            console.log("dividendchart")
            props = {
                ...props,
                w: 5,
                h: 2,
                params: { period: "6 Months" },

            }
            component =  BarChartCard(props)
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
            component =  News(props)
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
            component =  SwotGrid(props)
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
            component =  IndicatorsGrid(props)
            break

    }
    console.log("GET card props", component, type)
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
        changeParams: functions.changeParams
         }

    if (type === 'note') {
      props = {
        ...props,
        
      }
      gridItems_ = NoteGrid(props)


    } else if (type === 'card') {
      props = {
        ...props,
        identifier: ticker,
      }
      gridItems_ = CardGrid(props)


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
    return {
        gridItems: gridItems_,
        gridElements: { id: iTemp, type: type, params: params }
    }
}