require('../less/styles.less');

const $ = require('jquery');
const io = require('socket.io-client');

const Chat = require('./game/Chat');
const Game = require('./game/Game');

$(document).ready(() => {
  const socket = io();
  const game = Game.create(socket, 'canvas', 'leaderboard');
  Chat.create(socket, 'chat-display', 'chat-input');

  $('#name-input').focus();

  const sendName = () => {
    const name = $('#name-input').val();
    if (name && name.length < 20) {
      $('#name-prompt-container').empty();
      $('#name-prompt-container').append(
        $('<span>').addClass('fa fa-2x fa-spinner fa-pulse'));
      socket.emit('nuevo-jugador', { name }, () => {
        $('#name-prompt-overlay').remove();
        $('#canvas').focus();
        game.run()
      })
    } else {
      window.alert('Tu nombre no puede quedar en blanco o ser menos de 20 caracteres.')
    }
    return false
  }
  $('#name-form').submit(sendName);
  $('#name-submit').click(sendName)
});
