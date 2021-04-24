window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

class RTAWListener {

  ontrying = (text) => { };
  ondone = (text) => { };
  onend = () => { };

  isRecognizing = false;
  status = '';
  dictionary = {};

  #recognition = new SpeechRecognition();

  constructor() { this.#initialize() };

  #initialize = () => {
    const self = this;
    // 音声認識初期化
    self.#recognition = new SpeechRecognition();

    // UAがWindowsなら機能を有効にする
    // androidだとまだだめっぽいので...
    const isuawin = window.navigator.userAgent.toLowerCase().indexOf('windows') > -1;
    self.#recognition.interimResults = isuawin;

    self.#recognition.onresult = function(event) {
      // 音声認識結果取得してます
      const results = event.results;
      for (let i = event.resultIndex; i < results.length; i++) {
        let text = results[i][0].transcript;
        if (!results[i].isFinal) {
          // ここは未確定
          self.status = 'trying';
          self.ontrying(text);
          continue;
        }
        // ここは確定。完了イベント呼び出し
        self.status = 'done';
        // 辞書による変換
        if (self.dictionary) {
          Object.keys(self.dictionary).forEach(key => {
            text = text.replace(key, self.dictionary[key]);
          });
        }
        self.ondone(text);
      }
    }

    self.#recognition.onerror = function(event) {
      self.status = 'error';
      console.log(event);
    }

    self.#recognition.onend = function(event) {
      self.status = 'end';
      self.onend();
    }
  };

  start = async (lang, continuity) => {
    const self = this;

    self.#recognition.lang = lang;
    self.#recognition.continuous = continuity;
    self.#recognition.start();
    self.status = 'start';
  };

  end = () => {
    this.#recognition.stop();
    this.status = 'stop';
  };
};
