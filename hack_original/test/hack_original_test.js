class HACK_original_test {

  constructor() {
    this.hack = new HACK_original()
  }

  perform_cycles(cycles) {
    for(var i=0; i<cycles; i++) {
      this.hack.cycle()
    }
  }

  test_components() {
    new ROM_test().test(0)
    new Memory_test().test(0)
    new Instruction_test().test(0)
    new PC_controller_test().test(0)
    new PC_test().test(0)
    new ALU_test().test(0)
    new CPU_test().test(0)
  }

  add_test() {

    var testString = 'ADD TEST: '

    var first  = [2, 6, 4, 2, 5, 3, 132]
    var second = [7, 3, 5, 3, 2, 8, 132]
    var result = [9, 9, 9, 5, 7, 11, 264]

    for (var i=0; i<first.length; i++) {

      this.hack.rom.wipe()
      this.hack.ram.wipe()
      this.hack.reset = 1

      testString = testString + '\n   ' + first[i] + ' + '+ second[i] + ' = '
      this.hack.load([
        first[i],
        0b1110110000010000,
        second[i],
        0b1110000010010000,
        0b0000000000000000,
        0b1110001100001000
      ])

      var ram_end = [
        result[i],
      ]

      this.perform_cycles(10)

      if(this.hack.ram.out(0, 0, 0)==ram_end[0]) testString=testString+this.hack.ram.out(0, 0, 0) + ' -> Passed'
      else testString=testString+this.hack.ram.out(0, 0, 0) + ' -> Failed'
    }

    console.log(testString)

  }

  max_test(){
      var testString = 'MAX TEST: '

      this.hack.load([
          0b0000000000000000,
          0b1111110000010000,
          0b0000000000000001,
          0b1111010011010000,
          0b0000000000001010,
          0b1110001100000001,
          0b0000000000000001,
          0b1111110000010000,
          0b0000000000001100,
          0b1110101010000111,
          0b0000000000000000,
          0b1111110000010000,
          0b0000000000000010,
          0b1110001100001000,
          0b0000000000001110,
          0b1110101010000111
      ])

      var ram0 = [2, 3, 5, -1, 0, -3]
      var ram1 = [3, 2, 5, 2, -3, -7]
      var ram2 = [3, 3, 5, 2, 0, -3]

      for(var i=0; i<ram0.length; i++) {
        this.hack.ram.wipe()
        this.hack.reset = 1

        testString += '\n   max('+ ram0[i] + ', ' + ram1[i] + ') = '

        this.hack.initializeRam([
          ram0[i],
          ram1[i],
          0b0000000000000000,
        ])

        var ram_end = [
          ram0[i],
          ram1[i],
          Default.complement2_16(ram2[i]),
        ]

        this.perform_cycles(20)

        if( this.hack.ram.out(0, 0, 0)==ram_end[0] &&
            this.hack.ram.out(0, 0, 1)==ram_end[1] &&
            this.hack.ram.out(0, 0, 2)==ram_end[2]) testString=testString+this.hack.ram.out(0, 0, 2)+ ' -> Passed'
        else testString=testString+this.hack.ram.out(0, 0, 2) + ' -> Failed'
      }

      console.log(testString)
    }



  run_test(test) {

    this.hack = new HACK_original()

    switch(test) {
      case 0:
        this.test_components()
      break;
      case 1:
        this.add_test()
      break;
      case 2:
        this.max_test()
      break;
      case 3:
        // code block
      break;
      case 4:
        // code block
      break;
      case 5:
        // code block
      break;
      case 6:
        // code block
      break;
      case 7:
        // code block
      break;
      default: console.log('Test not found')
    }
  }

  test(activateTest) {
    console.log('**********************************')
    console.log('******* HACK COMPUTER TEST *******')
    console.log('**********************************')

    for(var i=0; i<activateTest.length; i++) {
        if (activateTest[i]==1) this.run_test(i)
    }


    console.log('**********************************')
    console.log('*******      TEST END      *******')
    console.log('**********************************')
  }

}
