import './Grid.css'
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import { SelectMenu } from './selectmenu/SelectMenu';
import ActionMenu from './actionmenu/ActionMenu';
import NewDashboard from './newdashboard/NewDashboard';
import { useSelector } from 'react-redux';
import { saveGridElements, fetchGridElements, deleteGrid, deactivateGrid, fetchTickerData } from '../../../shared/functions/requests.js';
import { getCardProps, getRestoredItems } from './gridProps'
import { useSnackbar } from 'notistack';
import GuideTour from '../../../shared/components/GuideTour'
import { GridInterface } from './GridInterface'

const ResponsiveReactGridLayout = WidthProvider(RGL);
/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
function Grid(props) {
  const {
    selectGrid
  } = props;
  useEffect(selectGrid, [selectGrid]);

  let initialGridItems = {
    items: []
  };
  const [gridItems, setGridItems] = useState(initialGridItems)
  const [gridElements, setGridElements] = useState([])
  const [newDashboardClosed, setNewDashboardClosed] = useState(false)
  const [allDashboards, setAllDashboards] = useState([])
  const [layout, setLayout] = useState([])
  const [tickerData, setTickerData] = useState({})
  const [identifier, setIdentifier] = useState(undefined)
  const [gridId, setGridId] = useState(undefined)
  const [gridStartup, setGridStartup] = useState({ id: undefined, identifier: undefined, newGridElements: undefined })
  const userId = useSelector(state => state.auth.id)
  const userRoles = useSelector(state => state.auth.roles)
  const token = useSelector(state => state.auth.token)
  const [review, setReview] = useState(false)
  const { enqueueSnackbar } = useSnackbar();
  let firstSave = true

  /**
   * Restoure cards when starting
   */
  useEffect(() => {
    const routeTicker = props.match.params.ticker;
    fetchGridElements(userId, token)
      .then(dashboards => {
        console.log("GRIIID", dashboards)
        if (dashboards.length > 0) {
          setAllDashboards(dashboards)
          let toBeRestored = dashboards.find(r => {
            return routeTicker ? r.identifier === routeTicker : r.active === true

          })
          setNewDashboardClosed(true)
          if (toBeRestored) {
            fetchTickerData(toBeRestored.identifier, token)
              .then(res => {
                console.log("alcapaha", res)
                setTickerData(res)
                setGridId(toBeRestored.id)
                setIdentifier(toBeRestored.identifier)
                setGridStartup({ id: toBeRestored.id, identifier: toBeRestored.identifier, newGridElements: toBeRestored.gridElements, tickerData: res })

              })

          } else if (routeTicker) {
            chooseIdentifier(routeTicker)
            notify("New Dashboard for '" + routeTicker + "' created", 'info')
          }
        }
      })
      .catch(() => {
        notify('Something went wrong restoring the cards', 'error')

      })
  }, [userId, token])

  /**
   * Triggers the restauration process whenn all states for startup are setted
   */
  useEffect(() => {
    if (typeof gridStartup.identifier !== 'undefined' && typeof gridStartup.newGridElements !== 'undefined') {
      restoreItems(gridStartup.newGridElements, gridStartup.identifier, gridStartup.tickerData)
    }
  }, [gridStartup])

  const restoreItems = useCallback((newGridElements, newIdentifier, tickerData) => {

    let newLayout = []
    setGridElements([])
    fetchTickerData(newIdentifier, token)
      .then(data => {
        newGridElements.forEach(g => {
          onRestauringItems(g, newIdentifier, g.layout, data)
          newLayout.push(g.layout)
        })
        setLayout(newLayout)
      })

  }, [gridItems, gridElements, layout, identifier, userId, gridId])

  const onRestauringItems = useCallback((g, ticker, props, tickerData) => {

    const functions = {
      onRemoveItem: onRemoveItem,
      changeParams: changeParams
    }

    let res = getRestoredItems(g, ticker, props, functions, tickerData)

    setGridElements(prev => {
      prev.push(res.gridElements)
      return prev
    })
    setGridItems(prev => {
      prev.items.push(res.gridItems)
      return prev
    }
    );


  }, [gridId, identifier])

  /**
   * Save on Layoutchange
   */
  useEffect(() => {
    saveGrid()
  }, [layout, identifier])

  // useEffect(() => {
  //   console.log("save identifier change")
  //   saveGrid()
  // }, [identifier])

  const saveGrid = () => {
    if (firstSave || gridId != undefined) {
      if (gridElements && layout && gridElements.length == layout.length) {
        if (identifier && gridElements && layout.length !== 0) {
          saveGridElements(gridId, identifier, userId, gridElements, token)
            .then(res => {
              setGridId(res)
              setAllDashboards(prev => {
                prev.find(el => { return el.identifier === identifier }).id = res
                return prev
              })
            })
          setAllDashboards(prev => {
            prev.find(el => { return el.active === true }).gridElements = gridElements
            prev.find(el => { return el.active === true }).layout = layout
            firstSave = false
            return prev
          })
        }
      }
    }
  }

  /**
   * Math.random should be unique because of its seeding algorithm.
   * Convert it to base 36 (numbers + letters), and grab the first 9 characters
   * after the decimal.
   * @returns a random Id
   */
  const randomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9).toString();
  }

  const onAddItem = (type, ticker, iTemp = randomId()) => {
    ticker = ticker ? ticker : identifier
    const functions = {
      onRemoveItem: onRemoveItem,
      changeParams: changeParams
    }
    setGridItems(prev => {
      prev.items.push(getCardProps(type, functions, gridItems, ticker, iTemp, tickerData))
      return prev
    });
    setGridElements(gridElements.concat({ id: iTemp, type: type, params: {} }))
    setAllDashboards(prev => {
      prev.find(d => d.active === true).gridElements.push({ id: iTemp, type: type, params: props.params })
      return prev
    })

  }

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    // setGridItems({
    //   breakpoint: breakpoint,
    //   cols: cols
    // });
  }

  const onLayoutChange = useCallback((layout_) => {
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
    let newGridEl
    setGridElements(prev => {
      var foundIndex = prev.findIndex(x => x.id === params.id);
      prev[foundIndex].params = params.content;
      newGridEl = prev
      return prev

    }
    );
    if (typeof identifier !== 'undefined' && typeof gridId !== 'undefined' && token && typeof newGridEl !== 'undefined') {
      saveGridElements(gridId, identifier, userId, newGridEl, token)
    }
  }

  function onRemoveItem(rId) {
    setGridItems(prev => {
      return {
        ...prev,
        items: prev.items.filter((el) => el.key !== rId)
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


  /**
   *  function to be called when choosing a new identifier
   * @param {*} ticker 
   */
  const chooseIdentifier = (ticker) => {
    deactivateGrid(userId, identifier, token)
      .then(() => { });
    setNewDashboardClosed(true)
    setAllDashboards(prev => {
      prev.map(d => {
        if (d.active === true) {
          d.active = false
        }
        return d
      })
      prev.push({ active: true, gridElements: [], identifier: ticker, layout: [], userId: userId })
      return prev
    })
    setGridItems(initialGridItems)
    setGridElements([])
    setIdentifier(ticker)
    // setLayout([])
    firstSave = true
    onAddItem('card', ticker)
  }

  const newDashboard = () => {
    setGridId(undefined)
    setGridItems(initialGridItems)
    setGridElements([])
    setLayout([])
    // setIdentifier(undefined)
    setNewDashboardClosed(false)

  }

  const selectDashboard = (el) => {
    deactivateGrid(userId, identifier, token)
      .then(() => console.log("ok"));
    setGridItems(initialGridItems)
    setGridElements([])
    setLayout([])
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
      // setGridStartup(selectedDashboard.id, selectedDashboard.identifier, selectedDashboard.gridElements)
      restoreItems(
        selectedDashboard.gridElements,
        selectedDashboard.identifier)
      setGridId(selectedDashboard.id)
      setIdentifier(selectedDashboard.identifier)
    }
  }

  /**
   * Delete a Dashboard.
   *
   * @param {string} d The desired identifier to be deleted ex. "AAPL".
   */
  const deleteDashboard = () => {
    let next
    try {
      allDashboards.forEach(d => {
        if (d.identifier !== identifier) {
          next = d.identifier;
          return
        }
      })

      setAllDashboards(prev => {
        return prev.filter(d => d.identifier !== identifier)
      })
      deleteGrid(gridId, token).then(() => {
        notify('Dashboard Deleted', 'success')
      }).catch(e => {
        notify('Something went wrong', 'error')
      })
      if (next) {
        selectDashboard(next)
      } else {
        newDashboard()
      }
    } catch (e) {
      notify('Something went wrong', 'error')
    }

  }

  const notify = (msg, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  const handleBack = () => {
    setNewDashboardClosed(true)
    let toBeRestored = allDashboards.find(r => {
      return r.identifier === identifier
    })
    if (toBeRestored) {
      setGridId(toBeRestored.id)
      setGridStartup({ id: toBeRestored.id, identifier: toBeRestored.identifier, newGridElements: toBeRestored.gridElements })
    }
  }


  return (
    <GridInterface
      review={review} gridItems={gridItems} identifier={identifier} newDashboardClosed={newDashboardClosed}
      onAddItem={onAddItem} deleteDashboard={deleteDashboard} selectDashboard={selectDashboard} newDashboard={newDashboard}
      onLayoutChange={onLayoutChange} onBreakpointChange={onBreakpointChange} handleBack={handleBack} chooseIdentifier={chooseIdentifier}
       />
  )

}

Grid.propTypes = {
  selectGrid: PropTypes.func.isRequired,
};

export default Grid;