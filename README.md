# ALPACA-RTAW

generAtes reaL-time subtitles in multiPle lAnguages ​​from voiCe recognition And Reads Them Aloud. 
(with obs and obs-Websocket

音声認識からリアルタイムで翻訳し、認識結果と翻訳結果を音声合成で読み上げる。

OBS連携することで、音声認識した文字列と翻訳した文字列をOBS上に表示する。

# 動作環境

- Google Chrome

- OBS + OBS-Websocket

- localhost.run (またはngrokなど他のstunnelツール)

## localhost.run の使い方

OBSの動いてるPC上でコマンドプロンプトを開いて以下を実行する。

```shell
> ssh -R 80:localhost:(OBS-WebSocketで指定したポート番号) localhost.run
```

コマンドに失敗する場合は[FAQ](http://localhost.run/docs/faq)を見ること。

「xxxxxx.localhost.run tunneled with tls termination」と出れば完了。

ALPACARTAWから繋ぐには、IPAddrにxxxxxx.localhost.run、Portに443を指定する。

# SpeechRecognition

## Recognize lang

音声認識する言語を設定する。

デフォルト：ja_JP

## Start

音声認識を開始する。

# Speech translate settings

## GAS deploy key

翻訳機能を持つgoogle apps scriptのデプロイキーを設定する。

デフォルト：アルパカさんの

落ちてる場合は自分で用意すること。

``` js
// サンプル
function doGet(e) {
  var p = e.parameter;
  var translatedText = LanguageApp.translate(p.text, p.source, p.target);
  return ContentService.createTextOutput(e.parameter.callback + '({"translated" : "' + translatedText + '"});').setMimeType(ContentService.MimeType.JAVASCRIPT);
}
```

## Native lang

母国語を設定する。

デフォルト：ja

## Foreign lang

翻訳対象の言語を設定する。

デフォルト：en

## Test

翻訳をテスト実行する。

テスト文字列は日本語なので、NativeLangには"ja"を設定しておくこと。

# Speech voice settings

## Native voice

母国語の音声を設定する。

デフォルト：取得可能な音声一覧の先頭

## Volume

母国語の音声の音量を設定する。

デフォルト：1

## Pitch

母国語の音声の音程を設定する。

デフォルト：1

## Rate

母国語の音声の速度を設定する。

デフォルト：1

## Test

母国語で音声合成をテスト実行する。

## Foreign voice

翻訳対象の言語の音声を設定する。

デフォルト：取得可能な音声一覧の先頭

## Volume

翻訳対象の言語の音声の音量を設定する。

デフォルト：1

## Pitch

翻訳対象の言語の音声の音程を設定する。

デフォルト：1

## Rate

翻訳対象の言語の音声の速度を設定する。

デフォルト：1

## Test

翻訳対象の言語で音声合成をテスト実行する。

# OBS connection settings

[OBS](https://obsproject.com/ja)と[OBS-Websocket](https://github.com/Palakis/obs-websocket)の設定をしておくこと。

## 動作確認環境

OBS：26.1.1

OBS-Websocket：4.9.0

## IPAddr

OBSがインストールされているPCのIPv4アドレスを設定する。

デフォルト：localhost

## Port

OBS-Websocketで設定したポート番号を指定する。

デフォルト：4444

## Password

OBS-Websocketで設定したパスワードを指定する。

## Connect

OBSに接続する。状態はボタン右に表示される。

- OPEN

OBSとの接続を開始した。

- CONNECTED

OBSとの接続が完了した。

- ERROR

OBSとの接続に失敗した。

# OBS TextGDIPlus settings

## Native source

母国語表示用のOBSのテキストソース名を設定する。

デフォルト：Native

## Foreign source

翻訳対象の言語のOBSのテキストソース名を設定する。

デフォルト：Native

## Timeout

OBSのテキストソースに表示された字幕が消えるまでの時間（ミリ秒）。

デフォルト：未設定

- 未設定、数値として評価できない場合は消えない

- 1000ms未満の場合は5000msになる

## Delay

OBSのテキストソースに字幕文字列を送出するまでの時間（ミリ秒）。

デフォルト：1ms

# 特記

- 各項目はパスワード以外クライアントPCに保存し、パスワードのみ画面を閉じると削除する。
