class ROM {

  // This is a temporary class but actual memory will be very similar to this class. Just bigger.

  constructor() {
    this.rom = this.create_rom()
  }

  create_rom() {
    // Create array of 16-bit words
    var rom = new Array()

    // Create RAM
    for(var i=0; i<Default.ROM_length; i++) {
      rom.push(0b0000000000000000)
    }

    return rom;
  }

  out(address) {

    if(address > 0b1000000000000000) return 0

    var out = this.rom[address]

    return out
  }

  flash(rom) {

    for(var i=0; i<rom.length; i++) {
      this.rom[i] = rom[i]
    }

  }

  wipe() {
    this.rom = this.create_rom()
  }

  // read_word(word) {
  //   return this.rom[word]
  // }
  //
  // print_word(word) {
  //   print( read_word(word).toString(2).padStart(16, '0') )
  // }

}
