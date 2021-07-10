import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Card from "./Card";

const GridItemContainer = (props ) => {
    const {children} = props
  return (
    <Card {...props}>
      {children}
    </Card>
  );
};

GridItemContainer.propTypes = {
 
};

// const mapStateToProps = (state, { item }) => state.data[item];

export default (GridItemContainer);