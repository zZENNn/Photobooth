import { Gallery } from "./gallery.mjs";
import { Toolbar } from "./toolbar.mjs";

export class Photobooth {
  root;
  video;
  canvas;
  ctx;
  _toolbar;
  _gallery;

  constructor(rootElement) {
    
    this.root = rootElement;

    
    this._toolbar = new Toolbar(this, this.root.querySelector('.camera form'));
    this._gallery = new Gallery(this.root.querySelector('.gallery'));


    this.initCamera();

    this._shot = this._shot.bind(this);
    
  }
  
  initCamera() {

        this.video = this.root.querySelector('video');
        this.canvas = this.root.querySelector('canvas')//this.root -> document? 
        this.ctx = this.canvas.getContext('2d')
        
        
      
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream=> {
            this.video.srcObject = stream;
            this.video.play();
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });
    
      
  }

  clear() {
    this._gallery.clear()
  }

  _shot() {
    const w = this.video.videoWidth;
    const h = this.video.videoHeight;
    this.canvas.width = w
    this.canvas.height = h
    this.ctx.drawImage(this.video,0,0,w,h)
    let data = this.canvas.toDataURL('image/png');
     
    
    this._gallery.addPicture(data)
  }

  shot() {
    setTimeout(this._shot,this.delay);
  }

  burstShot() {
    const burstDelay = 1000;
    setTimeout(this._shot,this.delay);
    setTimeout(this._shot,this.delay+burstDelay);
    setTimeout(this._shot,this.delay+burstDelay*2);     
  }

  setDelay(delay) {
    this.delay = delay*1000;
    console.log('app set delay', delay)
  }
}
