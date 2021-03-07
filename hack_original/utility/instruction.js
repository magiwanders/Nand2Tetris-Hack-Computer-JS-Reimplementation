// This is an utility of static methods that help the decoding of instructions

class Instruction {

  constructor(instruction) {
    this.instruction = instruction
    this.isA = this.is_a() ? 1 : 0
    this.isC = this.is_c() ? 1 : 0
    if (!this.isA && !this.isC) this.error = 'error'

    // Components
    this.address = this.a_address()
    this.comp = this.c_comp()
    this.dest = this.c_dest()
    this.jump = this.c_jump()

    // Bits
    this.opcode = this.inst_opcode() ? 1 : 0
    this.a = this.c_a()
    this.c1 = this.c_c1()
    this.c2 = this.c_c2()
    this.c3 = this.c_c3()
    this.c4 = this.c_c4()
    this.c5 = this.c_c5()
    this.c6 = this.c_c6()
    this.d1 = this.c_d1()
    this.d2 = this.c_d2()
    this.d3 = this.c_d3()
    this.j1 = this.c_j1()
    this.j2 = this.c_j2()
    this.j3 = this.c_j3()
  }

  is_a() {
    return this.instruction < 0b1000000000000000
  }

  is_c() {
    return this.instruction >= 0b1110000000000000
  }


  // Components

  a_address() {
    if(this.is_a()) return this.instruction
    else return -1
  }

  c_comp() {
    var mask = 0b1111111 << 6
    return ( this.instruction & mask ) >> 6
  }

  c_dest() {
    var mask = 0b111 << 3
    return ( this.instruction & mask ) >> 3
  }

  c_jump() {
    var mask = 0b111
    return ( this.instruction & mask )
  }


  // Bits

  inst_opcode() {
    return this.instruction >=0b1000000000000000
  }

  c_a() {
    return this.read_bit(6, this.c_comp())
  }

  c_c1() {
    return this.read_bit(5, this.c_comp())
  }

  c_c2() {
    return this.read_bit(4, this.c_comp())
  }

  c_c3() {
    return this.read_bit(3, this.c_comp())
  }

  c_c4() {
    return this.read_bit(2, this.c_comp())
  }

  c_c5() {
    return this.read_bit(1, this.c_comp())
  }

  c_c6() {
    return this.read_bit(0, this.c_comp())
  }

  c_d1() {
    return this.read_bit(2, this.c_dest())
  }

  c_d2() {
    return this.read_bit(1, this.c_dest())
  }

  c_d3() {
    return this.read_bit(0, this.c_dest())
  }

  c_j1() {
    return this.read_bit(2, this.c_jump())
  }

  c_j2() {
    return this.read_bit(1, this.c_jump())
  }

  c_j3() {
    return this.read_bit(0, this.c_jump())
  }

  all() {
    return [
      this.j3,
      this.j2,
      this.j1,
      this.d3,
      this.d2,
      this.d1,
      this.c6,
      this.c5,
      this.c4,
      this.c3,
      this.c2,
      this.c1,
      this.a,
      this.isC,
      this.isA,
      this.opcode,
      this.jump,
      this.dest,
      this.comp,
      this.address
    ]
  }


  // Utility

  read_bit(index, source) {
    var mask = 0b1 << index
    return (source & mask) >> index
  }

}
