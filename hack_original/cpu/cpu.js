// TODO: only outout new state
class CPU {

  constructor() {
    // Components, chips 'owned' by the cpu
    this.alu = new ALU()
    this.PC = new PC()
    this.PCc = new PC_controller()

    // Registers of the cpu
    this.registerD = 0
    this.registerA = 0

    // Outputs
    this.outM = 0
    this.writeM = 0
    this.addressM = 0
    this.pc = 0

    // Internal 'circuit lines'
    this.inA = 0
    this.loadA = 0
    this.loadD = 0
    this.x = 0
    this.y = 0
    this.outAlu = 0
    this.zr = 0
    this.ng = 0
    this.jump = 0
  }

  // Only used externally to rebuild the cpu. Useful if there is the need of some sort of initialization in the future.
  wipe() {
    this.constructor()
  }

  out(inM, instruction, reset, debug) {
    //console.log(instruction.toString(2).padStart(16, '0'))
    var oldState = [this.outM, this.writeM, this.addressM, this.pc, this.registerD]

    // Understand what is the instruction type
    var inst = new Instruction(instruction)
    //console.log(inst)
    var dummy=0

    // addressM
    this.addressM = this.registerA

    // outM
    this.x = this.registerD
    this.y = inst.a ? inM : this.addressM

    // ALU
    var onlyC = inst.a ? inst.comp-(1<<6) : inst.comp
    var outALU = this.alu.out(this.x, this.y, onlyC)
    this.outAlu = outALU[0]
    this.zr = outALU[1]
    this.ng = outALU[2]
    this.outM =  inst.d3 ? this.outAlu : 0

    // writeM
    this.writeM = inst.opcode ? inst.d3 : 0

    // PC
    var load = this.PCc.out(inst.opcode, this.zr, this.ng, inst.j1, inst.j2, inst.j3)
    var inc = load ? 0 : 1
    var outPC = this.PC.out(
      this.addressM,
      reset,
      load,
      inc
    )
    this.pc = outPC[1]

    // A register
    this.inA = inst.opcode ? this.outAlu : instruction
    this.loadA = inst.d1 || !inst.opcode
    this.registerA = this.loadA ? this.inA : this.registerA

    // D register
    this.x = this.registerD
    this.loadD = inst.opcode ? inst.d2 : 0
    this.registerD = this.loadD ? this.outAlu : this.registerD

    var newState = [this.outM, this.writeM, this.addressM, this.pc, this.registerD]

    // DEBUG
    if (debug) {
      console.log('---------CPU-IN----------')
      console.log('x = ' + x.toString(2))
      console.log('y = ' + y.toString(2))
      console.log('comp = ' + comp.toString(2))
      console.log('---------CPU-OUT----------')
      console.log('out = ' + out.toString(2))
      console.log('zr = ' + zr.toString(2))
      console.log('ng = ' + ng.toString(2))
      console.log('---------CPU-END----------')
    }

    return [oldState, newState]
  }

}
