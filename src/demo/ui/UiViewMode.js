/**
 * @fileOverview UiViewMode
 * @author Epam
 * @version 1.0.0
 */


// ********************************************************
// Imports
// ********************************************************


import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, Button, ButtonGroup } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import ModeView from '../store/ModeView';
import StoreActionType from '../store/ActionTypes';

// ********************************************************
// Class
// ********************************************************



/**
 * Class UiViewMode some text later...
 */
class UiViewMode extends React.Component {
  /**
   * @param {object} props - props from up level object
   */
  constructor(props) {
    super(props);

    // main view configuration
    // setup true, where you want to see mode renderer
    //
    this.m_needModeMpr = true;
    this.m_needMode2d = true;
    this.m_needMode3dLight = true;
    this.m_needMode3d = true;

    this.onModeMpr = this.onModeMpr.bind(this);
    this.onMode2d = this.onMode2d.bind(this);
    this.onMode3dLight = this.onMode3dLight.bind(this);
    this.onMode3d = this.onMode3d.bind(this);
  }
  onMode(indexMode) {
    const store = this.props;
    store.dispatch({ type: StoreActionType.SET_MODE_VIEW, modeView: indexMode });
  }
  onModeMpr() {
    this.onMode(ModeView.VIEW_MPR);
  }
  onMode2d() {
    this.onMode(ModeView.VIEW_2D);
  }
  onMode3dLight() {
    this.onMode(ModeView.VIEW_3D_LIGHT);
  }
  onMode3d() {
    this.onMode(ModeView.VIEW_3D);
  }
  logObject(strTitle, obj) {
    let str = '';
    for (let prp in obj) {
      if (str.length > 0) {
        str += '\n';
      }
      str += prp + ' = ' + obj[prp];
    }
    console.log(`${strTitle}\n${str}`);
  }
  /*
  <OverlayTrigger placement="bottom" overlay = {
    <Tooltip>
      Show volume in several projections on single screen
    </Tooltip>
  }>

    <Button variant="secondary" className={strMpr} onClick={this.onModeMpr} >
      MPR
    </Button>
  </OverlayTrigger>  
  */
  render() {
    const store = this.props;
    // this.logObject('UiViewMode this props: ', store);
    let viewMode = store.modeView;
    if ((viewMode === ModeView.VIEW_MPR) && (!this.m_needModeMpr)) {
      viewMode = ModeView.VIEW_2D;
    }
    if ((viewMode === ModeView.VIEW_3D_LIGHT) && (!this.m_needMode3dLight)) {
      viewMode = ModeView.VIEW_2D;
    }
    if ((viewMode === ModeView.VIEW_3D) && (!this.m_needMode3d)) {
      viewMode = ModeView.VIEW_2D;
    }
    if ((viewMode === ModeView.VIEW_2D) && (!this.m_needMode2d)) {
      viewMode = ModeView.VIEW_3D;
    }

    // const strMpr = (viewMode === ModeView.VIEW_MPR) ? ' active' : '';
    const str2d = (viewMode === ModeView.VIEW_2D) ? ' active' : '';
    const str3dLight = (viewMode === ModeView.VIEW_3D_LIGHT) ? ' active' : '';
    const str3d = (viewMode === ModeView.VIEW_3D) ? ' active' : '';

    const jsx3d = <OverlayTrigger placement="bottom" overlay = {
      <Tooltip>
        Show volume in 3d mode with old rendering
      </Tooltip>
    }>
      <Button variant="secondary" className={str3d} onClick={this.onMode3d} >
        3D
      </Button>
    </OverlayTrigger>  
    const jsx3dNone = null;

    let indx = 0;
    const vol = store.volume;
    const FOUR = 4;
    if (vol.m_bytesPerVoxel === FOUR) {
      indx = 1;
    }
    const jsxArray = new Array(2);
    jsxArray[0] = jsx3d;
    jsxArray[1] = jsx3dNone;
    const jsxRet = jsxArray[indx];


    const jsxOut = 
      <ButtonToolbar>
        <ButtonGroup>

          <OverlayTrigger placement="bottom" overlay = {
            <Tooltip>
              Show volume in 2d mode per slice on selected orientation
            </Tooltip>
          }>

            <Button variant="secondary" className={str2d} onClick={this.onMode2d} >
              2D
            </Button>
          </OverlayTrigger>  

          <OverlayTrigger placement="bottom" overlay = {
            <Tooltip>
              Show volume in 3d mode with fast rendering
            </Tooltip>
          }>

            <Button variant="secondary" className={str3dLight} onClick={this.onMode3dLight} >
              3D
              <span className="fa fa-bolt"></span>
            </Button>
          </OverlayTrigger>  
          {jsxRet}
        </ButtonGroup>
      </ButtonToolbar>;

    return jsxOut;
  }
}

export default connect(store => store)(UiViewMode);
