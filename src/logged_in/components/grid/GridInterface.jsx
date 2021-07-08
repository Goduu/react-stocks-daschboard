import './Grid.css'
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import { SelectMenu } from './selectmenu/SelectMenu';
import ActionMenu from './actionmenu/ActionMenu';
import NewDashboard from './newdashboard/NewDashboard';
import { useSelector } from 'react-redux';
import { saveGridElements, fetchGridElements, deleteGrid, deactivateGrid } from '../../../shared/functions/requests.js';
import { getCardProps, getRestoredItems } from './gridProps'
import { useSnackbar } from 'notistack';
import GuideTour from '../../../shared/components/GuideTour'
import ParticlesMain from "../../../shared/components/Particles"


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
            rowHeight={99}
            columnHeight={100}
          >
            {_.map(gridItems.items, el => { return el.content })}
          </ResponsiveReactGridLayout>
        </>
        }
        {/* <ParticlesMain density={100}/> */}
        <br />
      </div>


      < NewDashboard
        handleBack={handleBack}
        chooseIdentifier={(ticker) => { chooseIdentifier(ticker) }}
        closed={newDashboardClosed} />


      {/* <button onClick={() => setReview(!review)}>ads</button> */}
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