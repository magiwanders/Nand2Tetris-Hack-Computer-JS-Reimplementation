class Memory {

  // This is a temporary class but actual memory will be very similar to this class. Just bigger.

  constructor() {
    //this.buffer = [0, 0, 0] // [in, load, address]
    this.memory = this.create_memory()
  }

  // FUNCTIONS WITH ABSTRACTION

  create_memory() {

    // Create array of 16-bit words
    var memory = new Array()

    // Create RAM
    for(var i=0; i<Default.RAM_length; i++) {
      memory.push(0b0000000000000000)
    }

    // Create Screen Memory Map
    for(var i=0; i<Default.SCREEN_length; i++) {
      memory.push(0b0000000000000000)
    }

    // Create KBD registry
    memory.push(0b0000000000000000)

    return memory;
  }

  out(inn, load, address) {

    if(address > 0b110000000000000) return 0

    var out = this.memory[address]

    if(load==1) this.memory[address] = inn

    return out
  }

  wipe() {
    this.memory = this.create_memory()
  }

  write_word(word, value) {
    this.memory[word] = value
  }

  load(initialRam) {
    for(var i=0; i<initialRam.length; i++) {
      this.memory[i] = initialRam[i]
    }
  }
  //
  // read_word(word) {
  //   return this.memory[word]
  // }
  //
  read_KBD() {
    return this.memory[Default.KBD_address]
  }

  write_KBD(scancode) {
    this.memory[Default.KBD_address] = scancode
  }
  //
  // write_pixel(x, y, color) {
  //
  //   if (x>511 || y>255) return
  //
  //   var mask = 0b1111111111111111 - ( 0b1 << offset )
  //   var masked = this.memory[word] & mask
  //
  //   this.memory[word] = masked + (value << offset)
  // }
  //
  read_pixel(x, y) {

    if (x>511 || y>255) return

    var word = Default.SCREEN_address + ~~((y*Default.width+x)/16)
    var offset = x%16

    var mask = 0b1 << offset

    return ( this.memory[word] & mask ) >> offset
  }
  //
  // print_word(word) {
  //   print( read_word(word).toString(2).padStart(16, '0') )
  // }

}
