import './Grid.css'
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import CloseIcon from '@material-ui/icons/Close';
import { TableGrid } from './table/Table';
import { CardGrid } from './card/Card';
import { NoteGrid } from './note/Note';
import ActionMenu from './actionmenu/ActionMenu';
import PowerInputIcon from '@material-ui/icons/PowerInput';
import CardChart from '../../../shared/components/CardChart'
import { Grid as Xongas } from "@material-ui/core";
import { LineChartCard } from '../../../shared/components/LineChart';
import BarChartCard from '../../../shared/components/BarChartCard';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
function Grid(props) {

  const {
    selectGrid
  } = props;

  useEffect(selectGrid, [selectGrid]);


  let nprops = {
    i: 0,
    x: 0,
    y: Infinity, // puts it at the bottom
    w: 2,
    h: 2,
    minW: 2,
    maxW: 3,
    minH: 2,
    maxH: 2,
    onRemoveItem: () => { }
  }
  let initialGridItens = {
    items: [CardGrid(nprops)],
    newCounter: 0
  };
  const [gridItens, setGridItens] = useState(initialGridItens)

  // const defaultProps = {
  //   className: "layout",
  //   cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  //   rowHeight: 100
  // };


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

  const onAddItem = (adding) => {
    let props = null
    let iTemp = "n" + gridItens.newCounter
    console.log("adding", iTemp)
    if (adding === 'note') {
      let nprops = {
        i: iTemp,
        x: (gridItens.items.length * 2) % (gridItens.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        minH: 2,
        maxH: 2,
        onRemoveItem: onRemoveItem
      }
      console.log("Al", gridItens.items)
      let newItens = [...gridItens.items]
      newItens = gridItens.items.map(el => {
        console.log(el)
        el.onRemoveItem = onRemoveItem
        return el
      }).concat(NoteGrid(nprops))
      console.log("Al", newItens)
      setGridItens({
        // Add a new item. It must have a unique key!

        items: newItens,
        // Increment the counter to ensure key is always unique.
        newCounter: gridItens.newCounter + 1
      });
    } else if (adding === 'card') {
      let nprops = {
        i: iTemp,
        x: (gridItens.items.length * 2) % (gridItens.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 3,
        h: 2,
        minW: 2,
        maxW: 3,
        minH: 2,
        maxH: 2,
        onRemoveItem: () => onRemoveItem(iTemp)
      }
      setGridItens({
        // Add a new item. It must have a unique key!

        items: gridItens.items.concat(CardGrid(nprops)),
        // Increment the counter to ensure key is always unique.
        newCounter: gridItens.newCounter + 1
      });
    } else if (adding === 'table') {
      props = [{
        text: 'Edit Header',
        icon: <PowerInputIcon fontSize="small" />
      },
      {
        text: 'pahaeita',
        icon: <PowerInputIcon fontSize="small" />
      }]

      let tprops = {
        i: iTemp,
        x: (gridItens.items.length * 2) % (gridItens.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 6,
        h: 2,
        props: props,
        onRemoveItem: () => onRemoveItem(iTemp)
      }
      setGridItens({
        items: gridItens.items.concat(TableGrid(tprops)),
        newCounter: gridItens.newCounter + 1
      });
    } else if (adding === 'pricechart') {
      let tprops = {
        i: iTemp,
        x: (gridItens.items.length * 2) % (gridItens.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 5,
        h: 2,
        props: props,
        onRemoveItem: () => onRemoveItem(iTemp)
      }
      setGridItens({
        items: gridItens.items.concat(LineChartCard(tprops)),
        newCounter: gridItens.newCounter + 1
      });
    }
    console.log("adsa", gridItens.items.map(el => {
      console.log(el)
      el.onRemoveItem = onRemoveItem
      return el
    }))

  }

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    // setGridItens({
    //   breakpoint: breakpoint,
    //   cols: cols
    // });
  }

  const onLayoutChange = (layout) => {
    // props.onLayoutChange(layout);
    // setGridItens({ layout: layout });
  }

  function onRemoveItem(rId) {
    console.log("removing", rId, gridItens.items);
    console.log(gridItens.items.forEach((el) => {
      console.log("----", el.i, rId, el.i != rId)
    }))
    // setGridItens({ items: gridItens.items.filter((el) => {
    //   console.log("----", el.i, rId,el.i != rId)
    //   return true
    // }), newCounter: gridItens.newCounter });
  }

  let data = [
    {
      value: 5685,
      timestamp: 1621433840
    },
    {
      value: 1685,
      timestamp: 1621434840
    },
    {
      value: 8285,
      timestamp: 1621435840
    },
    {
      value: 5985,
      timestamp: 1621436840
    },
    {
      value: 6685,
      timestamp: 1621437840
    },
    {
      value: 7285,
      timestamp: 1621438840
    },
    {
      value: 4285,
      timestamp: 1621439840
    },
    {
      value: 8285,
      timestamp: 1621440840
    },
    {
      value: 3285,
      timestamp: 1621441840
    },
    {
      value: 5285,
      timestamp: 1621442840
    },
    {
      value: 10285,
      timestamp: 1621443840
    },

  ]
  return (
    <div>
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
      <Xongas item xs={10} md={6}>
        <BarChartCard
          data={data}
          color={"red"}
          height="100px"
          title="Dividend"
        />
      </Xongas>
      <div>
        pahaalca {gridItens.items.length}
        {gridItens.items.forEach((a) =>
          <span> paha {a.i}</span>
        )}
      </div>
    </div>
  );

}

Grid.propTypes = {
  selectGrid: PropTypes.func.isRequired,
};

export default Grid;