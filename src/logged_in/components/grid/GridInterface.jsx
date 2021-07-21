import './Grid.css'
import React from "react";
import PropTypes from "prop-types";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import { SelectMenu } from './selectmenu/SelectMenu';
import ActionMenu from './actionmenu/ActionMenu';
import NewDashboard from './newdashboard/NewDashboard';
import GuideTour from '../../../shared/components/GuideTour'
import { Paper } from '@material-ui/core';


const ResponsiveReactGridLayout = WidthProvider(RGL);
/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
function GridInterface(props) {
  // Variables
  let { review, gridItems, identifier, newDashboardClosed } = props
  // Functions
  let { onAddItem, deleteDashboard, selectDashboard, newDashboard,
    onLayoutChange, onBreakpointChange, handleBack, chooseIdentifier } = props

  return (
    <GuideTour active={review} gridItems={gridItems} identifier={identifier}>
      <div hidden={!newDashboardClosed}>
        {identifier && <>
          <ActionMenu onClose={onAddItem} handleDeletDashboard={deleteDashboard} hidden={review} />
          <SelectMenu
            selectDashboard={selectDashboard}
            identifier={identifier}
            handleDeletDashboard={deleteDashboard}
            handleAddDashboard={newDashboard}
            hidden={review} />

          <ResponsiveReactGridLayout
            onLayoutChange={onLayoutChange}
            onBreakpointChange={onBreakpointChange}
            {...props}
            margin={[5, 5]}
            rowHeight={99}
            columnHeight={100}
          >
            {gridItems.items.map(el => {
              return (
                <Paper key={el.key} data-grid={el.dataGrid}>
                  {el.component}
                </Paper>
              )
            })}
          </ResponsiveReactGridLayout>
        </>
        }
        {/* <ParticlesMain density={100}/> */}
        <br />
      <button onClick={() => console.log(gridItems)}>ads</button>
      </div>


      < NewDashboard
        handleBack={handleBack}
        chooseIdentifier={(ticker) => { chooseIdentifier(ticker) }}
        closed={newDashboardClosed} />


    </GuideTour>
  )

}

GridInterface.propTypes = {
  review: PropTypes.bool.isRequired,
  gridItems: PropTypes.object.isRequired,
  identifier: PropTypes.string.isRequired,
  newDashboardClosed: PropTypes.bool.isRequired,
  onAddItem: PropTypes.func.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
  selectDashboard: PropTypes.func.isRequired,
  newDashboard: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  onBreakpointChange: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  chooseIdentifier: PropTypes.func.isRequired
};

export { GridInterface };