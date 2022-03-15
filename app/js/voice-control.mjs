export class VoiceControl {
  root;
  recognition;
  commandsMap;
  commandHanler;  

  constructor(rootElement, commandsMap, commandHanler) {
    this.root = rootElement
    this.commandsMap = commandsMap
    this.commandHanler = commandHanler

    this.initRecognition()
    this.bindEventHandles()
  }

  bindEventHandles() {
    this.root.addEventListener('change',this._onControlValueChange.bind(this))
    this.recognition.addEventListener('speechend',this._onRecognitionEnd.bind(this))
    this.recognition.addEventListener('result',this._onRecognitionResult.bind(this))
    this.recognition.addEventListener('error',this._onRecognitionError.bind(this))
  }

  _onControlValueChange() {
    this.root.checked ? this.startRecognition() : this.stopRecognition()
  }

  _onRecognitionEnd() {
    this.startRecognition()
  }

  _onRecognitionResult(event) {
    this.stopRecognition()

    const result = event.results[0][0].transcript
    const command = this.commandsMap[result]

    command ? this.commandHanler(command) : alert(`Команды "${result}" нет в списке. Скажите чётче`)
  }

  _onRecognitionError() {
    this.stopRecognition()
    alert('Ошибка, попробуйте снова')
  }

  startRecognition() {
    this.recognition.start()
  }

  stopRecognition() {
    this.recognition.stop()
    this.root.checked = false
  }

  initRecognition() {
    this.recognition = new webkitSpeechRecognition()
    this.recognition.lang = 'ru-RU'
    this.recognition.interimResults = false
    this.recognition.maxAlternatives = 1
  }

}