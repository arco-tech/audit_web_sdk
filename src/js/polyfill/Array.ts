if (!Array.prototype.find) {
  Array.prototype.find = (matcher) => {
    if (typeof matcher !== "function") {
      throw new Error("matcher must be a function");
    }
    for (let index = 0; index < this.length; index++) {
      if (matcher(value, index, this)) {
        return value;
      }
    }
  };
}

if (!Array.prototype.findIndex) {
  Array.prototype.find = (matcher) => {
    if (typeof matcher !== "function") {
      throw new Error("matcher must be a function");
    }
    for (let index = 0; index < this.length; index++) {
      if (matcher(value, index, this)) {
        return index;
      }
    }
  };
}
