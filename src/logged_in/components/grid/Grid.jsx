import './Grid.css'
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import { TableGrid } from './table/Table';
import { CardGrid } from './card/Card';
import { NoteGrid } from './note/Note';
import { SelectMenu } from './selectmenu/SelectMenu';
import ActionMenu from './actionmenu/ActionMenu';
import LineChartCard from './LineChart/LineChartCard';
import BarChartCard from './BarChart/BarChartCard';
import NewDashboard from './newdashboard/NewDashboard';
import { useSelector, useDispatch } from 'react-redux';
import NewGridDialog from './NewGridDialog'
// import { setGridElements } from '../../../shared/redux/actions/grid.actions'
import { saveGridElements, fetchGridElements } from '../../../shared/functions/requests.js';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
function Grid(props) {

  let initialGridItens = {
    items: [],
    newCounter: 0
  };

  const [gridItens, setGridItens] = useState(initialGridItens)
  const [gridElements, setGridElements] = useState([])
  const [allDashboards, setAllDashboards] = useState([])
  const [layout, setLayout] = useState([])
  const [identifier, setIdentifier] = useState(undefined)
  const user = useSelector(state => state.auth.user)
  // const {
  //   selectGrid
  // } = props;

  // useEffect(selectGrid, [selectGrid]);
  let gridItens_; let gridElements_ = []
  const restoreItens = useCallback((gridElements, layout, identifier) => {
    gridItens_ = initialGridItens
    setIdentifier(identifier)
    setLayout(layout)
    layout.sort(function (a, b) {
      return a.y - b.y;
    });

    layout.forEach(l => {
      let g = gridElements.find(g => l.i === g.id)
      onRestauringItems(g, identifier, l)
    })
    setGridItens(gridItens_)
    setGridElements(gridElements_)
  }, [gridItens, gridElements, layout, identifier])

  useEffect(() => {
    fetchGridElements(user)
      .then(dashboards => {
        if (dashboards.length > 0) {
          setAllDashboards(dashboards)
          let toBeRestored = dashboards.filter(r => {
            return r.active == true
          })[0]
          restoreItens(
            toBeRestored.grid_elements,
            toBeRestored.layout,
            toBeRestored.identifier)
        }
      })
  }, [user])

  useEffect(() => {
    console.log("Saving")
    if (identifier && gridElements && layout.length != 0) {
      saveGridElements(identifier, user, gridElements, layout)
      setAllDashboards(prev => {
        prev.find(el => {return el.active === true}).gridElements = gridElements
        prev.find(el => {return el.active === true}).layout = layout
        return prev
      })
    }
  }, [gridElements, layout])

  const createElement = (el) => {
    if (el.type) {
      return el.content
    } else {
      const i = el.i;
      return (
        <div key={i} data-grid={el} className="grid-wrapper">
          {el.content ? el.content : ''}
        </div>
      );

    }
  }

  const onAddItem = (type, ticker, iTemp = "n" + gridItens.newCounter) => {
    ticker = ticker ? ticker : identifier

    let props = {
      params: {},
      i: iTemp,
      x: (gridItens.items.length * 2) % (gridItens.cols || 12),
      y: -99, // puts it at the bottom
    }
    if (type === 'note') {
      props = {
        ...props,
        w: 3,
        h: 2,
        minH: 3,
        maxW: 3,
        minH: 2,
        onRemoveItem: onRemoveItem,
        changeParams: changeParams
      }
      setGridItens({
        items: gridItens.items.concat(NoteGrid(props)),
        newCounter: gridItens.newCounter + 1
      });

    } else if (type === 'card') {
      props = {
        ...props,
        w: 3,
        h: 2,
        minW: 2,
        maxW: 3,
        minH: 2,
        maxH: 2,
        onRemoveItem: onRemoveItem,
        changeParams: changeParams,
        identifier: ticker
      }
      setGridItens({
        items: gridItens.items.concat(CardGrid(props)),
        newCounter: gridItens.newCounter + 1
      });

    } else if (type === 'table') {

      props = {
        ...props,
        w: 6,
        h: 2,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      setGridItens({
        items: gridItens.items.concat(TableGrid(props)),
        newCounter: gridItens.newCounter + 1
      });

    } else if (type === 'pricechart') {
      props = {
        ...props,
        w: 5,
        h: 2,
        params: { period: "1 Month" },
        identifier: ticker,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      setGridItens({
        items: gridItens.items.concat(LineChartCard(props)),
        newCounter: gridItens.newCounter + 1
      });
    }

    else if (type === 'dividendchart') {
      props = {
        ...props,
        w: 5,
        h: 2,
        params: { period: "6 Months" },
        identifier: ticker,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      setGridItens({
        items: gridItens.items.concat(BarChartCard(props)),
        newCounter: gridItens.newCounter + 1
      });
    }

    setGridElements(gridElements.concat({ id: iTemp, type: type, params: props.params }))
    setAllDashboards(prev => {
      prev.find(d => d.active === true).grid_elements.push({ id: iTemp, type: type, params: props.params })

      // prev.find(d => {
      //   console.log("--------", d.identifier, ticker, d)
      //   return d.identifier === ticker
      // }).grid_elements.concat({ id: iTemp, type: type, params: props.params })
      return prev
    })

  }
  const onRestauringItems = (g, ticker, props) => {
    let type = g.type
    let iTemp = g.id
    let params = g.params
    props = { ...props, params: params }
    ticker = ticker ? ticker : identifier

    if (type === 'note') {
      props = {
        ...props,
        onRemoveItem: onRemoveItem,
        changeParams: changeParams
      }
      gridItens_.items.push(NoteGrid(props))
      gridItens_.newCounter += 1


    } else if (type === 'card') {
      props = {
        ...props,
        identifier: ticker,
        onRemoveItem: onRemoveItem,
        changeParams: changeParams,
      }
      gridItens_.items.push(CardGrid(props))
      gridItens_.newCounter += 1


    } else if (type === 'table') {

      props = {
        ...props,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      gridItens_.items.push(TableGrid(props))
      gridItens_.newCounter += 1


    } else if (type === 'pricechart') {
      props = {
        ...props,
        identifier: ticker,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      gridItens_.items.push(LineChartCard(props))
      gridItens_.newCounter += 1

    }

    else if (type === 'dividendchart') {
      props = {
        ...props,
        identifier: ticker,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      gridItens_.items.push(BarChartCard(props))
      gridItens_.newCounter += 1

    }
    gridElements_.push({ id: iTemp, type: type, params: params })


  }

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    // setGridItens({
    //   breakpoint: breakpoint,
    //   cols: cols
    // });
  }

  const onLayoutChange = (layout) => {
    setLayout(layout)
  }

  function changeParams(params) {
    setGridElements(prev => {
      var foundIndex = prev.findIndex(x => x.id == params.id);
      prev[foundIndex].params = params.content;
      return prev
    }
    );

  }
  function onRemoveItem(rId) {
    setGridItens(prev => {
      return {
        ...prev,
        items: prev.items.filter((el) => el.i != rId),
        newCounter: prev.newCounter
      }
    }
    );
    setGridElements(prev => {
      return prev.filter(el => el.id != rId)
    }
    );
    setAllDashboards(prev => {
      prev.find(d => d.active === true).grid_elements.filter(el => el.id != rId)
      return prev
    })

  }


  const chooseIdentifier = (ticker) => {
    setAllDashboards(prev => {
      prev.map(d => {
        if (d.active === true) {
          d.active = false
        }
      })
      prev.push({ active: true, grid_elements: [], identifier: ticker, layout: [] })
      return prev
    })
    setGridItens(initialGridItens)
    setGridElements([])
    setIdentifier(ticker)
    
      onAddItem('card', ticker)
    

  }

  const newDashboard = () => {
    setGridItens(initialGridItens)
    setGridElements([])
    setIdentifier(undefined)

  }

  const testfunction = () => {
    console.log("testfunction", gridElements)
  }

  const selectDashboard = (el) => {

    let selectedDashboard
    allDashboards.map(d => {
      if (d.identifier === el) {
        selectedDashboard = d
        d.active = true
      } else {
        d.active = false
      }
    })
    if(selectDashboard){
      restoreItens(
        selectedDashboard.grid_elements,
        selectedDashboard.layout,
        selectedDashboard.identifier)
    }
  }

  const deleteDashboard = () => {

  }

  if (identifier) {
    return (
      <div>
        <SelectMenu selectDashboard={selectDashboard} identifier={identifier} />
        <ActionMenu onClose={onAddItem} handleDeletDashboard={deleteDashboard} handleAddDashboard={newDashboard}/>
        <ResponsiveReactGridLayout
          onLayoutChange={onLayoutChange}
          onBreakpointChange={onBreakpointChange}
          {...props}
          rowHeight={99}
          columnHeight={100}
        >
          {_.map(gridItens.items, el => createElement(el))}
        </ResponsiveReactGridLayout>
        <br />
        <button onClick={() => testfunction()}>testfunction</button>
      </div>
    )
  } else {
    return (
      <div>
        {/* <NewGridDialog chooseIdentifier={(ticker) => { chooseIdentifier(ticker) }} /> */}
        <NewDashboard chooseIdentifier={(ticker) => { chooseIdentifier(ticker) }} />
      </div>

    )
  }





}

Grid.propTypes = {
  selectGrid: PropTypes.func.isRequired,
};

export default Grid;