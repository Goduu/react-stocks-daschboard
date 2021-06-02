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
import News from './news/News';
import { useSelector, useDispatch } from 'react-redux';
import { notify } from '../../../shared/redux/actions/notification.actions'
import { saveGridElements, fetchGridElements, deleteGrid } from '../../../shared/functions/requests.js';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
function Grid(props) {

  let initialGridItens = {
    items: []
  };
  const dispatch = useDispatch()
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

  const restoreItens = useCallback((newGridElements, newLayout, newIdentifier) => {
    gridElements_ = []
    gridItens_ = initialGridItens
    setIdentifier(newIdentifier)
    setLayout(newLayout)

    newLayout.forEach(l => {
      let g = newGridElements.find(g => l.i === g.id)
      onRestauringItems(g, newIdentifier, l)
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
            return r.active === true
          })[0]
          if (toBeRestored) {
            restoreItens(
              toBeRestored.grid_elements,
              toBeRestored.layout,
              toBeRestored.identifier)
          }
        }
      })
  }, [user])

  useEffect(() => {
    if (gridElements.length == layout.length) {
      console.log("Saving", layout)
      if (identifier && gridElements && layout.length !== 0) {
        saveGridElements(identifier, user, gridElements, layout)
        setAllDashboards(prev => {
          prev.find(el => { return el.active === true }).gridElements = gridElements
          prev.find(el => { return el.active === true }).layout = layout
          return prev
        })
      }
    }
  }, [gridElements, layout])

  const createElement = (el) => {
    if (el.type) {
      return el.content
    } else {
      return (
        <div key={el.i} data-grid={el} className="grid-wrapper">
          {el.content ? el.content : ''}
        </div>
      );

    }
  }
  const randomId = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9).toString();
  }

  const onAddItem = (type, ticker, iTemp = randomId()) => {
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
        minH: 2,
        maxW: 3,
        minW: 2,
        onRemoveItem: onRemoveItem,
        changeParams: changeParams
      }
      setGridItens({
        items: gridItens.items.concat(NoteGrid(props))
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
        items: gridItens.items.concat(CardGrid(props))
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
        items: gridItens.items.concat(TableGrid(props))
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
        items: gridItens.items.concat(LineChartCard(props))
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
        items: gridItens.items.concat(BarChartCard(props))
      });
    }
  
    else if (type === 'news') {
      props = {
        ...props,
        w: 3,
        h: 2,
        minH: 2,
        maxH: 2,
        minW: 3,
        identifier: ticker,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      setGridItens({
        items: gridItens.items.concat(News(props))
      });
    }

    setGridElements(gridElements.concat({ id: iTemp, type: type, params: props.params }))
    setAllDashboards(prev => {
      prev.find(d => d.active === true).grid_elements.push({ id: iTemp, type: type, params: props.params })
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


    } else if (type === 'card') {
      props = {
        ...props,
        identifier: ticker,
        onRemoveItem: onRemoveItem,
        changeParams: changeParams,
      }
      gridItens_.items.push(CardGrid(props))


    } else if (type === 'table') {

      props = {
        ...props,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      gridItens_.items.push(TableGrid(props))


    } else if (type === 'pricechart') {
      props = {
        ...props,
        identifier: ticker,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      gridItens_.items.push(LineChartCard(props))

    }

    else if (type === 'dividendchart') {
      props = {
        ...props,
        identifier: ticker,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      gridItens_.items.push(BarChartCard(props))

    }
    else if (type === 'news') {
      props = {
        ...props,
        identifier: ticker,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      gridItens_.items.push(News(props))
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

  const onLayoutChange = (layout_) => {
    console.log("layoutchange", layout, layout_)
    setLayout(layout_)
  }

  function changeParams(params) {
    console.log("Change params", params)
    setGridElements(prev => {
      var foundIndex = prev.findIndex(x => x.id === params.id);
      prev[foundIndex].params = params.content;
      return prev
    }
    );

  }
  function onRemoveItem(rId) {
    setGridItens(prev => {
      return {
        ...prev,
        items: prev.items.filter((el) => el.i !== rId)
      }
    }
    );
    setGridElements(prev => {
      return prev.filter(el => el.id !== rId)
    }
    );
    setAllDashboards(prev => {
      prev.find(d => d.active === true).grid_elements.filter(el => el.id !== rId)
      return prev
    })

  }


  const chooseIdentifier = (ticker) => {
    setAllDashboards(prev => {
      prev.map(d => {
        if (d.active === true) {
          d.active = false
        }
        return d
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
    setLayout([])
    setIdentifier(undefined)

  }

  const selectDashboard = (el) => {
    setGridItens(initialGridItens)
    setGridElements([])
    let selectedDashboard
    allDashboards.map(d => {
      if (d.identifier === el) {
        selectedDashboard = d
        d.active = true
      } else {
        d.active = false
      }
      return
    })
    if (selectedDashboard) {
      console.log("RESTORING.....", selectedDashboard)
      restoreItens(
        selectedDashboard.grid_elements,
        selectedDashboard.layout,
        selectedDashboard.identifier)
    }
  }

  /**
   * Delete a Dashboard.
   *
   * @param {string} d The desired identifier to be deleted ex. "AAPL".
   */
  const deleteDashboard = () => {
    let next

    allDashboards.forEach(d => {
      if (d.identifier !== identifier) {
        next = d.identifier;
        return
      }
    })

    setAllDashboards(prev => {
      return prev.filter(d => d.identifier !== identifier)
    })
    deleteGrid(user, identifier).then(() => {
      dispatch(notify({ type: 'success', 'msg': 'Dashboard Deleted' }))
    }).catch(e => {
      dispatch(notify({ type: 'error', 'msg': 'error' }))
    })
    console.log("Alcapaha delete", identifier, "gto", next)
    if (next) {
      selectDashboard(next)
    } else {
      newDashboard()
    }

  }

  if (identifier) {
    return (
      <div>
        <SelectMenu selectDashboard={selectDashboard} identifier={identifier} />
        <ActionMenu onClose={onAddItem} handleDeletDashboard={deleteDashboard} handleAddDashboard={newDashboard} />
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
        {/* <button onClick={() => dispatch(notify({type: 'info', 'msg': 'suuuucesso'}))}>testfunction</button> */}
        {/* <News/> */}
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