/**
 * @description M3U8 to MP4 Converter
 * @author Furkan Inanc
 * @version 1.0.0
 */

 let ffmpeg = require("fluent-ffmpeg");

 /**
  * A class to convert M3U8 to MP4
  * @class
  */
 class m3u8ToMp4Converter {
   /**
    * Sets the input file
    * @param {String} filename M3U8 file path. You can use remote URL
    * @returns {Function}
    */
   setInputFile(filename) {
     if (!filename) throw new Error("You must specify the M3U8 file address");
     this.M3U8_FILE = filename;
 
     return this;
   }
 
   /**
    * Sets the output file
    * @param {String} filename Output file path. Has to be local :)
    * @returns {Function}
    */
   setOutputFile(filename) {
     if (!filename) throw new Error("You must specify the file path and name");
     this.OUTPUT_FILE = filename;
 
     return this;
   }
 
   /**
    * Starts the process
    */
   start(options = {}) {
     // https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#setting-event-handlers
     options = Object.assign({
       onStart: () => { },
       onEnd: () => { },
       onError: error => {
         reject(new Error(error));
       },
       onProgress: () => { },
       onStderr: () => { },
       onCodecData: () => { },
     }, options);
     
     return new Promise((resolve, reject) => {
       if (!this.M3U8_FILE || !this.OUTPUT_FILE) {
         reject(new Error("You must specify the input and the output files"));
         return;
       }
 
       ffmpeg(this.M3U8_FILE)
         .on('start', options.onStart)
         .on('codecData', options.onCodecData)
         .on('progress', options.onProgress)
         .on("error", options.onError)
         .on('stderr', options.onStderr)
         .on("end", (...args) => {
           resolve();
           options.onEnd(...args);
         })
         .outputOptions("-c copy")
         .outputOptions("-bsf:a aac_adtstoasc")
         .output(this.OUTPUT_FILE)
         .run();
     });
   }
 }
 
 module.exports = m3u8ToMp4Converter;
 