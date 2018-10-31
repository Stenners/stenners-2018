import Phaser from "phaser";
import DungeonScene from "./scenes/dungeon.js";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#000",
    parent: "game-container",
    pixelArt: true,
    scene: DungeonScene,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);
