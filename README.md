# m3u8-to-mp4

This module helps you convert an M3U8 file to an MP4 file easily using ffmpeg/node.js

## Installation

This module can be installed via npm. You will also need to install ffmpeg for this module to work:

```sh
$ sudo apt install ffmpeg
$ npm install --save m3u8-to-mp4
```

## Usage

```js
var m3u8ToMp4 = require("m3u8-to-mp4");
var converter = new m3u8ToMp4();
```

### Functions

#### converter.setInputFile(filename)

- **filename:** M3U8 file path. You can use remote URL

#### converter.setOutputFile(filename)

- **filename:** Output file path. Has to be local :)

#### converter.start()

```js
var m3u8ToMp4 = require("m3u8-to-mp4");
var converter = new m3u8ToMp4();

(async function() {
  await converter
    .setInputFile("https://<URL_OF_THE_WEBSITE>/<PATH_TO_THE_M3U8_FILE>")
    .setOutputFile("dummy.mp4")
    .start();

  console.log("File converted");
})();
```

or if you want to use it with _.then()_ instead of async/await:

```js
var m3u8ToMp4 = require("m3u8-to-mp4");
var converter = new m3u8ToMp4();

converter
  .setInputFile("https://<URL_OF_THE_WEBSITE>/<PATH_TO_THE_M3U8_FILE>")
  .setOutputFile("dummy.mp4")
  .start()
  .then(() => {
    console.log("File converted");
  });
```
