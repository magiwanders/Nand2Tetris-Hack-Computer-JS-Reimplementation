document.getElementById("test_alu_button").onclick = new ALU_test().test
document.getElementById("test_memory_button").onclick = new Memory_test().test
document.getElementById("test_pc_button").onclick = new PC_test().test
document.getElementById("test_instruction_button").onclick = new Instruction_test().test
document.getElementById("test_pc_controller_button").onclick = new PC_controller_test().test
document.getElementById("test_cpu_button").onclick = new CPU_test().test
document.getElementById("test_rom_button").onclick = new ROM_test().test

document.getElementById("test_all_button").onclick = new HACK_original_test().test.bind(new HACK_original_test())

document.getElementById("test_all_button").onclick = function () {
  var hack_test = new HACK_original_test()
  // activateTest: [components, add, max, maxL, ]
  hack_test.test([1, 1, 1, 0, 0, 0, 0, 0])
}
