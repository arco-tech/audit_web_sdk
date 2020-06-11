if (!Array.prototype.find) {
  Array.prototype.find = function (matcher) {
    if (typeof matcher !== "function") {
      throw new Error("matcher must be a function");
    }
    for (let index = 0; index < this.length; index++) {
      if (matcher(this[index], index, this)) {
        return this[index];
      }
    }
  };
}

if (!Array.prototype.findIndex) {
  Array.prototype.find = function (matcher) {
    if (typeof matcher !== "function") {
      throw new Error("matcher must be a function");
    }
    for (let index = 0; index < this.length; index++) {
      if (matcher(this[index], index, this)) {
        return index;
      }
    }
  };
}
