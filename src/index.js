import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";

import EditingArea from "./Editing/EditingArea.js";
import PanelArea from "./PanelArea";
import TitleArea from "./TitleArea";
import ToolBarArea from "./ToolBarArea";

import { Layer, Grid } from "./Editing/Layer";
import Camera from "./Editing/Tools/Camera";
import Brush from "./Editing/Tools/Brush";
import Tile from "./Editing/Tile";

import source1 from "./assets/tileset/test1.png";
import source2 from "./assets/tileset/test2.png";
import source3 from "./assets/tileset/test3.png";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.onObjectChange = this.onObjectChange.bind(this);
        this.onLayerChange = this.onLayerChange.bind(this);
        this.updateBrush = this.updateBrush.bind(this);

        this.state = {
            map: {
                width: 400,
                height: 350,
            },
            layers: [
                new Layer("layer 1", 400, 350),
                new Layer("layer 2", 400, 350),
                new Layer("layer 3", 400, 350),
                new Grid(400, 350),
            ],
            objects: [
                new Tile(source1, 0, 0, 512, 512),
                new Tile(source2, 0, 0, 512, 512),
                new Tile(source3, 0, 0, 512, 512),
            ],
            tools: { brush: new Brush(), camera: new Camera() },
        };

        //TODO make the grid as css background
    }

    componentDidMount() {
        this.updateBrush();

        //make the first object selected
        let newObject = this.state.objects[0];
        newObject.active = true;
        this.onObjectChange(newObject, 0);
    }

    onObjectChange(newObject, index) {
        let newObjects = this.state.objects;
        newObjects[index] = newObject;
        this.setState({ objects: newObjects });
        this.updateBrush();
    }

    updateBrush() {
        let tools = this.state.tools;

        //Update the object to the active one
        let activeIndex = 0;
        this.state.objects.forEach((object, index) => {
            if (object.active) {
                activeIndex = index;
            }
        });
        tools.brush.object = this.state.objects[activeIndex];

        this.setState({ tools: tools });
    }

    onLayerChange(index, newLayer) {
        let newLayers = this.state.layers;
        newLayers[index] = newLayer;
        this.setState({ layers: newLayers });
    }

    render() {
        return (
            <div id="App">
                <EditingArea layers={this.state.layers} tools={this.state.tools} map={this.state.map} />
                <TitleArea />
                <ToolBarArea objects={this.state.objects} onObjectChange={this.onObjectChange} />
                <PanelArea layers={this.state.layers} onLayerChange={this.onLayerChange} />
                <div id="StatusBarArea"></div>
            </div>
        );
    }
}

//const map = {
//	name: "TestingMap",
//	size: { x: 30, y: 40 },
//	background: "Forest",
//	layers: [
//		{
//			name: "layer1",
//			index: 1,
//			visible: true,
//			type: "solid",
//			tiles: [
//				{ x: 3, y: 6, texture: "grass", type: "solidBlock", visible: true },
//				{ x: 13, y: 3, texture: "grass", type: "solidBlock", visible: true },
//				{ x: 4, y: 6, texture: "grass", type: "solidBlock", visible: true },
//				{ x: 1, y: 2, texture: "grass", type: "solidBlock", visible: true }
//			]
//		},
//		{
//			name: "layer2",
//			index: 0,
//			visible: true,
//			type: "decoration",
//			tiles: [
//				{ x: 5, y: 5, texture: "grass", type: "notInterative", visible: true },
//				{ x: 6, y: 6, texture: "grass", type: "notInterative", visible: true },
//				{ x: 7, y: 7, texture: "grass", type: "notInterative", visible: true }
//			]
//		}
//	]
//};

ReactDOM.render(<App />, document.getElementById("root"));
