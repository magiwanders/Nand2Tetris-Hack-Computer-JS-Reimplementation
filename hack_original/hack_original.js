class HACK_original {

  constructor() {
    this.rom = new ROM()
    this.cpu = new CPU()
    this.ram = new Memory()

    this.inM = 0
    this.instruction = 0
    this.reset = 0

    this.outM = 0
    this.writeM = 0
    this.addressM = 0
    this.pc = 0
  }

  load(program) {
    this.rom.flash(program)
  }

  initializeRam(ram) {
    this.ram.load(ram)
  }

  cycle() {

    this.addressM = this.cpu.registerA
    this.inM = this.ram.out(0, 0, this.addressM)
    //console.log('inM (ram['+this.addressM+']) = '+this.inM)
    // this.instruction = this.rom.out(this.pc)

    var cpuOut = this.cpu.out(this.inM, this.instruction, this.reset)                   //;console.log(cpuOut[1])
    if(this.reset==1) this.reset=0
    this.outM = cpuOut[1][0]
    this.writeM = cpuOut[1][1]
    this.addressM = cpuOut[1][2]                                                  //;if(this.writeM==1) console.log('Writing to ' + this.addressM)
    this.pc = cpuOut[1][3]

    this.inM = this.ram.out(this.outM, this.writeM, this.addressM)
    this.instruction = this.rom.out(this.pc)

     // console.log(this.ram.out(0, 0, 0))
     // console.log(this.ram.out(0, 0, 1))
     // console.log(this.ram.out(0, 0, 2))
  }

}
