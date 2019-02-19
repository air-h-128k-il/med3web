/**
 * @fileOverview Graphics3d
 * @author Epam
 * @version 1.0.0
 */


// ********************************************************
// Imports
// ********************************************************

import React from 'react';

import * as THREE from 'three';

import { Modes3d } from '../ui/UiMain';

// ********************************************************
// Const
// ********************************************************

// ********************************************************
// Class
// ********************************************************

/**
 * Class Graphics2d some text later...
 */
export default class Graphics3d extends React.Component {
  /**
   * @param {object} props - props from up level object
   */
  constructor(props) {
    super(props);
    this.m_width = props.wScreen;
    this.m_height = props.hScreen;

    this.animate = this.animate.bind(this);

    this.m_mount = null;
    this.m_camera = null;
    this.m_scene = null;
    this.m_renderer = null;
    this.m_geometry = null;
    this.m_material = null;
    this.m_mesh = null;
    // animation
    this.m_frameId = null;
    // settings
    this.m_mode3d = Modes3d.ISO;
    this.m_slider3dr = 0.1;
    this.m_slider3dg = 0.5;
    this.m_slider3db = 0.8;
  }
  start() {
    if (this.m_frameId === null) {
      this.m_frameId = requestAnimationFrame(this.animate);
    }
  }
  stop() {
    cancelAnimationFrame(this.m_frameId);
    this.m_frameId = null;
  }
  animate() {
    this.m_mesh.rotation.x += 0.01;
    this.m_mesh.rotation.y += 0.01;
    this.m_material.color.setRGB(this.m_slider3dr, this.m_slider3dg, this.m_slider3db);
    this.m_material.wireframe = (this.m_mode3d === Modes3d.ISO);
 
    this.renderScene();
    this.m_frameId = window.requestAnimationFrame(this.animate);
  }
  renderScene() {
    this.m_renderer.render(this.m_scene, this.m_camera);
  }
  componentDidMount() {
    const w = this.m_mount.clientWidth;
    const h = this.m_mount.clientHeight;
    this.m_scene = new THREE.Scene();
    this.m_camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    this.m_camera.position.z = 4;

    this.m_renderer = new THREE.WebGLRenderer({ antialias: true });
    this.m_renderer.setClearColor('#000000');
    this.m_renderer.setSize(w, h);
    this.m_mount.appendChild(this.m_renderer.domElement);

    this.m_geometry = new THREE.BoxGeometry(1, 1, 1);
    this.m_material = new THREE.MeshBasicMaterial({ color: '#ff1122' });
    this.m_mesh = new THREE.Mesh(this.m_geometry, this.m_material);
    this.m_scene.add(this.m_mesh);
    this.start();
  }
  componentWillUnmount() {
    this.stop()
    this.m_mount.removeChild(this.m_renderer.domElement);
  }
  /**
   * Main component render func callback
   */
  render() {
    const wScreen = this.props.wScreen;
    const hScreen = this.props.hScreen;
    const vol = this.props.volume;
    // const tex3d = this.props.texture3d;
    if (vol !== null) {
      console.log(`Graphiucs2d render dim x = ${vol.m_xDim}*${vol.m_yDim}*${vol.m_zDim}`);
    }

    const mode3d = this.props.mode3d;
    const slider3dr = this.props.slider3dr;
    const slider3dg = this.props.slider3dg;
    const slider3db = this.props.slider3db;

    this.m_mode3d = mode3d;
    this.m_slider3dr = slider3dr;
    this.m_slider3dg = slider3dg;
    this.m_slider3db = slider3db;

    const strW = wScreen.toString(10);
    const strH = hScreen.toString(10);
    const jsxCanvas = <div style={{ width: strW + 'px', height: strH + 'px' }} ref={ (mount) => {this.m_mount = mount} }/>
    return jsxCanvas;
  }
}

 