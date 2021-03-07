// FINAL
class PC_controller {

  // Helper chip that encloses the logic to calculate wether to send the jump signal to PC.
  out(opcode, zr, ng, j1, j2, j3) {
    var jmp = j1 & j2 & j3
    var jg = j3 & !zr & !ng
    var jl = j1 & !zr & ng
    var jeq = j2 & zr & !ng
    var j = jmp | jg | jl | jeq
    return opcode ? j : 0
  }
}
