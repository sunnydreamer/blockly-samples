/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Plugin test.
 */

import Blockly from 'blockly/core';
import {speaker} from '../src/speaker';
import {notePlayer} from '../src/note_player';
import {Music} from '../src/music';
import MicroModal from 'micromodal';

document.addEventListener('DOMContentLoaded', function() {
  MicroModal.init({
    onClose: () => speaker.cancel(),
  });
  const game = new Music();
  game.loadLevel(1);
  document.getElementById('playNote').addEventListener(
      'click', function() {
        notePlayer.playNote('C4', '8n');
      });
  document.getElementById('playText').addEventListener(
      'click', function() {
        const textContent = document.getElementById('textInput').value;
        speaker.speak(textContent);
      });
  document.getElementById('playNoteAndText').addEventListener(
      'click', function() {
        speaker.speak('C4', false, function() {
          notePlayer.playNote('C4', '8n');
        });
      });
  document.getElementById('setLevel').addEventListener(
      'input', function(event) {
        game.loadLevel(this.value);
      });
  document.getElementById('logGeneratedCode').addEventListener(
      'click', function(event) {
        game.logGeneratedCode();
      });

  const registerArrowKeys = function(register) {
    const keyCodeMappings = [
      [Blockly.utils.KeyCodes.UP, Blockly.navigation.actionNames.PREVIOUS],
      [Blockly.utils.KeyCodes.DOWN, Blockly.navigation.actionNames.NEXT],
      [Blockly.utils.KeyCodes.RIGHT, Blockly.navigation.actionNames.IN],
      [Blockly.utils.KeyCodes.LEFT, Blockly.navigation.actionNames.OUT]];
    keyCodeMappings.forEach((mapping) => {
      if (register) {
        Blockly.ShortcutRegistry.registry.addKeyMapping(...mapping);
      } else {
        Blockly.ShortcutRegistry.registry.removeKeyMapping(...mapping);
      }
    });
  };
  // Initial state has arrow keys turned on.
  registerArrowKeys(true);
  document.getElementById('enableArrowKeys').addEventListener('click',
      (event) => {
        registerArrowKeys(event.currentTarget.checked);
      });
  document.getElementById('modalButton').addEventListener('click',
      function() {
        speaker.modalToText(document.getElementById('modal-1'));
      });

  document.getElementById('modalButton').addEventListener('focus',
      function(e) {
        speaker.speak('Hit enter to open the help menu');
      });
  document.getElementById('replayButton').addEventListener('click',
      function() {
        speaker.modalToText(document.getElementById('modal-1'));
      });
});