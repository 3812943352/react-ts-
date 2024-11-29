/*
 * @Author: wb
 * @Date: 2024-11-20 19:35:04
 * @LastEditors: wb
 * @LastEditTime: 2024-11-20 19:39:26
 * @FilePath: \demo\src\views\login\commponents\audioTexture.tsx
 * @Description: 请填写简介
 */
import * as THREE from "three";

class AudioTexture {
  tAudioData!: THREE.DataTexture;
  analyser!: THREE.AudioAnalyser;

  constructor(file: string) {
    this.init(file);
  }

  init(file: string) {
    const fftSize = 128;
    const listener = new THREE.AudioListener();
    const audio = new THREE.Audio(listener);

    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
      const loader = new THREE.AudioLoader();
      loader.load(file, function (buffer) {
        audio.setBuffer(buffer);
        audio.play();
        audio.setVolume(0);
      });
    } else {
      const mediaElement = new Audio(file);
      mediaElement.play();
      audio.setVolume(0);
      audio.setMediaElementSource(mediaElement);
    }

    const analyser = new THREE.AudioAnalyser(audio, fftSize);
    this.analyser = analyser;
    this.tAudioData = new THREE.DataTexture(
      analyser.data,
      fftSize / 2,
      1,
      THREE.RedFormat,
    );
  }

  update() {
    if (this.analyser) {
      this.analyser.getFrequencyData();
      this.tAudioData.needsUpdate = true;
    }
  }
}

export default AudioTexture;
