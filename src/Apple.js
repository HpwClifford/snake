/* eslint-disable */
class Apple {

  constructor($el, size) {
    this.node = $('<img id="apple"></img>');
    this.node.attr('src', 'src/assets/mouse.gif');
    this.node.width(size);
    this.node.height(size);
    $el.append(this.node);
  }

  setPosition(position) {
    this.node.css(position);
  }

  destroy () {
    this.node.remove();
  }
}
