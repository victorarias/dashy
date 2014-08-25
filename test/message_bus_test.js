const messageBusFactory = require('../app/message_bus'),
  events = require('events'),
  spec_helper = require('./spec_helper'),
  sinon = spec_helper.sinon,
  expect = spec_helper.expect;

describe("messageBus", function() {
  beforeEach(function() {
    this.ioEmitter = new events.EventEmitter();
    this.io = function() { return this.ioEmitter; }.bind(this);
    this.socket = {
      handshake: { query: {} },
      disconnect: sinon.spy(),
      join: sinon.spy(),
    }

    this.messageBus = messageBusFactory(this.io).start();
  });

  it("closes connections without valid profiles", function() {
    this.ioEmitter.emit('connection', this.socket);

    expect(this.socket.disconnect.calledOnce).to.eq(true);
  });

  it("joins connections to their profile rooms", function() {
    this.socket.handshake.query.token = "123";

    this.ioEmitter.emit('connection', this.socket);

    expect(this.socket.join.calledWith('developer')).to.eq(true);
  });

  it("emits messages to to the right channel", function() {
    var message = 'message';
    var content = {};
    var channelEmitter = sinon.spy();
    this.ioEmitter.to = function() { return { emit: channelEmitter }; };
    this.messageBus.emit(message, content);

    expect(channelEmitter.calledWith(message, content)).to.eq(true);
  });
});
