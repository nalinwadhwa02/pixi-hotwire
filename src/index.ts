import { Manager } from './Manager';
import { LoaderScene } from './scenes/LoaderScene';

// const socket = io();

// setInterval(function() {
//   socket.emit('hello', 'world');
// }, 1000 / 60);

Manager.initialize(0x6495ed);

// We no longer need to tell the scene the size because we can ask Manager!
const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);