class PC {

  // PC contains only one register.
  constructor() {
    this.pc=0
  }

  out(inn, reset, load, inc) {
    var oldOut = this.pc

    if (reset==1) {
      this.pc=0
      // console.log('[PC] Reset')
    } else if (load==1) {
      this.pc=inn
      // console.log('[PC] Load')
    } else if (inc==1) {
      this.pc++
      // console.log('[PC] Increment')
    }

    var newOut = this.pc

    return [oldOut, newOut]
  }

}
