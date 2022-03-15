import { VoiceControl } from "./voice-control.mjs";

export class Toolbar {
  root;
  app;
  delayInput;

  constructor(app, rootElement) {
    
    this.root = rootElement
    this.app = app
    
    this.delayInput = this.root.querySelector(`[name="delay"]`)

    new VoiceControl(
      this.root.querySelector('.voice-control'),
      {
        'снимок': 'shot',
        'серия снимков': 'burst_shot',
        'сбросить карточки': 'clear'
      },
      this.executeCommand.bind(this)
    )

    this.bindListeners();
  }

  bindListeners() {
      this.root.addEventListener('submit', this._onFormSubmit.bind(this))
  }

  _onFormSubmit(event) {  
    this.executeCommand(event.submitter.name)
  }

  executeCommand(command) {
    this._setDelay()
    switch(command){
      case 'shot':
        this._shot()
        break
      case 'burst_shot':
        this._burstShot()
        break
      case 'clear':
        this._clear()
        break
    }
  }

  _clear() {
    this.app.clear();
  }

  _shot() {
    this.app.shot();
  }

  _burstShot() {
    this.app.burstShot();
  }

  _setDelay() {
    this.app.setDelay(this.delayInput.value);
  }

}