import './Grid.css'
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import { TableGrid } from './table/Table';
import { CardGrid } from './card/Card';
import { NoteGrid } from './note/Note';
import { SelectMenu } from './selectmenu/SelectMenu';
import ActionMenu from './actionmenu/ActionMenu';
import PowerInputIcon from '@material-ui/icons/PowerInput';
import { LineChartCard } from '../../../shared/components/LineChartCard';
import { BarChartCard } from '../../../shared/components/BarChartCard';
import { useSelector, useDispatch } from 'react-redux';
import NewGridDialog from './NewGridDialog'
// import { setGridElements } from '../../../shared/redux/actions/grid.actions'
import { saveGridElements } from '../../../shared/functions/requests.js';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
function Grid(props) {

  const useStyles = makeStyles({
    selectMenu: {
      position: 'absolute',
      alignItems: 'center'
    }
  })

  const classes = useStyles();
  const grids = useSelector(state => state.grid.grids);
  const currentTicker = useSelector(state => state.grid.currentTicker);
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const {
    selectGrid
  } = props;

  useEffect(selectGrid, [selectGrid]);



  let initialGridItens = {
    items: [],
    newCounter: 0
  };
  const [gridItens, setGridItens] = useState(initialGridItens)
  const [gridElements, setGridElements] = useState([])


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

  const onAddItem = (adding, ticker) => {
    ticker = ticker ? ticker : currentTicker
    let iTemp = "n" + gridItens.newCounter
    let props = {
      params: {},
      i: iTemp,
      x: (gridItens.items.length * 2) % (gridItens.cols || 12),
      y: Infinity, // puts it at the bottom
    }
    console.log("adding", iTemp)
    if (adding === 'note') {
      props = { ...props,
        w: 3,
        h: 2,
        minH: 3,
        maxW: 3,
        minH: 2,
        onRemoveItem: onRemoveItem,
        changeParams: changeParams
      }
      console.log("Al", gridItens.items)
      let newItens = [...gridItens.items]
      newItens = gridItens.items.map(el => {
        console.log(el)
        el.onRemoveItem = onRemoveItem
        return el
      }).concat(NoteGrid(props))
      console.log("Al", newItens)
      setGridItens({
        // Add a new item. It must have a unique key!

        items: newItens,
        // Increment the counter to ensure key is always unique.
        newCounter: gridItens.newCounter + 1
      });

    } else if (adding === 'card') {
      props = { ...props,
        w: 3,
        h: 2,
        minW: 2,
        maxW: 3,
        minH: 2,
        maxH: 2,
        onRemoveItem: onRemoveItem,
        changeParams: changeParams
      }
      setGridItens({
        // Add a new item. It must have a unique key!

        items: gridItens.items.concat(CardGrid(props)),
        // Increment the counter to ensure key is always unique.
        newCounter: gridItens.newCounter + 1
      });

    } else if (adding === 'table') {

      props = { ...props,
        w: 6,
        h: 2,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      setGridItens({
        items: gridItens.items.concat(TableGrid(props)),
        newCounter: gridItens.newCounter + 1
      });

    } else if (adding === 'pricechart') {
      props = { ...props,
        w: 5,
        h: 2,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      setGridItens({
        items: gridItens.items.concat(LineChartCard(props)),
        newCounter: gridItens.newCounter + 1
      });
    }

    else if (adding === 'dividendchart') {
      props = { ...props,
        w: 5,
        h: 2,
        onRemoveItem: () => onRemoveItem(iTemp),
        changeParams: changeParams
      }
      setGridItens({
        items: gridItens.items.concat(BarChartCard(props)),
        newCounter: gridItens.newCounter + 1
      });
    }
    console.log("adsa", gridItens.items.map(el => {
      console.log(el)
      el.onRemoveItem = onRemoveItem
      return el
    }))

    setGridElements(gridElements.concat({id: iTemp, type: adding, params: props.params}))
  }

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    // setGridItens({
    //   breakpoint: breakpoint,
    //   cols: cols
    // });
  }

  const onLayoutChange = (layout) => {
    console.log("layoutchange",layout)
    saveGridElements(currentTicker, user, gridElements, layout)
      .then(res => console.log("res save ", res))
    // props.onLayoutChange(layout);
    // setGridItens({ layout: layout });
  }

  function changeParams(params) {
    setGridElements(prev => {
      console.log("prev", prev);
      var foundIndex = prev.findIndex(x => x.id == params.id);
      prev[foundIndex].params = params.content;
      return prev
    }
    );
    console.log("changeParams", gridElements);

  }
  function onRemoveItem(rId) {
    console.log("removing", rId, gridItens.items);
    // console.log(gridItens.items.forEach((el) => {
    //   console.log("----", el.i, rId, el.i != rId)
    // }))
    setGridItens(prev => {
      return {
        ...prev,
        items: prev.items.filter((el) => el.i != rId),
        newCounter: prev.newCounter
      }
    }
    );

  }
  const initialSettings = (ticker) => {
    console.log("Initial Settings")
    onAddItem('card', ticker)
  }

  

  if (currentTicker) {
    return (
      <div>
        <SelectMenu/>
        <ActionMenu onClose={onAddItem} />
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
      </div>
    )
  } else {
    return (
      <div>
        <NewGridDialog onClose={initialSettings} />
      </div>

    )
  }





}

Grid.propTypes = {
  selectGrid: PropTypes.func.isRequired,
};

export default Grid;