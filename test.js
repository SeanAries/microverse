// Copyright 2021 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

import { Model, Constants, q_euler } from "@croquet/worldcore";
import { startWorld } from "./root.js";
import { ExpanderLibrary } from "./src/code.js";
import { demo } from "./expanders/demo.js";
import { menu } from "./expanders/menu.js";

Constants.MaxAvatars = 6;
Constants.AvatarNames = [
    "generic/1", "generic/2", "generic/3", "generic/4", "generic/5", "generic/6",
    "alice", "newwhite", "fixmadhatter", "marchhare", "queenofhearts", "cheshirecat"
];

let library = new ExpanderLibrary();
library.add(demo);
library.add(menu);
library.installAsBaseLibrary();

// use bit-identical math for constant initialization
Model.evaluate( () => {
    Constants.DefaultCards = [
        {
            card: {
                name:'world model',
                translation:[25, -90.5, -60],
                scale:[200, 200, 200],
                rotation: q_euler(0, Math.PI, 0),
                layers: ['walk'],
                type: "3d",
                // dataLocation: "./assets/3D/Refinery.glb.zip",
                singleSided: true,
                shadow: true,
                placeholder: true,
                placeholderSize: [40, 1, 40],
                placeholderColor: 0x808080,
                placeholderOffset: [0, -0.065, 0],
            }
        },
        {
            card: {
                name: 'lighting #1',
                type: "lighting",
                className: "DLight",
            }
        },

            {
                card: {
                    name: 'bitcointracker',
                    className: "BitcoinTracker",
                    translation: [-4, -0.5, -6],
                    rotation: q_euler(0, Math.PI / 2, 0),
                    scale: [4, 4, 4],
                    type: "2d",
                    cornerRadius: 0.03,
                    textureType: "canvas",
                    width: 1024,
                    height: 768,
                    frameColor: 0x666666,
                    color: 0xffffff,
                    depth: 0.05,
                },
                id: "main",
            },
            {
                card: {
                    name:'bitlogo',
                    className: "BitLogoCard",
                    translation: [-0.35, 0.35, 0.1],
                    scale: [0.25, 0.25, 0.25],
                    parent: "main",
                    type: "2d",
                    dataLocation: './assets/SVG/BitcoinSign.svg',
                    depth: 0.05,
                    color: 0xffffff,
                    frameColor: 0x666666,
                }
            },
            {
                card: {
                    name:'bar graph',
                    className: "DBarGraphCard",
                    translation:[0, -0.3, 0.1],
                    color: 0x8888ff,
                    type: "object",
                    name: "BarGraph",
                    height: 0.4,
                    parent: "main",
                }
            }

    ];
});

// Default parameters are filled in the body of startWorld
startWorld({
    appId: 'io.croquet.microverse',
    apiKey: '1_nsjqc1jktrot0iowp3c1348dgrjvl42hv6wj8c2i',
    tps: 30,
    eventRateLimit: 60,
}).then(() => {
    console.log(`
  ________  ____  ____  __  ____________
 / ___/ _ \\/ __ \\/ __ \\/ / / / __/_  __/
/ /__/ , _/ /_/ / /_/ / /_/ / _/  / /
\\___/_/|_|\\____/\\___\\_\\____/___/ /_/
`);
});
