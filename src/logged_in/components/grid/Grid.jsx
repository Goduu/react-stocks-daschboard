import './Grid.css'
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import RGL,{ WidthProvider, Responsive} from "react-grid-layout";
import _ from "lodash";
import { SelectMenu } from './selectmenu/SelectMenu';
import ActionMenu from './actionmenu/ActionMenu';
import LineChartCard from './LineChart/LineChartCard';
import BarChartCard from './BarChart/BarChartCard';
import News from './news/News';
import NewDashboard from './newdashboard/NewDashboard';
import { useSelector, useDispatch } from 'react-redux';
import { notify } from '../../../shared/redux/actions/notification.actions'
import { saveGridElements, fetchGridElements, deleteGrid } from '../../../shared/functions/requests.js';
import { getCardProps, getRestoredItems } from './gridProps'
import { TableGrid } from './table/Table';
import { CardGrid } from './card/Card';
import { NoteGrid } from './note/Note';
import { SwotGrid } from './swot/Swot';
import { IndicatorsGrid } from './indicators/Indicators';
const ResponsiveReactGridLayout = WidthProvider(RGL);
/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
function Grid(props) {

  let initialGridItems = {
    items: []
  };
  const dispatch = useDispatch()
  const [gridItems, setGridItems] = useState(initialGridItems)
  const [gridElements, setGridElements] = useState([])
  const [allDashboards, setAllDashboards] = useState([])
  const [layout, setLayout] = useState([])
  const [identifier, setIdentifier] = useState(undefined)
  const [gridId, setGridId] = useState(undefined)
  const user = useSelector(state => state.auth.user)
  const userId = useSelector(state => state.auth.id)
  const token = useSelector(state => state.auth.token)
  const [firstSave, setFirstSave] = useState(true)
  // const {
  //   selectGrid
  // } = props;

  // useEffect(selectGrid, [selectGrid]);
  let gridItems_; let gridElements_ = []

  const restoreItems = useCallback((newGridElements, newIdentifier) => {
    setIdentifier(newIdentifier)
    let newLayout = []
    setGridItems(initialGridItems)
    setGridElements([])
    newGridElements.forEach(g => {
      onRestauringItems(g, newIdentifier, g.layout)
      newLayout.push(g.layout)
    })
    setLayout(newLayout)
  }, [gridItems, gridElements, layout, identifier])

  useEffect(() => {
    fetchGridElements(userId, token)
      .then(dashboards => {
        if (dashboards.length > 0) {
          setAllDashboards(dashboards)
          let toBeRestored = dashboards.find(r => {
            return r.active === true
          })
          if (toBeRestored) {
            restoreItems(
              toBeRestored.gridElements,
              toBeRestored.identifier)
          }
        }
      })
  }, [userId, token])

  useEffect(() => {
    console.log("Alcapaha save")

    console.log("first s, gridid", firstSave, gridId)
    if (firstSave || gridId != undefined) {
      if (gridElements && layout && gridElements.length == layout.length) {
        if (identifier && gridElements && layout.length !== 0) {
          saveGridElements(gridId, identifier, userId, gridElements, token)
            .then(res => {
              setGridId(res)
            })
          setAllDashboards(prev => {
            prev.find(el => { return el.active === true }).gridElements = gridElements
            prev.find(el => { return el.active === true }).layout = layout
            setFirstSave(false)
            return prev
          })
        }
      }
    }
  }, [layout])

  const createElement = (el) => {
    return el.content
    // if (el.type) {
    //   return el.content
    // } else {
    //   return (
    //     <div key={el.i} data-grid={el} className="grid-wrapper">
    //       {el.content ? el.content : ''}
    //     </div>
    //   );

    // }
  }
  const randomId = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9).toString();
  }

  const onAddItem = (type, ticker, iTemp = randomId()) => {
    ticker = ticker ? ticker : identifier
    const functions = {
      onRemoveItem: onRemoveItem,
      changeParams: changeParams
    }
    setGridItems(prev => {
      prev.items.push(getCardProps(type, functions, gridItems, ticker, iTemp))
      return prev
    });
    setGridElements(gridElements.concat({ id: iTemp, type: type, params: {} }))
    setAllDashboards(prev => {
      prev.find(d => d.active === true).gridElements.push({ id: iTemp, type: type, params: props.params })
      return prev
    })

  }
  const onRestauringItems = (g, ticker, props) => {

    const functions = {
      onRemoveItem: onRemoveItem,
      changeParams: changeParams
    }

    let res = getRestoredItems(g, ticker, props, functions)

    setGridElements(prev => {
      prev.push(res.gridElements)
      return prev
    })
    setGridItems(prev => {
      prev.items.push(res.gridItems)
      return prev
    }
    );


  }

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    // setGridItems({
    //   breakpoint: breakpoint,
    //   cols: cols
    // });
  }

  const onLayoutChange = useCallback((layout_) => {
    console.log("LAYOUT CHANGE")

    setGridElements(prev => {
      if (prev) {
        prev.forEach(g => {
          g['layout'] = layout_.find(l => l.i === g.id)
        })
      }
      return prev
    })
    setLayout(layout_)
  }, [gridElements, layout])


  function changeParams(params) {
    setGridElements(prev => {
      var foundIndex = prev.findIndex(x => x.id === params.id);
      prev[foundIndex].params = params.content;
      return prev
    }
    );

  }
  function onRemoveItem(rId, a) {
    setGridItems(prev => {
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
      prev.find(d => d.active === true).gridElements.filter(el => el.id !== rId)
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
      prev.push({ active: true, gridElements: [], identifier: ticker, layout: [] })
      return prev
    })
    setGridItems(initialGridItems)
    setGridElements([])
    setIdentifier(ticker)

    onAddItem('card', ticker)
  }

  const newDashboard = () => {
    setGridItems(initialGridItems)
    setGridElements([])
    setLayout([])
    setIdentifier(undefined)

  }

  const selectDashboard = (el) => {
    setGridItems(initialGridItems)
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
      restoreItems(
        selectedDashboard.gridElements,
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
          {_.map(gridItems.items, el => createElement(el))}
        </ResponsiveReactGridLayout>
        <br />
        <button onClick={() => console.log("gridElements,griitems,allDashboards", gridElements, gridItems, allDashboards)}>testfunction</button>
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